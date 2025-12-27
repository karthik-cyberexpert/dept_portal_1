import { Request, Response } from 'express';
import { pool } from './db.js';

// Get Faculty Classes (Subjects & Sections)
export const getFacultyClasses = async (req: Request | any, res: Response) => {
    const userId = req.user?.id; // From authenticateToken
    
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const connection = await pool.getConnection();
    try {
        // Fetch allocations: Subject Name, Code, Section Name, Batch Name
        const [rows]: any = await connection.query(`
            SELECT 
                s.name as subjectName, 
                s.code as subjectCode,
                sec.id as sectionId,
                sec.name as sectionName,
                b.name as batchName
            FROM subject_allocations sa
            JOIN subjects s ON sa.subject_id = s.id
            JOIN sections sec ON sa.section_id = sec.id
            JOIN batches b ON sec.batch_id = b.id
            WHERE sa.faculty_id = ?
        `, [userId]);

        // Transform for frontend
        // We want a list of unique Subjects and unique Sections (or mapped)
        // actually existing UI selects Section then Subject.
        // Let's send the raw list or a structured object.
        res.json(rows);
    } catch (e: any) {
        console.error("Get Faculty Classes Error:", e);
        res.status(500).json({ message: 'Error fetching classes' });
    } finally {
        connection.release();
    }
};

// Get Marks for a Section, Subject, Exam
// Returns list of students in that section, with their marks if they exist
export const getMarks = async (req: Request, res: Response) => {
    const { sectionId, subjectCode, examType } = req.query;

    if (!sectionId || !subjectCode || !examType) {
        return res.status(400).json({ message: 'Missing required parameters: sectionId, subjectCode, examType' });
    }

    const connection = await pool.getConnection();
    try {
        // 1. Get Subject ID from Code (assuming unique code)
        const [subjects]: any = await connection.query('SELECT id FROM subjects WHERE code = ?', [subjectCode]);
        if (subjects.length === 0) {
            return res.status(404).json({ message: 'Subject not found' });
        }
        const subjectId = subjects[0].id;

        // 2. Get Exam ID (Create implicit exam entry if not exists for this batch/sem/type? Or assume it exists?)
        // For simplicity in this iteration, let's look up the exam or use a placeholder logic.
        // Actually, the frontend sends 'examType' like 'ia1'. We might need to map this to an `exams` table entry.
        // Or store `exam_type` string directly in marks? The schema has `exam_id` FK.
        // Let's Find or Create an Exam entry for this batch/semester/type.
        // We need Batch ID. Section implies Batch.
        const [sections]: any = await connection.query('SELECT batch_id FROM sections WHERE id = ?', [sectionId]);
        if (sections.length === 0) return res.status(404).json({ message: 'Section not found' });
        const batchId = sections[0].batch_id;

        // Check if Exam exists
        const [exams]: any = await connection.query(
            'SELECT id FROM exams WHERE batch_id = ? AND exam_type = ? LIMIT 1', 
            [batchId, examType] // e.g. 'Internal'
        );
        
        // If we strictly follow the schema, examType is Enum('Internal', 'Model'...). 
        // Frontend sends 'ia1', 'ia2'. These are names, not types.
        // Let's assume for now we resolve this. 
        // FAST PATH: Let's assume strict mapping for now.
        // If not found, create one?
        let examId;
        if (exams.length > 0) {
            examId = exams[0].id;
        } else {
            // Create default exam
            const [ins]: any = await connection.query(
                "INSERT INTO exams (batch_id, semester, name, exam_type) VALUES (?, 1, ?, 'Internal')",
                [batchId, String(examType).toUpperCase()]
            );
            examId = ins.insertId;
        }

        // 3. Fetch Students and Left Join Marks
        const [rows]: any = await connection.query(`
            SELECT 
                u.id, u.name, u.email, sp.roll_number as rollNumber,
                m.marks_obtained as currentMarks,
                m.breakdown,
                m.status as markStatus
            FROM users u
            JOIN student_profiles sp ON u.id = sp.user_id
            LEFT JOIN marks m ON m.student_id = u.id AND m.exam_id = ? AND m.subject_id = ?
            WHERE sp.section_id = ? AND u.role = 'student'
            ORDER BY sp.roll_number ASC
        `, [examId, subjectId, sectionId]);

        res.json(rows);

    } catch (e: any) {
        console.error("Get Marks Error:", e);
        res.status(500).json({ message: 'Error fetching marks' });
    } finally {
        connection.release();
    }
};

// Bulk Save Marks
export const saveMarks = async (req: Request, res: Response) => {
    const { sectionId, subjectCode, examType, marks } = req.body;
    // marks: [{ studentId, marks, maxMarks, breakdown, absent }]

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // 1. Resolve IDs (Subject, Exam) - Same logic as get
        const [subjects]: any = await connection.query('SELECT id FROM subjects WHERE code = ?', [subjectCode]);
        if (subjects.length === 0) throw new Error('Subject not found');
        const subjectId = subjects[0].id;

        const [sections]: any = await connection.query('SELECT batch_id FROM sections WHERE id = ?', [sectionId]);
        if (sections.length === 0) throw new Error('Section not found');
        const batchId = sections[0].batch_id;

        // Find/Create Exam
        let examId;
        const [exams]: any = await connection.query(
            'SELECT id FROM exams WHERE batch_id = ? AND name = ? LIMIT 1', 
            [batchId, String(examType).toUpperCase()]
        );
        if (exams.length > 0) {
            examId = exams[0].id;
        } else {
             const [ins]: any = await connection.query(
                "INSERT INTO exams (batch_id, semester, name, exam_type) VALUES (?, 1, ?, 'Internal')",
                [batchId, String(examType).toUpperCase()]
            );
            examId = ins.insertId;
        }

        // 2. Loop and Upsert
        for (const entry of marks) {
            // breakdown: { partA: [...], partB: [...], absent: true/false }
            const breakdownJson = JSON.stringify(entry.breakdown || {});
            
            // Check if exists
             const [existing]: any = await connection.query(
                'SELECT id FROM marks WHERE exam_id = ? AND student_id = ? AND subject_id = ?',
                [examId, entry.studentId, subjectId]
            );

            if (existing.length > 0) {
                await connection.query(
                    'UPDATE marks SET marks_obtained = ?, max_marks = ?, breakdown = ?, section_id = ?, updated_at = NOW() WHERE id = ?',
                    [entry.marks, entry.maxMarks, breakdownJson, sectionId, existing[0].id]
                );
            } else {
                await connection.query(
                    'INSERT INTO marks (exam_id, student_id, subject_id, section_id, marks_obtained, max_marks, breakdown) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    [examId, entry.studentId, subjectId, sectionId, entry.marks, entry.maxMarks, breakdownJson]
                );
            }
        }

        await connection.commit();
        res.json({ message: 'Marks saved successfully' });

    } catch (e: any) {
        await connection.rollback();
        console.error("Save Marks Error:", e);
        res.status(500).json({ message: 'Error saving marks' });
    } finally {
        connection.release();
    }
};
