const express = require('express');
const { addProduct } = require('../controllers/productControllers');


const router = express.Router();

router.post('/add', addProduct);

module.exports = router;