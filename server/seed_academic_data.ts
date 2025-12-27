import { pool } from './db.js';
import dotenv from 'dotenv';
dotenv.config();

const seed = async () => {
    const connection = await pool.getConnection();
    try {
        console.log("Seeding Academic Data...");
        
        // 1. Ensure Academic Year exists (ID 1)
        const [years]: any = await connection.query('SELECT * FROM academic_years WHERE id = 1');
        if (years.length === 0) {
            console.log("Inserting Academic Year 2024-2025...");
            await connection.query("INSERT INTO academic_years (id, year_range, is_active) VALUES (1, '2024-2025', TRUE)");
        } else {
            console.log("Academic Year exists.");
        }

        // 2. Ensure a Test Subject exists (Code: SUB101) for testing
        const [subjects]: any = await connection.query("SELECT * FROM subjects WHERE code = 'SUB101'");
        if (subjects.length === 0) {
            console.log("Inserting Test Subject SUB101...");
            // Need department_id 1
            await connection.query("INSERT INTO subjects (department_id, name, code, semester, credits, type) VALUES (1, 'Mathematics I', 'SUB101', 1, 4, 'theory')");
        } else {
            console.log("Test Subject SUB101 exists.");
        }

        console.log("Seeding Complete.");
    } catch (e: any) {
        console.error("Seeding Error:", e);
    } finally {
        connection.release();
        process.exit();
    }
};

seed();
