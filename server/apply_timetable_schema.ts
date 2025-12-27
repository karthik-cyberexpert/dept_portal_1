import { pool } from './db.js';
import fs from 'fs';
import path from 'path';

const migrate = async () => {
    const connection = await pool.getConnection();
    try {
        console.log("Applying Timetable Schema...");
        const schemaPath = path.join(__dirname, '../schema/timetable_schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');
        
        // Split by semicolon, but be careful with triggers/procedures if any (none here)
        const statements = schema.split(';').filter(s => s.trim().length > 0);

        for (const statement of statements) {
            if (statement.trim().toUpperCase().startsWith('USE')) continue; // Skip USE
            try {
                await connection.query(statement);
            } catch (e: any) {
                // Ignore "Table already exists"
                if (e.code !== 'ER_TABLE_EXISTS_ERROR') {
                    console.error("Migration Error:", e.message);
                }
            }
        }
        console.log("Timetable Schema Applied.");
    } catch (e: any) {
        console.error("Fatal Error:", e);
    } finally {
        connection.release();
        process.exit();
    }
};

migrate();
