const Product = require('../models/Product');

// Add a product
exports.addProduct = async (req, res) => {
  const { name, image, stock } = req.body;

  if (!name || !image || !stock){
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const product = new Product({ name, image, stock });
    await product.save();

    res.status(201).json({ message: 'Product added successfully', product });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding product', error });


  }
};

// Get all of the products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);

  } catch (error) {
    res.status(500).json({ message: 'Error getting products', error});
    
  }
}