// server.js
// --------------------------------------------
// Simple Express + EJS demonstration app
// --------------------------------------------

// Import the required modules
const express = require("express");
const path = require("path");

// Create an Express application
const app = express();

// Set the view engine to EJS (Embedded JavaScript)
app.set("view engine", "ejs");

// Define the directory where EJS templates are stored
app.set("views", path.join(__dirname, "views"));

// Set the directory for static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, "public")));

// Sample data to demonstrate EJS rendering
const students = [
  { name: "Aarav", grade: "5th", favoriteSubject: "Mathematics" },
  { name: "Diya", grade: "5th", favoriteSubject: "Science" },
  { name: "Rohit", grade: "5th", favoriteSubject: "English" },
];

// --------------------------------------------
// Routes
// --------------------------------------------

// Root route (Home Page)
app.get("/", (req, res) => {
  // Render 'index.ejs' and send data to template
  res.render("index", { title: "Welcome to Our School", students });
});

// About route
app.get("/about", (req, res) => {
  res.render("about", { title: "About Our School" });
});

// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
