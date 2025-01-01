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
    
  it('should register a new user successfully', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({
        username: 'testuser',
        email: 'test@user.com',
        password: 'testPassword123',
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User registered successfully');
  });

});