-- LMS & Resources Schema (Notes Analytics)
-- This file handles Study Materials, Question Banks, LMS Quizzes, and Usage Analytics.

USE Cyber_Dept_Portal;

-- -----------------------------------------------------------------------------
-- 1. Resources (Notes & Question Banks)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `resources` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `subject_id` INT NOT NULL,
    `uploaded_by` INT NOT NULL,           -- Faculty
    
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `resource_type` ENUM('Notes', 'Question Bank', 'Lab Manual', 'Syllabus', 'Video') NOT NULL,
    `file_url` VARCHAR(500) NOT NULL,
    
    `unit_number` INT DEFAULT 0,          -- e.g. Unit 1, Unit 2
    
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (`subject_id`) REFERENCES `subjects`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`uploaded_by`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

-- -----------------------------------------------------------------------------
-- 2. Resource Analytics (Note Analytics)
-- -----------------------------------------------------------------------------
-- Tracks who is accessing the materials to generate "Notes Status" and engagement analytics.
CREATE TABLE IF NOT EXISTS `resource_access_logs` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `resource_id` INT NOT NULL,
    `user_id` INT NOT NULL,               -- Student
    `accessed_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `action` ENUM('View', 'Download') DEFAULT 'View',
    
    FOREIGN KEY (`resource_id`) REFERENCES `resources`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);


-- -----------------------------------------------------------------------------
-- 3. LMS Quizzes
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `lms_quizzes` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `subject_id` INT NOT NULL,
    `created_by` INT NOT NULL,
    
    `quiz_data` JSON,                     -- Stores questions structure if simple, else separate table
    `total_marks` INT DEFAULT 10,
    `duration_minutes` INT DEFAULT 30,
    
    `start_time` DATETIME,
    `end_time` DATETIME,
    `is_active` BOOLEAN DEFAULT TRUE,
    
    FOREIGN KEY (`subject_id`) REFERENCES `subjects`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

-- -----------------------------------------------------------------------------
-- 4. Quiz Results (LMS Analytics)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `lms_quiz_submissions` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `quiz_id` INT NOT NULL,
    `student_id` INT NOT NULL,
    
    `score` DECIMAL(5, 2),
    `percentage` DECIMAL(5, 2),
    `answers_submitted` JSON,             -- Stores student answers
    `submitted_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (`quiz_id`) REFERENCES `lms_quizzes`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`student_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);
