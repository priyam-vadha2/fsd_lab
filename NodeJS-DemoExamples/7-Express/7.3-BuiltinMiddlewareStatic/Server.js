// server.js
// ---------------------------------------------
// Express App demonstrating express.static()
// for serving static files in different ways
// ---------------------------------------------

// Importing express module
const express = require('express');
const path = require('path'); // For handling directory paths

// Creating express app
const app = express();

// -----------------------------
// 1️⃣ Basic Static Setup
// -----------------------------
// Any file inside "public" can be accessed directly by its filename
// Example: http://localhost:3000/index.html or /styles.css
app.use(express.static('public'));

// -----------------------------
// 2️⃣ Serving Multiple Directories
// -----------------------------
// You can call express.static() multiple times to serve files
// from different folders. Files in earlier folders take priority.
app.use(express.static('assets'));
app.use(express.static('extra'));

// Now: 
// - http://localhost:3000/logo.png → from assets
// - http://localhost:3000/sample.html → from extra

// -----------------------------
// 3️⃣ Virtual Path Prefix
// -----------------------------
// Here, static files will be served under a "virtual" folder path
// Example: http://localhost:3000/static/about.html
// But the actual file is in "public/about.html"
app.use('/static', express.static('public'));

// -----------------------------
// 4️⃣ Absolute Path Prefix
// -----------------------------
// Sometimes, you may want to use an absolute directory path
// (especially when your app is hosted or running in a container)
const absolutePath = path.join(__dirname, 'assets');
app.use('/abs', express.static(absolutePath));

// Now files can be accessed like:
// http://localhost:3000/abs/logo.png

// -----------------------------
// Root Route (Optional)
// -----------------------------
// This route just sends a welcome message
app.get('/', (req, res) => {
  res.send(`
    <h2>Welcome to Express Static Demo!</h2>
    <p>Try accessing:</p>
    <ul>
      <li><a href="/index.html">/index.html</a> - Basic Setup</li>
      <li><a href="/logo.png">/logo.png</a> - Multiple Directories</li>
      <li><a href="/static/about.html">/static/about.html</a> - Virtual Path Prefix</li>
      <li><a href="/abs/logo.png">/abs/logo.png</a> - Absolute Path Prefix</li>
    </ul>
  `);
});

// -----------------------------
// Start the server
// -----------------------------
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  console.log('💡 Try visiting /index.html, /static/about.html, or /abs/logo.png');
});
