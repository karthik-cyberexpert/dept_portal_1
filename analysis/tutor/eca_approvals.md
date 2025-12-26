# Tutor ECA Approvals Analysis

## Overview
This module enables the Class In-charge to verify achievement claims submitted by students. It includes a points-awarding mechanism (Mock gamification).

## Key Features
-   **Verification Workflow**:
    -   Review details: Title, Category, Level, Document Link.
    -   **Action**: Approve or Reject.
    -   **Gamification**: Award points (e.g., 10 for Local, 25 for State).
-   **Filtering**: Tabs for Pending, Approved, and Rejected requests.
-   **Context**: Scoped to the tutor's assigned batch/section.

## UI Components
-   **Request Cards**: Detailed cards showing student avatar, achievement metadata, and proof link.
-   **Process Dialog**: Modal to input points and remarks upon approval.

## Data Integration
-   **Achievements**: `getAchievements`.
-   **Update**: `updateAchievementStatus` with points and remarks.
