
import { pool } from './server/db.js';

const fixTutors = async () => {
    try {
        const [users]: any = await pool.query('SELECT id, name, email FROM users WHERE role="tutor"');
        console.log(`Found ${users.length} tutor users.`);

        for (const u of users) {
             const [rows]: any = await pool.query('SELECT user_id FROM faculty_profiles WHERE user_id = ?', [u.id]);
             if (rows.length === 0) {
                 console.log(`Creating profile for Tutor ${u.name} (${u.id})...`);
                 await pool.query(`
                    INSERT INTO faculty_profiles 
                    (user_id, employee_id, qualification, specialization, experience_years, joining_date, department_id, designation)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                 `, [u.id, `TUT${String(u.id).padStart(3, '0')}`, 'M.Tech', 'Teaching Assistant', 2, new Date(), 1, 'Tutor']);
                 console.log('Created.');
             } else {
                 console.log(`Profile exists for Tutor ${u.name}.`);
             }
        }
        console.log('Fix complete.');
    } catch (e) {
        console.error(e);
    }
    process.exit(0);
};

fixTutors();
