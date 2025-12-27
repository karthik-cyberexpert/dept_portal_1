import express from 'express';
import { getFacultyProfile, getFacultyTimetable } from './faculty.controller.js';
import { authenticateToken } from './auth.middleware.js';

const router = express.Router();

router.get('/profile', authenticateToken, getFacultyProfile);
router.get('/timetable', authenticateToken, getFacultyTimetable);

export default router;
