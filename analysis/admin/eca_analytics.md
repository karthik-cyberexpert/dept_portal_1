# Admin ECA Analytics Analysis

## Overview
This module tracks Extra-Curricular Activities (ECA). It allows admins to monitor student participation in non-academic events and view approval stats.

## Key Features
-   **Analytics Dashboard**:
    -   **Usage Stats**: Total Achievements, Pending Approvals, Approval Rate, Unique Participants.
    -   **Visuals**: Charts (Bar/Pie) implied for category distribution (e.g., Sports vs Cultural).
-   **Student Insight**:
    -   **Search**: Find a student by register number.
    -   **Individual Stats**: Total Points, Pending vs Approved count for the searched user.
-   **Filtering**: By Batch or Category (Sports, Cultural, etc.).

## UI Components
-   **Charts**: Recharts used for visual analytics.
-   **Stats Cards**: 4-column grid for high-level metrics.
-   **Search Bar**: For individual student lookup.

## Data Integration
-   **Achievements**: Fetched via `getAchievements`.
-   **Student Match**: Cross-references `getStudents` for search functionality.
