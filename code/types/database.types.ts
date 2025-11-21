// Database types for ApplyFlow
// Auto-generated type definitions for Supabase tables

export type ApplicationStatus =
  | 'Applied'
  | 'OA'
  | 'Interview'
  | 'Offer'
  | 'Rejected'
  | 'Ghosted'
  | 'Withdrawn';

export type Priority = 'Low' | 'Medium' | 'High';

export type ApplicationSource =
  | 'LinkedIn'
  | 'Naukri'
  | 'Indeed'
  | 'WellFound'
  | 'Instahyre'
  | 'Company-Portal'
  | 'Referral'
  | 'Other';

export type CompanyTier = 'FAANG' | 'Unicorn' | 'Mid-Size' | 'Startup';

export type ReferralStatus = 'Pending' | 'Agreed' | 'Referred' | 'Declined';

export type InterviewStatus = 'Scheduled' | 'Completed' | 'Cancelled' | 'Rescheduled';

// =====================================================
// TABLE INTERFACES
// =====================================================

export interface Application {
  id: string;
  user_id: string;
  company_name: string;
  role: string;
  job_link: string | null;
  job_id: string | null;
  application_source: ApplicationSource | null;
  status: ApplicationStatus;
  applied_date: string; // ISO date string
  response_date: string | null; // ISO date string - when company responded
  offer_date: string | null; // ISO date string - when offer was received
  company_tier: CompanyTier | null;
  resume_id: string | null;
  referral_id: string | null;
  notes: string | null;
  priority: Priority;
  salary_range: string | null;
  tech_stack: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface Referral {
  id: string;
  user_id: string;
  person_name: string;
  company: string;
  linkedin_url: string | null;
  relationship: string | null;
  date_asked: string | null; // ISO date string
  status: ReferralStatus;
  follow_up_date: string | null; // ISO date string
  notes: string | null;
  created_at: string;
}

export interface Resume {
  id: string;
  user_id: string;
  version_name: string;
  file_url: string;
  upload_date: string; // ISO date string
  times_used: number;
  success_rate: number;
  created_at: string;
}

export interface Interview {
  id: string;
  user_id: string;
  application_id: string;
  round_name: string;
  scheduled_date: string | null; // ISO datetime string
  status: InterviewStatus;
  prep_notes: string | null;
  feedback: string | null;
  created_at: string;
}

export interface UserPreferences {
  user_id: string;
  email_notifications: boolean;
  telegram_notifications: boolean;
  telegram_chat_id: string | null;
  user_email: string | null;
  created_at: string;
  updated_at: string;
}

// =====================================================
// INSERT TYPES (for creating new records)
// =====================================================

export type ApplicationInsert = Omit<Application, 'id' | 'created_at' | 'updated_at'> & {
  id?: string;
  created_at?: string;
  updated_at?: string;
};

export type ReferralInsert = Omit<Referral, 'id' | 'created_at'> & {
  id?: string;
  created_at?: string;
};

export type ResumeInsert = Omit<Resume, 'id' | 'created_at'> & {
  id?: string;
  created_at?: string;
};

export type InterviewInsert = Omit<Interview, 'id' | 'created_at'> & {
  id?: string;
  created_at?: string;
};

export type UserPreferencesInsert = Omit<UserPreferences, 'created_at' | 'updated_at'> & {
  created_at?: string;
  updated_at?: string;
};

// =====================================================
// UPDATE TYPES (for updating existing records)
// =====================================================

export type ApplicationUpdate = Partial<Omit<Application, 'id' | 'user_id' | 'created_at'>>;

export type ReferralUpdate = Partial<Omit<Referral, 'id' | 'user_id' | 'created_at'>>;

export type ResumeUpdate = Partial<Omit<Resume, 'id' | 'user_id' | 'created_at'>>;

export type InterviewUpdate = Partial<Omit<Interview, 'id' | 'user_id' | 'created_at'>>;

export type UserPreferencesUpdate = Partial<Omit<UserPreferences, 'user_id' | 'created_at'>>;

// =====================================================
// EXTENDED TYPES (with joined data)
// =====================================================

export interface ApplicationWithDetails extends Application {
  resume?: Resume;
  referral?: Referral;
  interviews?: Interview[];
}

export interface InterviewWithApplication extends Interview {
  application?: Application;
}

// =====================================================
// STATISTICS & AGGREGATE TYPES
// =====================================================

export interface ApplicationStats {
  user_id: string;
  total_applications: number;
  applied_count: number;
  interview_count: number;
  offer_count: number;
  rejected_count: number;
}

export interface DashboardStats {
  totalApplications: number;
  activeApplications: number;
  interviews: number;
  offers: number;
  responseRate: number;
  averageResponseTime: number;
}

// =====================================================
// DATABASE SCHEMA TYPE
// =====================================================

export interface Database {
  public: {
    Tables: {
      applications: {
        Row: Application;
        Insert: ApplicationInsert;
        Update: ApplicationUpdate;
      };
      referrals: {
        Row: Referral;
        Insert: ReferralInsert;
        Update: ReferralUpdate;
      };
      resumes: {
        Row: Resume;
        Insert: ResumeInsert;
        Update: ResumeUpdate;
      };
      interviews: {
        Row: Interview;
        Insert: InterviewInsert;
        Update: InterviewUpdate;
      };
      user_preferences: {
        Row: UserPreferences;
        Insert: UserPreferencesInsert;
        Update: UserPreferencesUpdate;
      };
    };
    Views: {
      application_stats: {
        Row: ApplicationStats;
      };
    };
  };
}
