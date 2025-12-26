# Tutor Class Analytics Analysis

## Overview
Class Analytics provides deep insights into the academic health of the assigned section. It visualizes attendance trends, grade distributions, and subject-wise performance.

## Key Features
-   **Weekly Attendance**: Bar chart showing student presence count over the week.
-   **Grade Spectrum**: Pie chart distribution of grades (O, A+, A, etc.) for a selected exam (default IA-1).
-   **Subject Integrity Matrix**:
    -   Visual breakdown of performance per subject.
    -   Compares Class Average vs Pass Index.
    -   Progress bars for easy comparison.

## UI Components
-   **Charts**: Recharts BarChart and PieChart.
-   **Matrix Grid**: Card-based layout for subject stats.

## Data Integration
-   **Mock Logic**: Generates trend data and subject performance (currently randomized/mocked in component).
-   **Marks Data**: Aggregates `getMarks` to compute grade distribution.
