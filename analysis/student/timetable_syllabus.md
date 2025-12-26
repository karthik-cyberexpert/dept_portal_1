# Student Timetable & Syllabus Analysis

## Overview
The Timetable & Syllabus module provides students with their weekly class schedule and a list of course subjects. It features a responsive table layout for the schedule and a detailed list for the syllabus.

## Key Features
-   **Weekly Timetable**:
    -   **Grid Layout**: Displays days (rows) and periods (columns).
    -   **Slot Merging**: Logic to merge adjacent cells if the same subject continues across periods.
    -   **Break Handling**: Visual separators for Short Break and Lunch Break.
    -   **Period Details**: Shows Subject Name, Code, Faculty Name, and Room Number.
    -   **Color Coding**: Distinct colors for Theory, Lab, Tutorial, and Free periods.
-   **Syllabus View**:
    -   Tabbed interface to switch between Timetable and Syllabus.
    -   **Course List**: Table showing Subject Name, Code, and Assigned Faculty.
    -   **Faculty Lookup**: Dynamically finds the faculty for a subject by cross-referencing the timetable slots.
-   **Animations**: Framer Motion used for smooth transitions and hover effects on slots.

## UI Components
-   **Tabs**: To switch views.
-   **Table**: Custom table implementation with `rowSpan` and `colSpan` logic for the grid.
-   **Cards**: Container style for the main content areas.

## Data Integration
-   **Timetable**: Fetched via `getTimetable`. Filtered by the student's batch/section.
-   **Syllabus**: Fetched via `getSyllabus`.
-   **Logic**:
    -   `hasSameContent`: Helper function to determine if slots should be merged.
    -   `getSlotColor`: Helper for visual styling.
