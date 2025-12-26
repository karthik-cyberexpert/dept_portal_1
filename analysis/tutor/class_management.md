# Tutor Class Management Analysis

## Overview
This module gives the Class In-charge a complete roster view of their section. It aggregates attendance, academic performance (CGPA), and provides student-level actions.

## Key Features
-   **Class Stats**:
    -   Average Attendance.
    -   Average CGPA.
    -   Certification count.
-   **Student Roster**:
    -   Sortable and filterable list of students.
    -   **Columns**: Name/Email, Roll No, Attendance (with visual bar), CGPA, Status (Alert/Active).
-   **Actions**:
    -   Bulk actions (Export, etc.).
    -   Individual actions: View Profile, Send Alert.

## UI Components
-   **Stat Cards**: 3-card layout for class averages.
-   **Data Table**: Styled table with avatars and status badges.
-   **Search**: Real-time filtering by name or roll number.

## Data Integration
-   **Context-Aware**: `currentTutor` determines the Batch/Section filter.
-   **Aggregation**: Calculates class averages dynamically from the student list.
