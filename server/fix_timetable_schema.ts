import { pool } from './db.js';

const fixTimetable = async () => {
    const connection = await pool.getConnection();
    try {
        console.log("Fixing Timetable Schema...");
        
        // Add 'type' column
        try {
            await connection.query("ALTER TABLE timetable_slots ADD COLUMN type ENUM('theory', 'lab', 'practical') NOT NULL DEFAULT 'theory'");
            console.log("Added 'type' column.");
        } catch (e: any) {
            if (e.code === 'ER_DUP_FIELDNAME') console.log("'type' column already exists.");
            else console.error("Error adding type:", e);
        }

        // Add 'room_number' column
        try {
            await connection.query("ALTER TABLE timetable_slots ADD COLUMN room_number VARCHAR(50) DEFAULT NULL");
            console.log("Added 'room_number' column.");
        } catch (e: any) {
            if (e.code === 'ER_DUP_FIELDNAME') console.log("'room_number' column already exists.");
            else console.error("Error adding room_number:", e);
        }

    } catch (e: any) {
        console.error("Global Error:", e);
    } finally {
        connection.release();
        process.exit();
    }
};

fixTimetable();
