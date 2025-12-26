# Student Personal Details Analysis

## Overview
The Personal Details module allows students to view their official profile information stored in the system. It covers identity, biological data, support network, and professional links.

## Key Features
-   **Categorized Information**:
    -   **Identity**: Name, Roll Number, Email, Phone.
    -   **Bio/Demographics**: DOB, Gender, Blood Group, Address.
    -   **Support**: Guardian details.
    -   **Professional**: LinkedIn, GitHub, Portfolio.
-   **Profile Card**: A visually rich card showing the student's avatar, class, attendance, and "Digital Trust Score".
-   **Verification Badge**: UI element indicating a "Blockchain Verified Profile".

## UI Components
-   **Profile Image**: Large avatar display.
-   **Info Groups**: Grid layout separating different categories of information.
-   **Progress Bar**: Shows the "Digital Trust Score".

## Data Integration
-   **Student Data**: Fetched via `getStudents`. Matches the current logged-in user to their student record.
-   **Mock Data**: "Digital Trust Score" and some verified badges are currently static/mocked for UI demonstration.
