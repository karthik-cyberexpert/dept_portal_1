import { pool } from './db.js';

const checkRefs = async () => {
    try {
        console.log("Checking References...");
        const [users]: any = await pool.query('SELECT id, name, role FROM users WHERE id = 1');
        console.log('User 1:', users[0] || 'MISSING');

        const [sections]: any = await pool.query('SELECT id, name, batch_id FROM sections WHERE id = 1');
        console.log('Section 1:', sections[0] || 'MISSING');

        const [batches]: any = await pool.query('SELECT id, name FROM batches WHERE id = 1');
        console.log('Batch 1:', batches[0] || 'MISSING');

    } catch (e) {
        console.error(e);
    }
    process.exit(0);
};

checkRefs();
