import { pool } from './server/db.js';

async function fixExamsTable() {
    const connection = await pool.getConnection();
    try {
        console.log('Fixing exams table schema...\n');

        // Add semester column
        try {
            await connection.query('ALTER TABLE exams ADD COLUMN semester INT NOT NULL DEFAULT 1 AFTER batch_id');
            console.log('✓ Added semester column');
        } catch (e: any) {
            if (e.code === 'ER_DUP_FIELDNAME') console.log('✓ semester column already exists');
            else throw e;
        }

        // Add exam_type column
        try {
            await connection.query("ALTER TABLE exams ADD COLUMN exam_type ENUM('Internal', 'Model', 'Semester', 'Assignment') DEFAULT 'Internal' AFTER name");
            console.log('✓ Added exam_type column');
        } catch (e: any) {
            if (e.code === 'ER_DUP_FIELDNAME') console.log('✓ exam_type column already exists');
            else throw e;
        }

        // Add start_date column
        try {
            await connection.query('ALTER TABLE exams ADD COLUMN start_date DATE');
            console.log('✓ Added start_date column');
        } catch (e: any) {
            if (e.code === 'ER_DUP_FIELDNAME') console.log('✓ start_date column already exists');
            else throw e;
        }

        // Add end_date column
        try {
            await connection.query('ALTER TABLE exams ADD COLUMN end_date DATE');
            console.log('✓ Added end_date column');
        } catch (e: any) {
            if (e.code === 'ER_DUP_FIELDNAME') console.log('✓ end_date column already exists');
            else throw e;
        }

        // Verify the table
        console.log('\nVerifying exams table structure:');
        const [cols]: any = await connection.query('DESCRIBE exams');
        console.log('Columns:', cols.map((c: any) => c.Field).join(', '));

        console.log('\n✓ Exams table fixed successfully!');

    } catch (e: any) {
        console.error('ERROR:', e.message);
    } finally {
        connection.release();
        process.exit(0);
    }
}

fixExamsTable();
