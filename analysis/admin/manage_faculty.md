# Admin Faculty Management Analysis

## Overview
Similar to Student Management, this module handles the lifecycle of faculty records. It allows administrators to onboard staff, assign designations, and manage their status.

## Key Features
-   **Faculty List**:
    -   Card or List view (Grid layout observed in code) of faculty members.
    -   Searchable by Name, Employee ID, or Email.
-   **Operations**:
    -   **Add Faculty**: Form capturing Name, Email, Designation, Department, Qualification, and Experience.
    -   **Edit/Delete**: Management actions.
    -   **Bulk Upload**: Support for mass onboarding via XLSX.
-   **Filtering**:
    -   **Designation**: Filter by Professor, Assistant Professor, etc.
    -   **Status**: Active vs On Leave.

## UI Components
-   **Faculty Card**: Visual card showing Avatar, details, and status badge.
-   **Forms**: Dialog-based inputs for creating/editing profiles.

## Data Integration
-   **Faculty**: Fetched via `getFaculty`.
-   **Actions**: Uses standard store functions (`addFaculty`, `updateFaculty`, `deleteFaculty`).
