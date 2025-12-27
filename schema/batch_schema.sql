-- Batch Information Schema
-- This table stores detailed information about academic batches.

USE Cyber_Dept_Portal;

CREATE TABLE IF NOT EXISTS `batch_details` (
    `batch_id` INT AUTO_INCREMENT PRIMARY KEY,
    `batch_name` VARCHAR(50) NOT NULL,             -- e.g., "2024-2028"
    `department_id` INT NOT NULL,
    `current_status` ENUM('active', 'completed', 'inactive') DEFAULT 'active',
    `current_year` VARCHAR(20),                    -- e.g., "2025-2026" or "3rd Year"
    `total_sections` INT DEFAULT 0,
    `current_semester` INT DEFAULT 1,              -- 1 to 8
    `academic_cycle` VARCHAR(50),                  -- e.g., "2025-2026 Odd Sem"
    `semester_start_date` DATE,
    `semester_end_date` DATE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (`department_id`) REFERENCES `departments`(`id`) ON DELETE CASCADE
);

-- Note: This is an extended definition intended to possibly replace or augment the existing 'batches' table.
-- If integrating with existing 'batches', columns like 'start_year' and 'end_year' might also be retained or migrated.
