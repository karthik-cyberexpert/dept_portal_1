import { pool } from './db.js';
import bcrypt from 'bcrypt';

const debug = async () => {
    const connection = await pool.getConnection();
    try {
        console.log("Connecting...");
        // Mock payload
        const payload = {
            name: "Test Student",
            email: "test_student_debug@example.com", 
            phone: "1234567890",
            roll_number: "DEBUG001",
            register_number: "REG001",
            batch_id: 2, // Ensure this exists
            section_id: 1, // Ensure this exists (or null if allowed, but form sends 1)
            dob: '2000-01-01',
            gender: 'Male'
        };

        console.log("Attempting Create Student Transaction...");
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
            // Check columns explicitly before insert in real debug, but here we test the query
             await connection.execute(
              `INSERT INTO student_profiles (
                user_id, roll_number, register_number, batch_id, section_id, dob, gender
              ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
              [userId, payload.roll_number, payload.register_number, payload.batch_id, payload.section_id, payload.dob, payload.gender]
            );
            console.log("Profile Created!");

            await connection.rollback(); // Rollback so we don't pollute DB
            console.log("Transaction Rolled Back (Success simulation)");

        } catch (e: any) {
             console.error("INNER ERROR:", e);
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
