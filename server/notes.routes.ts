import express from 'express';
import { 
    getFacultyNotes, 
    getFacultySubjects, 
    createNoteWithFile, 
    deleteNote, 
    getNotesForSubject,
    incrementDownload 
} from './notes.controller.js';
import { authenticateToken } from './auth.middleware.js';
import { uploadNote } from './upload.config.js';

const router = express.Router();

// Faculty routes
router.get('/my-notes', authenticateToken, getFacultyNotes);
router.get('/my-subjects', authenticateToken, getFacultySubjects);
router.post('/', authenticateToken, uploadNote.single('file'), createNoteWithFile);
router.delete('/:id', authenticateToken, deleteNote);

// Public/Student routes
router.get('/subject/:subjectId', getNotesForSubject);
router.post('/:id/download', incrementDownload);

export default router;
