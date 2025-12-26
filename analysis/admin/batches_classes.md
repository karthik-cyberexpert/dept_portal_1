# Admin Batches & Classes Analysis

## Overview
The Batches & Classes module is the structural backbone of the academic system. It defines the Batches (e.g., 2024-2028), the Semester they are currently in, and the specific Sections (A, B, C) available.

## Key Features
-   **Batch Management**:
    -   **Create Batch**: Define Start Year and Duration (implicitly 4 years).
    -   **Semester Control**: Set the current Active Semester (Odd/Even) and dates.
-   **Section Management**:
    -   **Hierarchical View**: Accordion or Tree view where Batches can be expanded to show Sections.
    -   **Add Section**: Dynamically add sections to a batch.
    -   **Edit**: Rename sections or change capacities.
-   **Visualization**:
    -   **Tabs**: Organize viewing or configuration.
    -   **Collapsible Lists**: To manage density of information (Batches -> Classes -> Sections).

## UI Components
-   **Collapsible**: Used for the nested structure of Batch > Section.
-   **Date Pickers**: For setting semester start/end dates.
-   **Settings Sheet**: Slide-over panel for complex configurations (inferred structure).

## Data Integration
-   **Hierarchical Data**:
    -   `BATCHES_KEY`: High-level batch info.
    -   `SECTIONS_KEY`: Linked to batches.
-   **Store Functions**: `getData`, `saveData` used for lower-level entity management.
