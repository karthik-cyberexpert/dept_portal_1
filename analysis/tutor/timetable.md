# Tutor Timetable Analysis

## Overview
Displays the schedule for the tutor's specific batch and section. It is a read-only view designed for quick reference.

## Key Features
-   **Schedule View**: Grid layout of the week's classes.
-   **Context**: Automatically loads the schedule for the tutor's assigned Batch/Section.
-   **Details**: Shows Subject, Time, and Type (Theory/Lab) for each slot.

## UI Components
-   **Timetable Grid**: Standard mapping of Days x Periods.
-   **Legend**: Color codes for different session types.

## Data Integration
-   **Timetable**: Fetched via `getTimetable`.
-   **Filtering**: Clientside filtering by `classId` (Batch) and `sectionId` (Section).
