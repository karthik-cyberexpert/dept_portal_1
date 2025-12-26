# Tutor Assignment Status Analysis

## Overview
Allows Tutors to monitor the assignment completion rates of their class across all subjects. It highlights pending work and overdue submissions.

## Key Features
-   **Status Dashboard**:
    -   **Submission Rate**: Visual progress bars per subject.
    -   **Alerts**: Count of Pending and Overdue assignments.
-   **Assignment Matrix**:
    -   List of all active assignments for the class.
    -   Shows Submission Count vs Total Students.
    -   Shows Evaluation Count (graded) vs Submitted.

## UI Components
-   **Analytics Chart**: Bar chart showing submission rates by subject code.
-   **Assignment Cards**: Detailed breakdown including Due Date and Evaluation status.

## Data Integration
-   **Assignments**: `getAssignments` filtered by class/section.
-   **Submissions**: `getSubmissions` cross-referenced with the student list to calculate rates.
