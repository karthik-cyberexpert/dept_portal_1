
import { pool } from './server/db.js';

async function checkSchema() {
  try {
    console.log('Checking assignments table schema...');
    const [rows] = await pool.query('DESCRIBE assignments');
    console.log(rows);
    process.exit(0);
  } catch (error) {
    console.error('Error checking schema:', error);
    process.exit(1);
  }
}

checkSchema();
