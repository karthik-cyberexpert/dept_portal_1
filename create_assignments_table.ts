import { pool } from './server/db.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createAssignmentsTables() {
  try {
    console.log('Creating assignments table...');
    
    // Create assignments table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS \`assignments\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`title\` VARCHAR(255) NOT NULL,
        \`description\` TEXT,
        
        -- Linkage
        \`subject_allocation_id\` INT NOT NULL,
        
        \`due_date\` DATETIME NOT NULL,
        \`max_score\` INT DEFAULT 10,
        \`attachment_url\` VARCHAR(500),
        
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        
        FOREIGN KEY (\`subject_allocation_id\`) REFERENCES \`subject_allocations\`(\`id\`) ON DELETE CASCADE
      )
    `);
    
    console.log('✓ Assignments table created');
    
    console.log('Creating assignment_submissions table...');
    
    // Create assignment_submissions table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS \`assignment_submissions\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`assignment_id\` INT NOT NULL,
        \`student_id\` INT NOT NULL,
        
        \`file_url\` VARCHAR(500),
        \`submitted_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        
        -- Grading
        \`score\` DECIMAL(5, 2),
        \`feedback\` TEXT,
        \`status\` ENUM('Submitted', 'Graded', 'Late', 'Resubmit') DEFAULT 'Submitted',
        \`graded_by\` INT,
        
        FOREIGN KEY (\`assignment_id\`) REFERENCES \`assignments\`(\`id\`) ON DELETE CASCADE,
        FOREIGN KEY (\`student_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE,
        FOREIGN KEY (\`graded_by\`) REFERENCES \`users\`(\`id\`) ON DELETE SET NULL,
        
        UNIQUE KEY \`unique_submission\` (\`assignment_id\`, \`student_id\`)
      )
    `);
    
    console.log('✓ Assignment submissions table created');
    
    console.log('\n✅ All assignment tables created successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating assignments tables:', error);
    process.exit(1);
  }
}

createAssignmentsTables();
