import { pool } from './server/db.js';

async function createNotesTable() {
    const connection = await pool.getConnection();
    try {
        console.log('Creating notes table...\n');

        await connection.query(`
            CREATE TABLE IF NOT EXISTS notes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                
                subject_id INT NOT NULL,
                section_id INT,
                
                type ENUM('Note', 'QP', 'Manual', 'Other') DEFAULT 'Note',
                file_type VARCHAR(50) DEFAULT 'PDF',
                file_url VARCHAR(500),
                file_size VARCHAR(50),
                
                uploaded_by INT NOT NULL,
                download_count INT DEFAULT 0,
                
                is_published BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                
                FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
                FOREIGN KEY (section_id) REFERENCES sections(id) ON DELETE SET NULL,
                FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE CASCADE
            )
        `);
        console.log('✓ Notes table created successfully!');

        // Verify
        const [cols]: any = await connection.query('DESCRIBE notes');
        console.log('Columns:', cols.map((c: any) => c.Field).join(', '));

    } catch (e: any) {
        if (e.code === 'ER_TABLE_EXISTS_ERROR') {
            console.log('Notes table already exists.');
        } else {
            console.error('ERROR:', e.message);
        }
    } finally {
        connection.release();
        process.exit(0);
    }
}

createNotesTable();
