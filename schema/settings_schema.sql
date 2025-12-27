-- System Settings & Configuration Schema
-- This file defines the structure for managing application-wide settings.

USE Cyber_Dept_Portal;

-- -----------------------------------------------------------------------------
-- 1. System Settings (Key-Value Store)
-- -----------------------------------------------------------------------------
-- Stores dynamic configuration for General, Academic, Security, etc.
-- Example: 
-- key='college_name', value='Tamil Nadu Engineering College', category='general'
-- key='min_attendance_percentage', value='75', category='academic'

CREATE TABLE IF NOT EXISTS `system_settings` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `setting_key` VARCHAR(100) NOT NULL UNIQUE,
    `setting_value` TEXT, -- Stores JSON or simple string
    `category` ENUM('general', 'academic', 'security', 'notification', 'appearance') DEFAULT 'general',
    `description` VARCHAR(255),
    `updated_by` INT, -- Admin User ID
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE SET NULL
);

-- -----------------------------------------------------------------------------
-- 2. Audit Logs (Data Management)
-- -----------------------------------------------------------------------------
-- Tracks critical system actions like Backups, Exports, Cache Clearing.

CREATE TABLE IF NOT EXISTS `system_audit_logs` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `action` VARCHAR(100) NOT NULL, -- e.g., "Backup Created", "Data Exported"
    `performed_by` INT NOT NULL,
    `details` TEXT,                 -- Status, File Size, etc.
    `timestamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `ip_address` VARCHAR(45),
    
    FOREIGN KEY (`performed_by`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

-- -----------------------------------------------------------------------------
-- 3. Initial Seed Data (Optional - Can be moved to seed.ts)
-- -----------------------------------------------------------------------------
-- INSERT IGNORE INTO `system_settings` (`setting_key`, `setting_value`, `category`, `description`) VALUES
-- ('college_name', 'Tamil Nadu Engineering College', 'general', 'Name of the Institution'),
-- ('department_name', 'Computer Science and Engineering', 'general', 'Name of the Department'),
-- ('academic_year', '2024-2025', 'general', 'Current Academic Year'),
-- ('min_attendance', '75', 'academic', 'Minimum Attendance Required (%)'),
-- ('password_expiry_days', '90', 'security', 'Password Expiration Interval'),
-- ('theme', 'dark', 'appearance', 'Default System Theme');
