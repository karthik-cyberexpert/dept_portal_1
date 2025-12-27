import { Request, Response } from 'express';
import { pool } from './db.js';

// Get Faculty Profile
export const getFacultyProfile = async (req: Request | any, res: Response) => {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    try {
        // 1. Fetch Basic Info & Profile
        const [rows]: any = await pool.query(`
            SELECT 
                u.id, u.name, u.email, u.phone, u.avatar_url as avatar,
                fp.qualification,
                fp.specialization,
                fp.experience_years as experience,
                fp.joining_date as dateOfJoining,
                fp.employment_type as employmentType,
                fp.current_status as status,
                fp.cabin_location as office,
                d.name as department,
                u.address -- Assuming address is in users
            FROM users u
            LEFT JOIN faculty_profiles fp ON u.id = fp.user_id
            LEFT JOIN departments d ON fp.department_id = d.id
            WHERE u.id = ?
        `, [userId]);

        if (rows.length === 0) return res.status(404).json({ message: 'Profile not found' });
        const profile = rows[0];

        // 2. Fetch Education (Mock for now or if in JSON/separate table)
        // For now, we'll return a static list if DB table doesn't exist, or simple split if in string
        profile.education = [
            { degree: profile.qualification || 'PhD', institution: 'University', year: '2015' } 
        ];

        // 3. Fetch Subject Allocations (What they teach)
        const [allocations]: any = await pool.query(`
            SELECT 
                s.name as subject,
                s.code as subjectCode,
                sec.name as section,
                b.name as batch
            FROM subject_allocations sa
            JOIN subjects s ON sa.subject_id = s.id
            JOIN sections sec ON sa.section_id = sec.id
            JOIN batches b ON sec.batch_id = b.id
            WHERE sa.faculty_id = ?
        `, [userId]);
        
        profile.allocations = allocations;

        res.json(profile);
    } catch (error) {
        console.error('Get Faculty Profile Error:', error);
        res.status(500).json({ message: 'Error fetching profile' });
    }
};

// Get Faculty Timetable
export const getFacultyTimetable = async (req: Request | any, res: Response) => {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const [slots]: any = await pool.query(`
            SELECT 
                ts.day_of_week as day,
                ts.period_number as period,
                ts.room_number as room,
                ts.start_time as startTime,
                ts.end_time as endTime,
                s.name as subject,
                s.code as subjectCode,
                sec.name as section,
                b.name as batch
            FROM timetable_slots ts
            JOIN subject_allocations sa ON ts.subject_allocation_id = sa.id
            JOIN subjects s ON sa.subject_id = s.id
            JOIN sections sec ON sa.section_id = sec.id
            JOIN batches b ON sec.batch_id = b.id
            WHERE sa.faculty_id = ?
            ORDER BY FIELD(day_of_week, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'), ts.period_number
        `, [userId]);

        res.json(slots);
    } catch (error) {
        console.error('Get Faculty Timetable Error:', error);
        res.status(500).json({ message: 'Error fetching timetable' });
    }
};
