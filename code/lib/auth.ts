import { createClient } from '@/lib/supabase/client'
import type { User, Session } from '@supabase/supabase-js'

// This creates a Supabase client that works in Client Components
// Remember: Client Components = components that run in browser (use 'use client')
const getSupabase = () => createClient()

// ============================================
// 📝 TYPE DEFINITIONS (TypeScript Goodness!)
// ============================================

// This defines what our auth functions will return
// It's like a contract: "I promise to return this shape of data"
interface AuthResponse {
  user: User | null
  session: Session | null
  error: string | null
}

interface ErrorResponse {
  error: string | null
}

interface SessionResponse {
  session: Session | null
  error: string | null
}

interface UserResponse {
  user: User | null
  error: string | null
}

// ============================================
// 🎯 SIGN UP - Create New User Account
// ============================================
export async function signUp(email: string, password: string): Promise<AuthResponse> {
  try {
    const supabase = getSupabase()
    // Call Supabase Auth API to create new user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // This tells Supabase where to redirect after email confirmation
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    // If something went wrong, throw the error
    if (error) throw error

    // Return the user data and session
    return { user: data.user, session: data.session, error: null }
  } catch (error) {
    // Now we handle the error properly with type safety
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    return { user: null, session: null, error: errorMessage }
  }
}

// ============================================
// 🔑 SIGN IN - Log In Existing User
// ============================================
export async function signIn(email: string, password: string): Promise<AuthResponse> {
  try {
    const supabase = getSupabase()
    // Call Supabase Auth API to log in user
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    return { user: data.user, session: data.session, error: null }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    return { user: null, session: null, error: errorMessage }
  }
}

// ============================================
// 🚪 SIGN OUT - Log Out User
// ============================================
export async function signOut(): Promise<ErrorResponse> {
  try {
    const supabase = getSupabase()
    const { error } = await supabase.auth.signOut()

    if (error) throw error

    return { error: null }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    return { error: errorMessage }
  }
}

// ============================================
// 👤 GET CURRENT USER - Check Who's Logged In
// ============================================
export async function getCurrentUser(): Promise<UserResponse> {
  try {
    const supabase = getSupabase()
    // This checks the JWT token stored in cookies
    // If valid → returns user object
    // If expired/invalid → returns null
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error) throw error

    return { user, error: null }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    return { user: null, error: errorMessage }
  }
}

// ============================================
// 🔄 RESET PASSWORD - Send Reset Email
// ============================================
export async function resetPassword(email: string): Promise<ErrorResponse> {
  try {
    const supabase = getSupabase()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })

    if (error) throw error

    return { error: null }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    return { error: errorMessage }
  }
}

// ============================================
// 📧 GET SESSION - Get Current Session
// ============================================
export async function getSession(): Promise<SessionResponse> {
  try {
    const supabase = getSupabase()
    const { data: { session }, error } = await supabase.auth.getSession()

    if (error) throw error

    return { session, error: null }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    return { session: null, error: errorMessage }
  }
}