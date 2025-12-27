import { pool } from './db.js';
import bcrypt from 'bcrypt';

const debug = async () => {
    const connection = await pool.getConnection();
    try {
        console.log("Connecting...");
        
        const payload = {
            name: "Final Debug Student",
            email: "final_debug_student@example.com", 
            phone: "9988776655",
            roll_number: "FINAL001",
            register_number: "", // Empty string
            batch_id: "2",
            section_id: "1",
            dob: '2000-01-01',
            gender: 'Male'
        };

        // Create User
        console.log("Creating user...");
        const hashedPassword = await bcrypt.hash('student123', 10);
        const [userResult]: any = await connection.execute(
          'INSERT INTO users (email, name, password_hash, role, phone) VALUES (?, ?, ?, ?, ?)',
          [payload.email, payload.name, hashedPassword, 'student', payload.phone]
        );
        const userId = userResult.insertId;
        console.log("User ID:", userId);

        // Create Profile (without name column)
        console.log("Creating profile...");
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
        console.log("Profile Created Successfully!");
        
        // Clean up
        await connection.execute("DELETE FROM users WHERE id = ?", [userId]);
        console.log("Test Data Cleaned Up.");

    } catch (error: any) {
        console.error("FATAL ERROR:", error);
    } finally {
        connection.release();
        process.exit();
    }
};

debug();
