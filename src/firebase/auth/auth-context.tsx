'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  User,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useFirebaseAuth } from '@/firebase/firebase-provider';
import { Auth } from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUpWithEmail: (email: string, pass: string) => Promise<any>;
  signInWithEmail: (email: string, pass: string) => Promise<any>;
  signInWithGoogle: () => Promise<any>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const auth = useFirebaseAuth();

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth as Auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const signUpWithEmail = (email: string, pass: string) => {
    if (!auth) return Promise.reject(new Error('Firebase auth not initialized'));
    return createUserWithEmailAndPassword(auth as Auth, email, pass);
  };

  const signInWithEmail = (email: string, pass: string) => {
    if (!auth) return Promise.reject(new Error('Firebase auth not initialized'));
    return signInWithEmailAndPassword(auth as Auth, email, pass);
  };

  const signInWithGoogle = () => {
    if (!auth) return Promise.reject(new Error('Firebase auth not initialized'));
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth as Auth, provider);
  };

  const logout = () => {
    if (!auth) return Promise.reject(new Error('Firebase auth not initialized'));
    return signOut(auth as Auth);
  };

  const value = { user, loading, signUpWithEmail, signInWithEmail, signInWithGoogle, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
