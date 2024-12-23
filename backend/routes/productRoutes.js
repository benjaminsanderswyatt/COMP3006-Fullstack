const express = require('express');
const { verifyToken } = require('../middleware/authJWT');
const { addProduct, getProducts, getMyProducts, cartProducts, setStock } = require('../controllers/productControllers');


const router = express.Router();

router.post('/add', verifyToken, addProduct);

router.get('/get', verifyToken, getProducts);

router.get('/myproducts', verifyToken, getMyProducts);

router.post('/cart', verifyToken, cartProducts);

router.post('/setstock', verifyToken, setStock);

module.exports = router;