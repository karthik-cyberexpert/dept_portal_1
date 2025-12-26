# Admin Settings Analysis

## Overview
The System Settings module allows administrators to configure global application parameters. It covers General, Notification, Academic, and Security preferences.

## Key Features
-   **General**:
    -   Institution Details (Name, Department).
    -   Preferences (Theme, Language, Font Size).
-   **Security**:
    -   Session Timeout, Max Login Attempts, Password Expiry.
    -   Two-Factor Authentication (Email/SMS).
    -   "Sign Out All Devices" functionality.
-   **Notifications**: Toggles for Email, Push, and SMS alerts for various system events.
-   **Audit Log**: "Login History" tracking device, location, and time.

## UI Components
-   **Tabs**: Organized navigation (General, Academic, Security, Data).
-   **Form Controls**: Switches, Inputs, Selects for configuration.
-   **Cards**: Grouped settings sections.

## Data Integration
-   **State**: Local state `settings` initialized with default values.
-   **Mock Persistence**: `handleSave` triggers a toast.
