const User = require('../models/User');
const jwt = require('jsonwebtoken');


// Register User
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const user = await User.create({ username, email, password });
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};


// Login User
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (user && (await user.matchPassword(password))) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};