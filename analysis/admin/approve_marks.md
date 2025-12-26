# Admin Marks Approval Analysis

## Overview
The Approve Marks module is the final checkpoint in the grading workflow. It allows the admin to review mark sheets submitted by faculty, ensuring data integrity before final publication.

## Key Features
-   **Submission Queue**: List of pending submissions filtered by status.
-   **Detailed Review**:
    -   Drill down into a specific submission to see the list of student marks.
    -   **Metrics**: Shows Average Score, Max Score, and Student Count.
-   **Actions**:
    -   **Approve**: Finalizes the marks (status `approved`).
    -   **Reject**: Returns the submission to the faculty for correction (status `rejected`).
-   **History**: View past approvals and rejections.

## UI Components
-   **Tables**: For both the submission list and the detailed student marks view.
-   **Badges**: Color-coded status indicators (Verified, Approved, Rejected).
-   **Summary Cards**: Quick stats for the selected submission.

## Data Integration
-   **Marks Data**: Fetches `getMarks` and aggregates them into `MarksSubmission` objects based on `subjectCode` and `examType`.
-   **Status Workflow**: Updates mark entries via `updateMarkStatus`.
