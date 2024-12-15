const mongoose = require('mongoose');
const User = require('./models/User'); // Assuming you have a User model

const mongoURI = process.env.MONGO_URI || 'mongodb://root:password@localhost:27017/database?authSource=admin';

const seedDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
    
    // Clear the database first (optional)
    await User.deleteMany({});

    // Insert mock data
    const user1 = new User({ name: 'John Doe', email: 'johndoe@example.com', age: 30 });
    const user2 = new User({ name: 'Jane Smith', email: 'janesmith@example.com', age: 28 });
    
    await user1.save();
    await user2.save();

    console.log('Database seeded');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDB();