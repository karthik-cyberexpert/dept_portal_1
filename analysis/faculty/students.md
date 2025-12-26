# Faculty Student Management Analysis

## Overview
The Student Management module provides faculty with a searchable list of students. It allows them to view academic details and marks for their students.

## Key Features
-   **Student List**: A table display of students with columns for Roll No, Name, Batch, Section, and Marks.
-   **Filtering**:
    -   **Batch/Section**: Dropdowns to filter the list by specific cohort.
    -   **Search**: Real-time search by Name or Roll Number.
-   **Marks Integration**: Columns showing internal marks (IA1, IA2, IA3, Model) fetched from the marks store.
-   **Total Internal**: Verification or calculation of the total internal mark (Sum of components).

## UI Components
-   **Data Table**: sortable and filterable table component.
-   **Search/Filter Bar**: Top control bar for list manipulation.
-   **Export**: Button to export data (mock).

## Data Integration
-   **Students**: Fetched via `getStudents`.
-   **Marks**: Fetched via `getMarks` to populate the academic columns.
-   **Logic**: `calculateTotalInternal` helper to sum up component marks for display.
