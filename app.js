const express = require("express");

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/register", (req, res) => {
    const { name, email, age, course } = req.body;

    let errors = [];

    if (!name || name.trim() === "") {
        errors.push("Name is required");
    }

    if (!email || email.trim() === "") {
        errors.push("Email is required");
    }

    if (!age || age < 18) {
        errors.push("Age must be 18 or above");
    }

    if (!course || course === "") {
        errors.push("Please select a course");
    }

    if (errors.length > 0) {
        return res.render("result", {
            success: false,
            errors: errors
        });
    }

    res.render("result", {
        success: true,
        name: name,
        email: email,
        age: age,
        course: course
    });
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});