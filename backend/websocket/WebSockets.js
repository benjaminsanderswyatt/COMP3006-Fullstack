const Product = require('../models/Product');

const setupWebSocket = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected');

        // Send products to user
        Product.find().then(products => {
            socket.emit('initialProducts', products);
        });

        socket.on('updateStock', async ({productId, newStockCount}) => {
            try {
                const updatedProduct = await Product.findByIdAndUpdate(
                    productId,
                    {stock: newStockCount},
                    {new: true}
                );

                io.emit('productUpdated', updatedProduct);
            } catch (error) {
                console.log(error);
            }
        });

        socket.on('disconnect', () => {
            console.log('A user disconnected');
        })
    })
};

module.exports = setupWebSocket;