const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const { protect } = require('./middleware/authJWT');

console.log('Start of server.js');

connectDB();

const app = express();
app.use(express.json());

// Cors config
const corsOptions = {
    origin: 'http://localhost:81', // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};
app.use(cors(corsOptions));

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));