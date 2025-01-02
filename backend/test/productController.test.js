const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const Product = require('../models/Product');
const { MongoMemoryServer } = require('mongodb-memory-server');

// User data for login
const userData = {
  username: 'testuser',
  email: 'test@user.com',
  password: 'testPassword123',
};

let mongoServer;
let token;
let headers;
let productId;
let productData;

beforeAll(async () => {
    // Set up Mongo Memory Server
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    // Connect to db
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

    token = loginResponse.body.token; // Get the JWT token from response


    // Set authorization header
    headers = {
        Authorization: `Bearer ${token}`,
    };

    
    // Add a product to the database for use in the tests
    productData = {
        name: 'Test Product',
        image: 'test-image-url',
        price: 100,
        stock: 10,
    };

    const response = await request(app)
        .post('/api/products/add')
        .set(headers)
        .send(productData);
    productId = response.body.data._id; // Save Id of the added product

});

afterAll(async () => {
    // Close & cleanup Mongo Memory Server
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
});




describe('Product Controller Tests', () => {

    it('should add a new product', async () => {
        // Arrange: mock product data
        const productAddData = {
            name: 'Test Add Product',
            image: 'test-add-image-url',
            price: 200,
            stock: 20,
        };

        // Act: Send POST request to add a new product
        const response = await request(app)
            .post('/api/products/add')
            .set(headers)
            .send(productAddData);

        // Assert: Verify success status and product details
        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Product added successfully');
        expect(response.body.data.name).toBe(productAddData.name);


    });

    it('should get all products', async () => {

        // Act: Send GET request to fetch all products
        const response = await request(app)
            .get('/api/products/get')
            .set(headers);


        // Assert: Verify success status and response data
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.length).toBeGreaterThan(0); // At least 1 product was returned

    });

    it('should fetch products in the cart', async () => {

        // Act: send POST request to fetch products for the cart
        const response = await request(app)
            .post('/api/products/cart')
            .set(headers)
            .send({ productIds: [productId] });

            
        // Assert: Verify success and product details in the cart response
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.length).toBe(1);
        expect(response.body.data[0].name).toBe(productData.name);

    });

    it('should set the stock of a product', async () => {

        // Arrange: new stock value for product
        const newStock = 15;

        // Act: send PATCH request to set stock of the product
        const response = await request(app)
            .patch('/api/products/setStock')
            .set(headers)
            .send({ _id: productId, stock: newStock });


        // Assert: verify the success status and stock update
        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Successfully set stock');

        // Assert: check that the stock has changed in the database
        const updatedProduct = await Product.findById(productId);
        expect(updatedProduct.stock).toBe(newStock);

    });

    it('should buy products in the cart', async () => {
        // Arrange: set cart
        const cart = [productId];


        // Act: send POST request to buy the products in the cart
        const response = await request(app)
            .post('/api/products/buyCart')
            .set(headers)
            .send({ cart });


        // Assert: verify success status and the failedProducts list
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.length).toBe(0); // No products should fail

    });

    it('should remove a product', async () => {

        // Act: send DELETE request to remove the product
        const response = await request(app)
            .delete('/api/products/removeproduct')
            .set(headers)
            .send({ _id: productId });


        // Assert: verify success status and removal message
        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Successfully removed item');

        // Assert: verify the product is deleted from the database
        const removedProduct = await Product.findById(productId);
        expect(removedProduct).toBeNull();
    });
});
