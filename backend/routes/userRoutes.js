const express = require('express');
const { verifyToken } = require('../middleware/authJWT');
const { registerUser, loginUser, updateUser, deleteUser } = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.put('/update', verifyToken, updateUser);

router.delete('/delete', verifyToken, deleteUser);

module.exports = router;