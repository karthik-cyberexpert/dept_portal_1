import { pool } from './server/db.js';

const testMarksQuery = async () => {
    const connection = await pool.getConnection();
    try {
        const sectionId = 1;
        const subjectCode = '322CSI01';
        const examType = 'ia1';

        console.log('=== TESTING MARKS QUERY ===\n');
        console.log('Params:', { sectionId, subjectCode, examType });

        // 1. Check subject
        console.log('\n1. Looking up subject...');
        const [subjects]: any = await connection.query('SELECT id, name, code FROM subjects WHERE code = ?', [subjectCode]);
        console.log('   Result:', subjects);
        if (subjects.length === 0) {
            console.log('   ❌ Subject NOT FOUND!');
            return;
        }
        const subjectId = subjects[0].id;
        console.log('   ✓ Subject ID:', subjectId);

        // 2. Check section
        console.log('\n2. Looking up section...');
        const [sections]: any = await connection.query('SELECT id, name, batch_id FROM sections WHERE id = ?', [sectionId]);
        console.log('   Result:', sections);
        if (sections.length === 0) {
            console.log('   ❌ Section NOT FOUND!');
            return;
        }
        const batchId = sections[0].batch_id;
        console.log('   ✓ Batch ID:', batchId);

        // 3. Check exam
        console.log('\n3. Looking up exam...');
        const [exams]: any = await connection.query(
            'SELECT id, name, exam_type FROM exams WHERE batch_id = ? AND name = ?', 
            [batchId, String(examType).toUpperCase()]
        );
        console.log('   Query: batch_id =', batchId, ', name =', String(examType).toUpperCase());
        console.log('   Result:', exams);
        
        let examId;
        if (exams.length > 0) {
            examId = exams[0].id;
            console.log('   ✓ Exam found, ID:', examId);
        } else {
            console.log('   ⚠ Exam not found, would create new one');
            // Try to create it
            const [ins]: any = await connection.query(
                "INSERT INTO exams (batch_id, semester, name, exam_type) VALUES (?, 1, ?, 'Internal')",
                [batchId, String(examType).toUpperCase()]
            );
            examId = ins.insertId;
            console.log('   ✓ Created exam ID:', examId);
        }

        // 4. Check students
        console.log('\n4. Looking up students in section...');
        const [students]: any = await connection.query(`
            SELECT u.id, u.name, sp.roll_number, sp.section_id
            FROM users u
            JOIN student_profiles sp ON u.id = sp.user_id
            WHERE sp.section_id = ? AND u.role = 'student'
        `, [sectionId]);
        console.log('   Students found:', students.length);
        if (students.length > 0) {
            console.log('   Sample:', students.slice(0, 3));
        }

        // 5. Try the full query
        console.log('\n5. Executing full marks query...');
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
        
        console.log('   ✓ Query succeeded! Rows:', rows.length);
        console.log('   Sample data:', rows.slice(0, 2));

    } catch (e: any) {
        console.error('\n❌ ERROR:', e.message);
        console.error('Stack:', e.stack);
    } finally {
        connection.release();
        process.exit(0);
    }
};

testMarksQuery();
