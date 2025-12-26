# Admin LMS Management Analysis

## Overview
The LMS Management module handles the creation and oversight of quizzes and assessments. It includes functionality to create new quizzes, assign them to batches, and view student results.

## Key Features
-   **Quiz Creation**:
    -   Form to input Title, Subject, Duration, Question Count, and Deadline.
    -   **Targeting**: Assign to 'All' or specific batches.
-   **Dashboard**:
    -   **Active Quizzes**: List of currently running assessments.
    -   **Results Pending**: Overview of completion status.
-   **Student Search**: Lookup functionality to find a specific student's quiz performance.
-   **Results View**: Tabular display of scores available in the store (inferred from `getQuizResults`).

## UI Components
-   **Quiz Card**: Shows metadata (Subject, Time, Difficulty) and status.
-   **Add Quiz Dialog**: Form for creating new assessments.
-   **Tabs**: Switch between "Active Quizzes" and "Results".

## Data Integration
-   **Quizzes**: Managed via `getQuizzes` and `addQuiz`.
-   **Results**: Fetched via `getQuizResults`.
