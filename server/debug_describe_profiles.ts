import { pool } from './db.js';

const debug = async () => {
    const connection = await pool.getConnection();
    try {
        console.log("Describing student_profiles...");
        const [rows]: any = await connection.query("DESCRIBE student_profiles");
        console.log(rows);
    } catch (error) {
        console.error("FATAL:", error);
    } finally {
        connection.release();
        pool.end();
    }
};

debug();
