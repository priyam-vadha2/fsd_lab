# 🚀 Getting Started with Express.js

A step-by-step guide to set up your first **Express.js** web application — from installing prerequisites to creating a simple **"Hello World"** server.

---

## 📦 1. Prerequisites

Before starting, make sure you have the following installed on your system:

| Tool                                                 | Description                               | Check Command |
| ---------------------------------------------------- | ----------------------------------------- | ------------- |
| [Node.js](https://nodejs.org/)                       | JavaScript runtime environment            | `node -v`     |
| [npm](https://www.npmjs.com/)                        | Node Package Manager (comes with Node.js) | `npm -v`      |
| (Optional) [VS Code](https://code.visualstudio.com/) | Recommended code editor                   | —             |

> ✅ **Tip:** You can install both Node.js and npm together from the [official Node.js website](https://nodejs.org/en/download).

---

## 📁 2. Setting Up a New Project

Open your terminal and create a new project folder:

```bash
# Create a new directory
mkdir express-hello-world

# Navigate into the directory
cd express-hello-world
```

Initialize your Node.js project:

```bash
npm init -y
```

This command creates a `package.json` file with default values — a manifest file for your project.

---

## ⚙️ 3. Installing Express.js

Now, install **Express** (the web framework for Node.js):

```bash
npm install express
```

After installation, your `package.json` will automatically include express under `dependencies`.

---

## 🧠 4. Creating the "Hello World" Application

Inside your project folder, create a file named **`index.js`**:

```bash
touch index.js
```

Open `index.js` in your editor and add the following code:

```javascript
// Load the Express module
const express = require("express");

// Create an Express application
const app = express();

// Define a route for the root URL
app.get("/", (req, res) => {
  res.send("Hello World from Express.js! 🚀");
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
```

---

## ▶️ 5. Running the Application

Run the following command in your terminal:

```bash
node index.js
```

You should see:

```
✅ Server is running at http://localhost:3000
```

Now open your browser and go to:

👉 **http://localhost:3000**

You’ll see the message:

> **Hello World from Express.js! 🚀**

---

## 🔁 6. Adding Auto-Restart (Optional)

During development, you can use **nodemon** to automatically restart the server whenever you save changes.

Install nodemon as a dev dependency:

```bash
npm install --save-dev nodemon
```

Update the `scripts` section in your `package.json`:

```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```

Now, run your app with:

```bash
npm run dev
```

Your server will automatically reload on file changes — perfect for development!

---

## 📜 7. Project Structure

After setup, your folder should look like this:

```
express-hello-world/
├── node_modules/
├── package.json
├── package-lock.json
└── index.js
```

---

## 💡 8. Common Commands Reference

| Command                   | Description                                       |
| ------------------------- | ------------------------------------------------- |
| `npm install`             | Install all dependencies listed in `package.json` |
| `npm start`               | Run your app (uses Node.js)                       |
| `npm run dev`             | Run app with auto-reload (uses nodemon)           |
| `npm list`                | View installed packages                           |
| `npm uninstall <package>` | Remove a package                                  |

---

## 🎯 9. Summary

✅ You learned how to:

- Install Node.js and npm
- Initialize a new Node project
- Install and use Express.js
- Create and run a “Hello World” web server
- Add auto-reload with nodemon

Your first Express.js app is ready to go! 🚀

---

## 🧩 Bonus: Try Expanding!

Once you’re comfortable, try:

- Adding more routes like `/about` or `/contact`
- Returning JSON data with `res.json({ message: "Hello JSON!" })`
- Using middleware such as `express.json()` for handling POST requests

---

> Made for students learning **Node.js + Express.js fundamentals** ❤️  
> Instructor: Pradeep Juluri (JP)
