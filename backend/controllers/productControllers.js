const Product = require('../models/Product');
const { emitStockUpdate, emitRemoveUpdate } = require('../websocket/setupWebSocket');

// ---------------------- Store ----------------------


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


// ---------------------- Cart ----------------------


// Get products in my cart
exports.cartProducts = async (req, res) => {
  try {
    const { productIds } = req.body;

    if (!productIds || !Array.isArray(productIds)){
      return res.status(400).json({
        success: false,
        message: 'Invalid input',
      });
    }

    const products = await Product.find({_id: { $in: productIds}}).select('_id name image price stock');

    res.status(200).json({
      success: true,
      message: 'Fetched cart successfully',
      data: products,
    });
    
  } catch (error) {
    
    res.status(500).json({
      success: false,
      message: 'Error fetching cart',
      error: error.message,
    });
  }
}


// Buy cart
exports.buyCart = async (req, res) => {
  const userId = req.user.id; // Would be used to charge customer

  const { cart } = req.body;

  if (!cart || !Array.isArray(cart) || cart.length === 0){
    return res.status(400).json({
      success: false,
      message: 'Cart must have items',
    });
  }


  const failedProducts = []; // Holds products which couldnt be bought
  const successfulProducts = []; // Holds successfully bought products
  let totalCost = 0; // Total cost of all products bought


  try {


    for (const productId of cart) {

      // Find the product
      const product = await Product.findById(productId);
      if (!product) {
        failedProducts.push({ _id: productId, name: "Product not found" }); // Add product id to the failed list if not found
        continue;
      }

      if (product.stock < 1) {
        failedProducts.push({ _id: product._id, name: product.name }); // Add product ID to the failed list if insufficient stock
        continue;
      }

      // Deduct stock by 1
      product.stock -= 1;
      await product.save();

      // Add cost to total
      totalCost += product.price;

      emitStockUpdate(product._id, product.stock);
      successfulProducts.push({ _id: product._id, name: product.name }); // Add product id to the successful list

    }


    
    res.status(200).json({
      success: true,
      message: 'Successfully bought products',
      data: {
        successful: successfulProducts,
        failed: failedProducts,
        cost: totalCost,
      }
    });
    

  } catch (error) {
    console.log(`Error Buying: ${error}`);

    res.status(500).json({
      success: false,
      message: 'Error buying products',
      error: error.message,
    });


  }
};



// ---------------------- My Products ----------------------


// Add a product
exports.addProduct = async (req, res) => {
  const userId = req.user.id;

  const { name, image, price, stock } = req.body;

  if (!name || !image || !price || !stock){
    return res.status(400).json({
      success: false,
      message: 'All fields are required',
    });
  }

  try {
    // Create product in db
    const product = new Product({ userId, name, image, price, stock });
    await product.save();


    res.status(201).json({
      success: true,
      message: 'Product added successfully',
      data: {
        _id: product._id,
        userId: product.userId,
        name: product.name,
        image: product.image,
        price: product.price,
        stock: product.stock,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: 'Error adding product',
      error: error.message,
    });


  }
};



// Get all products im selling
exports.getMyProducts = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get users products from db
    const products = await Product.find({ userId });

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



// Sets stock of product
exports.setStock = async (req, res) => {
  const userId = req.user.id;

  const { _id, stock } = req.body;

  if (!_id || !stock){
    return res.status(400).json({
      success: false,
      message: 'All fields are required',
    });
  }

  if (stock < 0) {
    return res.status(400).json({
      success: false,
      message: 'Stock must be between 0 - 999 inclusive',
    });
  }

  try {
    // Find product by its id
    const product = await Product.findById(_id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Update the stock
    product.stock = stock;
    await product.save();

    // Emit stock update event
    emitStockUpdate(product._id, product.stock);


    res.status(201).json({
      success: true,
      message: 'Successfully set stock'
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: 'Error changing stock',
      error: error.message,
    });


  }
};




// Remove a product
exports.removeProduct = async (req, res) => {
  const userId = req.user.id;

  const { _id } = req.body;

  if (!_id){
    return res.status(400).json({
      success: false,
      message: 'All fields are required',
    });
  }

  try {
    // Find product by its id
    await Product.findByIdAndDelete(_id);

    // Emit remove update event
    emitRemoveUpdate(_id);


    res.status(201).json({
      success: true,
      message: 'Successfully removed item'
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: 'Error removing item',
      error: error.message,
    });


  }
};