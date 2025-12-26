# Student Marks & Grades Analysis

## Overview
The Marks & Grades module enables students to view their academic performance across internal and external assessments. It provides a detailed breakdown of marks by subject and exam type.

## Key Features
-   **Subject-wise Breakdown**:
    -   Internal: Displays marks for IA1, IA2, CIA3, Model Exams, and Assignments.
    -   External: Displays final external grade and grade points.
-   **Semester GPA**: Merged cell in the external table to show the overall GPA for the semester.
-   **Statistics**: Calculates GPA, Class Rank, and Total Grade Points.
-   **View Toggle**: Switch between "Internal Marks" and "External Results".
-   **Grouping**: Logic to group multiple mark entries (IA1, IA2, etc.) into a single row per subject.

## UI Components
-   **Table**: A dense table to display marks.
-   **Select**: used for filtering (Semester, Exam Type - though mainly visual in some contexts).
-   **Stat Cards**: Show GPA, Rank, and Total Points.
-   **Badges**: Color-coded badges for Grade letters (O, A+, A, etc.).

## Data Integration
-   **Marks**: Fetched via `getStudentMarks`.
-   **Transformation**: Raw flat list of marks is transformed into a subject-keyed object to populate table columns.
-   **GPA Calculation**: Client-side logic (or mock logic) to calculate GPA based on external grades.
