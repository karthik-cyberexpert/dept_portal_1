-- Circulars & Notices Schema
-- This file defines the structure for internal communication (Circulars, Notices, Events).

USE Cyber_Dept_Portal;

-- -----------------------------------------------------------------------------
-- Circulars & Notices
-- -----------------------------------------------------------------------------
-- Stores announcements sent to specific groups (Students, Faculty, etc.)
-- Supports attachments and priority levels.

CREATE TABLE IF NOT EXISTS `circulars` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `type` ENUM('Circular', 'Notice', 'Event', 'News') DEFAULT 'Notice',
    
    -- Targeting
    `audience` ENUM('All', 'Students', 'Faculty', 'Tutors', 'Staff') NOT NULL DEFAULT 'All',
    `target_batch_id` INT,         -- Optional: Only for a specific batch (e.g. 2024-2028)
    `target_department_id` INT,    -- Optional: Only for a specific department
    
    `priority` ENUM('Low', 'Medium', 'High', 'Urgent') DEFAULT 'Medium',
    `attachment_url` VARCHAR(500), -- Link to PDF/Image
    
    `is_published` BOOLEAN DEFAULT TRUE,
    `published_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `expiry_date` DATE,            -- Optional: Auto-hide after this date
    
    `created_by` INT NOT NULL,     -- User ID (Admin/Faculty)
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (`target_batch_id`) REFERENCES `batches`(`id`) ON DELETE SET NULL,
    FOREIGN KEY (`target_department_id`) REFERENCES `departments`(`id`) ON DELETE SET NULL,
    FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

-- -----------------------------------------------------------------------------
-- Circular Acknowledgements (Optional)
-- -----------------------------------------------------------------------------
-- Tracks who has acknowledged/read important circulars.
CREATE TABLE IF NOT EXISTS `circular_acknowledgements` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `circular_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    `read_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (`circular_id`) REFERENCES `circulars`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    UNIQUE KEY `unique_ack` (`circular_id`, `user_id`)
);
