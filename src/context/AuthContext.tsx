// src/context/AuthContext.tsx

'use client';

import React, { createContext, useState, useEffect, useCallback } from 'react';
import { AuthContextType, User } from './AuthContext.types';
import { makeAuthenticatedRequest } from '../lib/api';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Fetch user data
  const fetchUser = useCallback(async () => {
    try {
      const response = await fetch('/api/me/', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        setUser(null);
        return;
      }

      const data: User = await response.json();
      setUser(data);
    } catch (error) {
        console.error(`Failed to fetch user: ${(error as Error).message}`);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Login failed');
      }

      await fetchUser();
    } catch (error) {
      console.error(`Login error: ${(error as Error).message}`);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      const res = await fetch('/api/auth/logout/', {
        method: 'POST',
        credentials: 'include',
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Logout failed');
      }

      setUser(null);
    } catch (error) {
      console.error(`Logout error: ${(error as Error).message}`);
      throw error;
    }
  };

  // Signup function
  const signup = async (email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        const errorMessage = errorData.message || 'Signup failed';
        console.error(`Signup error: ${errorMessage}`, errorData); // Log detailed error information
        throw new Error(errorMessage);
      }

      // Optionally, log the user in after signup
      await login(email, password);
    } catch (error) {
      console.error(`Signup error: ${(error as Error).message}`);
      throw error;
    }
  };

  // Refresh token function
  const refreshToken = async () => {
    try {
      const res = await fetch('/api/auth/token_refresh/', {
        method: 'POST',
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Token refresh failed');
      }

      await fetchUser();
    } catch (error) {
      console.error(`Refresh token error: ${(error as Error).message}`);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};
