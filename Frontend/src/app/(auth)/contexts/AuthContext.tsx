"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

export type UserRole = "project_owner" | string;

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface AuthResult {
  success: boolean;
  error?: string;
}

export interface AuthContextValue {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  signup: (email: string, password: string, verificationCode: string) => Promise<AuthResult>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const savedUser = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser) as User);
      } catch {
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<AuthResult> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (email && password) {
        const userData: User = {
          id: "1",
          email,
          name: email.split("@")[0],
          role: "project_owner",
        };
        setUser(userData);
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(userData));
        }
        return { success: true };
      }
      throw new Error("Invalid credentials");
    } catch (error: unknown) {
      return { success: false, error: error instanceof Error ? error.message : "Login failed" };
    }
  };

  const signup = async (
    email: string,
    password: string,
    verificationCode: string
  ): Promise<AuthResult> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (email && password && verificationCode === "12345") {
        const userData: User = {
          id: "1",
          email,
          name: email.split("@")[0],
          role: "project_owner",
        };
        setUser(userData);
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(userData));
        }
        return { success: true };
      } else if (verificationCode !== "12345") {
        throw new Error("Invalid verification code. Use 12345 for demo.");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error: unknown) {
      return { success: false, error: error instanceof Error ? error.message : "Signup failed" };
    }
  };

  const logout = (): void => {
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }
  };

  const value: AuthContextValue = {
    user,
    login,
    signup,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


