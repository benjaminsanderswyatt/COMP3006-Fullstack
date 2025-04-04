const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) 
    return res.status(401).json({ message: 'An error occurred. Please try again.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'An error occurred. Please try again.' });
  }
};

module.exports = { verifyToken };