let io;

const setupWebSocket = (serverIo) => {
  io = serverIo;
  io.on('connection', (socket) => {
      console.log('Client connected');

    });
};

// Function to emit stock update
const emitStockUpdate = (productId, newStock) => {
  console.log("emit");
  if (io) {
    io.emit(`stockUpdate${productId}`, newStock);
    console.log("emitted");
  }
};


// Function to emit remove update
const emitRemoveUpdate = (productId) => {
  console.log("emit");
  if (io) {
    io.emit(`removeUpdate${productId}`);
    console.log("emitted");
  }
};





module.exports = {
  setupWebSocket,
  emitStockUpdate,
  emitRemoveUpdate,
};