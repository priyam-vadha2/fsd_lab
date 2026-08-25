const express = require('express');

const app = express();

const PORT = 3000;

// Home Route
app.get('/', (req, res) => {
    res.send('<h1>Welcome SVECW!</h1><p>You have reached the Home Page.</p>');
});

// About Route
app.get('/about', (req, res) => {
    res.send('This server was built as a learning exercise for Express.js by SVECW AI Department.');
});

// Data (JSON) Route
app.get('/api/status', (req, res) => {
    res.json({
        active: true,
        version: "1.0.0",
        message: "The server is healthy and responding!"
    });
});

// Starting the Server
app.listen(PORT, () => {
    console.log(`Success! Server is running at http://localhost:${PORT}`);
    console.log('Press Ctrl+C to stop the server.');
});