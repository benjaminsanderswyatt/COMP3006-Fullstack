const { setupWebSocket, emitStockUpdate, emitRemoveUpdate } = require('../websocket/setupWebSocket');
const http = require('http');
const socketIoClient = require('socket.io-client');
const socketIo = require('socket.io');


describe('WebSocket Tests', () => {
  let server;
  let io;
  let clientSocket;


  beforeAll((done) => {
    // Create HTTP server
    server = http.createServer();
    io = socketIo(server);

    // Setup WebSocket server
    setupWebSocket(io);

    server.listen(() => {
      const port = server.address().port;

      // Connect the client socket
      clientSocket = socketIoClient(`http://localhost:${port}`);
      clientSocket.on('connect', done); // Wait for connection
    });
  });


  afterAll((done) => {
    // Cleanup the client and server
    if (clientSocket.connected) {
        clientSocket.disconnect();
    }

    server.close(done);
  });




  it('should emit stockUpdate event with correct data', (done) => {
    // Arrange: create productId and stock
    const productId = 'product123';
    const newStock = 10;

    // Act: Listen for stockUpdate event
    clientSocket.on(`stockUpdate${productId}`, (stock) => {

        // Assert: stock has changed to new value
        expect(stock).toBe(newStock); 
        done();

    });

    // Act: send stockUpdate for listen event
    emitStockUpdate(productId, newStock);
  });



  it('should emit removeUpdate event with productId', (done) => {
    // Arrange: create productId
    const productId = 'product456';

    // Act: Listen for removeUpdate event
    clientSocket.on('removeUpdate', (id) => {

        // Assert: the id matches
        expect(id).toBe(productId);
        done();

    });

    // Act: send removeUpdate for listen event
    emitRemoveUpdate(productId);
  });
});
