
import { pool } from './server/db.js';

async function fixAssignmentsTable() {
  try {
    console.log('Checking for attachment_url column...');
    
    // Check if column exists
    const [columns]: any = await pool.query(`
      SHOW COLUMNS FROM assignments LIKE 'attachment_url'
    `);
    
    if (columns.length === 0) {
      console.log('Column missing. Adding attachment_url...');
      await pool.query(`
        ALTER TABLE assignments 
        ADD COLUMN attachment_url VARCHAR(500) AFTER max_score
      `);
      console.log('✓ Column added successfully');
    } else {
      console.log('Column already exists.');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error fixing table:', error);
    process.exit(1);
  }
}

fixAssignmentsTable();
