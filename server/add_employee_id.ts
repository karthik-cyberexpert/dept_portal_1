
import { pool } from './db';

async function migrate() {
  const connection = await pool.getConnection();
  try {
    console.log('Adding employee_id column to faculty_profiles...');
    
    // Check if column exists first (simple check via try/catch on select or just try add)
    // We'll just try to add it.
    try {
        await connection.query(`
            ALTER TABLE faculty_profiles
            ADD COLUMN employee_id VARCHAR(50) UNIQUE AFTER department_id
        `);
        console.log('Success: employee_id column added.');
    } catch (err: any) {
        if (err.code === 'ER_DUP_FIELDNAME') {
            console.log('Info: employee_id column already exists.');
        } else {
            throw err;
        }
    }

  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    connection.release();
    process.exit();
  }
}

migrate();
