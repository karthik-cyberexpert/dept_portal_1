
import { pool } from './server/db.js';

const fixAdmin = async () => {
    try {
        // Find Admin user
        const [users]: any = await pool.query('SELECT id, name FROM users WHERE role="admin"');
        console.log(`Found ${users.length} admin users.`);

        for (const u of users) {
             const [rows]: any = await pool.query('SELECT user_id FROM faculty_profiles WHERE user_id = ?', [u.id]);
             if (rows.length === 0) {
                 console.log(`Creating dummy faculty profile for Admin ${u.name}...`);
                 await pool.query(`
                    INSERT INTO faculty_profiles 
                    (user_id, employee_id, qualification, specialization, experience_years, joining_date, department_id, designation)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                 `, [u.id, 'ADMIN001', 'N/A', 'Administration', 0, new Date(), 1, 'Administrator']);
                 console.log('Created.');
             } else {
                 console.log(`Admin ${u.name} already has a profile.`);
             }
        }
    } catch (e) {
        console.error(e);
    }
    process.exit(0);
};

fixAdmin();
