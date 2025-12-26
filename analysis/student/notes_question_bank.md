# Student Notes & Question Bank Analysis

## Overview
This module provides students with access to learning resources such as Lecture Notes, Question Banks, and Previous Year Question Papers (QP). It facilitates resource discovery through search and subject filtering.

## Key Features
-   **Resource Listing**: displaying resources with file type, size, and download options.
-   **Filtering**:
    -   **Sidebar Navigation**: "Lecture Notes" vs "Question Bank" buttons filter the view by resource type.
    -   **Subject Filter**: Sidebar list of subjects to filter resources further.
    -   **Search**: Real-time search by title or subject code.
-   **Request Material**:
    -   **Dialog**: A form to request missing materials.
    -   **Faculty Selection**: Dropdown to select a faculty member to notify.
    -   **Notification**: Sends a system notification to the selected faculty.

## UI Components
-   **ResourceCard**: Component to display individual resource details.
-   **Sidebar**: Contains navigation buttons and subject filters.
-   **EmptyState**: valid visual feedback when no resources match criteria.

## Data Integration
-   **Resources**: Fetched from `data-store.ts` (`getResources`).
-   **Faculty**: Fetches faculty list for the request form (`getFaculty`).
-   **Notifications**: Uses `addNotification` (or similar logic) to alert faculty.

## Recent Changes
-   **Navigation**: Switched from Tab-based to Sidebar-based navigation for resource types.
-   **Request Feature**: Added "Request Material" button and dialog, replacing the old "Library Portal" link.
