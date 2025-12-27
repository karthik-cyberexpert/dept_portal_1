-- Leave & On-Duty (OD) Requests Schema
-- This file defines the structure for managing student and faculty leave/OD applications.

USE Cyber_Dept_Portal;

-- -----------------------------------------------------------------------------
-- Leave & OD Requests
-- -----------------------------------------------------------------------------
-- Unified table for both normal Leaves (Casual, Medical) and On-Duty (Sports, Academic).
-- "OD" (On Duty) implies the student is away for college work and gets attendance.

CREATE TABLE IF NOT EXISTS `leave_od_requests` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,                  -- Student or Faculty
    `request_type` ENUM('Leave', 'OD') NOT NULL, -- Distinguishes between personal leave and duty
    `category` ENUM('Casual', 'Medical', 'Academic', 'Sports', 'Symposium', 'Workshop', 'Other') DEFAULT 'Casual',
    
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,
    
    -- Half-day support
    `is_half_day` BOOLEAN DEFAULT FALSE,
    `session` ENUM('Forenoon', 'Afternoon', 'Full Day') DEFAULT 'Full Day',
    
    `reason` TEXT NOT NULL,
    `proof_url` VARCHAR(500),                -- Medical Cert, OD Letter, Event Invite
    
    -- Approval Workflow
    `status` ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',
    `approver_id` INT,                       -- The Faculty/Tutor/HOD who acted on it
    `rejection_reason` TEXT,
    `approved_at` TIMESTAMP NULL,
    
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`approver_id`) REFERENCES `users`(`id`) ON DELETE SET NULL
);
