const mongoose = require('mongoose');

// Create product schema
const productSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    stock: { type: Number, required: true },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
