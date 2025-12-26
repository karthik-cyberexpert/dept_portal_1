# Tutor Leave Approvals Analysis

## Overview
Tutors act as the first line of approval for student leave requests. This portal allows them to review and act on these requests.

## Key Features
-   **Review Process**:
    -   View leave dates, reason, and type (Medical/OD).
    -   **Action**: Approve or Reject with one click.
-   **Filters**:
    -   **Time**: Current (< 6 months) vs History (> 6 months).
    -   **Type**: Leave vs On-Duty (OD).
    -   **Status**: Pending vs decided.

## UI Components
-   **Request Table**: (Inferred from code structure using Card/Table hybrid or List) List of requests.
-   **Action Buttons**: Quick Approve/Reject controls.

## Data Integration
-   **Leaves**: `getLeaveRequests`.
-   **Store**: `updateLeaveStatus`.
