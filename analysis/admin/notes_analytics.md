# Admin Notes Analytics Analysis

## Overview
Notes Analytics provides insights into the usage of the resource repository. It tracks uploads by subject and type (Notes, Question Papers, Manuals).

## Key Features
-   **Resource Tracking**:
    -   Counts by Type: Lecture Notes, Question Banks, Lab Manuals.
    -   **downloads**: Aggregated download count.
-   **Subject Coverage**:
    -   Calculates "Completion Rate" based on a mock target (e.g., 5 units per subject).
    -   Identifies which subjects have low resource coverage.
-   **Visuals**:
    -   Charts to show distribution of resource types.

## UI Components
-   **Analytics Cards**: Display counts for each resource category.
-   **Charts**: Pie chart for type distribution.

## Data Integration
-   **Resources**: Fetched via `getResources`.
-   **Aggregation**: Logic to sum up uploads by subject to calculate coverage stats.
