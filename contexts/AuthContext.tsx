// contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { AppState } from 'react-native';
import { supabase } from '../lib/supabase';
import { useSegments, useRouter } from 'expo-router';

interface AuthContextType {
  user: any;
  signIn: (email: string, password: string) => Promise<{ error?: any }>;
  signUp: (email: string, password: string) => Promise<{ error?: any }>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Tells Supabase Auth to continuously refresh the session automatically
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

export function AuthProvider({ children }: { children: JSX.Element }): JSX.Element {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    return { error };
  };

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    const { data: { session }, error } = await supabase.auth.signUp({
      email,
      password,
    });
    setLoading(false);
    return { error, session };
  };

  const signOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setLoading(false);
  };

  const authContext: AuthContextType = {
    user,
    signIn,
    signUp,
    signOut,
    loading,
  };

  useProtectedRoute(user);

  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
}

function useProtectedRoute(user: any) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (!user && !inAuthGroup) {
      router.replace("/Auth");
    } else if (user && inAuthGroup) {
      router.replace("/Factors");
    }
  }, [user, segments]);
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};