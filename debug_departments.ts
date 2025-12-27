
import { pool } from './server/db.js';

const debugDepts = async () => {
    try {
        console.log('--- DEPARTMENTS ---');
        const [rows]: any = await pool.query('SELECT * FROM departments');
        console.table(rows);
    } catch (e) {
        console.error(e);
    }
    process.exit(0);
};

debugDepts();
