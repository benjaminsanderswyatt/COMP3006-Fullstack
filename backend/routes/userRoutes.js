const express = require('express');
const { verifyToken } = require('../middleware/authJWT');
const { registerUser, loginUser, updateUser } = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.put('/update', verifyToken, updateUser);

module.exports = router;