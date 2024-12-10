const express = require('express');
const { getProduct, addProduct, updateProductStock, deleteProduct } = require('../controllers/productControllers');


const router = express.Router();

router.get('/get', getProduct);

router.post('/add', addProduct);

router.patch('/:id/stock', updateProductStock);

router.delete('/:id', deleteProduct);

module.exports = router;