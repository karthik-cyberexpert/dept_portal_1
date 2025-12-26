# Admin Timetable Analysis

## Overview
The Admin Timetable module provides global scheduling capabilities. It allows the administrator to view and modify the timetable for any batch or faculty member.

## Key Features
-   **Dual Views**:
    -   **Student View**: Filter timetable by Batch and Section.
    -   **Faculty View**: Filter by Faculty name to see their personal schedule.
-   **Editor**:
    -   **Interactive Grid**: Click on any cell/slot to open the editor.
    -   **Edit Modal**: Assign Subject, Type (to set color), Faculty, and Room to a slot.
    -   **Validation**: Checks for Saturday half-day constraints.
-   **Slot Management**:
    -   Add new slots.
    -   Update existing slots.
    -   Delete slots.

## UI Components
-   **Schedule Grid**: Standard timetable layout.
-   **Slot Editor**: Dialog with form inputs for scheduling details.
-   **View Switcher**: Toggle between Student/Faculty perspectives.

## Data Integration
-   **Timetable**: centralized `getTimetable` and `saveTimetable` access.
-   **Entities**: Fetches `getFaculty` to populate assignment dropdowns.
