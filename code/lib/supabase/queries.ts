// Database query helper functions for ApplyFlow
// Centralized queries with TypeScript type safety

import { createClient } from '@/lib/supabase/client';
import type {
  Application,
  ApplicationInsert,
  ApplicationUpdate,
  ApplicationWithDetails,
  Referral,
  ReferralInsert,
  ReferralUpdate,
  Resume,
  ResumeInsert,
  ResumeUpdate,
  Interview,
  InterviewInsert,
  InterviewUpdate,
  UserPreferences,
  UserPreferencesUpdate,
  ApplicationStats,
  DashboardStats,
} from '@/types/database.types';

// =====================================================
// USER HELPERS
// =====================================================

/**
 * Get the current authenticated user's ID
 */
export async function getCurrentUserId(): Promise<string | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.id ?? null;
}

/**
 * Get the current authenticated user
 */
export async function getCurrentUser() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

// =====================================================
// APPLICATIONS QUERIES
// =====================================================

/**
 * Get all applications for the current user
 */
export async function getApplications(): Promise<Application[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .order('applied_date', { ascending: false });

  if (error) throw error;
  return data ?? [];
}

/**
 * Get a single application by ID
 */
export async function getApplicationById(id: string): Promise<Application | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Get application with related data (resume, referral, interviews)
 */
export async function getApplicationWithDetails(
  id: string
): Promise<ApplicationWithDetails | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('applications')
    .select(
      `
      *,
      resume:resumes(*),
      referral:referrals(*),
      interviews(*)
    `
    )
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Create a new application
 */
