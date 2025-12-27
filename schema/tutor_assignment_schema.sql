-- Tutor Assignment Schema
-- This file defines the structure for assigning Faculty as Tutors (Class In-charges).

USE Cyber_Dept_Portal;

-- -----------------------------------------------------------------------------
-- Tutor Assignments
-- -----------------------------------------------------------------------------
-- Maps a Faculty member to a specific Section of a Batch for a given duration.
-- Allows tracking history of who was the tutor for a class.

CREATE TABLE IF NOT EXISTS `tutor_assignments` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `faculty_id` INT NOT NULL,
    `section_id` INT NOT NULL,
    `batch_id` INT NOT NULL,          -- Redundant but useful for faster lookups
    
    `academic_year` VARCHAR(20),      -- e.g., "2024-2025"
    `semester` INT,                   -- The semester during which they were tutor
    
    `is_active` BOOLEAN DEFAULT TRUE, -- Only one active tutor per section normally
    `assigned_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `revoked_at` TIMESTAMP NULL,
    
    `assigned_by` INT,                -- Admin who assigned
    `remarks` TEXT,

    FOREIGN KEY (`faculty_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`section_id`) REFERENCES `sections`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`batch_id`) REFERENCES `batches`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`assigned_by`) REFERENCES `users`(`id`) ON DELETE SET NULL
);

-- Index to ensure quick lookup of active tutor for a section
CREATE INDEX idx_active_tutor ON `tutor_assignments` (`section_id`, `is_active`);
