# Student LMS Quiz Analysis

## Overview
The LMS Quiz module allows students to take chapter-wise assessments to test their knowledge. It features practice, challenge, and mock exam modes, along with a leaderboard to gamify the learning experience.

## Key Features
-   **Quiz Listing**: Tabs for "Available" (Active) and "History" (Expired/Closed).
-   **Quiz Status**:
    -   **Active**: Live quizzes that can be taken immediately.
    -   **Scheduled**: Upcoming quizzes.
    -   **Expired**: Past quizzes.
-   **Gamification**:
    -   **Leaderboard**: A global leaderboard displaying the top 5 students based on scores and time taken.
    -   **Modes**: Shortcuts for Practice, Challenge, and Mock Exam modes (though functionally they may all link to quiz logic, visually they are distinct).
    -   **Overall Average**: calculating the student's average score across all attempts.
-   **Animations**: Smooth transitions between tabs and list items.

## UI Components
-   **Quiz Card**: Displays subject code, title, duration, question count, and difficulty.
-   **Leaderboard Widget**: Shows top rankers with avatars and scores.
-   **Inventory Tabs**: Toggle between Available and History.

## Data Integration
-   **Quizzes**: Fetched via `getQuizzes`.
-   **Results**: Fetched via `getQuizResults` to calculate leaderboard and averages.
-   **Leaderboard Logic**: Client-side aggregation of results to determine ranks.
