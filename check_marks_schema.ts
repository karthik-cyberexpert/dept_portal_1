import { pool } from './server/db.js';

const checkMarksSchema = async () => {
    const connection = await pool.getConnection();
    try {
        console.log('=== CHECKING MARKS SCHEMA ===\n');
        
        // Check exams table
        console.log('1. EXAMS TABLE:');
        try {
            const [exams]: any = await connection.query('DESCRIBE exams');
            console.log('Columns:', exams.map((r: any) => r.Field).join(', '));
        } catch (e: any) {
            console.error('EXAMS TABLE ERROR:', e.message);
        }

        // Check marks table
        console.log('\n2. MARKS TABLE:');
        try {
            const [marks]: any = await connection.query('DESCRIBE marks');
            console.log('Columns:', marks.map((r: any) => r.Field).join(', '));
        } catch (e: any) {
            console.error('MARKS TABLE ERROR:', e.message);
        }

        // Check sections table
        console.log('\n3. SECTIONS TABLE:');
        try {
            const [sections]: any = await connection.query('SELECT * FROM sections LIMIT 5');
            console.log('Sample sections:', sections);
        } catch (e: any) {
            console.error('SECTIONS TABLE ERROR:', e.message);
        }

        // Check subjects table
        console.log('\n4. SUBJECTS TABLE:');
        try {
            const [subjects]: any = await connection.query("SELECT * FROM subjects WHERE code = '322CSI01'");
            console.log('Subject 322CSI01:', subjects);
        } catch (e: any) {
            console.error('SUBJECTS TABLE ERROR:', e.message);
        }

        // Check student_profiles table
        console.log('\n5. STUDENT_PROFILES TABLE:');
        try {
            const [profiles]: any = await connection.query('DESCRIBE student_profiles');
            console.log('Columns:', profiles.map((r: any) => r.Field).join(', '));
        } catch (e: any) {
            console.error('STUDENT_PROFILES TABLE ERROR:', e.message);
        }

        // Check if student_profiles has section_id column
        console.log('\n6. STUDENT_PROFILES SECTION_ID CHECK:');
        try {
            const [result]: any = await connection.query("SELECT COUNT(*) as cnt FROM student_profiles WHERE section_id IS NOT NULL");
            console.log('Students with section_id:', result[0].cnt);
        } catch (e: any) {
            console.error('SECTION_ID CHECK ERROR:', e.message);
        }

    } catch (e) {
        console.error('Global Error:', e);
    } finally {
        connection.release();
        process.exit(0);
    }
};

checkMarksSchema();
