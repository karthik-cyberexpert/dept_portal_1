-- Student Management Schema
-- This file defines the tables and structures for managing student data.

USE Cyber_Dept_Portal;

-- -----------------------------------------------------------------------------
-- Users Table (Reference for Student Role)
-- -----------------------------------------------------------------------------
-- Students are stored in the main `users` table with role='student'.
-- Common fields: id, email, name, password_hash, phone, address, avatar_url, is_active.

-- -----------------------------------------------------------------------------
-- Student Profiles
-- -----------------------------------------------------------------------------
-- Stores academic and personal details specific to students.

CREATE TABLE IF NOT EXISTS `student_profiles` (
    `user_id` INT PRIMARY KEY,
    `roll_number` VARCHAR(50) NOT NULL UNIQUE,
    `register_number` VARCHAR(50) NOT NULL UNIQUE,
    `batch_id` INT,
    `section_id` INT,
    `dob` DATE,
    `gender` ENUM('male', 'female', 'other'),
    `blood_group` VARCHAR(10),
    
    -- Admission Details
    `admission_type` ENUM('Government', 'Management', 'NRI') DEFAULT 'Government',
    `enrollment_type` ENUM('Regular', 'Lateral') DEFAULT 'Regular',
    `date_of_admission` DATE DEFAULT (CURRENT_DATE),
    
    -- Guardian / Parent Details
    `guardian_name` VARCHAR(100),
    `guardian_phone` VARCHAR(20),
    `guardian_email` VARCHAR(255),
    `guardian_relation` VARCHAR(50),
    
    -- Academic Performance (Summary)
    `cgpa` DECIMAL(4, 2) DEFAULT 0.00,
    `attendance_percentage` DECIMAL(5, 2) DEFAULT 0.00,
    `current_semester` INT DEFAULT 1,
    
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`batch_id`) REFERENCES `batches`(`id`) ON DELETE SET NULL, -- or batch_details.batch_id
    FOREIGN KEY (`section_id`) REFERENCES `sections`(`id`) ON DELETE SET NULL
);

-- -----------------------------------------------------------------------------
-- Student Documents (Optional Extension)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `student_documents` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `student_id` INT NOT NULL,
    `document_name` VARCHAR(100), -- e.g. "Transfer Certificate", "Mark Sheet"
    `document_type` ENUM('pdf', 'image', 'doc'),
    `file_url` VARCHAR(500) NOT NULL,
    `uploaded_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`student_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);