export async function createApplication(
  application: ApplicationInsert
): Promise<Application> {
  const supabase = createClient();
  const userId = await getCurrentUserId();

  if (!userId) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('applications')
    .insert({ ...application, user_id: userId })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update an application
 */
export async function updateApplication(
  id: string,
  updates: ApplicationUpdate
): Promise<Application> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('applications')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Delete an application
 */
export async function deleteApplication(id: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from('applications').delete().eq('id', id);

  if (error) throw error;
}

/**
 * Get applications by status
 */
export async function getApplicationsByStatus(
  status: string
): Promise<Application[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .eq('status', status)
    .order('applied_date', { ascending: false });

  if (error) throw error;
  return data ?? [];
}

// =====================================================
// REFERRALS QUERIES
// =====================================================

/**
 * Get all referrals for the current user
 */
export async function getReferrals(): Promise<Referral[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('referrals')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data ?? [];
}

/**
 * Get a single referral by ID
 */
export async function getReferralById(id: string): Promise<Referral | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('referrals')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Create a new referral
 */
export async function createReferral(referral: ReferralInsert): Promise<Referral> {
  const supabase = createClient();
  const userId = await getCurrentUserId();

  if (!userId) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('referrals')
    .insert({ ...referral, user_id: userId })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update a referral
 */
export async function updateReferral(
  id: string,
  updates: ReferralUpdate
): Promise<Referral> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('referrals')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Delete a referral
 */
export async function deleteReferral(id: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from('referrals').delete().eq('id', id);

  if (error) throw error;
}

/**
 * Get all applications linked to a specific referral
 */
export async function getApplicationsByReferralId(referralId: string): Promise<Application[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .eq('referral_id', referralId)
    .order('applied_date', { ascending: false });

  if (error) throw error;
  return data ?? [];
}

// =====================================================
// RESUMES QUERIES
// =====================================================

/**
 * Get all resumes for the current user
 */
export async function getResumes(): Promise<Resume[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('resumes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data ?? [];
}

/**
 * Get a single resume by ID
 */
export async function getResumeById(id: string): Promise<Resume | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('resumes')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Create a new resume
 */
export async function createResume(resume: ResumeInsert): Promise<Resume> {
  const supabase = createClient();
  const userId = await getCurrentUserId();

  if (!userId) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('resumes')
    .insert({ ...resume, user_id: userId })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update a resume
 */
export async function updateResume(id: string, updates: ResumeUpdate): Promise<Resume> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('resumes')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Delete a resume
 */
export async function deleteResume(id: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from('resumes').delete().eq('id', id);

  if (error) throw error;
}

// =====================================================
// INTERVIEWS QUERIES
// =====================================================

/**
 * Get all interviews for the current user
 */
export async function getInterviews(): Promise<Interview[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('interviews')
    .select('*')
    .order('scheduled_date', { ascending: true, nullsFirst: false });

  if (error) throw error;
  return data ?? [];
}

/**
 * Get interviews for a specific application
 */
export async function getInterviewsByApplicationId(
  applicationId: string
): Promise<Interview[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('interviews')
    .select('*')
    .eq('application_id', applicationId)
    .order('scheduled_date', { ascending: true });

  if (error) throw error;
  return data ?? [];
}

/**
 * Create a new interview
 */
export async function createInterview(interview: InterviewInsert): Promise<Interview> {
  const supabase = createClient();
  const userId = await getCurrentUserId();

  if (!userId) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('interviews')
    .insert({ ...interview, user_id: userId })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update an interview
 */
export async function updateInterview(
  id: string,
  updates: InterviewUpdate
): Promise<Interview> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('interviews')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Delete an interview
 */
export async function deleteInterview(id: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from('interviews').delete().eq('id', id);

  if (error) throw error;
}

// =====================================================
// USER PREFERENCES QUERIES
// =====================================================

/**
 * Get user preferences for the current user
 */
export async function getUserPreferences(): Promise<UserPreferences | null> {
  const supabase = createClient();
  const userId = await getCurrentUserId();

  if (!userId) return null;

  const { data, error } = await supabase
    .from('user_preferences')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update user preferences
 */
export async function updateUserPreferences(
  updates: UserPreferencesUpdate
): Promise<UserPreferences> {
  const supabase = createClient();
  const userId = await getCurrentUserId();

  if (!userId) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('user_preferences')
    .update(updates)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// =====================================================
// STATISTICS & ANALYTICS
// =====================================================

/**
 * Get application statistics from the view
 */
export async function getApplicationStats(): Promise<ApplicationStats | null> {
  const supabase = createClient();
  const userId = await getCurrentUserId();

  if (!userId) return null;

  const { data, error } = await supabase
    .from('application_stats')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    // If no stats exist yet, return zeros
    if (error.code === 'PGRST116') {
      return {
        user_id: userId,
        total_applications: 0,
        applied_count: 0,
        interview_count: 0,
        offer_count: 0,
        rejected_count: 0,
      };
    }
    throw error;
  }

  return data;
}

/**
 * Get comprehensive dashboard statistics
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = createClient();

  const [applications, interviews] = await Promise.all([
    getApplications(),
    getInterviews(),
  ]);

  const totalApplications = applications.length;
  const activeApplications = applications.filter(
    (app) => !['Rejected', 'Ghosted', 'Withdrawn'].includes(app.status)
  ).length;

  const interviewCount = applications.filter((app) => app.status === 'Interview').length;
  const offerCount = applications.filter((app) => app.status === 'Offer').length;

  const responsedCount = applications.filter(
    (app) => !['Applied', 'Ghosted'].includes(app.status)
  ).length;
  const responseRate =
    totalApplications > 0 ? (responsedCount / totalApplications) * 100 : 0;

  return {
    totalApplications,
    activeApplications,
    interviews: interviewCount,
    offers: offerCount,
    responseRate: Math.round(responseRate * 10) / 10,
    averageResponseTime: 0, // TODO: Calculate from application dates
  };
}

/**
 * Get recent applications (last N days)
 */
export async function getRecentApplications(days: number = 30): Promise<Application[]> {
  const supabase = createClient();
  const dateFrom = new Date();
  dateFrom.setDate(dateFrom.getDate() - days);

  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .gte('applied_date', dateFrom.toISOString().split('T')[0])
    .order('applied_date', { ascending: false });

  if (error) throw error;
  return data ?? [];
}

/**
 * Get upcoming interviews
 */
export async function getUpcomingInterviews(): Promise<Interview[]> {
  const supabase = createClient();
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from('interviews')
    .select('*')
    .gte('scheduled_date', now)
    .eq('status', 'Scheduled')
    .order('scheduled_date', { ascending: true });

  if (error) throw error;
  return data ?? [];
}
