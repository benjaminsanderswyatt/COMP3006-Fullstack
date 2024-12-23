let io;

const setupWebSocket = (serverIo) => {
  io = serverIo;
  io.on('connection', (socket) => {
      console.log('Client connected');

    });
};

// Function to emit events
const emitStockUpdate = (productId, newStock) => {
  console.log("emit");
  if (io) {
    io.emit(`stockUpdate${productId}`, newStock);
    console.log("emitted");
  }
};

module.exports = {
  setupWebSocket,
  emitStockUpdate,
};