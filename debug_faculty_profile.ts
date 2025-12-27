
import { pool } from './server/db.js';

const debug = async () => {
    try {
        const [users]: any = await pool.query('SELECT id, name, email, role FROM users WHERE role="faculty"');
        console.log('--- USERS (Faculty) ---');
        console.table(users);

        const [profiles]: any = await pool.query('SELECT * FROM faculty_profiles');
        console.log('--- FACULTY PROFILES ---');
        console.table(profiles);

        // Check if current user (let's say ID 1 or the one from token) exists
        // Since we don't know the exact ID, we print all.
    } catch (e) {
        console.error(e);
    }
    process.exit(0);
};

debug();
