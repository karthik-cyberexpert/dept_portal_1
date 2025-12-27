
import { pool } from './db.js';

async function fixSchema() {
  try {
    const connection = await pool.getConnection();
    console.log('Connected to DB');

    try {
      // Add specialization if missing
      console.log('Adding specialization...');
      try {
        await connection.query(`
            ALTER TABLE faculty_profiles 
            ADD COLUMN specialization VARCHAR(255)
        `);
        console.log('Added specialization.');
      } catch (err: any) {
        if (err.code === 'ER_DUP_FIELDNAME') {
            console.log('specialization already exists.');
        } else {
            console.error('Error adding specialization:', err);
        }
      }

      // Add experience_years if missing
      console.log('Adding experience_years...');
      try {
        await connection.query(`
            ALTER TABLE faculty_profiles 
            ADD COLUMN experience_years INT DEFAULT 0
        `);
        console.log('Added experience_years.');
      } catch (err: any) {
        if (err.code === 'ER_DUP_FIELDNAME') {
            console.log('experience_years already exists.');
        } else {
            console.error('Error adding experience_years:', err);
        }
      }

    } catch (err) {
      console.error('Schema fix error:', err);
    } finally {
      connection.release();
      process.exit(0);
    }
  } catch (error) {
    console.error('Connection failed:', error);
    process.exit(1);
  }
}

fixSchema();
