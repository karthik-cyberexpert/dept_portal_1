-- Notes & Resources Schema
-- This file defines the structure for managing faculty-uploaded notes, question papers, and manuals.

USE Cyber_Dept_Portal;

-- -----------------------------------------------------------------------------
-- 1. Notes (Resources)
-- -----------------------------------------------------------------------------
-- Stores notes, question papers, and manuals uploaded by faculty.

CREATE TABLE IF NOT EXISTS `notes` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT,
    
    `subject_id` INT NOT NULL,
    `section_id` INT,                    -- Optional: target specific section
    
    `type` ENUM('Note', 'QP', 'Manual', 'Other') DEFAULT 'Note',  -- QP = Question Paper
    `file_type` VARCHAR(50) DEFAULT 'PDF',
    `file_url` VARCHAR(500),             -- URL or path to the uploaded file
    `file_size` VARCHAR(50),             -- e.g., "2.5 MB"
    
    `uploaded_by` INT NOT NULL,          -- Faculty ID
    `download_count` INT DEFAULT 0,
    
    `is_published` BOOLEAN DEFAULT TRUE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (`subject_id`) REFERENCES `subjects`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`section_id`) REFERENCES `sections`(`id`) ON DELETE SET NULL,
    FOREIGN KEY (`uploaded_by`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

-- Create index for faster lookups
CREATE INDEX idx_notes_subject ON notes(subject_id);
CREATE INDEX idx_notes_faculty ON notes(uploaded_by);
