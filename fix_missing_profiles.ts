
import { pool } from './server/db.js';

const fix = async () => {
    try {
        const [users]: any = await pool.query('SELECT id, name, email FROM users WHERE role="faculty"');
        console.log(`Found ${users.length} faculty users.`);

        for (const u of users) {
            // Check if profile exists
            const [rows]: any = await pool.query('SELECT user_id FROM faculty_profiles WHERE user_id = ?', [u.id]);
            if (rows.length === 0) {
                console.log(`Creating profile for ${u.name} (${u.id})...`);
                // Insert default profile
                // Default Department ID = 1 (CSE) if fails
                try {
                     await pool.query(`
                        INSERT INTO faculty_profiles 
                        (user_id, employee_id, qualification, specialization, experience_years, joining_date, department_id, designation)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                    `, [
                        u.id, 
                        `EMP${String(u.id).padStart(3, '0')}`, 
                        'Ph.D', 
                        'Computer Science', 
                        5, 
                        new Date(), 
                        1, 
                        'Assistant Professor'
                    ]);
                } catch (e) {
                     console.error(`Failed for ${u.name}:`, e);
                }
            } else {
                console.log(`Profile exists for ${u.name}.`);
            }
        }
        console.log('Fix complete.');
    } catch (e) {
        console.error(e);
    }
    process.exit(0);
};

fix();
