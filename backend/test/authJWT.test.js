const { verifyToken } = require('../middleware/authJWT');
const jwt = require('jsonwebtoken');

// Mock `jsonwebtoken` methods
jest.mock('jsonwebtoken');

describe('verifyToken Middleware', () => {
  const mockReq = () => ({
    headers: {},
  });
  const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  const mockNext = jest.fn();

  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks between tests
  });

  test('should return 401 if no token is provided', () => {
    // Arrange: Create mock request without authorization header
    const req = mockReq();
    const res = mockRes();

    // Act: Call verifyToken middleware
    verifyToken(req, res, mockNext);

    // Assert: Verify 401 response and error message
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'An error occurred. Please try again.' });
    expect(mockNext).not.toHaveBeenCalled();
  });

  test('should return 401 if token verification fails', () => {
    // Arrange: Create mock request with invalid token
    const req = mockReq();
    req.headers['authorization'] = 'Bearer invalidToken';
    const res = mockRes();
    jwt.verify.mockImplementation(() => {
      throw new Error('Invalid token');
    });

    // Act: Call verifyToken middleware
    verifyToken(req, res, mockNext);

    // Assert: Verify 401 response and error message
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'An error occurred. Please try again.' });
    expect(mockNext).not.toHaveBeenCalled();
  });

  test('should call next() if token is valid', () => {
    // Arrange: Create mock request with valid token
    const req = mockReq();
    req.headers['authorization'] = 'Bearer validToken';
    const res = mockRes();
    const decodedUser = { id: '123', username: 'testuser' };
    jwt.verify.mockReturnValue(decodedUser); // Mock successful verification

    // Act: Call verifyToken middleware
    verifyToken(req, res, mockNext);

    // Assert: Verify req.user is set, and next() is called
    expect(req.user).toEqual(decodedUser);
    expect(mockNext).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  test('should return 401 if token format is invalid', () => {
    // Arrange: Create mock request with malformed authorization header
    const req = mockReq();
    req.headers['authorization'] = 'InvalidHeaderFormat';
    const res = mockRes();

    // Act: Call verifyToken middleware
    verifyToken(req, res, mockNext);

    // Assert: Verify 401 response and error message
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'An error occurred. Please try again.' });
    expect(mockNext).not.toHaveBeenCalled();
  });
});
