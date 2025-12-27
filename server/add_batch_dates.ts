import { pool } from './db.js';

const migrate = async () => {
  const connection = await pool.getConnection();
  try {
    console.log('Adding semester dates to batches table...');
    
    // Check if columns exist
    const [columns]: any = await connection.query(`
        SELECT COLUMN_NAME 
        FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_SCHEMA = '${process.env.DB_NAME || 'Cyber_Dept_Portal'}' 
        AND TABLE_NAME = 'batches' 
        AND COLUMN_NAME IN ('semester_start_date', 'semester_end_date')
    `);

    if (columns.length === 0) {
        await connection.query(`
            ALTER TABLE batches 
            ADD COLUMN semester_start_date DATE,
            ADD COLUMN semester_end_date DATE
        `);
        console.log('Columns added successfully.');
    } else {
        console.log('Columns already exist.');
    }

  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    connection.release();
    process.exit();
  }
};

migrate();
