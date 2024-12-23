const Product = require('../models/Product');

const setupWebSocket = (io) => {

    io.on('connection', (socket) => {
        console.log('Client connected');
      
          // Example: Emit stock updates every 5 seconds for testing
        setInterval(() => {
            const productId = "6769952ab1a87564a92e2ca5"; // Example product ID
            const newStock = Math.floor(Math.random() * 10); // Random stock value
            console.log(`Emitting stock update for product ${productId}: ${newStock}`);
            socket.emit(`stockUpdate${productId}`, newStock);
        }, 5000);


      });
};

module.exports = setupWebSocket;