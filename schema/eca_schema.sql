-- ECA (Extra Curricular Activities) & Achievements Schema
-- Managing student achievements, verification, and analytics.

USE Cyber_Dept_Portal;

-- -----------------------------------------------------------------------------
-- 1. ECA Achievements
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `eca_achievements` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `student_id` INT NOT NULL,
    
    `title` VARCHAR(255) NOT NULL,        -- Event Name / Competition
    `organizer` VARCHAR(255),             -- Who organized it (e.g. IIT Madras)
    
    `category` ENUM('Sports', 'Cultural', 'Technical', 'Symposium', 'Workshop', 'Hackathon') NOT NULL,
    `participation_type` ENUM('Participation', 'Merit/Prize') DEFAULT 'Participation',
    `level` ENUM('College', 'District', 'State', 'National', 'International') DEFAULT 'College',
    
    `event_date` DATE NOT NULL,
    `place_secured` VARCHAR(50),          -- e.g. "1st Place", "Runner Up", or NULL
    
    `proof_url` VARCHAR(500),             -- Certificate image/PDF
    
    -- Verification
    `status` ENUM('Pending', 'In Progress', 'Approved', 'Rejected') DEFAULT 'Pending',
    `verified_by` INT,                    -- Tutor/Faculty ID
    `verification_remarks` TEXT,
    `verified_at` TIMESTAMP NULL,
    
    -- Gamification / Analytics
    `points_awarded` INT DEFAULT 0,       -- Points calculated based on level/prize
    
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (`student_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`verified_by`) REFERENCES `users`(`id`) ON DELETE SET NULL
);

-- -----------------------------------------------------------------------------
-- 2. ECA Analytics (Views) - Conceptual
-- -----------------------------------------------------------------------------
-- Analytics like "Top Performers" or "Batch-wise Participation" can be derived 
-- directly from querying the `eca_achievements` table using `status='Approved'`
-- and aggregating by `student_id` or `category`.
