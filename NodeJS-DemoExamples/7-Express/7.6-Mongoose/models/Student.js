// models/Student.js
// Defines the Mongoose schema for documents stored in the student_profile collection.

const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the student schema.
// You can extend the fields as needed for your application.
const studentSchema = new Schema({
  // student's full name
  name: { type: String, required: true, trim: true },

  // student's age (optional)
  age: { type: Number, min: 1 },

  // class/grade, e.g., "10th"
  className: { type: String },

  // section, e.g., "A"
  section: { type: String },

  // subjects as an array of strings
  subjects: [{ type: String }],

  // timestamps will add createdAt and updatedAt fields automatically
}, { collection: 'student_profile', timestamps: true });

// Export the model (Mongoose will use 'student_profile' collection)
module.exports = mongoose.model('Student', studentSchema);
