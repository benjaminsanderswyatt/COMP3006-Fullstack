const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const { protect } = require('./middleware/authJWT');
const socketIo = require('socket.io');
const http = require('http');
const setupWebSocket = require('./websocket/setupWebSocket');
const webSockets = require('./websocket/WebSockets');

console.log('Setting up server.js');


if (process.env.NODE_ENV === 'production'){
    console.log("connecting........");
    connectDB();
}


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

const testRoutes = require('./tests/integrationTests/testRoutes');
app.use('/', testRoutes);


// Setup WebSocket
const server = http.createServer(app);

let io = socketIo(server, {
    cors: {
        origin: 'http://localhost:81' // Frontend URL
    },
});
//setupWebSocket(io);
webSockets(io);


// Start Server
const PORT = process.env.PORT || 9000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = { app, server };