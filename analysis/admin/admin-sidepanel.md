# Admin Side Panel Analysis
**Component:** `src/components/dashboard/DashboardSidebar.tsx`

## 1. Structure Overview
The sidebar is a responsive, collapsible navigation component that adapts its content based on the user's role. For the `admin` role, it renders a specific set of navigation items defined in the `adminLinks` array.

## 2. Admin Navigation Items
The following items are displayed in the sidebar for Admin users:

| Label | Icon | Route Path | Purpose |
| :--- | :--- | :--- | :--- |
| **Dashboard** | `LayoutDashboard` | `/admin` | Main overview page |
| **Manage Students** | `GraduationCap` | `/admin/students` | Student CRUD operations |
| **Manage Faculty** | `Users` | `/admin/faculty` | Faculty staff management |
| **Manage Tutors** | `Users` | `/admin/tutors` | Class teacher/tutor management |
| **Batches & Classes** | `Users` | `/admin/batches` | Academic structure management |
| **Timetable** | `Calendar` | `/admin/timetable` | Schedule management |
| **Approve Marks** | `ClipboardList` | `/admin/marks` | Academic results verification |
| **Notes Analytics** | `BookOpen` | `/admin/notes` | Resource usage statistics |
| **Assignments** | `FileText` | `/admin/assignments` | Assignment oversight |
| **Circulars** | `Bell` | `/admin/circulars` | Announcements & Notices |
| **Leave Approvals** | `ExternalLink` | `/admin/leave` | Staff/Student leave requests |
| **LMS Management** | `Trophy` | `/admin/lms` | Learning Management System controls |
| **ECA Analytics** | `Sparkles` | `/admin/eca` | Extra-curricular activities tracking |
| **Settings** | `Settings` | `/admin/settings` | System configuration |

## 3. Sidebar Features
- **Collapsible State**: Can be toggled between expanded (280px) and collapsed (80px) modes.
- **Active State Styling**: Current route is highlighted with a primary background and glow effect (`bg-sidebar-primary`).
- **User Profile**: Displays logged-in admin's avatar, name, and role at the bottom.
- **Theme Toggle**: Allows switching between Light and Dark modes.
- **Logout Action**: Dedicated button to terminate the session.

## 4. Code Reference
```tsx
const adminLinks: SidebarLink[] = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
  { label: 'Manage Students', icon: GraduationCap, path: '/admin/students' },
  { label: 'Manage Faculty', icon: Users, path: '/admin/faculty' },
  { label: 'Manage Tutors', icon: Users, path: '/admin/tutors' },
  { label: 'Batches & Classes', icon: Users, path: '/admin/batches' },
  { label: 'Timetable', icon: Calendar, path: '/admin/timetable' },
  { label: 'Approve Marks', icon: ClipboardList, path: '/admin/marks' },
  { label: 'Notes Analytics', icon: BookOpen, path: '/admin/notes' },
  { label: 'Assignments', icon: FileText, path: '/admin/assignments' },
  { label: 'Circulars', icon: Bell, path: '/admin/circulars' },
  { label: 'Leave Approvals', icon: ExternalLink, path: '/admin/leave' },
  { label: 'LMS Management', icon: Trophy, path: '/admin/lms' },
  { label: 'ECA Analytics', icon: Sparkles, path: '/admin/eca' },
  { label: 'Settings', icon: Settings, path: '/admin/settings' },
];
```
