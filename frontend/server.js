const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 80;


// Serve static files from build directory
app.use(express.static(path.join(__dirname, 'build')));

// Handle React routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Frontend server is running on port ${PORT}`);
});
