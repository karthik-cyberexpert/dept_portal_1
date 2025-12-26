# User Profile Analysis

## Overview
The Profile module is a dynamic page that adapts based on the logged-in user's role (Admin, Faculty, Tutor, Student). It displays personal and professional information and provides editing capabilities.

## Key Features
-   **Role-Based Data**:
    -   **Admin**: Shows system stats (Years of Service, Awards).
    -   **Faculty**: Shows Academic credentials, Research papers, Student count.
    -   **Tutor**: Shows Mentorship stats, Assigned Batch/Section.
    -   **Student**: Shows Academic progress, CGPA, Attendance.
-   **Profile Editing**:
    -   Toggle "Edit Mode" to update phone, address, qualification, etc.
    -   Avatar upload placeholder.
-   **Activity Feed**: "Recent Activity" tab showing role-specific actions (e.g., "Approved marks" for Admin, "Submitted assignment" for Student).
-   **Security**: Password change and Two-Factor settings integrated into the profile view.

## UI Components
-   **Hero Card**: Large header with Avatar and key badges.
-   **Info Tabs**: Details, Activity, Security.
-   **Stats Grid**: Role-specific metric cards.

## Data Integration
-   **Multi-Store Access**: Fetches `getFaculty`, `getTutors`, or `getStudents` based on `user.role` to populate the profile.
-   **Auth Context**: Uses the currently logged-in user to determine identity.
