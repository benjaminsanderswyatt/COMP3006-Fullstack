let io;

const setupWebSocket = (serverIo) => {
  io = serverIo;
  io.on('connection', (socket) => {
      console.log('Client connected');

    });
};

// Function to emit stock update
const emitStockUpdate = (productId, newStock) => {
  if (io) {
    io.emit(`stockUpdate${productId}`, newStock);
  }
};


// Function to emit remove update
const emitRemoveUpdate = (productId) => {
  if (io) {
    io.emit(`removeUpdate`, productId);
  }
};





module.exports = {
  setupWebSocket,
  emitStockUpdate,
  emitRemoveUpdate,
};