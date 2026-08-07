/**
 * 🌐 Simple Server.js Server Demonstration
 * -----------------------------------------
 * This server demonstrates:
 * ✅ Routes
 * ✅ HTTP Methods (GET, POST, PUT, DELETE)
 * ✅ Path Variables (Route Params)
 * ✅ Query Parameters
 * ✅ JSON Request Body Parsing
 * ✅ Building JSON Responses
 *
 * Author: [Your Name]
 * Date: [YYYY-MM-DD]
 */

const express = require('express');
const app = express();

// ------------------------------------------------------------
// 🧩 MIDDLEWARE - used to parse incoming JSON data in requests
// ------------------------------------------------------------
app.use(express.json()); // allows reading req.body as JSON

// ------------------------------------------------------------
// 🏠 Basic Route - GET method
// ------------------------------------------------------------
app.get('/', (req, res) => {
  res.send('🎉 Welcome to the Express.js Demo Server!');
});

// ------------------------------------------------------------
// 📖 Example: GET route with Query Parameters
// ------------------------------------------------------------
// URL example: http://localhost:3000/greet?name=Mounika&lang=telugu
app.get('/greet', (req, res) => {
  // req.query holds key-value pairs of query params
  const name = req.query.name || 'Guest';
  const lang = req.query.lang || 'English';

  let message;
  switch (lang.toLowerCase()) {
    case 'telugu':
      message = `👋 Namaskaram ${name}!`;
      break;
    case 'hindi':
      message = `🙏 Namaste ${name}!`;
      break;
    default:
      message = `Hello ${name}! 👋`;
  }

  // Sending a JSON response
  res.json({
    success: true,
    greeting: message,
    language: lang,
  });
});

// ------------------------------------------------------------
// 🧍 Example: GET route with Path Variable (Route Params)
// ------------------------------------------------------------
// URL example: http://localhost:3000/users/10
app.get('/users/:id', (req, res) => {
  // req.params captures path variables
  const userId = req.params.id;
  console.log(`URL to fetch the user details from req is ${req.url}`);
  res.json({
    success: true,
    message: `Fetched details for user ID: ${userId}`,
    user: {
      id: userId,
      name: 'Mahi',
      role: 'Student',
    },
  });
});

// ------------------------------------------------------------
// ➕ Example: POST route - Creating data (Request JSON Parsing)
// ------------------------------------------------------------
// URL example: POST http://localhost:3000/users
// Body Example:
// {
//   "name": "Mahi",
//   "email": "mahi@example.com"
// }
app.post('/users', (req, res) => {
  // req.body contains JSON data from client
  // Using object destructuring to extract 'name' and 'email' from the request body (req.body)
  const { name, email } = req.body;

  res.status(201).json({
    success: true,
    message: 'User created successfully!',
    user: {
      id: Math.floor(Math.random() * 1000),
      name,
      email,
    },
  });
});

// ------------------------------------------------------------
// ✏️ Example: PUT route - Updating existing data
// ------------------------------------------------------------
// URL example: PUT http://localhost:3000/users/5
// Body Example:
// {
//   "name": "Updated Name"
// }
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const { name } = req.body;

  res.json({
    success: true,
    message: `User with ID ${userId} updated successfully.`,
    updatedUser: {
      id: userId,
      name: name || 'Unknown',
    },
  });
});

// ------------------------------------------------------------
// ❌ Example: DELETE route - Removing data
// ------------------------------------------------------------
// URL example: DELETE http://localhost:3000/users/5
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;

  res.json({
    success: true,
    message: `User with ID ${userId} deleted successfully.`,
  });
});

// ------------------------------------------------------------
// 🚀 Starting the Express Server
// ------------------------------------------------------------
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at: http://localhost:${PORT}`);
  console.log(`Try opening: http://localhost:${PORT}/greet?name=John&lang=english`);
});
