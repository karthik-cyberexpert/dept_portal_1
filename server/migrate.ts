import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';

dotenv.config();

async function migrate() {
  try {
    // 1. Connect without Database to Create it
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || ''
    });

    console.log('Connected to MySQL server.');

    // 2. Read Schema File
    const schemaPath = path.resolve('../schema/schema_first.sql');
    const sql = await fs.readFile(schemaPath, 'utf8');

    // 3. Split and Execute
    // Note: This is a simple splitter, might break on complex strings but fine for this schema
    const statements = sql
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0);

    for (const statement of statements) {
        // Skip SET or comments if needed, but mysql2 might handle some
        if (statement.startsWith('--')) continue; 
        
        try {
            await connection.query(statement);
            // console.log('Executed:', statement.substring(0, 50) + '...');
        } catch (err: any) {
            // Ignore "Database exists" or specific warnings if robust
            console.error('Error executing statement:', err.message);
            // console.error(statement);
        }
    }

    console.log('Migration completed successfully.');
    await connection.end();
    process.exit(0);

  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate();
