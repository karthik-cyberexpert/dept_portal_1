import { pool } from './db.js';
import bcrypt from 'bcrypt';
import fs from 'fs';

const debug = async () => {
    const connection = await pool.getConnection();
    try {
        console.log("Connecting...");
        
        const payload = {
            name: "Diff Debug Student",
            email: "debug_student_v3@example.com", 
            phone: "1234567890",
            roll_number: "DEBUG003",
            register_number: "", // Empty string
            batch_id: "2",
            section_id: "1",
            dob: '2000-01-01',
            gender: 'Male'
        };

        await connection.beginTransaction();

        try {
            const hashedPassword = await bcrypt.hash('student123', 10);
            const [userResult]: any = await connection.execute(
              'INSERT INTO users (email, name, password_hash, role, phone) VALUES (?, ?, ?, ?, ?)',
              [payload.email, payload.name, hashedPassword, 'student', payload.phone]
            );
            const userId = userResult.insertId;

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

        } catch (e: any) {
             fs.writeFileSync('error_log_student.txt', JSON.stringify(e, Object.getOwnPropertyNames(e), 2));
             console.log("Error written to error_log_student.txt");
             await connection.rollback();
        }

    } catch (error) {
        console.error("FATAL:", error);
    } finally {
        connection.release();
        process.exit();
    }
};

debug();
