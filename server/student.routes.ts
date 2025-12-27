import express from 'express';
import { getStudents, createStudent, updateStudent, deleteStudent } from './student.controller.js';
import { authenticateToken } from './auth.middleware.js';

const router = express.Router();

// Public/Admin Routes
router.get('/', authenticateToken, getStudents); // Admin uses this
router.post('/', authenticateToken, createStudent);
router.put('/:id', authenticateToken, updateStudent);
router.delete('/:id', authenticateToken, deleteStudent);

// Student Self Routes
import { getStudentProfile, getStudentMarks } from './student.controller.js';
router.get('/profile', authenticateToken, getStudentProfile);
router.get('/marks', authenticateToken, getStudentMarks);

export default router;
