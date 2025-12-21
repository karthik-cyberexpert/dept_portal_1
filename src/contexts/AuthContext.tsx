import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, getStoredAuth, login as authLogin, logout as authLogout, getRoleDashboardPath } from '@/lib/auth';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({ user: null, isAuthenticated: false });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for stored auth on mount
    const stored = getStoredAuth();
    setAuthState(stored);
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const result = authLogin(email, password);
    
    if (result.success && result.user) {
      setAuthState({ user: result.user, isAuthenticated: true });
      const dashboardPath = getRoleDashboardPath(result.user.role);
      navigate(dashboardPath);
    }
    
    setIsLoading(false);
    return { success: result.success, error: result.error };
  };

  const logout = () => {
    authLogout();
    setAuthState({ user: null, isAuthenticated: false });
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user: authState.user,
        isAuthenticated: authState.isAuthenticated,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
