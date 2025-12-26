# Student Circulars Analysis

## Overview
The Circulars module acts as a digital notice board, displaying official announcements and notices relevant to students. It supports categorization and search to help students find specific information.

## Key Features
-   **Categorization**: Sidebar filter to view notices by category (Academic, Examination, Placement, Event, etc.).
-   **Search**: Real-time filtering by title or description.
-   **Priority Handling**: Visual distinction for High, Medium, and Low priority notices.
-   **Audience Filtering**: Only displays circulars targeted at 'all' or 'students'.
-   **Interaction**: Button to "Download Attachment" (mock functionality).

## UI Components
-   **Sidebar**: Contains category filters and quick stats.
-   **Search Input**: Top bar search field.
-   **Notice Card**: Displays individual circular details with priority badge, date, and description.

## Data Integration
-   **Circulars**: Fetched via `getCirculars`.
-   **Filtering**: Logic primarily handled on the client-side (filtering the full list).
