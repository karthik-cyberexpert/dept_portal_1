import { pool } from './db.js';

const migrate = async () => {
    const connection = await pool.getConnection();
    try {
        console.log("Modifying student_profiles table...");
        
        // Try modifying admission_date to allow NULL
        // We will assume it is a DATE type.
        try {
             await connection.query("ALTER TABLE student_profiles MODIFY COLUMN admission_date DATE NULL");
             console.log("Success: admission_date now allows NULL.");
        } catch (e: any) {
             console.log("Migration Failed:", e.message);
        }
    } catch (e: any) {
        console.error("Fatal Error:", e);
    } finally {
        connection.release();
        process.exit();
    }
};

migrate();
