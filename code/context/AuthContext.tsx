"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// ============================================
// 📝 TYPE DEFINITIONS
// ============================================

// This defines what data the Context will provide
interface AuthContextType {
  user: User | null; // Currently logged-in user (or null)
  loading: boolean; // Are we checking auth status?
  refreshUser: () => Promise<void>; // Function to manually refresh user
}

// ============================================
// 🎯 CREATE THE CONTEXT
// ============================================

// Create context with undefined as default
// We use undefined to detect if someone forgot to wrap app in Provider
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ============================================
// 🔧 AUTH PROVIDER COMPONENT
// ============================================

// This component wraps your entire app and provides auth state
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // STATE: Store the current user
  const [user, setUser] = useState<User | null>(null);

  // STATE: Track if we're loading user data
  const [loading, setLoading] = useState(true);

  // Create Supabase client
  const supabase = createClientComponentClient();

  // ============================================
  // 🔄 FUNCTION: Refresh User Data
  // ============================================
  const refreshUser = async () => {
    try {
      setLoading(true);
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      setUser(currentUser);
    } catch (error) {
      console.error("Error refreshing user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // ⚡ EFFECT: Check Auth on Mount + Subscribe to Changes
  // ============================================

  useEffect(() => {
    // When component mounts (app loads), check if user is logged in
    refreshUser();

    // Subscribe to auth state changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]); // Empty dependency array = run only once on mount

  // ============================================
  // 📦 PROVIDE THE CONTEXT VALUE
  // ============================================

  // This object is available to all children components
  const value = {
    user,
    loading,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ============================================
// 🎣 CUSTOM HOOK: useAuth
// ============================================

// This is a custom hook that makes using context easier
export function useAuth() {
  const context = useContext(AuthContext);

  // If context is undefined, someone forgot to wrap app in AuthProvider!
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
