const express = require('express');
const { verifyToken } = require('../middleware/authJWT');
const { registerUser, loginUser } = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.put('/update', verifyToken, updateUser);

module.exports = router;