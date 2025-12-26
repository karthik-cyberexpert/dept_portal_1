# Admin Tutor Management Analysis

## Overview
This module manages the assignment of "Tutors" or "Class In-charges". It links a Faculty member to a specific Class/Section for mentorship and administrative oversight.

## Key Features
-   **Tutor Assignment**:
    -   **Selection**: choose a Faculty member from a dropdown.
    -   **Target**: Assign to a specific Batch and Section.
    -   **Capacity**: Define the number of students under mentorship.
-   **Dashboard**:
    -   **Stats**: Overview of Tutors, Active Status, and Batches covered.
    -   **Card View**: Detailed cards showing the assigned faculty and their target class.
-   **Flow**:
    -   Admins assign existing faculty as tutors.
    -   Can update allocation (change batch/section) or remove the role.

## UI Components
-   **Tutor Card**: Displays Faculty info alongside their assigned Class (e.g., CSE-A).
-   **Assignment Modal**: Form linking Faculty ID to Batch/Section.

## Data Integration
-   **Data Sources**:
    -   `getTutors`: Fetches existing assignments.
    -   `getFaculty`: Fetches potential candidates for assignment.
    -   `Batch Data`: For filling dropdowns.
-   **Logic**: Ensures valid linking between a staff member and a student cohort.
