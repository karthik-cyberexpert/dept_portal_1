-- Timetable & Academic Schedule Schema
-- This file defines the structure for Subjects, Workload Allocations, and the Weekly Timetable.
-- Use this schema to generate both Student Timetables (by Section) and Faculty Timetables (by Allocation).

USE Cyber_Dept_Portal;

-- -----------------------------------------------------------------------------
-- 1. Subjects (Courses)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `subjects` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `department_id` INT NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `code` VARCHAR(20) NOT NULL UNIQUE, -- e.g. "CS101"
    `semester` INT NOT NULL,            -- e.g. 1 to 8
    `credits` INT DEFAULT 3,
    `type` ENUM('theory', 'lab', 'elective', 'project') DEFAULT 'theory',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (`department_id`) REFERENCES `departments`(`id`) ON DELETE CASCADE
);

-- -----------------------------------------------------------------------------
-- 2. Academic Years (Reference)
-- -----------------------------------------------------------------------------
-- Useful for filtering allocations by current academic year.
CREATE TABLE IF NOT EXISTS `academic_years` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `year_range` VARCHAR(20) NOT NULL,   -- e.g., "2024-2025"
    `is_active` BOOLEAN DEFAULT FALSE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- 3. Subject Allocations (Faculty Workload)
-- -----------------------------------------------------------------------------
-- Links a Subject to a Faculty Member for a specific Section in an Academic Year.
-- "Faculty A teaches Subject B to Section C"
CREATE TABLE IF NOT EXISTS `subject_allocations` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `subject_id` INT NOT NULL,
    `faculty_id` INT NOT NULL,
    `section_id` INT NOT NULL,
    `academic_year_id` INT NOT NULL,
    
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (`subject_id`) REFERENCES `subjects`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`faculty_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`section_id`) REFERENCES `sections`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`academic_year_id`) REFERENCES `academic_years`(`id`) ON DELETE CASCADE
);

-- -----------------------------------------------------------------------------
-- 4. Timetable Slots
-- -----------------------------------------------------------------------------
-- Represents a single block in the weekly schedule grid.
-- Unique constraint ensures no double-booking for a Section at the same time.
-- Note: Check Faculty availability logic in application code (or trigger) to avoid double-booking Faculty.

CREATE TABLE IF NOT EXISTS `timetable_slots` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `section_id` INT NOT NULL,   -- The class this timetable belongs to
    
    `day_of_week` ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday') NOT NULL,
    `period_number` INT NOT NULL, -- e.g. 1 to 8
    
    `subject_allocation_id` INT,  -- Nullable. If NULL, it's a "Free" or "Library" period.
    `room_number` VARCHAR(20),    -- e.g. "LH-101" or "Lab-2"
    
    -- Optional: Specific start/end times if periods vary
    `start_time` TIME,
    `end_time` TIME,
    
    FOREIGN KEY (`section_id`) REFERENCES `sections`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`subject_allocation_id`) REFERENCES `subject_allocations`(`id`) ON DELETE SET NULL,
    
    -- Constraint: A section cannot have two things at the same time
    UNIQUE KEY `unique_section_slot` (`section_id`, `day_of_week`, `period_number`)
);
