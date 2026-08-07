// server.js
// Entry point for the demo Express app.
// Connects to local MongoDB and mounts student routes.

const express = require('express');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/students');

const app = express();

// Use JSON middleware so Express can parse JSON request bodies
app.use(express.json());

// MongoDB connection string (local)
const MONGO_URI = 'mongodb://localhost:27017/student_track_record';

// Connect to MongoDB using Mongoose
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('✅ Connected to MongoDB at:', MONGO_URI);
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1); // Exit if DB connection fails
  });

// Mount the student routes at /students
app.use('/students', studentRoutes);

// Basic health endpoint
app.get('/', (req, res) => {
  res.send({ message: 'Student Track Record API is running' });
});

// Generic error handler middleware
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Internal Server Error' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
