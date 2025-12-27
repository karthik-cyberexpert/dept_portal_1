import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './db.js';
import { authenticateToken } from './auth.middleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3007;

import authRoutes from './auth.routes.js';
import adminRoutes from './admin.routes.js';
import academicRoutes from './academic.routes.js';
import studentRoutes from './student.routes.js';

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/academic', academicRoutes);
app.use('/api/students', studentRoutes);
import tutorRoutes from './tutor.routes.js';
app.use('/api/tutors', tutorRoutes);

import facultyRoutes from './faculty.routes.js';
app.use('/api/faculty', facultyRoutes);

// Health Check
app.get('/api/health', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    connection.release();
    res.json({ status: 'ok', database: 'connected' });
  } catch (error: any) {
    console.error('Database Connection Error:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

import * as marksController from './marks.controller.js';

// Marks Routes
app.get('/api/faculty/classes', authenticateToken, marksController.getFacultyClasses);
app.get('/api/faculty/marks', authenticateToken, marksController.getMarks);
app.post('/api/faculty/marks', authenticateToken, marksController.saveMarks);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
