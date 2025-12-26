# Faculty Dashboard Analysis

## Overview
The Faculty Dashboard allows staff to manage their daily academic activities, providing a snapshot of their schedule, pending evaluations, and recent uploads.

## Key Features
-   **Stats Overview**:
    -   **Today's Classes**: Count and total hours.
    -   **Subjects Handled**: Total unique subjects and sections.
    -   **Pending Evaluation**: Number of assignments submitted but not yet graded.
    -   **Notes Uploaded**: Count of resources uploaded this semester.
-   **Today's Schedule**: A chronological list of classes for the current day, showing time, subject, section, and room.
-   **Weekly Overview**: A Bar Chart visualizing the number of classes/hours per day of the week.
-   **Quick Actions**:
    -   **My Timetable**: Navigates to the full timetable view.
    -   **Upload Notes**: Navigates to the resource management page.

## UI Components
-   **StatCard**: Reusable cards for metrics.
-   **List View**: For displaying the daily schedule.
-   **Charts**: Recharts used for the weekly overview.

## Data Integration
-   **Faculty Data**: Identifies the logged-in faculty member.
-   **Timetable**: Fetches `getTimetable` and filters by `facultyId` or `facultyName`.
-   **Assignments/Submissions**: Aggregates pending evaluations by cross-referencing assignments created by the faculty with student submissions.
-   **Resources**: Counts resources uploaded by the faculty.
