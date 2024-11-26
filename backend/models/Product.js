const mongoose = require('mongoose');


// Create product schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
}, { timestamps: true });
  

module.exports = mongoose.model('Product', productSchema);