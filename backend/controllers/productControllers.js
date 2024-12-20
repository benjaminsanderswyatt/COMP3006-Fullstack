const Product = require('../models/Product');

// Add a product
exports.addProduct = async (req, res) => {
  const { name, image, stock } = req.body;

  if (!name || !image || !stock){
    return res.status(400).json({
      success: false,
      message: 'All fields are required',
    });
  }

  try {
    const product = new Product({ name, image, stock });
    await product.save();

    res.status(201).json({
      success: true,
      message: 'Product added successfully',
      data: product,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: 'Error adding product',
      error: error.message,
    });


  }
};

// Get all of the products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully',
      data: products,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message,
    });
    
  }
}

// Get all products im selling
exports.getMyProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ message: 'Products fetched successfully', products });

  } catch (error) {
    res.status(500).json({ message: 'Error getting products', error});
    
  }
}

// Get products in my cart
exports.cartProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ message: 'Products fetched successfully', products });

  } catch (error) {
    res.status(500).json({ message: 'Error getting products', error});
    
  }
}