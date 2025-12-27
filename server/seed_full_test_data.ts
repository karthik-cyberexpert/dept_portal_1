import { pool } from './db.js';
import bcrypt from 'bcrypt';

const seedFull = async () => {
    const connection = await pool.getConnection();
    try {
        console.log("Seeding Full Test Data...");
        
        // 0. Ensure Department 1
        const [depts]: any = await connection.query('SELECT * FROM departments WHERE id = 1');
        if (depts.length === 0) {
             console.log("Inserting Department 1...");
             await connection.query("INSERT INTO departments (id, name, code) VALUES (1, 'Computer Science', 'CSE')");
        }

        // 1. Ensure Batch ID 1
        const [batches]: any = await connection.query('SELECT * FROM batches WHERE id = 1');
        if (batches.length === 0) {
            console.log("Inserting Batch 1...");
            await connection.query("INSERT INTO batches (id, department_id, name, start_year, end_year, current_semester) VALUES (1, 1, 'Class 2025', 2024, 2025, 1)");
        }

        // 2. Ensure Section ID 1
        const [sections]: any = await connection.query('SELECT * FROM sections WHERE id = 1');
        if (sections.length === 0) {
            console.log("Inserting Section 1...");
            await connection.query("INSERT INTO sections (id, name, batch_id) VALUES (1, 'A', 1)");
        }

        // 3. Ensure User ID 1 (Faculty)
        const [users]: any = await connection.query('SELECT * FROM users WHERE id = 1');
        if (users.length === 0) {
            console.log("Inserting User 1 (Admin/Faculty)...");
            const hash = await bcrypt.hash('admin', 10);
            await connection.query("INSERT INTO users (id, name, email, password, role) VALUES (1, 'System Admin', 'admin@admin.com', ?, 'admin')", [hash]);
        }

        console.log("Full Seeding Complete.");
    } catch (e: any) {
        console.error("Seeding Error:", e);
    } finally {
        connection.release();
        process.exit();
    }
};

seedFull();
