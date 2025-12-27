-- Database Schema for Orchids Edu Bloom Portal
-- Version: 1.0.0
-- Database: MySQL

CREATE DATABASE IF NOT EXISTS Cyber_Dept_Portal;
USE Cyber_Dept_Portal;


SET FOREIGN_KEY_CHECKS = 0;

-- -----------------------------------------------------------------------------
-- 1. User Management & Authentication
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `users` (
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `name` VARCHAR(100) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `role` ENUM('admin', 'faculty', 'student', 'tutor') NOT NULL,
    `phone` VARCHAR(20),
    `address` TEXT,
    `avatar_url` VARCHAR(255),
    `is_active` BOOLEAN DEFAULT TRUE,
    `last_login` DATETIME,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- 2. Academic Structure
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `departments` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL UNIQUE, -- e.g., Computer Science
    `code` VARCHAR(20) NOT NULL UNIQUE,    -- e.g., CSE
    `head_of_department_id` INT,         -- Link to a Faculty User
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `academic_years` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `year_range` VARCHAR(20) NOT NULL,   -- e.g., 2023-2024
    `is_active` BOOLEAN DEFAULT FALSE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `batches` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `department_id` INT NOT NULL,
    `name` VARCHAR(50) NOT NULL,         -- e.g., 2021-2025
    `start_year` YEAR NOT NULL,
    `end_year` YEAR NOT NULL,
    `current_semester` INT DEFAULT 1,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`department_id`) REFERENCES `departments`(`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `sections` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `batch_id` INT NOT NULL,
    `name` VARCHAR(10) NOT NULL,         -- e.g., A, B
    `capacity` INT DEFAULT 60,
    `class_incharge_id` INT,             -- Link to Faculty (Tutor)
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`batch_id`) REFERENCES `batches`(`id`) ON DELETE CASCADE
);

-- -----------------------------------------------------------------------------
-- 3. Profiles
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `faculty_profiles` (
    `user_id` INT PRIMARY KEY,
    `department_id` INT,
    `name` VARCHAR(100) NOT NULL,
    `designation` VARCHAR(100),
    `qualification` VARCHAR(255),
    `experience_years` INT DEFAULT 0,
    `joining_date` DATE,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`department_id`) REFERENCES `departments`(`id`) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS `student_profiles` (
    `user_id` INT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `roll_number` VARCHAR(50) NOT NULL UNIQUE,
    `register_number` VARCHAR(50) NOT NULL UNIQUE,
    `batch_id` INT,
    `section_id` INT,
    `dob` DATE,
    `gender` ENUM('male', 'female', 'other'),
    `blood_group` VARCHAR(5),
    `parent_name` VARCHAR(100),
    `parent_phone` VARCHAR(20),
    `cgpa` DECIMAL(4, 2) DEFAULT 0.00,
    `attendance_percentage` DECIMAL(5, 2) DEFAULT 0.00,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`batch_id`) REFERENCES `batches`(`id`) ON DELETE SET NULL,
    FOREIGN KEY (`section_id`) REFERENCES `sections`(`id`) ON DELETE SET NULL
);

-- Note: 'Tutor' role users also have a faculty_profile.
-- The specific tutor assignment is handled via sections.class_incharge_id

-- -----------------------------------------------------------------------------
-- 4. Course Management
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `subjects` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `department_id` INT NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `code` VARCHAR(20) NOT NULL UNIQUE,
    `semester` INT NOT NULL,
    `credits` INT DEFAULT 3,
    `type` ENUM('theory', 'lab', 'elective') DEFAULT 'theory',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`department_id`) REFERENCES `departments`(`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `subject_allocations` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `subject_id` INT NOT NULL,
    `faculty_id` INT NOT NULL, -- User ID (Faculty)
    `section_id` INT NOT NULL,
    `academic_year_id` INT NOT NULL,
    FOREIGN KEY (`subject_id`) REFERENCES `subjects`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`faculty_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`section_id`) REFERENCES `sections`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`academic_year_id`) REFERENCES `academic_years`(`id`) ON DELETE CASCADE
);

-- -----------------------------------------------------------------------------
-- 5. Timetable
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `timetable_slots` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `section_id` INT NOT NULL,
    `day_of_week` ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday') NOT NULL,
    `period_number` INT NOT NULL, -- 1 to 8
    `subject_allocation_id` INT, -- Nullable for Free periods
    `room_number` VARCHAR(20),
    `start_time` TIME,
    `end_time` TIME,
    FOREIGN KEY (`section_id`) REFERENCES `sections`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`subject_allocation_id`) REFERENCES `subject_allocations`(`id`) ON DELETE CASCADE
);

-- -----------------------------------------------------------------------------
-- 6. Attendance & Leaves
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `attendance` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `student_id` INT NOT NULL, -- User ID
    `date` DATE NOT NULL,
    `status` ENUM('present', 'absent', 'late', 'on_duty') NOT NULL,
    `marked_by` INT, -- Faculty User ID
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY `unique_student_date` (`student_id`, `date`),
    FOREIGN KEY (`student_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `leave_requests` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL, -- Student or Faculty
    `type` ENUM('medical', 'casual', 'on_duty') NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,
    `reason` TEXT,
    `status` ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    `approver_id` INT, -- Tutor or Admin ID
    `rejection_reason` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`approver_id`) REFERENCES `users`(`id`) ON DELETE SET NULL
);

