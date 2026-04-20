import { createContext, useState, useEffect, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthUser, JwtPayload } from "../types/auth.types";

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

// Export types for hooks
export type { AuthContextType };

const STORAGE_KEY = "ems_auth";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

useEffect(() => {
    setIsLoading(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const authUser = JSON.parse(stored) as AuthUser;
        setUser(authUser);
      }
    } catch (error) {
      console.error("Failed to load auth from storage:", error);
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (token: string) => {
    const decoded = jwtDecode<JwtPayload>(token);

    const authUser: AuthUser = {
      username: decoded.sub,
      role: decoded.role,
      token,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
    setUser(authUser);
  };

  const logout = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  // Idle timeout logic
  const resetTimeout = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      logout();
      console.warn("Session expired due to 20min inactivity");
    }, 20 * 60 * 1000); // 20 minutes
  };

  useEffect(() => {
    if (user && !isLoading) {
      resetTimeout();
    }
  }, [user, isLoading]);

  useEffect(() => {
    const handleActivity = () => {
      if (user && !isLoading) {
        resetTimeout();
      }
    };

    document.addEventListener("mousemove", handleActivity);
    document.addEventListener("keydown", handleActivity);

    return () => {
      document.removeEventListener("mousemove", handleActivity);
      document.removeEventListener("keydown", handleActivity);
    };
  }, [user, isLoading]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !isLoading && !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
