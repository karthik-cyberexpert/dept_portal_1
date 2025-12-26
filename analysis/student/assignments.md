# Student Assignments Analysis

## Overview
The Assignments module allows students to view, track, and submit their course assignments. It categorizes assignments by status (Pending, Submitted, Overdue) and provides upload functionality for submissions.

## Key Features
-   **Assignment List**: Displays assignments for the student's specific class/section.
    -   **Priority Indicators**: Color-coded badges for Overdue, High Urgency (<= 2 days), and Normal assignments.
    -   **Status Tracking**: Shows completion progress (0%, 50%, 100%) and submission status.
-   **Submission Workflow**:
    -   **Upload Dialog**: Allows students to upload files for pending assignments.
    -   **Mock Upload**: Simulates file upload with a timeout and success toast.
    -   **View Submission**: If already submitted, shows a button to view the submission (mock).
-   **Statistics**:
    -   **Counters**: Total Completed vs Pending.
    -   **Completion Rate**: A progress bar showing the percentage of assignments completed.
-   **Upcoming Deadlines**: A sidebar widget showing the next 3 deadlines.

## UI Components
-   **Assignment Card**: detailed card for each assignment with progress bar, metadata, and action buttons.
-   **Dialog**: Used for the file upload interface.
-   **Progress**: UI component to visualize completion status.
-   **Badge**: Used for status labels (OVERDUE, PENDING).

## Data Integration
-   **Assignments**: Fetched via `getAssignments`. Filtered by class/section.
-   **Submissions**: Fetched via `getSubmissions` to determine status.
-   **Actions**: `submitAssignment` function is called to save new submissions.
