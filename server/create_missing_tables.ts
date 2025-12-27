import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const run = async () => {
    const pool = mysql.createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'cyber_dept_portal',
        waitForConnections: true,
        connectionLimit: 10
    });

    try {
        console.log('Creating missing tables...\n');

        // 1. Create timetable_slots table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS timetable_slots (
                id INT AUTO_INCREMENT PRIMARY KEY,
                section_id INT NOT NULL,
                day_of_week ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday') NOT NULL,
                period_number INT NOT NULL,
                subject_allocation_id INT,
                room_number VARCHAR(20),
                start_time TIME,
                end_time TIME,
                
                FOREIGN KEY (section_id) REFERENCES sections(id) ON DELETE CASCADE,
                FOREIGN KEY (subject_allocation_id) REFERENCES subject_allocations(id) ON DELETE SET NULL,
                UNIQUE KEY unique_section_slot (section_id, day_of_week, period_number)
            )
        `);
        console.log('✓ Created timetable_slots table');

        // 2. Create attendance table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS attendance (
                id INT AUTO_INCREMENT PRIMARY KEY,
                student_id INT NOT NULL,
                subject_id INT NOT NULL,
                section_id INT NOT NULL,
                date DATE NOT NULL,
                status ENUM('present', 'absent', 'late', 'excused') DEFAULT 'present',
                marked_by INT NOT NULL,
                remarks TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                
                FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
                FOREIGN KEY (section_id) REFERENCES sections(id) ON DELETE CASCADE,
                FOREIGN KEY (marked_by) REFERENCES users(id) ON DELETE CASCADE,
                UNIQUE KEY unique_attendance (student_id, subject_id, date)
            )
        `);
        console.log('✓ Created attendance table');

        // 3. Create academic_years table if not exists
        await pool.query(`
            CREATE TABLE IF NOT EXISTS academic_years (
                id INT AUTO_INCREMENT PRIMARY KEY,
                year_range VARCHAR(20) NOT NULL,
                is_active BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('✓ Created academic_years table');

        // 4. Insert default academic year if none exists
        const [years]: any = await pool.query('SELECT COUNT(*) as count FROM academic_years');
        if (years[0].count === 0) {
            await pool.query(`
                INSERT INTO academic_years (year_range, is_active) VALUES ('2024-2025', TRUE)
            `);
            console.log('✓ Inserted default academic year 2024-2025');
        }

        console.log('\n✅ All tables created successfully!');

    } catch (error) {
        console.error('Migration Error:', error);
    } finally {
        await pool.end();
    }
};

run();
