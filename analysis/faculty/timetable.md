# Faculty Timetable Analysis

## Overview
The Faculty Timetable module displays the weekly teaching schedule. It is similar to the student timetable but filtered for the faculty member's assigned classes.

## Key Features
-   **Weekly Grid**: Standard timetable grid showing Day vs Period.
-   **Slot Details**: Displays Subject, Class/Section, and Room Number for each teaching slot.
-   **Merging Logic**: Adjacent slots with the same content are merged visually.
-   **Actions**: Buttons to "Download PDF" and "Sync Calendar" (mock).

## UI Components
-   **Grid Layout**: Table-based layout with `rowSpan` and `colSpan` merging instructions.
-   **Legend**: Color key for different session types (Theory, Lab, etc.).

## Data Integration
-   **Timetable**: Fetched via `getTimetable` and filtered by `facultyId`.
-   **Slot Matching**: Logic to find specific slots for the grid cells.
