import { pool } from './db.js';
import dotenv from 'dotenv';
dotenv.config();

const check = async () => {
    try {
        console.log("Checking Batches Schema...");
        const [rows]: any = await pool.query('DESCRIBE batches');
        console.log(JSON.stringify(rows));
    } catch (e: any) {
        console.error(e);
    }
    process.exit(0);
};

check();
