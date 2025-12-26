# Student Leave Portal Analysis

## Overview
The Leave Portal enables students to apply for leave or On Duty (OD) permissions and track their application status. It provides a historical view of past applications and displays the current leave balance statistics.

## Key Features
-   **Leave Balance**: Displays statistics for Sick Leave, Casual Leave, and On Duty permissions using visual cards.
-   **New Application Form**: A comprehensive form to apply for leave.
    -   **Types**: Sick Leave, Casual Leave, On Duty (Academic), On Duty (ECA).
    -   **Date Selection**: Start and End dates.
    -   **Reason & Contact**: Text area for reason and input for emergency contact.
    -   **File Upload**:
        -   **Conditional Logic**: Optional for 'Casual Leave', Required for all other types.
        -   **Validation**: Enforces file type (PNG, JPG, JPEG) and size limit (1MB).
        -   **UI**: Dynamic labeling "(Required)" vs "(Optional)".
-   **Leave History**: A list of past applications with their status (Approved, Rejected, Pending).
-   **Status Badges**: Visual indicators for application status.

## UI Components
-   **Statistics Cards**: Custom cards to show leave balance.
-   **Form Elements**: Inputs, Selects, Textareas, and File Input.
-   **Animations**: `framer-motion` used for form appearance and list transitions.
-   **Lock Mechanism**: Disables the "Apply" button for graduated students.

## Data Integration
-   **Leave Data**: Fetches and stores leave requests in `data-store.ts` (`getLeaveRequests`, `addLeaveRequest`).
-   **Student Data**: Fetches student status to check for graduation lock.

## Recent Changes
-   **File Upload**: Added file input with size/type validation and conditional mandatory logic.
-   **Balance**: Restored leave balance statistics section.
