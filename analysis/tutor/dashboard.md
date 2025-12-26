# Tutor Dashboard Analysis

## Overview
The Tutor Dashboard is designed for Class In-charges. It focuses on the specific section/batch the tutor is mentoring, providing oversight on attendance, approvals, and academic performance.

## Key Features
-   **Section Overview**:
    -   **Class Strength**: Total students in the assigned section.
    -   **Pendencies**: Combined count of pending Leave and ECA requests.
    -   **Verification**: Marks submitted by faculty that need tutor verification.
    -   **Alerts**: Pulse on assignment completion rates.
-   **Approval Queue**: Unified list of pending items (Leaves, ECA) for quick action.
-   **Faculty Quick Actions**:
    -   Shortcuts to Faculty responsibilities (since Tutors are also Faculty) like Marks Entry, Notes Upload, etc.
-   **Performance Trend**: Chart showing Attendance vs Marks trends for the class over recent months.
-   **Today's Schedule**: Timetable specific to the tutor's class.

## UI Components
-   **GlassStatCard**: Metrics with glassmorphism effect.
-   **Action Grid**: Large buttons for common faculty tasks.
-   **Approval List**: Actionable items with "Approve" buttons.

## Data Integration
-   **Context**: Identifies the Tutor and their assigned Batch/Section.
-   **Scope**: Filters all data (Students, Leaves, Marks) to restricted scope of the assigned section.
