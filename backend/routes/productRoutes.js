const express = require('express');
const { addProduct, getProducts } = require('../controllers/productControllers');


const router = express.Router();

router.post('/add', addProduct);

router.get('/get', getProducts);

module.exports = router;