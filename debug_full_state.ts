
import { pool } from './server/db.js';

const debugFull = async () => {
    try {
        console.log('--- DEPARTMENTS ---');
        const [depts]: any = await pool.query('SELECT * FROM departments');
        console.table(depts);

        console.log('\n--- USERS ---');
        const [users]: any = await pool.query('SELECT id, name, email, role FROM users'); // List ALL users
        console.table(users);

        console.log('\n--- FACULTY PROFILES ---');
        const [profiles]: any = await pool.query('SELECT user_id, employee_id, designation, department_id FROM faculty_profiles');
        console.table(profiles);

        // Check for Users without Profiles who MIGHT be trying to access this
        console.log('\n--- MISMATCH CHECK ---');
        const userIds = users.map((u: any) => u.id);
        const profileUserIds = profiles.map((p: any) => p.user_id);
        
        const missing = users.filter((u: any) => !profileUserIds.includes(u.id));
        console.log('Users without Profile:', missing.map((u: any) => `${u.name} (${u.role})`));

    } catch (e) {
        console.error(e);
    }
    process.exit(0);
};

debugFull();
