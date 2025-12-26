# Faculty Notes Upload Analysis

## Overview
The Notes Upload module enables faculty to share learning resources (Notes, Question Papers, Manuals) with their students. It allows filtering of existing resources and uploading new ones.

## Key Features
-   **Resource Management**: List view of uploaded files with download and delete actions.
-   **Upload Workflow**:
    -   **Dialog Form**: Fields for Title, Subject, Class/Section, Type (Note/QP/Manual), and File Type (PDF/DOC/PPT).
    -   **Mock Upload**: Simulation of file upload process with loading state and success toast.
-   **Filtering**: Real-time search by resource title.
-   **Card View**: resources displayed as cards with icon indicators for file type.

## UI Components
-   **Resource Card**: Shows file icon, title, subject, upload date, and file size.
-   **Upload Dialog**: Form for new entries.
-   **Search Bar**: For filtering the list.

## Data Integration
-   **Resources**: Fetched via `getResources` and filtered by `facultyId`.
-   **Faculty Data**: Used to populate Subject and Class dropdowns in the upload form.
-   **Actions**: `addResource` and `deleteResource` functions manage the data store.
