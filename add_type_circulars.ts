import { pool } from './server/db.js';

async function addTypeToCirculars() {
  try {
    console.log('Adding type column to circulars table...');
    
    // Check if column exists
    const [columns]: any = await pool.query(`
      SHOW COLUMNS FROM circulars LIKE 'type'
    `);
    
    if (columns.length === 0) {
      await pool.query(`
        ALTER TABLE circulars 
        ADD COLUMN type ENUM('Circular', 'Notice', 'Event', 'News') DEFAULT 'Notice' AFTER description
      `);
      console.log('✓ Type column added successfully');
    } else {
      console.log('Column already exists.');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

addTypeToCirculars();
