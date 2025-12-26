# Admin Leave Approvals Analysis

## Overview
This module acts as the "Department Leave Portal" where the HOD/Admin reviews student leave requests.

## Key Features
-   **Request Management**:
    -   **Pending Tab**: List of active requests awaiting decision.
    -   **History Tab**: Archive of past decisions.
-   **Approval Workflow**:
    -   **Approve**: Grants the leave.
    -   **Reject**: Denies the request.
    -   **Context**: Shows User Name, Leave Type, Dates, and Reason.
-   **Filtering**: Search by user name or leave type.
-   **Attachment View**: UI indicator for attached medical documents (if any).

## UI Components
-   **Request Card**: Info-dense card with Avatar, details, and action buttons.
-   **Tabs**: To separate actionable items from history.

## Data Integration
-   **Leaves**: Fetched via `getLeaveRequests`.
-   **Updates**: `updateMarkStatus` (Note: Logic in code uses `updateLeaveStatus`, file import might be mixed in previous observation, but function relates to leave status) to persist decisions.
