import { pool } from './db.js';

const fixSchema = async () => {
    const connection = await pool.getConnection();
    try {
        console.log("Checking Schema...");
        try {
            await connection.query("ALTER TABLE subjects ADD COLUMN department_id INT NOT NULL DEFAULT 1");
            console.log("Added department_id column.");
        } catch (e: any) {
            if (e.code === 'ER_DUP_FIELDNAME') {
                console.log("department_id already exists.");
            } else {
                console.error("Alter Error:", e);
            }
        }
    } catch (e: any) {
        console.error("Error:", e);
    } finally {
        connection.release();
        process.exit();
    }
};

fixSchema();
