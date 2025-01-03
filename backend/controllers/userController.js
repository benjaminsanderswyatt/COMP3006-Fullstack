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
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '4h' });
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Update User
exports.updateUser = async (req, res) => {
  const userId = req.user.id;
  const { username, email, password } = req.body;

  if (typeof username !== 'string' && username !== null) {
    return res.status(400).json({ message: 'Invalid username format' });
  }
  if (typeof email !== 'string' && email !== null) {
    return res.status(400).json({ message: 'Invalid email format' });
  }
  if (typeof password !== 'string' && password !== null) {
    return res.status(400).json({ message: 'Invalid password format' });
  }


  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Failed to update'});
    }

    // Check for unique username
    if (username && username !== user.username) {
      const usernameExists = await User.findOne({ username });

      if (usernameExists) {
        return res.status(400).json({ message: 'Username already taken' });
      }

      user.username = username;
    }

    // Check for unique email
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });

      if (emailExists) {
        return res.status(400).json({ message: 'Email already in use' });
      }

      user.email = email;
    }

    if (password) {
      user.password = password;
    }

    await user.save();
    res.status(200).json({ message: 'User updated successfully' });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }

};