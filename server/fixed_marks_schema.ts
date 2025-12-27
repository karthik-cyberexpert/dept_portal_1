import { pool } from './db.js';

const fixMarksSchema = async () => {
    const connection = await pool.getConnection();
    try {
        console.log("Fixing Marks Schema...");
        
        // Add 'breakdown' column
        try {
            await connection.query("ALTER TABLE marks ADD COLUMN breakdown JSON DEFAULT NULL");
            console.log("Added 'breakdown' column.");
        } catch (e: any) {
             if (e.code === 'ER_DUP_FIELDNAME') console.log("'breakdown' column already exists.");
             else console.error("Error adding breakdown:", e);
        }

        // Add 'class_id' column (optional but good for direct linkage if needed later, though schema said section_id usually)
        // Actually, the plan mentioned class_id or link to sections. Let's stick to existing FKs if possible, or add section_id explicitly to marks if not already there?
        // Checking schema: marks has exam_id, student_id, subject_id. 
        // Exams table has batch_id. Student has section_id.
        // So we can derive section from student.
        // But let's check if we need to add anything else. The plan said "Add class_id or link to sections".
        // Let's add section_id to be explicit and faster for filtering.
        
        try {
            await connection.query("ALTER TABLE marks ADD COLUMN section_id INT DEFAULT NULL");
             console.log("Added 'section_id' column.");
        } catch (e: any) {
            if (e.code === 'ER_DUP_FIELDNAME') console.log("'section_id' column already exists.");
            else console.error("Error adding section_id:", e);
        }

    } catch (e: any) {
        console.error("Global Error:", e);
    } finally {
        connection.release();
        process.exit();
    }
};

fixMarksSchema();
