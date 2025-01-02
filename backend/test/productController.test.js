const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const Product = require('../models/Product');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { emitStockUpdate, emitRemoveUpdate } = require('../websocket/setupWebSocket');

// User data for login
const userData = {
    username: 'testuser',
    email: 'test@user.com',
    password: 'testPassword123',
  };
  
let mongoServer;
let token;
let productId;


beforeAll(async () => {
  // Set up Mongo Memory Server for testing
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  // Connect to in-memory MongoDB
  await mongoose.connect(mongoUri);


   // Register a user and log them in to get the JWT token
   await request(app)
   .post('/api/users/register')
   .send(userData);

 const loginResponse = await request(app)
   .post('/api/users/login')
   .send({
     email: userData.email,
     password: userData.password,
   });

 token = loginResponse.body.token; // Get the JWT token from login response
});


afterAll(async () => {
  // Cleanup: Drop database, close connection, and stop Mongo memory server
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});



describe('Product Controller Tests', () => {
  // Sample product data
  const productData = {
    name: 'Test Product',
    image: 'test-image-url',
    price: 100,
    stock: 10,
  };

  let productId;




  it('should add a new product', async () => {
    // Arrange: Create product data to send in the request
    // Arrange: Create product data to send in the request
    const headers = {
        Authorization: `Bearer ${token}`, // Attach token to Authorization header
      };

    // Act: Send POST request to add a new product
    const response = await request(app)
        .post('/api/products/add')
        .set(headers)
        .send(productData);


    // Assert: Verify success status and product details
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Product added successfully');
    expect(response.body.data.name).toBe(productData.name);
    productId = response.body.data._id; // Store the product ID for further tests
  });





  it('should get all products', async () => {
    // Arrange: Add authorization headers
    const headers = {
        Authorization: `Bearer ${token}`,
    };


    // Act: Send GET request to fetch all products
    const response = await request(app)
        .get('/api/products/get')
        .set(headers);

    // Assert: Verify success status and response data
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0); // Ensure at least one product is present
  });




  it('should fetch products in the cart', async () => {
    // Arrange: Add authorization headers
    const headers = {
        Authorization: `Bearer ${token}`,
    };


    // Arrange: Product IDs to fetch from cart
    const productIds = [productId];

    // Act: Send POST request to fetch products for the cart
    const response = await request(app)
      .post('/api/products/cart')
      .set(headers)
      .send({ productIds });

    // Assert: Verify success and product details in the cart response
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.length).toBe(1);
    expect(response.body.data[0].name).toBe(productData.name);
  });




  
  it('should set the stock of a product', async () => {
    // Arrange: Add authorization headers
    const headers = {
        Authorization: `Bearer ${token}`,
    };


    // Arrange: New stock value to update for the product
    const newStock = 15;

    // Act: Send PATCH request to set stock of the product
    const response = await request(app)
      .patch('/api/products/setStock')
      .set(headers)
      .send({ _id: productId, stock: newStock });

    // Assert: Verify the success status and stock update
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Successfully set stock');

    // Verify stock change in the database
    const updatedProduct = await Product.findById(productId);
    expect(updatedProduct.stock).toBe(newStock);
  });





  it('should remove a product', async () => {
    // Arrange: Add authorization headers
    const headers = {
        Authorization: `Bearer ${token}`,
    };



    // Act: Send DELETE request to remove the product
    const response = await request(app)
      .delete('/api/products/removeproduct')
      .set(headers)
      .send({ _id: productId });

    // Assert: Verify success status and removal message
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Successfully removed item');

    // Verify the product is deleted from the database
    const removedProduct = await Product.findById(productId);
    expect(removedProduct).toBeNull();
  });
});
