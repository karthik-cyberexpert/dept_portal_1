# Faculty Assignments Analysis

## Overview
The Assignments module allows faculty to create, track, and manage course assignments. It provides tools to view student submissions and monitor deadlines.

## Key Features
-   **Assignment Creation**: Form to create new assignments.
    -   Fields: Title, Subject (auto-code extraction), Due Date, Maximum Marks, Description.
    -   **Targeting**: Select specific Class and Section.
    -   **Alerts**: Option to send system alerts to students (mocked).
-   **Dashboard View**:
    -   List of active assignments filtered by the logged-in faculty.
    -   **Submission Tracking**: Visual progress indicators for submitted vs pending.
-   **View Modes**: Toggle between "Active Tasks" and "History".

## UI Components
-   **Create Dialog**: Modal form for new assignments.
-   **Assignment Card**: Displays metadata, due date, and submission stats.
-   **Stats Header**: Summary of total assignments and pending evaluations.

## Data Integration
-   **Assignments**: Fetched via `getAssignments`.
-   **Submissions**: Fetched via `getSubmissions` to calculate completion rates.
-   **Actions**: `addAssignment` saves the new task to the store.
