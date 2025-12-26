# Admin Dashboard Analysis

## Overview
The Admin Dashboard serves as the command center for the institution, providing high-level analytics on student enrollment, faculty staffing, and operational bottlenecks (pending approvals).

## Key Features
-   **Stats Overview**:
    -   **Total Students**: Live count from the store.
    -   **Faculty Members**: Live count.
    -   **Pending Leaves**: Count of leave requests requiring action.
    -   **Approve Marks**: Detailed count of mark sheets waiting for final verification.
-   **Institution Overview Chart**:
    -   Bar chart comparing Student vs Faculty growth over the last 6 months.
-   **Batch Distribution**: Pie chart showing student distribution across different batches (years).
-   **Approval Queues**:
    -   **Marks Approval Queue**: Grouped list of pending mark submissions by Subject/Exam type.
    -   **Recent Activities**: Unified timeline stream of events (New Student, Notice Posted, Leave Status).
-   **Semester Progress**: Visual trackers for each semester (Sem 1 - 8) indicating active status and timeline progress.

## UI Components
-   **StatCard**: Standard metric cards.
-   **Charts**: Recharts for Growth (Bar) and Distribution (Pie).
-   **Activity Feed**: List component with icons for different event types.
-   **Progress Trackers**: Linear progress bars for semester timeline.

## Data Integration
-   **Aggregated Data**: Fetches all core entities (Students, Faculty, Marks, Leaves, Circulars) to compute statistics.
-   **Computed Metrics**:
    -   `departmentStats`: Calculates historical growth.
    -   `batchDistribution`: Aggregates students by batch.
    -   `marksApprovalQueue`: Groups verified marks by exam/subject.
