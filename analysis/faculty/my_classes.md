# Faculty My Classes Analysis

## Overview
The "My Classes" module gives faculty members a detailed view of the courses they are teaching. It auto-generates a list of classes based on assigned subjects and sections and provides metrics for each.

## Key Features
-   **Class Generation**: Logic to generate class cards by calculating the cross-product of assigned `subjects` and `sections`.
-   **Class Metrics**:
    -   **Total Students**: Count of students in the specific section.
    -   **Attendance**: Average attendance percentage (mocked/randomized in current implementation).
    -   **Progress**: Course completion status (mocked).
    -   **Next Class**: Schedule information.
-   **Aggregate Stats**: Displays Total Courses, Total Students, and Average Attendance across all classes.

## UI Components
-   **Class Card**: Displays subject code, section, room, and metrics with visuals (icons, badges).
-   **Stats Header**: Summary cards at the top.

## Data Integration
-   **Faculty Data**: Fetches `subjects` and `sections` from the faculty profile.
-   **Student Data**: Filters `allStudents` by section to count enrollments.
-   **Mock Data**: Attendance and Progress values are currently simulated for demonstration.
