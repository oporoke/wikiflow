'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

// Define a user type for our mock user
interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string, isGoogle?: boolean) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// This is a mock user that we'll use for our in-memory authentication.
const mockUser: User = {
  uid: '12345',
  email: 'user@example.com',
  displayName: 'Test User',
  photoURL: 'https://images.unsplash.com/photo-1548544149-4835e62ee5b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxwZXJzb24lMjBmYWNlfGVufDB8fHx8MTc2ODQ0ODI2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
};
const googleUser: User = {
  uid: '67890',
  email: 'user@google.com',
  displayName: 'Google User',
  photoURL: 'https://images.unsplash.com/photo-1548544149-4835e62ee5b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxwZXJzb24lMjBmYWNlfGVufDB8fHx8MTc2ODQ0ODI2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
};


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulate checking for an existing session on mount
  useEffect(() => {
    setLoading(true);
    try {
      const storedUser = sessionStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from session storage", error);
    } finally {
        setLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string, isGoogle: boolean = false) => {
    setLoading(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    try {
        if (!email || !pass) {
            throw new Error('Email and password are required.');
        }
        const currentUser = isGoogle ? googleUser : { ...mockUser, email, displayName: email.split('@')[0]};
        sessionStorage.setItem('user', JSON.stringify(currentUser));
        setUser(currentUser);
    } catch (error) {
        console.error('Login failed:', error);
        throw error; // Re-throw to be caught by the form
    } finally {
        setLoading(false);
    }
  };


  const logout = async () => {
    setLoading(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    try {
        sessionStorage.removeItem('user');
        setUser(null);
    } catch (error) {
        console.error('Logout failed:', error);
        throw error;
    } finally {
        setLoading(false);
    }
  };

  const value = { user, loading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
