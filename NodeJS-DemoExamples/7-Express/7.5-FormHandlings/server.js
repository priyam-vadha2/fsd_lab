// server.js
// -------------------------------------------------
// Express + EJS + CRUD Form Demo for Students
// -------------------------------------------------

const express = require("express");
const path = require("path");
const app = express();

// Middleware to parse form data (for POST/PUT requests)
app.use(express.urlencoded({ extended: true }));

// Set view engine and static files
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Sample student data (mocked in-memory array)
let students = [
  { id: 1, name: "Aarav Sharma", grade: "5th", favoriteSubject: "Maths" },
  { id: 2, name: "Diya Patel", grade: "5th", favoriteSubject: "Science" },
  { id: 3, name: "Rohan Das", grade: "5th", favoriteSubject: "English" },
];

// -----------------------------------------------
// ROUTES
// -----------------------------------------------

// Home Page
app.get("/", (req, res) => {
  res.render("index", { title: "Welcome to Little Stars School" });
});

// List Students (GET)
app.get("/students", (req, res) => {
  res.render("students/list", { title: "Student List", students });
});

// Add Student Form (GET)
app.get("/students/add", (req, res) => {
  res.render("students/add", { title: "Add Student", error: null });
});

// Add Student (POST)
app.post("/students/add", (req, res) => {
  const { name, grade, favoriteSubject } = req.body;

  // Simple validation
  if (!name || !grade || !favoriteSubject) {
    return res.render("students/add", {
      title: "Add Student",
      error: "⚠️ All fields are required!",
    });
  }

  // Create new student object
  const newStudent = {
    id: students.length + 1,
    name,
    grade,
    favoriteSubject,
  };

  // Push to array
  students.push(newStudent);

  // Redirect back to student list
  res.redirect("/students");
});

// Edit Student Form (GET)
app.get("/students/edit/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find((s) => s.id === id);
  if (!student) return res.status(404).send("Student not found");

  res.render("students/edit", { title: "Edit Student", student, error: null });
});

// Update Student (PUT simulation using POST for HTML form)
app.post("/students/edit/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, grade, favoriteSubject } = req.body;

  if (!name || !grade || !favoriteSubject) {
    const student = students.find((s) => s.id === id);
    return res.render("students/edit", {
      title: "Edit Student",
      student,
      error: "⚠️ All fields are required!",
    });
  }

  const studentIndex = students.findIndex((s) => s.id === id);
  if (studentIndex === -1) return res.status(404).send("Student not found");

  students[studentIndex] = { id, name, grade, favoriteSubject };
  res.redirect("/students");
});

// Delete Student (DELETE simulation using GET link)
app.get("/students/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  students = students.filter((s) => s.id !== id);
  res.redirect("/students");
});

// About Page
app.get("/about", (req, res) => {
  res.render("about", { title: "About Our School" });
});

// -------------------------------------------------
// Start the Server
// -------------------------------------------------
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
