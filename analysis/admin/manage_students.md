# Admin Student Management Analysis

## Overview
The Student Management module is a comprehensive CRUD interface for managing the student body. It supports individual updates as well as bulk operations via Excel upload.

## Key Features
-   **Student List**:
    -   Paginated table view of students.
    -   Display of essential info: Name, Roll No, Batch, Section, Email.
-   **Operations**:
    -   **Add Student**: Manual entry form.
    -   **Bulk Upload**: Import students using standard XLSX templates.
    -   **Edit/Delete**: Context menu actions for individual records.
    -   **View Details**: Read-only modal with full student profile (implied).
-   **Filtering**:
    -   **Search**: By Name, Roll No, or Email.
    -   **Dropdowns**: Filter by Batch and Section.
-   **Stats**: Top-level cards showing Total Students, Active Batches, etc.

## UI Components
-   **Data Table**: Reusable table component with pagination logic.
-   **Dialogs**: Modals for Add, Edit, View, and Confirmation (Delete).
-   **File I/O**: Hidden file input for handling Excel uploads.

## Data Integration
-   **Students**: Fetched via `getStudents`.
-   **Persistence**: Uses `addStudent`, `updateStudent`, `deleteStudent` from the data store.
-   **Batch Data**: Retrieves active batches to populate filters.
