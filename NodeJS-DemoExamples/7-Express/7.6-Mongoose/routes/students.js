// routes/students.js
// Express router that exposes CRUD endpoints for Student model.

const express = require('express');
const mongoose = require('mongoose');
const Student = require('../models/Student');

const router = express.Router();

// Helper: validate if id is a valid MongoDB ObjectId
function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

/**
 * POST /students
 * Create a new student document.
 * Expected JSON body: { name: "...", age: 12, className: "7th", section: "A", subjects: ["Math","Science"] }
 */
router.post('/', async (req, res, next) => {
  try {
    const { name, age, className, section, subjects } = req.body;

    // basic validation
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const student = new Student({
      name,
      age,
      className,
      section,
      subjects,
    });

    // save to MongoDB
    const saved = await student.save();
    // return created document with 201 status
    return res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /students
 * List students.
 * Supports optional query params:
 *  - ?limit=10
 *  - ?skip=0
 *  - ?search=prakash  (search by name, case-insensitive)
 */
router.get('/', async (req, res, next) => {
  try {
    const { limit = 50, skip = 0, search } = req.query;
    const query = {};

    // if search provided, use case-insensitive name match
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    // fetch matching documents
    const students = await Student.find(query)
      .sort({ createdAt: -1 })
      .skip(Number(skip))
      .limit(Number(limit));

    return res.json(students);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /students/:id
 * Get a single student by ObjectId
 */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid student id' });
    }

    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    return res.json(student);
  } catch (err) {
    next(err);
  }
});

/**
 * PUT /students/:id
 * Replace/update a student document (full replace is possible, but here we accept partial updates)
 * Expected JSON body: fields to update
 */
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid student id' });
    }

    // find and update - return the updated document
    const update = req.body;
    const options = { new: true, runValidators: true }; // new: return updated doc
    const updated = await Student.findByIdAndUpdate(id, update, options);

    if (!updated) {
      return res.status(404).json({ error: 'Student not found' });
    }

    return res.json(updated);
  } catch (err) {
    next(err);
  }
});

/**
 * DELETE /students/:id
 * Delete a student document by id
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid student id' });
    }

    const deleted = await Student.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // return deleted doc or a success message
    return res.json({ message: 'Student deleted', deleted });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
