# Tutor Marks Verification Analysis

## Overview
This module is the "Level 2" check in the grading process. After faculty submit marks, the Class In-charge verifies them before they move to the HOD/Admin.

## Key Features
-   **Pendency Dashboard**:
    -   Stats for Total Subjects, Pending Verification, and Verified count.
-   **Verification List**:
    -   Grouped by Subject and Exam Type.
    -   Shows Faculty Name, Student Count, and Submission Date.
-   **Action**:
    -   **Verify & Forward**: Updates status from `submitted` to `approved` (NOTE: Logic implies approval forwarding).
    -   **View Marks**: (Implied) Detailed view of the submission.

## UI Components
-   **Verification Cards**: List view of pending items with status badges.
-   **Exam Filter**: Dropdown to toggle between Internal Assessments (IA1, IA2, etc.).

## Data Integration
-   **Marks**: Fetched via `getMarks`.
-   **Grouping**: Complex logic to bundle individual mark entries into "Submissions" by Subject+Exam.
-   **Update**: Uses `updateMarkStatus`.
