# 🧩 Student Track Record API (Node.js + Express + MongoDB)

This is a **demo Node.js project** that demonstrates how to connect an Express.js server to a **locally installed MongoDB** database and perform **CRUD (Create, Read, Update, Delete)** operations using **Mongoose**.

The project connects to:

```
mongodb://localhost:27017/student_track_record
```

and uses the collection:

```
student_profile
```

---

## 🧠 Learning Objectives

By the end of this project, you’ll understand how to:

✅ Connect a Node.js app to a MongoDB database using Mongoose  
✅ Define and use a Mongoose model for structured data  
✅ Build REST API endpoints with Express.js  
✅ Test CRUD operations using Postman or curl  
✅ Handle errors and understand basic Express routing

---

## 🧰 Tech Stack

- **Node.js** – JavaScript runtime
- **Express.js** – Web framework for building APIs
- **MongoDB** – NoSQL database for storing student profiles
- **Mongoose** – ODM library for interacting with MongoDB

---

## ⚙️ Prerequisites

Before running this project, make sure the following are installed:

### 1️⃣ Node.js and npm

Download and install Node.js (includes npm) from:  
👉 [https://nodejs.org/](https://nodejs.org/)

To verify installation:

```bash
node -v
npm -v
```

---

### 2️⃣ MongoDB (Local Installation)

#### 📦 Step 1: Download MongoDB

Go to: [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)

Choose your OS (Windows/macOS/Linux) and download the **MongoDB Community Server**.

#### 🧭 Step 2: Install MongoDB

Follow the installation wizard — it will install:

- `mongod` (the database server)
- `mongo` or `mongosh` (the shell client)

#### 🏃 Step 3: Start MongoDB service

Once installed, start the MongoDB server:

**Windows (as a service):**

```bash
net start MongoDB
```

**macOS/Linux:**

```bash
sudo service mongod start
```

or manually:

```bash
mongod --dbpath /data/db
```

#### 🧩 Step 4: Verify MongoDB is running

Run:

```bash
mongosh
```

You should see a MongoDB shell prompt:

```
test>
```

Now your MongoDB server is active on:

```
mongodb://localhost:27017
```

---

## 📁 Project Setup

### Step 1: Clone or copy this project

Create a folder and copy the project files into it, e.g.:

```
student-track-record-demo/
│
├── server.js
├── package.json
├── routes/
│   └── students.js
└── models/
    └── Student.js
```

Also include this `README.md` in the same folder.

---

### Step 2: Install dependencies

Run the following command in your project root:

```bash
npm install
```

This will install:

- express
- mongoose
- nodemon (for development)

---

### Step 3: Start MongoDB

Ensure MongoDB is running locally before starting the app:
As part of installation on windows if installed as a service no additional steps required for windows

```bash
sudo service mongod start
```

---

### Step 4: Start the application

Use one of the following commands:

For development (auto-restart with nodemon):

```bash
npm run dev
```

For production:

```bash
npm start
```

You should see logs like:

```
✅ Connected to MongoDB at: mongodb://localhost:27017/student_track_record
🚀 Server listening on http://localhost:3000
```

---

## 🌐 API Endpoints

| Method   | Endpoint        | Description            |
| -------- | --------------- | ---------------------- |
| `POST`   | `/students`     | Create a new student   |
| `GET`    | `/students`     | Get all students       |
| `GET`    | `/students/:id` | Get a student by ID    |
| `PUT`    | `/students/:id` | Update student details |
| `DELETE` | `/students/:id` | Delete a student       |

---

## 🧪 Testing the API

You can test endpoints using **curl** or **Postman**.

### ▶️ Create a new student (from PowerShell)

Invoke-WebRequest -Uri "http://localhost:3000/students" `  -Method POST`
-Headers @{ "Content-Type" = "application/json" } `
-Body '{
"name": "Ravi Kumar",
"age": 15,
"className": "10th",
"section": "A",
"subjects": ["Math", "Science", "English"]
}'

### 📋 Get all students

http://localhost:3000/students

### 🔍 Get a single student

http://localhost:3000/students/<STUDENT_ID>

### ✏️ Update student details

Invoke-WebRequest -Uri "http://localhost:3000/students/<STUDENT_ID>" `  -Method PUT`
-Headers @{ "Content-Type" = "application/json" } `
-Body '{"section": "B", "age": 16}'

### ❌ Delete a student

Invoke-WebRequest -Uri "http://localhost:3000/students/<STUDENT_ID>" `
-Method DELETE

---

## 📖 Understanding the Project Structure

```
student-track-record-demo/
│
├── server.js              # Main entry point; connects MongoDB and starts Express
├── package.json           # Project dependencies and scripts
│
├── models/
│   └── Student.js         # Mongoose schema and model for student_profile collection
│
├── routes/
│   └── students.js        # Express router exposing CRUD endpoints
│
└── README.md              # You are here :)
```

---

## 🧩 Common Issues & Fixes

| Issue                                  | Possible Fix                                               |
| -------------------------------------- | ---------------------------------------------------------- |
| **MongoDB connection error**           | Ensure MongoDB is running on port 27017                    |
| **EADDRINUSE (Port already in use)**   | Change port in `server.js` or stop the conflicting process |
| **Cannot find module ‘mongoose’**      | Run `npm install` again                                    |
| **Network error / refused connection** | Check firewall or verify MongoDB is bound to localhost     |

---

## 🧭 Optional Enhancements

Students can extend this project by:

- Adding **form validation** (using `express-validator`)
- Adding **authentication** (JWT or sessions)
- Creating a **frontend** (React / HTML) to interact with the API
- Deploying the app on **Render**, **Vercel**, or **Heroku**

---

## 🏁 Conclusion

You’ve now built and run a complete Node.js + MongoDB API! 🎉  
This project gives a hands-on understanding of:

- How the backend connects to a database
- How REST APIs are structured
- How data flows from client → server → database → client

---

### 👨‍🏫 Author

**Created by:** [Pradeep Juluri]  
**Purpose:** Teaching students the fundamentals of Node.js, Express, and MongoDB CRUD operations.
