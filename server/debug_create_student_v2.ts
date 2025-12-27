import { pool } from './db.js';
import bcrypt from 'bcrypt';

const debug = async () => {
    const connection = await pool.getConnection();
    try {
        console.log("Connecting...");
        
        // Simulate payload EXACTLY as frontend might send it (strings)
        const payload = {
            name: "Diff Debug Student",
            email: "debug_student_v2@example.com", 
            phone: "1234567890",
            roll_number: "DEBUG002",
            register_number: "", // Frontend sends empty string if missing
            batch_id: "2", // String from Select
            section_id: "1", // String from Select
            dob: '2000-01-01',
            gender: 'Male'
        };

        console.log("Attempting Create Student Transaction with String Payload:", payload);
        await connection.beginTransaction();

        try {
            // 1. Create User
            const hashedPassword = await bcrypt.hash('student123', 10);
            const [userResult]: any = await connection.execute(
              'INSERT INTO users (email, name, password_hash, role, phone) VALUES (?, ?, ?, ?, ?)',
              [payload.email, payload.name, hashedPassword, 'student', payload.phone]
            );
            const userId = userResult.insertId;
            console.log("User Created, ID:", userId);

            // 2. Create Profile
            // explicitly casting payload values might be needed in controller, checking if DB handles it
             await connection.execute(
              `INSERT INTO student_profiles (
                user_id, roll_number, register_number, batch_id, section_id, dob, gender
              ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
              [
                  userId, 
                  payload.roll_number, 
                  payload.register_number, 
                  payload.batch_id, 
                  payload.section_id, 
                  payload.dob, 
                  payload.gender
              ]
            );
            console.log("Profile Created!");

            await connection.rollback(); 
            console.log("Transaction Rolled Back (Success simulation)");

        } catch (e: any) {
             console.error("INNER ERROR:", e);
             console.error("SQL Message:", e.sqlMessage);
             await connection.rollback();
        }

    } catch (error) {
        console.error("FATAL:", error);
    } finally {
        connection.release();
        pool.end();
    }
};

debug();
