-- Examinations & Marks Schema
-- This file defines the structure for managing exams, marks entry, and the approval workflow.

USE Cyber_Dept_Portal;

-- -----------------------------------------------------------------------------
-- 1. Exams (Assessments)
-- -----------------------------------------------------------------------------
-- Defines a specific exam event for a batch (e.g., "Internal Assessment 1 - 2025").

CREATE TABLE IF NOT EXISTS `exams` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `batch_id` INT NOT NULL,
    `semester` INT NOT NULL,  -- The semester for which this exam is conducted
    
    `name` VARCHAR(100) NOT NULL, -- e.g., "Internal Assessment 1", "Model Exam"
    `exam_type` ENUM('Internal', 'Model', 'Semester', 'Assignment') DEFAULT 'Internal',
    
    `start_date` DATE,
    `end_date` DATE,
    
    `is_published` BOOLEAN DEFAULT FALSE, -- If true, students can view the exam schedule
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (`batch_id`) REFERENCES `batches`(`id`) ON DELETE CASCADE
);

-- -----------------------------------------------------------------------------
-- 2. Marks Entry
-- -----------------------------------------------------------------------------
-- Stores the marks obtained by a student for a specific subject in an exam.
-- Includes an approval workflow status.

CREATE TABLE IF NOT EXISTS `marks` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `exam_id` INT NOT NULL,
    `student_id` INT NOT NULL,
    `subject_id` INT NOT NULL,
    
    `marks_obtained` DECIMAL(5, 2) DEFAULT 0.00,
    `max_marks` DECIMAL(5, 2) DEFAULT 100.00,
    
    -- key for approval workflow
    `status` ENUM('draft', 'submitted', 'approved', 'published', 'rejected') DEFAULT 'draft',
    
    `remarks` VARCHAR(255),       -- Feedback from faculty
    `entered_by` INT,             -- Faculty ID who entered marks
    `approved_by` INT,            -- Admin/HOD ID who approved
    
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (`exam_id`) REFERENCES `exams`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`student_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`subject_id`) REFERENCES `subjects`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`entered_by`) REFERENCES `users`(`id`) ON DELETE SET NULL,
    FOREIGN KEY (`approved_by`) REFERENCES `users`(`id`) ON DELETE SET NULL,
    
    -- Constraint: A student can have only one mark entry per exam per subject
    UNIQUE KEY `unique_student_exam_subject` (`exam_id`, `student_id`, `subject_id`)
);
