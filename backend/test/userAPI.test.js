const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
  // Set up Mongo Memory Server
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  // Connect to db
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  // Close & cleanup Mongo Memory Server
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});


describe('User Auth API', () => {

  it('should register new user successfully', async () => {
    // Arrange: create user data
    const newUser = {
        username: 'testuser',
        email: 'test@user.com',
        password: 'testPassword123',
    }


    // Act: Send register request
    const response = await request(app)
      .post('/api/users/register')
      .send( newUser);


    // Assert: 
    expect(response.status).toBe(201); // Successful created status
    expect(response.body.message).toBe('User registered successfully'); // Verify success message
  });



  it('should not register a user with an existing email', async () => {
    // Arrange: register a user
    await request(app)
      .post('/api/users/register')
      .send({
        username: 'testuser2',
        email: 'test@user.com',
        password: 'testPassword123',
      });


    // Act: try to register another user with the same email
    const response = await request(app)
      .post('/api/users/register')
      .send({
        username: 'testuser3',
        email: 'test@user.com', // Same email
        password: 'testPassword456',
      });


    // Assert: 
    expect(response.status).toBe(400); // Should return bad request
  });



  it('should login user with correct credentials', async () => {
    // Arrange: regester the use to login with
    const registerResponse = await request(app)
    .post('/api/users/register')
    .send({
      username: 'testuser4',
      email: 'test4@user.com',
      password: 'testPassword123',
    });


    // Act: attempt login request
    const response = await request(app)
      .post('/api/users/login')
      .send({
        email: 'test4@user.com',
        password: 'testPassword123',
      });


    // Assert: 
    expect(response.status).toBe(200); // Returns 200 Success
    expect(response.body.token).toBeDefined(); // Token has been generated and returned
  });



  it('should not login with incorrect credentials', async () => {
    // Arrange: create user data
    const invalidCredentials = {
      email: 'nonexistent@user.com',
      password: 'wrongPassword',
    };


    // Act: attempt to login with invalid credentials
    const response = await request(app)
      .post('/api/users/login')
      .send(invalidCredentials);


    // Assert:
    expect(response.status).toBe(401); // Returns 401 Unauthorized
    expect(response.body.message).toBe('Invalid credentials'); // Verify error message
  });



});