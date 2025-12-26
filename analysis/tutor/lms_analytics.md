# Tutor LMS Analytics Analysis

## Overview
Provides insights into how the class is performing in online assessments (Quizzes). Identifies top performers and overall engagement.

## Key Features
-   **Engagement Stats**:
    -   Total Assessments, Active Sessions.
    -   Average Accuracy (Class-wide).
-   **Leaderboard**: "Hall of Fame" showing top 5 students by score.
-   **Result Analysis**: (Implied) filtering results to show only the tutor's students.

## UI Components
-   **Stats Grid**: 4-column metrics.
-   **Leaderboard List**: Sorted list of top students.

## Data Integration
-   **Quizzes**: `getQuizzes`.
-   **Results**: `getQuizResults` filtered by the students in the tutor's section.