-- -----------------------------------------------------------------------------
-- 7. Examination & Marks
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `exams` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL, -- IA1, IA2, Model, Semester
    `batch_id` INT NOT NULL,
    `start_date` DATE,
    `end_date` DATE,
    `is_published` BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (`batch_id`) REFERENCES `batches`(`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `marks` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `exam_id` INT NOT NULL,
    `student_id` INT NOT NULL,
    `subject_id` INT NOT NULL,
    `marks_obtained` DECIMAL(5, 2),
    `max_marks` DECIMAL(5, 2) DEFAULT 100.00,
    `status` ENUM('draft', 'submitted', 'approved', 'published') DEFAULT 'draft',
    `remarks` VARCHAR(255),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`exam_id`) REFERENCES `exams`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`student_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`subject_id`) REFERENCES `subjects`(`id`) ON DELETE CASCADE
);

-- -----------------------------------------------------------------------------
-- 8. LMS & Resources
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `resources` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `subject_id` INT NOT NULL,
    `uploaded_by` INT NOT NULL, -- Faculty
    `title` VARCHAR(255) NOT NULL,
    `type` ENUM('pdf', 'video', 'link', 'doc') NOT NULL,
    `url` VARCHAR(500) NOT NULL,
    `unit_number` INT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`subject_id`) REFERENCES `subjects`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`uploaded_by`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `assignments` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `subject_allocation_id` INT NOT NULL, -- Links to specific section/subject
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `due_date` DATETIME NOT NULL,
    `max_score` INT DEFAULT 10,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`subject_allocation_id`) REFERENCES `subject_allocations`(`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `assignment_submissions` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `assignment_id` INT NOT NULL,
    `student_id` INT NOT NULL,
    `file_url` VARCHAR(500),
    `submitted_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `score` INT,
    `feedback` TEXT,
    `status` ENUM('submitted', 'graded', 'late') DEFAULT 'submitted',
    FOREIGN KEY (`assignment_id`) REFERENCES `assignments`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`student_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

-- -----------------------------------------------------------------------------
-- 9. Communication & Other
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `circulars` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `priority` ENUM('low', 'medium', 'high') DEFAULT 'medium',
    `audience` ENUM('all', 'students', 'faculty', 'tutors') NOT NULL,
    `target_batch_id` INT, -- Nullable, for specific batch
    `attachment_url` VARCHAR(500),
    `created_by` INT NOT NULL, -- Admin
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`target_batch_id`) REFERENCES `batches`(`id`) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS `eca_achievements` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `student_id` INT NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `category` VARCHAR(100), -- Sports, Cultural, Technical
    `level` ENUM('college', 'district', 'state', 'national', 'international'),
    `date` DATE,
    `points` INT DEFAULT 0,
    `proof_url` VARCHAR(500),
    `status` ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    `verifier_id` INT, -- Tutor
    `remarks` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`student_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`verifier_id`) REFERENCES `users`(`id`) ON DELETE SET NULL
);

SET FOREIGN_KEY_CHECKS = 1;
