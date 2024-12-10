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


// Setup WebSocket
const server = http.createServer(app);

let io = socketIo(server, {
    cors: {
        origin: 'http://localhost:81', // Frontend URL
    },
});
//setupWebSocket(io);
webSockets(io);

app.get("/hello", function(request, response){
    response.send(functions.sayHello());
})


// Start Server
const PORT = process.env.PORT || 9000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));