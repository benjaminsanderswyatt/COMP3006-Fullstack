const setupWebSocket = (io) => {
    let connectedUsers = 0;

    io.on('connection', (socket) => {
        connectedUsers++;
        console.log(`User connected. Total users: ${connectedUsers}`);

        // Broadcast user count
        io.emit('userCount', connectedUsers);

        socket.on('disconnect', () => {
            connectedUsers--;
            console.log(`User disconnected. Total users: ${connectedUsers}`);

            // Broadcast user count
            io.emit('userCount', connectedUsers);
        });
    });
};

module.exports = setupWebSocket;