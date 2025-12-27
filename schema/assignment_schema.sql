-- Assignments Schema
-- This file defines tables for posting assignments and tracking student submissions.

USE Cyber_Dept_Portal;

-- -----------------------------------------------------------------------------
-- 1. Assignments
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `assignments` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT,
    
    -- Linkage
    `subject_allocation_id` INT NOT NULL, -- Links to specific Faculty-Subject-Section
    
    `due_date` DATETIME NOT NULL,
    `max_score` INT DEFAULT 10,
    `attachment_url` VARCHAR(500),        -- Optional question paper/reference
    
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (`subject_allocation_id`) REFERENCES `subject_allocations`(`id`) ON DELETE CASCADE
);

-- -----------------------------------------------------------------------------
-- 2. Submissions
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `assignment_submissions` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `assignment_id` INT NOT NULL,
    `student_id` INT NOT NULL,
    
    `file_url` VARCHAR(500),              -- PDF/Doc Link
    `submitted_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Grading
    `score` DECIMAL(5, 2),
    `feedback` TEXT,
    `status` ENUM('Submitted', 'Graded', 'Late', 'Resubmit') DEFAULT 'Submitted',
    `graded_by` INT,                      -- Faculty ID
    
    FOREIGN KEY (`assignment_id`) REFERENCES `assignments`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`student_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`graded_by`) REFERENCES `users`(`id`) ON DELETE SET NULL,
    
    UNIQUE KEY `unique_submission` (`assignment_id`, `student_id`)
);
