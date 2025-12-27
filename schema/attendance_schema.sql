-- Attendance Schema
-- Track student attendance for each subject allocation

USE Cyber_Dept_Portal;

-- -----------------------------------------------------------------------------
-- Attendance Records
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `attendance` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `student_id` INT NOT NULL,
    `subject_id` INT NOT NULL,
    `section_id` INT NOT NULL,
    `date` DATE NOT NULL,
    `status` ENUM('present', 'absent', 'late', 'excused') DEFAULT 'present',
    `marked_by` INT NOT NULL, -- Faculty who marked attendance
    `remarks` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (`student_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`subject_id`) REFERENCES `subjects`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`section_id`) REFERENCES `sections`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`marked_by`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    
    -- Constraint: A student can only have one attendance record per subject per day
    UNIQUE KEY `unique_attendance` (`student_id`, `subject_id`, `date`)
);

-- Index for faster queries
CREATE INDEX `idx_attendance_date` ON `attendance`(`date`);
CREATE INDEX `idx_attendance_section_subject` ON `attendance`(`section_id`, `subject_id`);
