import express from 'express';
import Student from '../models/Student.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes require a valid JWT — only logged-in users can access
router.use(protect);

// GET /api/students — list all students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find().sort({ createdAt: -1 });
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /api/students/:id — get single student
router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ message: "Student not found" });
        res.status(200).json(student);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /api/students — create student (login required)
router.post('/', async (req, res) => {
    const { name, standard, city, department } = req.body;
    try {
        if (!name || !standard || !city || !department) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        const student = await Student.create({
            name: name.trim(),
            standard: standard.trim(),
            city: city.trim(),
            department: department.trim(),
        });
        res.status(201).json(student);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT /api/students/:id — update student (login required)
router.put('/:id', async (req, res) => {
    const { name, standard, city, department } = req.body;
    try {
        if (!name || !standard || !city || !department) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            {
                name: name.trim(),
                standard: standard.trim(),
                city: city.trim(),
                department: department.trim(),
            },
            { new: true, runValidators: true }
        );
        if (!student) return res.status(404).json({ message: "Student not found" });
        res.status(200).json(student);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE /api/students/:id — delete student (login required)
router.delete('/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) return res.status(404).json({ message: "Student not found" });
        res.status(200).json({ message: "Student deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
