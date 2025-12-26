# Tutor Notes Status Analysis

## Overview
Monitors whether subject teachers are uploading necessary learning materials for the tutor's class. It tracks "Unit Progress" for each subject.

## Key Features
-   **Coverage Tracking**:
    -   Tracks upload count against a mock target (e.g., 5 Units).
    -   **Status**: Completed, In Progress, or Delayed.
-   **Subject Overview**:
    -   Grid of cards showing each subject's material status.
    -   Identify Faculty coordinator for the subject.

## UI Components
-   **Progress Bars**: Visual indicator of unit completion.
-   **Subject Cards**: detailed view with Faculty info and last update timestamp.

## Data Integration
-   **Syllabus**: `getSyllabus` to define the subjects.
-   **Resources**: `getResources` to count uploads per subject.
