const Product = require('../models/Product');

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new product
exports.addProduct = async (req, res) => {
  const {name , image, stock } = req.body;

  try {
    const newProduct = new Product({ name, image, stock});
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a product's stock
exports.updateProductStock = async (req, res) => {
  const { id } = req.params;
  const { stock } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { stock },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};








// Register User
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const user = await User.create({ username, email, password });
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};