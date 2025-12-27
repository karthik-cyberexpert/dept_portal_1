import express from 'express';
import { 
  getDashboardStats, 
  getAllFaculty,
  createFaculty,
  updateFaculty,
  deleteFaculty
} from './admin.controller.js';
import { authenticateToken } from './auth.middleware.js';

const router = express.Router();

router.get('/stats', authenticateToken, getDashboardStats);

router.get('/faculty', authenticateToken, getAllFaculty);
router.post('/faculty', authenticateToken, createFaculty);
router.put('/faculty/:id', authenticateToken, updateFaculty);
router.delete('/faculty/:id', authenticateToken, deleteFaculty);

export default router;
