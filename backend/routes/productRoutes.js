const express = require('express');
const { verifyToken } = require('../middleware/authJWT');
const { addProduct, getProducts, getMyProducts, cartProducts, setStock, removeProduct } = require('../controllers/productControllers');


const router = express.Router();

// ---------------------- Store ----------------------

router.get('/get', verifyToken, getProducts);


// ---------------------- Cart ----------------------

router.post('/cart', verifyToken, cartProducts);


// ---------------------- My Products ----------------------

router.post('/add', verifyToken, addProduct);

router.get('/myproducts', verifyToken, getMyProducts);

router.post('/setstock', verifyToken, setStock);

router.delete('/removeproduct', verifyToken, removeProduct);



module.exports = router;