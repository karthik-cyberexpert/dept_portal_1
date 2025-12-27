import { pool } from './db.js';

const migrate = async () => {
    const connection = await pool.getConnection();
    try {
        console.log("Dropping name column from student_profiles...");
        try {
            await connection.query("ALTER TABLE student_profiles DROP COLUMN name");
            console.log("Success: Dropped 'name' column.");
        } catch (e: any) {
             console.log("Migration Warning/Error:", e.message);
        }
    } catch (e: any) {
        console.error("Fatal Error:", e);
    } finally {
        connection.release();
        process.exit();
    }
};

migrate();
