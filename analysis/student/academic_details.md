# Student Academic Details Analysis

## Overview
The Academic Details module provides students with a comprehensive view of their academic journey, including current status, program details, and semester-wise performance history.

## Key Features
-   **High-Level Stats**: Displays CGPA, Total Credits, Backlogs, and completed Semesters.
-   **Academic Profile**: Detailed list of academic identity info (Batch, Curriculum Year, Active Semester, Major, Section, Class Tutor, etc.).
-   **Semester History**: A timeline view of past semesters showing GPA, total credits, and completion status.
    -   **Visual Status**: Uses icons and colors to distinguish between Completed (Success) and Ongoing (Warning) semesters.

## UI Components
-   **GlassStatCard**: Reusable component for top-level stats.
-   **Key-Value List**: For displaying the academic profile in a structured, readable format.
-   **Timeline/List**: For semester history.

## Data Integration
-   **Student Data**: Fetches detailed student profile from `data-store.ts`.
-   **Tutor Data**: Fetches assigned tutor based on student's batch and section.
-   **Performance**: Aggregates data from `semesterHistory` array in the student object.
