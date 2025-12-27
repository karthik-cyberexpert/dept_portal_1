-- Subjects & Faculty Allocation Schema
-- This file defines the course curriculum and faculty mappings.

USE Cyber_Dept_Portal;

-- -----------------------------------------------------------------------------
-- 1. Subjects (Courses)
-- -----------------------------------------------------------------------------
-- Removed department_id as per recent UI changes.
CREATE TABLE IF NOT EXISTS `subjects` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `code` VARCHAR(20) NOT NULL UNIQUE, -- e.g. "CS101"
    `credits` INT DEFAULT 3,
    `semester` INT NOT NULL,            -- e.g. 1 to 8
    `type` ENUM('theory', 'lab', 'elective', 'project') DEFAULT 'theory',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- 2. Subject Faculty Allocations
-- -----------------------------------------------------------------------------
-- Maps Subjects to Faculties. 
-- "One subject can have many faculties" (e.g., handling different sections or sharing workload).

CREATE TABLE IF NOT EXISTS `subject_allocations` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `subject_id` INT NOT NULL,
    `faculty_id` INT NOT NULL,
    
    -- Optional: If verifying against specific sections/batches as per previous discussions
    `section_id` INT, 
    `academic_year` VARCHAR(20),  -- e.g. "2024-2025"
    
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (`subject_id`) REFERENCES `subjects`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`faculty_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`section_id`) REFERENCES `sections`(`id`) ON DELETE SET NULL
);
