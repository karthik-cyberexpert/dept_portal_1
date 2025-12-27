-- Faculty Management Schema
-- This file defines the tables and structures for managing faculty data.

USE Cyber_Dept_Portal;

-- -----------------------------------------------------------------------------
-- Users Table (Reference for Faculty Role)
-- -----------------------------------------------------------------------------
-- Faculty are stored in the main `users` table with role='faculty'.
-- Common fields: id, email, name, password_hash, phone, address, avatar_url, is_active.

-- -----------------------------------------------------------------------------
-- Faculty Profiles
-- -----------------------------------------------------------------------------
-- Stores professional and academic details specific to faculty members.

CREATE TABLE IF NOT EXISTS `faculty_profiles` (
    `user_id` INT PRIMARY KEY,
    `department_id` INT,
    -- designation removed
    `qualification` VARCHAR(255),        -- e.g., "M.E., Ph.D."
    `specialization` VARCHAR(255),       -- e.g., "AI/ML", "Cyber Security"
    `experience_years` INT DEFAULT 0,
    `joining_date` DATE,
    
    -- Employment Details
    `employment_type` ENUM('Permanent', 'Probation', 'Contract', 'Visiting') DEFAULT 'Permanent',
    `current_status` ENUM('Active', 'On Leave', 'Resigned', 'Retired') DEFAULT 'Active',
    `workload_hours` INT DEFAULT 0,      -- Weekly teaching hours
    
    -- Office Info
    `cabin_location` VARCHAR(100),
    `extension_number` VARCHAR(20),
    
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`department_id`) REFERENCES `departments`(`id`) ON DELETE SET NULL
);

-- -----------------------------------------------------------------------------
-- Faculty Documents (Optional Extension)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `faculty_documents` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `faculty_id` INT NOT NULL,
    `document_name` VARCHAR(100), -- e.g. "Resume", "Degree Certificate"
    `document_type` ENUM('pdf', 'image', 'doc'),
    `file_url` VARCHAR(500) NOT NULL,
    `uploaded_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`faculty_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);
