const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const socketIo = require('socket.io');
const http = require('http');
const { setupWebSocket } = require('./websocket/setupWebSocket');

console.log('Setting up server.js');

console.log('Node Env: ' + process.env.NODE_ENV);

if (process.env.NODE_ENV !== 'test') {
    connectDB();
}

const app = express();
app.use(express.json());

// Cors config
const corsOptions = {
    origin: 'http://localhost:81', // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};
app.use(cors(corsOptions));

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);


// Setup WebSocket
const server = http.createServer(app);

let io = socketIo(server, {
    cors: {
        origin: 'http://localhost:81' // Frontend URL
    },
});
setupWebSocket(io);


if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 9000;
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;