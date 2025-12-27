import { pool } from './server/db.js';

async function test() {
    try {
        console.log('Testing INSERT into exams...');
        const [result]: any = await pool.query(
            "INSERT INTO exams (batch_id, semester, name, exam_type) VALUES (2, 1, 'TEST_EXAM', 'Internal')"
        );
        console.log('SUCCESS! Insert ID:', result.insertId);
        
        // Now check
        const [exams]: any = await pool.query('SELECT * FROM exams');
        console.log('Exams now:', exams);
        
    } catch (e: any) {
        console.error('ERROR:', e.message);
        console.error('Code:', e.code);
    }
    process.exit(0);
}

test();
