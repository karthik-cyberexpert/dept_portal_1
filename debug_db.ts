import { pool } from './server/db.js';

const debug = async () => {
    try {
        const connection = await pool.getConnection();
        console.log("Connected to DB");

        // List tables
        const [tables]: any = await connection.query("SHOW TABLES");
        console.log("Tables:", tables.map((t: any) => Object.values(t)[0]));

        // Check departments
        try {
            const [depts]: any = await connection.query("SELECT * FROM departments");
            console.log("Departments:", depts);
            
            if (depts.length === 0) {
                console.log("Seeding default department...");
                await connection.query("INSERT INTO departments (name, code) VALUES ('Computer Science', 'CSE')");
                console.log("Seeded CSE department.");
            }
        } catch (e) {
            console.error("Error checking departments:", e);
        }

        // Run the batch query
        console.log("Running Batch Query...");
        const [rows]: any = await connection.query(`
            SELECT b.*, d.name as department_name, d.code as department_code,
            (SELECT COUNT(*) FROM sections s WHERE s.batch_id = b.id) as section_count
            FROM batches b 
            JOIN departments d ON b.department_id = d.id 
            ORDER BY b.start_year DESC
        `);
        console.log("Batch Query Success. Rows:", rows);

    } catch (error) {
        console.error("FATAL ERROR:", error);
    } finally {
        pool.end();
    }
};

debug();
