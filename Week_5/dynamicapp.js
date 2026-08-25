const express = require('express');

const app = express();

const PORT = 3000;

// 1. Route Parameters
app.get('/user/:id', (req, res) => {
    const userId = req.params.id;

    res.send(`<h1>User Profile</h1><p>You are viewing the profile for User ID: <strong>${userId}</strong></p>`);
});

// 2. Multiple Route Parameters
app.get('/flights/:from/:to', (req, res) => {
    const { from, to } = req.params;

    res.send(`Searching for flights departing from <b>${from}</b> arriving at <b>${to}</b>.`);
});

// 3. Query Parameters
app.get('/search', (req, res) => {
    const category = req.query.category;
    const sort = req.query.sort;

    res.json({
        message: "Search Results",
        filteringBy: category || "None",
        sortingBy: sort || "Default"
    });
});

// Starting the Server
app.listen(PORT, () => {
    console.log(`Dynamic server running at http://localhost:${PORT}`);
});