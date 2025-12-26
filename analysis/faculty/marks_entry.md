# Faculty Marks Entry Analysis

## Overview
The Marks Entry module facilitates the grading process for various examinations (IA1, IA2, Model, Assignments). It consists of a selection screen to choose the target assessment and a detailed spreadsheet-like interface for data entry.

## Key Features
-   **Selection Screen (`MarksEntry.tsx`)**:
    -   Dropdowns to select **Batch/Section**, **Subject**, and **Exam Type**.
    -   Navigation to the dedicated entry sheet upon valid selection.
-   **Entry Sheet (`MarksEntrySheet.tsx`)**:
    -   **Student List**: Fetches students belonging to the selected section.
    -   **Detailed Breakdown**: Support for entering marks by part/question (inferred from `breakdown` structure) or total.
    -   **Absent Toggle**: Checkbox to mark students as absent.
    -   **Validation**: Checks against maximum marks logic.
    -   **Status**: Visual indicators for "Saved", "Pending", or "Unsaved Changes".

## UI Components
-   **Selection Card**: Aesthetic card with dropdowns (Select component) for exam filters.
-   **Marks Table**: Interactive table for entering scores.
-   **Sticky Headers**: To keep student names visible while scrolling (likely implemented or planned).

## Data Integration
-   **Marks**: Fetched via `getMarks` and filtered by subject/exam/student.
-   **Persistence**: `addOrUpdateMark` used to save entries. Includes support for saving `breakdown` data for granular reporting.
