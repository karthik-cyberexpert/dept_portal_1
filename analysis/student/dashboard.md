# Student Dashboard Analysis

## Overview
The Student Dashboard serves as the central hub for students to access all academic and administrative information. It provides a quick overview of performance, attendance, and upcoming events, along with easy access to various modules like Timetable, Marks, and Leave Portal.

## Key Features
-   **Welcome Section**: Personalized greeting with the student's name and a "Quick Actions" panel.
-   **Stats Overview**: Displays key metrics like Attendance, CGPA, Backlogs, and Credits Earned using visual cards.
-   **Attendance Chart**: A graphical representation (Line Chart) of attendance trends over months.
-   **Notice Board**: A scrolling list of important circulars and notices.
-   **Upcoming Events**: A list of scheduled events with dates and descriptions.
-   **Performance Graph**: A Bar Chart comparing internal marks across different subjects.
-   **Recent Results**: A table showing the latest exam results.

## UI Components
-   **StatCard**: Reusable component for displaying individual statistics (Attendance, CGPA, etc.) with icons and trend indicators.
-   **Charts**: Uses `recharts` for visualizing attendance and performance data.
-   **NoticeBoard**: A component to display circulars.
-   **EventList**: Displays upcoming events.
-   **QuickActions**: A set of buttons for common tasks (though in this specific file, navigation is largely handled by the sidebar/layout).

## Data Integration
-   **Student Data**: Fetches student details (name, stats) from `data-store.ts` (`getStudents`).
-   **Attendance/Performance**: Mock data is currently used for charts, but structured to be replaced with API data.
-   **Notices**: Integrates with the `Circulars` module data.

## Interaction
-   **Responsive Design**: Adapts to different screen sizes.
-   **Animations**: Uses `framer-motion` for smooth entry animations of cards and charts.
