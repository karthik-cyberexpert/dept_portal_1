
import { pool } from './server/db.js';

const listUsers = async () => {
    try {
        console.log('--- VALID USERS ---');
        const [users]: any = await pool.query('SELECT id, name, email, role FROM users');
        console.table(users);
    } catch (e) {
        console.error(e);
    }
    process.exit(0);
};

listUsers();
