const Product = require('../models/Product');


// Create product
exports.createProduct = async (req, res) => {
  const { name, price, description } = req.body;
  try {
    const product = await Product.create({ name, price, description });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Get all products
exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};