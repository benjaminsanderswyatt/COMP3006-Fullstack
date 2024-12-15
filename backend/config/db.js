const mongoose = require('mongoose');



const connectDB = async () => {
  if (process.env.NODE_ENV == production){
    const mongoURI = process.env.MONGO_URI || 'mongodb://root:password@database:27017/database?authSource=admin';

    try {
      await mongoose.connect(mongoURI);
      console.log('MongoDB connected');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error.message);
      process.exit(1);
    }
  }
};


module.exports = connectDB;