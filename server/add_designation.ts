import 'dotenv/config';
import { pool } from './db.js';

const migrate = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Adding designation column to faculty_profiles...');
    
    // Check if column exists first to avoid error? Or just try add
    try {
        await connection.query(`
            ALTER TABLE faculty_profiles 
            ADD COLUMN designation VARCHAR(100) AFTER department_id
        `);
        console.log('Added designation column.');
    } catch (e: any) {
        if (e.code === 'ER_DUP_FIELDNAME') {
            console.log('Column designation already exists.');
        } else {
            throw e;
        }
    }

    // Also ensure employee_id is there (it was in schema but maybe missed in some updates)
    try {
         await connection.query(`
            ALTER TABLE faculty_profiles
            ADD COLUMN employee_id VARCHAR(50) AFTER user_id
         `);
         console.log('Added employee_id column.');
    } catch (e: any) {
         if (e.code === 'ER_DUP_FIELDNAME') {
             console.log('Column employee_id already exists.');
         }
    }

    console.log('Migration complete.');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

migrate();
