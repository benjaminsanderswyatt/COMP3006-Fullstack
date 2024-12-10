const Product = require('../models/Product');

const setupWebSocket = (io) => {
    io.on('connection', (socket) => {
        console.log('A client connected');

        // Emit stock number
        Product.find()
            .then((products) => {
                socket.emit('stockUpdate', products);
            })
            .catch((error) => {
                console.error('Error fetching products: ', error);
            });

        
        socket.on('addToBasket', async ({productId}) => {
            try {
                const product = await Product.findById(productId);

                if (product && product.stock > 0){
                    product.stock -= 1;
                    await product.save();

                    //Notify all clients
                    io.emit('stockUpdate', [product]);

                } else {
                    socket.emit('outOfStock', {productId});
                }
            } catch (error) {
                console.error('Error updating stock: ', error);
            }
        });

        // Handle disconnect
        socket.on('disconnect', () => {
            console.log('A client disconnected');
        });
    });
};

module.exports = setupWebSocket;