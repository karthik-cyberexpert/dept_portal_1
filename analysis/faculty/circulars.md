# Faculty Circulars Analysis

## Overview
This module displays circulars and notices relevant to the faculty. It filters out student-only announcements to show only those targeted at 'faculty' or 'all'.

## Key Features
-   **Notice Board**: List of circulars with Priority, Category, and Date.
-   **Filtering**:
    -   **Audience**: Automatically filters for `audience === 'faculty' || 'all'`.
    -   **Search**: Text-based search filter.
-   **Actions**:
    -   **Download PDF**: Mock button for attachments.
    -   **Mark as Read**: UI interaction (mock).

## UI Components
-   **Notice Card**: Detailed card layout for each item.
-   **Search Bar**: Input for filtering.

## Data Integration
-   **Circulars**: Fetched via `getCirculars`.
