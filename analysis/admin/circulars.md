# Admin Circulars Analysis

## Overview
The Circulars module allows administrators to broadcast official notices to the institution. It supports creating, categorizing, and deleting announcements.

## Key Features
-   **Publishing**:
    -   **Create Form**: Title, Description, Category (Urgent, Exam, Event, Academic), Priority, and Audience.
    -   **Audience Targeting**: Send to 'All', 'Students', or 'Faculty', with optional Batch filtering.
    -   **Alerts**: Toggle to show a high-visibility alert for urgent notices.
-   **Management**:
    -   **List View**: All active circulars.
    -   **Delete**: Remove outdated notices.
-   **Visualization**:
    -   Color-coded cards based on Category (e.g., Red for Urgent, Purple for Exam).

## UI Components
-   **Add Dialog**: Form for drafting notices.
-   **Notice Card**: Display component with badges for Priority and Category.
-   **Filters**: Category and Batch selection.

## Data Integration
-   **Circulars**: Managed via `getCirculars` and `addCircular`.
