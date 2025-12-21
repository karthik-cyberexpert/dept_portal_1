// Authentication utilities with localStorage

export type UserRole = 'admin' | 'tutor' | 'faculty' | 'student';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  department?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

// Dummy credentials for testing
export const DUMMY_CREDENTIALS: Record<UserRole, { email: string; password: string; user: User }> = {
  admin: {
    email: 'admin@college.edu',
    password: 'admin123',
    user: {
      id: 'admin-001',
      email: 'admin@college.edu',
      name: 'Dr. Rajesh Kumar',
      role: 'admin',
      department: 'Computer Science & Engineering',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    },
  },
  tutor: {
    email: 'tutor@college.edu',
    password: 'tutor123',
    user: {
      id: 'tutor-001',
      email: 'tutor@college.edu',
      name: 'Prof. Lakshmi Devi',
      role: 'tutor',
      department: 'Computer Science & Engineering',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tutor',
    },
  },
  faculty: {
    email: 'faculty@college.edu',
    password: 'faculty123',
    user: {
      id: 'faculty-001',
      email: 'faculty@college.edu',
      name: 'Mr. Senthil Murugan',
      role: 'faculty',
      department: 'Computer Science & Engineering',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=faculty',
    },
  },
  student: {
    email: 'student@college.edu',
    password: 'student123',
    user: {
      id: 'student-001',
      email: 'student@college.edu',
      name: 'Arun Prasath',
      role: 'student',
      department: 'Computer Science & Engineering',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student',
    },
  },
};

const AUTH_KEY = 'college_portal_auth';

export function getStoredAuth(): AuthState {
  try {
    const stored = localStorage.getItem(AUTH_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading auth state:', error);
  }
  return { user: null, isAuthenticated: false };
}

export function setStoredAuth(state: AuthState): void {
  try {
    localStorage.setItem(AUTH_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Error storing auth state:', error);
  }
}

export function clearStoredAuth(): void {
  try {
    localStorage.removeItem(AUTH_KEY);
  } catch (error) {
    console.error('Error clearing auth state:', error);
  }
}

export function login(email: string, password: string): { success: boolean; user?: User; error?: string } {
  // Check against all dummy credentials
  for (const [role, creds] of Object.entries(DUMMY_CREDENTIALS)) {
    if (creds.email === email && creds.password === password) {
      const authState: AuthState = {
        user: creds.user,
        isAuthenticated: true,
      };
      setStoredAuth(authState);
      return { success: true, user: creds.user };
    }
  }
  
  return { success: false, error: 'Invalid email or password' };
}

export function logout(): void {
  clearStoredAuth();
}

export function getRoleDashboardPath(role: UserRole): string {
  switch (role) {
    case 'admin':
      return '/admin';
    case 'tutor':
      return '/tutor';
    case 'faculty':
      return '/faculty';
    case 'student':
      return '/student';
    default:
      return '/';
  }
}

export function getRoleDisplayName(role: UserRole): string {
  switch (role) {
    case 'admin':
      return 'Administrator (HOD)';
    case 'tutor':
      return 'Class In-Charge';
    case 'faculty':
      return 'Subject Teacher';
    case 'student':
      return 'Student';
    default:
      return 'User';
  }
}

export function getRoleColor(role: UserRole): string {
  switch (role) {
    case 'admin':
      return 'from-purple-500 to-indigo-600';
    case 'tutor':
      return 'from-teal-500 to-cyan-600';
    case 'faculty':
      return 'from-orange-500 to-amber-600';
    case 'student':
      return 'from-blue-500 to-indigo-600';
    default:
      return 'from-gray-500 to-gray-600';
  }
}
