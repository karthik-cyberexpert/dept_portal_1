
import { pool } from './server/db.js';

async function addSectionToCirculars() {
  try {
    console.log('Checking circulars table schema...');
    
    const [columns]: any = await pool.query(`
      SHOW COLUMNS FROM circulars LIKE 'target_section_id'
    `);
    
    if (columns.length === 0) {
      console.log('Adding target_section_id to circulars...');
      await pool.query(`
        ALTER TABLE circulars 
        ADD COLUMN target_section_id INT AFTER target_batch_id,
        ADD FOREIGN KEY (target_section_id) REFERENCES sections(id) ON DELETE SET NULL
      `);
      console.log('✓ Column added successfully');
    } else {
      console.log('Column already exists.');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error modifying table:', error);
    process.exit(1);
  }
}

addSectionToCirculars();
