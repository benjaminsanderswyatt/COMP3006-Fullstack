const mongoose = require('mongoose');



const connectDB = async () => {

  const mongoURI = process.env.MONGO_URI || 'mongodb://root:password@database:27017/database?authSource=admin';

  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }

};


module.exports = connectDB;