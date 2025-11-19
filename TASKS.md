# Job Application Tracker - Complete Task List

**Project Duration:** 14-16 days  
**Tech Stack:** Next.js 14, TypeScript, Supabase, Tailwind CSS, shadcn/ui

---

## 🎨 Design System Overview

### Color Palette

#### Light Mode
- **Primary:** #2563eb (Professional Blue)
- **Secondary:** #10b981 (Success Green)
- **Accent:** #f59e0b (Warm Orange)
- **Error:** #ef4444 (Professional Red)
- **Background:** #ffffff (Pure White)
- **Surface:** #f9fafb (Light Gray)
- **Text Primary:** #111827
- **Text Secondary:** #6b7280

#### Dark Mode
- **Primary:** #3b82f6 (Brighter Blue)
- **Secondary:** #34d399 (Brighter Green)
- **Accent:** #fbbf24 (Brighter Orange)
- **Error:** #f87171 (Softer Red)
- **Background:** #0f172a (Deep Navy)
- **Surface:** #1e293b (Slate)
- **Text Primary:** #f1f5f9
- **Text Secondary:** #cbd5e1

### Typography
- **Primary Font:** Inter (UI, body text, data)
- **Headings Font:** Poppins (page titles, headings)
- **Display:** 36px / 2.25rem
- **H1:** 30px / 1.875rem
- **H2:** 24px / 1.5rem
- **Body:** 14px / 0.875rem

### Design Principles
1. Clean & Minimal - Focus on key metrics
2. Professional but Approachable
3. Data-Driven visualizations
4. Mobile-First responsive design
5. Consistent 4px/8px spacing grid

---

## PHASE 0: Project Setup & Environment Configuration
**Duration:** 2-3 hours | **Day 1 Morning**

### ✅ Task 0.1: Install Prerequisites
- [ ] Install Node.js (v18+) and verify with `node --version`
- [ ] Install VS Code with extensions: ES7 React snippets, Tailwind IntelliSense, Prettier
- [ ] Install Git and configure: `git config --global user.name "Your Name"`
- [ ] **Learning:** Development environment setup, tools understanding

### ✅ Task 0.2: Create Next.js Project
- [ ] Run `npx create-next-app@latest` with TypeScript, Tailwind, App Router
- [ ] Understand app directory structure vs pages directory
- [ ] Navigate folders: app/, public/, components/
- [ ] Run `npm run dev` and view at localhost:3000
- [ ] **Learning:** Next.js 14 initialization, App Router

### ✅ Task 0.3: Clean Up Default Files
- [ ] Open app/page.tsx and remove default content
- [ ] Create simple "Hello World" component
- [ ] Open app/layout.tsx and understand root layout
- [ ] Remove default styles, keep Tailwind imports
- [ ] **Learning:** Root layout concept, component structure

### ✅ Task 0.4: Setup Git Repository
- [ ] Run `git init` in project folder
- [ ] Verify .gitignore includes node_modules, .env.local
- [ ] Run `git add .` and `git commit -m "Initial commit"`
- [ ] Create GitHub repo and push: `git remote add origin <url>`
- [ ] **Learning:** Git workflow, version control

### ✅ Task 0.5: Install Core Dependencies
- [ ] Run: `npm install @supabase/supabase-js`
- [ ] Run: `npm install date-fns` (date manipulation)
- [ ] Run: `npm install recharts` (charts)
- [ ] Run: `npm install lucide-react` (icons)
- [ ] Verify in package.json
- [ ] **Learning:** npm package management

### ✅ Task 0.6: Setup Supabase Account & Project
- [ ] Go to supabase.com and create free account
- [ ] Click "New Project", choose name and password
- [ ] Wait for project creation (2-3 minutes)
- [ ] Navigate to Project Settings → API
- [ ] Copy Project URL and anon public key
- [ ] Explore: Tables, SQL Editor, Storage, Authentication tabs
- [ ] **Learning:** Supabase dashboard, BaaS concepts

### ✅ Task 0.7: Configure Environment Variables
- [ ] Create `.env.local` file in project root
- [ ] Add: `NEXT_PUBLIC_SUPABASE_URL=your_url_here`
- [ ] Add: `NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here`
- [ ] Verify .gitignore includes .env.local
- [ ] **Learning:** Environment variables, security

### ✅ Task 0.8: Create Supabase Client Utilities
- [ ] Create folder: `lib/supabase/`
- [ ] Create file: `lib/supabase/client.ts` for browser client
- [ ] Create file: `lib/supabase/server.ts` for server client
- [ ] Import createClient from @supabase/supabase-js
- [ ] Export configured client instances
- [ ] Add 'use client' directive to client.ts
- [ ] **Learning:** Client vs Server Components, utility organization

### ✅ Task 0.9: Test Supabase Connection
- [ ] Create file: `app/api/test-db/route.ts`
- [ ] Write GET handler that calls supabase.from('test').select()
- [ ] Test from browser: localhost:3000/api/test-db
- [ ] Handle and log errors
- [ ] **Learning:** API routes, async/await, testing connections

---

## PHASE 0.5: Dark Mode Setup
**Duration:** 1-1.5 hours | **Day 1 Afternoon**

### ✅ Task 0.5.1: Install shadcn/ui CLI
- [ ] Run: `npx shadcn-ui@latest init`
- [ ] Choose: Default style, Slate color, CSS variables
- [ ] Verify components.json created
- [ ] **Learning:** CLI tools, shadcn/ui setup

### ✅ Task 0.5.2: Install Initial shadcn Components
- [ ] Run: `npx shadcn-ui@latest add button`
- [ ] Run: `npx shadcn-ui@latest add card`
- [ ] Run: `npx shadcn-ui@latest add input`
- [ ] Run: `npx shadcn-ui@latest add dialog`
- [ ] Run: `npx shadcn-ui@latest add table`
- [ ] Run: `npx shadcn-ui@latest add label`
- [ ] Explore installed files in components/ui/
- [ ] **Learning:** shadcn/ui components, Radix UI

### ✅ Task 0.5.3: Install Dark Mode Dependencies
- [ ] Run: `npm install next-themes`
- [ ] Understand how next-themes manages theme state
- [ ] **Learning:** Theme management libraries

### ✅ Task 0.5.4: Configure Tailwind for Dark Mode
- [ ] Open `tailwind.config.ts`
- [ ] Add `darkMode: 'class'` in config
- [ ] Update theme colors to use CSS variables
- [ ] **Learning:** Tailwind configuration, dark mode strategies

### ✅ Task 0.5.5: Setup Theme Provider
- [ ] Create `components/providers/theme-provider.tsx`
- [ ] Import ThemeProvider from next-themes
- [ ] Add 'use client' directive
- [ ] Set attribute="class", defaultTheme="system", enableSystem
- [ ] **Learning:** Provider pattern, Client Components

### ✅ Task 0.5.6: Update Root Layout with Provider
- [ ] Open `app/layout.tsx`
- [ ] Import your ThemeProvider component
- [ ] Wrap {children} with <ThemeProvider>
- [ ] **Learning:** Layout nesting, provider composition

### ✅ Task 0.5.7: Create Theme Toggle Component
- [ ] Create `components/theme-toggle.tsx`
- [ ] Import useTheme from next-themes
- [ ] Add 'use client' directive
- [ ] Create button that calls setTheme("light"/"dark")
- [ ] Use Lucide icons: Sun and Moon
- [ ] **Learning:** useTheme hook, conditional rendering

### ✅ Task 0.5.8: Apply Dark Mode Styles
- [ ] Add dark: prefix to Tailwind classes
- [ ] Example: `bg-white dark:bg-slate-900`
- [ ] Test switching themes
- [ ] **Learning:** Tailwind dark mode utilities

### ✅ Task 0.5.9: Verify Theme Persistence
- [ ] Switch to dark mode
- [ ] Refresh page - should stay dark
- [ ] Close browser and reopen - should stay dark
- [ ] **Learning:** localStorage, state persistence

---

## PHASE 0.6: Authentication Setup with Supabase Auth
**Duration:** 4-5 hours | **Day 1 Evening - Day 2 Morning**

### ✅ Task 0.6.1: Understand Supabase Authentication
- [ ] Read Supabase Auth docs overview
- [ ] Understand: signup → email verification → login → session
- [ ] Learn about JWT tokens stored in localStorage
- [ ] **Learning:** Authentication concepts, JWT, session management

### ✅ Task 0.6.2: Enable Email Authentication
- [ ] Go to Supabase Dashboard → Authentication → Providers
- [ ] Verify Email provider is enabled
- [ ] Go to Authentication → Email Templates
- [ ] Review Welcome email, Confirmation email templates
- [ ] Set Site URL: `http://localhost:3000`
- [ ] Add redirect URL: `http://localhost:3000/auth/callback`
- [ ] **Learning:** Auth provider configuration

### ✅ Task 0.6.3: Configure Auth Settings
- [ ] Authentication → Settings
- [ ] Decide: Enable/disable email confirmation
- [ ] Set minimum password length (6 characters)
- [ ] **Learning:** Auth security settings

### ✅ Task 0.6.4: Create Auth Context
- [ ] Create folder: `lib/auth/`
- [ ] Create file: `lib/auth/AuthContext.tsx`
- [ ] Add 'use client' directive
- [ ] Create AuthContext with createContext
- [ ] Create AuthProvider with user state
- [ ] Export useAuth custom hook
- [ ] **Learning:** React Context API, custom hooks

### ✅ Task 0.6.5: Create Auth Helper Functions
- [ ] Create file: `lib/auth/auth-helpers.ts`
- [ ] Write signUp function: accepts email, password
- [ ] Write signIn function: accepts email, password
- [ ] Write signOut function
- [ ] Write getCurrentUser function
- [ ] Add try-catch error handling
- [ ] **Learning:** Auth API methods, error handling

### ✅ Task 0.6.6: Setup Auth State Management
- [ ] In AuthContext, create user and loading states
- [ ] In useEffect, call getCurrentUser on mount
- [ ] Subscribe to onAuthStateChange
- [ ] Update user state when auth state changes
- [ ] **Learning:** useEffect, real-time subscriptions

### ✅ Task 0.6.7: Wrap App with AuthProvider
- [ ] Open `app/layout.tsx`
- [ ] Import AuthProvider
- [ ] Wrap children with AuthProvider (inside ThemeProvider)
- [ ] **Learning:** Multiple providers, composition

### ✅ Task 0.6.8: Create Public Route Group
- [ ] Create folder: `app/(public)/`
- [ ] Create file: `app/(public)/layout.tsx`
- [ ] Create simple navbar with logo and "Sign In" link
- [ ] Style with Tailwind, make responsive
- [ ] **Learning:** Route groups, public layouts

### ✅ Task 0.6.9: Create Landing Page
- [ ] Create file: `app/(public)/page.tsx`
- [ ] Build hero section with app name and tagline
- [ ] Add features section: list 5 key features with icons
- [ ] Add CTA button: "Get Started Free" → links to /signup
- [ ] Make mobile responsive
- [ ] **Learning:** Landing page design, CTAs

### ✅ Task 0.6.10: Create Sign Up Page
- [ ] Create file: `app/(public)/signup/page.tsx`
- [ ] Add 'use client' directive
- [ ] Create form with email and password inputs
- [ ] Add confirm password field
- [ ] Add terms checkbox
- [ ] Use shadcn Form components
- [ ] **Learning:** Form creation, controlled components

### ✅ Task 0.6.11: Implement Sign Up Logic
- [ ] Create handleSubmit async function
- [ ] Validate: email format, password match, length
- [ ] Call signUp helper function
- [ ] Show success: "Check your email"
- [ ] Show errors
- [ ] Add loading state
- [ ] **Learning:** Form validation, async submission

### ✅ Task 0.6.12: Create Sign In Page
- [ ] Create file: `app/(public)/signin/page.tsx`
- [ ] Add 'use client' directive
- [ ] Form with email and password fields
- [ ] Add "Forgot Password?" link
- [ ] Add "Don't have account? Sign up" link
- [ ] **Learning:** Consistent form patterns

### ✅ Task 0.6.13: Implement Sign In Logic
- [ ] Create handleSubmit async function
- [ ] Call signIn helper function
- [ ] On success: redirect to /dashboard using useRouter
- [ ] Show errors ("Invalid credentials")
- [ ] Add loading state
- [ ] **Learning:** useRouter, programmatic navigation

### ✅ Task 0.6.14: Create Protected Route Group
- [ ] Create folder: `app/(protected)/`
- [ ] Create file: `app/(protected)/layout.tsx`
- [ ] Import useAuth hook
- [ ] Check if user is authenticated
- [ ] If not: redirect to /signin
- [ ] If yes: show layout with sidebar and navbar
- [ ] **Learning:** Protected routes, auth guards

### ✅ Task 0.6.15: Build Protected Layout UI
- [ ] Create sidebar with logo
- [ ] Add navigation links: Dashboard, Applications, Referrals, etc.
- [ ] Add user email at bottom
- [ ] Add "Sign Out" button
- [ ] Make sidebar collapsible on mobile (hamburger)
- [ ] Use shadcn Sheet for mobile sidebar
- [ ] **Learning:** Sidebar navigation, mobile menu

### ✅ Task 0.6.16: Create Dashboard Page (Protected)
- [ ] Create file: `app/(protected)/dashboard/page.tsx`
- [ ] Get user from useAuth hook
- [ ] Display: "Welcome back, {user.email}!"
- [ ] Add placeholder stat cards
- [ ] **Learning:** Protected pages, user data access

### ✅ Task 0.6.17: Implement Sign Out
- [ ] Find "Sign Out" button in protected layout
- [ ] Add onClick handler
- [ ] Call signOut helper function
- [ ] Use router.push('/') to redirect
- [ ] Show success toast
- [ ] **Learning:** Logout flow, redirects

### ✅ Task 0.6.18: Create Middleware for Route Protection
- [ ] Create file: `middleware.ts` in root
- [ ] Check if user accessing protected routes
- [ ] If no session: redirect to /signin
- [ ] If accessing /signin with session: redirect to /dashboard
- [ ] Use supabase.auth.getSession()
- [ ] **Learning:** Next.js middleware, route protection

### ✅ Task 0.6.19: Add Forgot Password Page
- [ ] Create file: `app/(public)/forgot-password/page.tsx`
- [ ] Form with email input
- [ ] Call supabase.auth.resetPasswordForEmail(email)
- [ ] Show success: "Check your email"
- [ ] **Learning:** Password reset flow

### ✅ Task 0.6.20: Create Reset Password Page
- [ ] Create file: `app/(public)/reset-password/page.tsx`
- [ ] Form with new password and confirm
- [ ] Get token from URL params
- [ ] Call supabase.auth.updateUser({ password })
- [ ] Redirect to /signin on success
- [ ] **Learning:** Token handling, password update

### ✅ Task 0.6.21: Create Auth Callback Handler
- [ ] Create file: `app/auth/callback/route.ts`
- [ ] Handle email confirmation redirects
- [ ] Exchange code for session
- [ ] Redirect to /dashboard
- [ ] **Learning:** OAuth callbacks

### ✅ Task 0.6.22: Add Loading States
- [ ] Create file: `app/(protected)/loading.tsx`
- [ ] Show spinner while checking auth
- [ ] Prevent flash of unauthenticated content
- [ ] **Learning:** Loading states, Suspense

### ✅ Task 0.6.23: Test Complete Auth Flow
- [ ] Test: signup → email → confirm → dashboard
- [ ] Test: signin with correct credentials
- [ ] Test: signin with wrong credentials → error
- [ ] Test: access /dashboard without login → redirects
- [ ] Test: signout → redirects to homepage
- [ ] Test: forgot password → reset password
- [ ] **Learning:** End-to-end testing, QA

### ✅ Task 0.6.24: Handle Auth Errors Gracefully
- [ ] Create error message mapping
- [ ] "Invalid login credentials" → friendly message
- [ ] Display using toast notifications
- [ ] **Learning:** Error handling, UX

### ✅ Task 0.6.25: Add Session Persistence Testing
- [ ] Login to application
- [ ] Close browser completely
- [ ] Reopen and go to /dashboard
- [ ] Should still be logged in
- [ ] **Learning:** Session persistence, token storage

---

## PHASE 1: Database Design & Setup with RLS
**Duration:** 4-5 hours | **Day 2 Afternoon**

### ✅ Task 1.1: Design Database Schema on Paper
- [ ] Sketch four tables: applications, referrals, resumes, interviews
- [ ] Add user_id column to EACH table (UUID, FK to auth.users)
- [ ] Define all columns with data types
- [ ] Draw relationships
- [ ] Note foreign keys and constraints
- [ ] **Learning:** Multi-user schema design, normalization

### ✅ Task 1.2: Understand Row Level Security
- [ ] Read Supabase RLS documentation
- [ ] Understand: RLS ensures users only see their own data
- [ ] Learn about auth.uid() function
- [ ] Understand policies: SELECT, INSERT, UPDATE, DELETE
- [ ] **Learning:** Database security, RLS concepts

### ✅ Task 1.3: Create Applications Table
- [ ] Open Supabase Dashboard → SQL Editor
- [ ] Write CREATE TABLE statement with user_id
- [ ] Include: id, user_id, company_name, role, job_link, status, applied_date, resume_id, referral_id, notes, priority, salary_range, tech_stack, created_at, updated_at
- [ ] Add foreign key: user_id REFERENCES auth.users(id) ON DELETE CASCADE
- [ ] Execute query
- [ ] **Learning:** SQL DDL, foreign keys, CASCADE

### ✅ Task 1.4: Enable RLS on Applications
- [ ] Run: `ALTER TABLE applications ENABLE ROW LEVEL SECURITY;`
- [ ] Understand: now NO ONE can access data (default deny)
- [ ] **Learning:** Enabling RLS, default security

### ✅ Task 1.5: Create RLS Policies for Applications
- [ ] Create SELECT policy: `USING (auth.uid() = user_id)`
- [ ] Create INSERT policy: `WITH CHECK (auth.uid() = user_id)`
- [ ] Create UPDATE policy: `USING (auth.uid() = user_id)`
- [ ] Create DELETE policy: `USING (auth.uid() = user_id)`
- [ ] Execute all policies
- [ ] **Learning:** RLS policy syntax, auth.uid()

### ✅ Task 1.6: Test Applications RLS
- [ ] Test query: `SELECT * FROM applications;`
- [ ] Should return only YOUR applications
- [ ] Try inserting with your user_id → success
- [ ] Try inserting with different user_id → fail
- [ ] **Learning:** Testing security policies

### ✅ Task 1.7: Create Referrals Table with RLS
- [ ] Write CREATE TABLE with user_id column
- [ ] Include: id, user_id, person_name, company, linkedin_url, relationship, date_asked, status, follow_up_date, notes, created_at
- [ ] Enable RLS
- [ ] Create all 4 policies (SELECT, INSERT, UPDATE, DELETE)
- [ ] Test policies
- [ ] **Learning:** Repeating RLS pattern

### ✅ Task 1.8: Create Resumes Table with RLS
- [ ] Write CREATE TABLE with user_id
- [ ] Include: id, user_id, version_name, file_url, upload_date, times_used, success_rate, created_at
- [ ] Enable RLS and create policies
- [ ] Test policies
- [ ] **Learning:** File metadata storage with RLS

### ✅ Task 1.9: Create Interviews Table with RLS
- [ ] Write CREATE TABLE with user_id AND application_id
- [ ] Include: id, user_id, application_id, round_name, scheduled_date, status, prep_notes, feedback, created_at
- [ ] Add FK to applications(id) ON DELETE CASCADE
- [ ] Enable RLS and create policies
- [ ] **Learning:** Multiple foreign keys, related tables

### ✅ Task 1.10: Add Database Indexes
- [ ] Create indexes on user_id for all tables
- [ ] Create index on applications.status
- [ ] Create index on applications.company_name
- [ ] Create index on applications.applied_date
- [ ] Create index on foreign keys
- [ ] **Learning:** Database performance, indexing

### ✅ Task 1.11: Create User Preferences Table
- [ ] Write CREATE TABLE with user_id as PRIMARY KEY
- [ ] Include: user_id, email_notifications, telegram_notifications, telegram_chat_id, user_email, created_at, updated_at
- [ ] Enable RLS and create policies
- [ ] **Learning:** Settings table, one-to-one relationship

### ✅ Task 1.12: Create Database Function for New User Setup
- [ ] Create function: handle_new_user()
- [ ] Function inserts row in user_preferences on signup
- [ ] Create trigger: on_auth_user_created
- [ ] Test by creating new user
- [ ] **Learning:** Database triggers, automated setup

### ✅ Task 1.13: Test Multi-User Data Isolation
- [ ] Create second test account
- [ ] Login as User A, add applications
- [ ] Login as User B, verify can't see User A's data
- [ ] **Learning:** Multi-tenancy, data isolation

### ✅ Task 1.14: Create Database Query Helper Functions
- [ ] Create file: `lib/supabase/queries.ts`
- [ ] Write helper to get current user ID
- [ ] Write wrapper functions for common queries
- [ ] Add TypeScript return types
- [ ] **Learning:** Query abstraction, code organization

### ✅ Task 1.15: Setup TypeScript Database Types
- [ ] Create file: `types/database.types.ts`
- [ ] Define interfaces for each table
- [ ] Export all types
- [ ] Use in query functions
- [ ] **Learning:** TypeScript interfaces, type safety

---

## PHASE 2: Application Tracker (Core Feature)
**Duration:** 8-10 hours | **Day 3 - Day 4**

### ✅ Task 2.1: Create Applications Page
- [ ] Create file: `app/(protected)/applications/page.tsx`
- [ ] Add page heading: "My Applications"
- [ ] Add "New Application" button
- [ ] **Learning:** Protected routes, page structure

### ✅ Task 2.2: Create Query Function for User's Applications
- [ ] In `lib/supabase/queries.ts`
- [ ] Write `async function getApplications(userId: string)`
- [ ] Use: `.select('*').eq('user_id', userId)`
- [ ] Add error handling
- [ ] Return typed data
- [ ] **Learning:** Supabase queries, user-scoped data

### ✅ Task 2.3: Fetch Applications in Server Component
- [ ] Get user from server-side auth
- [ ] Call getApplications(user.id)
- [ ] Pass data to client component
- [ ] Handle loading and error states
- [ ] **Learning:** Server Components, async data fetching

### ✅ Task 2.4: Create Application Card Component
- [ ] Create `components/applications/ApplicationCard.tsx`
- [ ] Accept props: `application: Application`
- [ ] Display: company, role, status badge, date
- [ ] Add Edit and Delete buttons
- [ ] Style with shadcn Card
- [ ] **Learning:** Component props, TypeScript typing

### ✅ Task 2.5: Build Applications Grid
- [ ] Map over applications array
- [ ] Render ApplicationCard for each
- [ ] Use Tailwind grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- [ ] **Learning:** Responsive grid, Tailwind breakpoints

### ✅ Task 2.6: Create Empty State
- [ ] Create `components/applications/EmptyState.tsx`
- [ ] Show when applications array is empty
- [ ] Display icon, message, "Add Application" button
- [ ] **Learning:** Conditional rendering, empty states

### ✅ Task 2.7: Create Add Application Dialog
- [ ] Create `components/applications/AddApplicationDialog.tsx`
- [ ] Add 'use client' directive
- [ ] Use shadcn Dialog component
- [ ] Trigger: "New Application" button
- [ ] **Learning:** Dialog patterns, modal forms

### ✅ Task 2.8: Build Application Form
- [ ] Fields: company_name, role, job_link, status, applied_date, notes
- [ ] Use shadcn Input, Select, Textarea, Label
- [ ] Add required validation
- [ ] Status options: Applied, OA, Interview, Offer, Rejected
- [ ] **Learning:** Form fields, validation

### ✅ Task 2.9: Handle Form Submission
- [ ] Create `handleSubmit` function
- [ ] Prevent default
- [ ] Get form data
- [ ] Get user ID from useAuth
- [ ] Add user_id to data
- [ ] **Learning:** Form submission, user context

### ✅ Task 2.10: Create Insert Mutation
- [ ] Write `createApplication(data)` in queries.ts
- [ ] Use: `supabase.from('applications').insert(data)`
- [ ] Return { data, error }
- [ ] **Learning:** Database inserts, RLS in action

### ✅ Task 2.11: Update UI After Insert
- [ ] After success, close dialog
- [ ] Show success toast
- [ ] Call router.refresh() to update list
- [ ] **Learning:** Cache revalidation, user feedback

### ✅ Task 2.12: Add Edit Functionality
- [ ] Add Edit button to ApplicationCard
- [ ] Open dialog in "edit mode"
- [ ] Pre-fill form with existing data
- [ ] Change button text to "Update"
- [ ] **Learning:** Form modes, pre-filling

### ✅ Task 2.13: Create Update Mutation
- [ ] Write `updateApplication(id, data)`
- [ ] Use: `.update(data).eq('id', id)`
- [ ] RLS ensures user can only update their own
- [ ] **Learning:** Database updates, RLS on updates

### ✅ Task 2.14: Add Delete Functionality
- [ ] Add Delete button with trash icon
- [ ] Show confirmation with AlertDialog
- [ ] On confirm, call delete mutation
- [ ] **Learning:** Destructive actions, confirmation

### ✅ Task 2.15: Create Delete Mutation
- [ ] Write `deleteApplication(id)`
- [ ] Use: `.delete().eq('id', id)`
- [ ] Show success toast
- [ ] Refresh data
- [ ] **Learning:** Database deletes

### ✅ Task 2.16: Add Search Functionality
- [ ] Create search input at top
- [ ] Filter by company_name or role
- [ ] Use client-side filtering
- [ ] **Learning:** Search implementation

### ✅ Task 2.17: Add Status Filter
- [ ] Add Select dropdown for status
- [ ] Options: All, Applied, OA, Interview, Offer, Rejected
- [ ] Filter applications by status
- [ ] **Learning:** Filtering, Select component

### ✅ Task 2.18: Add Date Range Filter
- [ ] Add date range picker
- [ ] Filter where applied_date between dates
- [ ] Use date-fns for comparisons
- [ ] **Learning:** Date filtering

### ✅ Task 2.19: Create Kanban Board View
- [ ] Create `components/applications/KanbanBoard.tsx`
- [ ] Group applications by status
- [ ] Create columns for each status
- [ ] Horizontal scroll on mobile
- [ ] **Learning:** Alternative views, Kanban UI

### ✅ Task 2.20: Add Sorting
- [ ] Add sort dropdown
- [ ] Options: Date (newest), Date (oldest), Company (A-Z)
- [ ] Apply sorting to array
- [ ] **Learning:** Sorting arrays

### ✅ Task 2.21: Add Loading Skeletons
- [ ] Create `components/applications/ApplicationSkeleton.tsx`
- [ ] Use shadcn Skeleton component
- [ ] Show while loading
- [ ] **Learning:** Loading states, Skeleton UI

### ✅ Task 2.22: Make Mobile Responsive
- [ ] Test on mobile viewport
- [ ] Ensure buttons are touch-friendly (min 44px)
- [ ] Use Sheet instead of Dialog on mobile
- [ ] Test all CRUD operations
- [ ] **Learning:** Mobile responsiveness, touch targets

### ✅ Task 2.23: Add Pagination (Optional)
- [ ] Add pagination for many applications
- [ ] Show 12 per page
- [ ] Use .range(start, end)
- [ ] **Learning:** Pagination, performance

---

## PHASE 3: Dashboard & Statistics (User-Scoped)
**Duration:** 3-4 hours | **Day 5**

### ✅ Task 3.1: Create Dashboard Page
- [ ] Enhance existing dashboard page
- [ ] Grid of stat cards at top
- [ ] Charts below
- [ ] Action items section
- [ ] **Learning:** Dashboard layout

### ✅ Task 3.2: Calculate Total Applications Count
- [ ] Query: COUNT(*) WHERE user_id = ?
- [ ] Display in StatCard
- [ ] **Learning:** Count queries

### ✅ Task 3.3: Calculate Applications by Status
- [ ] Group by status
- [ ] Calculate count for each
- [ ] Display in stat cards
- [ ] **Learning:** Grouping data, SQL GROUP BY

### ✅ Task 3.4: Create Stat Card Component
- [ ] Create `components/dashboard/StatCard.tsx`
- [ ] Props: title, value, icon, trend
- [ ] Style with gradient backgrounds
- [ ] **Learning:** Reusable components

### ✅ Task 3.5: Calculate Response Rate
- [ ] Formula: (interviews + offers) / total * 100
- [ ] Display as percentage
- [ ] **Learning:** Calculated metrics

### ✅ Task 3.6: Display Upcoming Interviews
- [ ] Query: WHERE scheduled_date > NOW()
- [ ] Count results
- [ ] Display in stat card
- [ ] **Learning:** Date comparisons

### ✅ Task 3.7: Install and Setup Recharts
- [ ] Import: LineChart, BarChart, PieChart
- [ ] Create responsive container
- [ ] **Learning:** Recharts basics

### ✅ Task 3.8: Create Applications Over Time Chart
- [ ] Group by week/month
- [ ] Create LineChart
- [ ] X-axis: dates, Y-axis: count
- [ ] **Learning:** Time series data

### ✅ Task 3.9: Create Status Distribution Chart
- [ ] Calculate count per status
- [ ] Create PieChart or BarChart
- [ ] Add colors matching status badges
- [ ] **Learning:** Categorical data, PieChart

### ✅ Task 3.10: Build Action Items Section
- [ ] Query: overdue follow-ups
- [ ] Query: upcoming interviews (next 7 days)
- [ ] Display as list
- [ ] **Learning:** Business rules, actionable insights

### ✅ Task 3.11: Create Weekly Progress Widget
- [ ] Query: applications this week vs last week
- [ ] Calculate: change (+/- percentage)
- [ ] Display with arrow icon
- [ ] **Learning:** Trend comparisons

### ✅ Task 3.12: Add Quick Action Buttons
- [ ] "Add Application" button
- [ ] "Add Referral" button
- [ ] Style as prominent CTAs
- [ ] **Learning:** User flow optimization

### ✅ Task 3.13: Make Dashboard Mobile Responsive
- [ ] Stack cards vertically on mobile
- [ ] Make charts full-width
- [ ] Horizontal scroll for charts if needed
- [ ] **Learning:** Responsive dashboard

---

## PHASE 4: Referral Manager (User-Scoped)
**Duration:** 3-4 hours | **Day 6**

### ✅ Task 4.1: Create Referrals Page
- [ ] Create file: `app/(protected)/referrals/page.tsx`
- [ ] Heading: "My Referrals"
- [ ] "New Referral" button
- [ ] **Learning:** Applying patterns

### ✅ Task 4.2: Create Query Function
- [ ] Write `getReferrals(userId)` in queries.ts
- [ ] SELECT * FROM referrals WHERE user_id = userId
- [ ] **Learning:** Consistent query patterns

### ✅ Task 4.3: Display Referrals in Cards
- [ ] Create `components/referrals/ReferralCard.tsx`
- [ ] Show: person_name, company, relationship, status, follow_up_date
- [ ] Add Edit and Delete buttons
- [ ] **Learning:** Component patterns

### ✅ Task 4.4: Create Add Referral Form
- [ ] Fields: person_name, company, linkedin_url, relationship, date_asked, status, follow_up_date, notes
- [ ] Use Select for relationship: Friend, Colleague, Alumni, Family, Other
- [ ] Use Select for status: Pending, Asked, Referred, Declined
- [ ] **Learning:** Form variety, Select options

### ✅ Task 4.5: Implement Referral CRUD
- [ ] createReferral(data)
- [ ] updateReferral(id, data)
- [ ] deleteReferral(id)
- [ ] **Learning:** CRUD mastery

### ✅ Task 4.6: Add Status Quick Update
- [ ] Add status dropdown on ReferralCard
- [ ] Update without opening full form
- [ ] **Learning:** Quick actions, inline editing

### ✅ Task 4.7: Highlight Overdue Follow-ups
- [ ] If follow_up_date < TODAY and status != 'Referred'
- [ ] Add red border or badge
- [ ] Sort overdue to top
- [ ] **Learning:** Conditional styling

### ✅ Task 4.8: Link Referral to Application
- [ ] In Add/Edit Application form, add "From Referral?" field
- [ ] Dropdown populated with user's referrals
- [ ] Store referral_id
- [ ] **Learning:** Related data, foreign keys

### ✅ Task 4.9: Show Linked Applications
- [ ] On ReferralCard, show badge: "3 applications"
- [ ] Click to expand and see list
- [ ] Query: WHERE referral_id = ?
- [ ] **Learning:** Reverse relationships

### ✅ Task 4.10: Calculate Referral Success Rate
- [ ] For each referral, count linked applications
- [ ] Count offers
- [ ] Success rate = offers / total
- [ ] **Learning:** Related data calculations

---

## PHASE 5: Resume Version Control (User-Scoped)
**Duration:** 3-4 hours | **Day 7**

### ✅ Task 5.1: Setup Supabase Storage Bucket
- [ ] Go to Supabase → Storage
- [ ] Create bucket: "resumes"
- [ ] Make it private
- [ ] **Learning:** Cloud storage, bucket config

### ✅ Task 5.2: Enable RLS on Storage Bucket
- [ ] Go to Storage → resumes → Policies
- [ ] Create INSERT policy: users upload to their folder
- [ ] Create SELECT policy: users read their files
- [ ] Create DELETE policy: users delete their files
- [ ] **Learning:** Storage RLS

### ✅ Task 5.3: Create Resumes Page
- [ ] Create file: `app/(protected)/resumes/page.tsx`
- [ ] Heading: "Resume Versions"
- [ ] "Upload New Resume" button
- [ ] **Learning:** File management UI

### ✅ Task 5.4: Create Resume Upload Form
- [ ] File input: accept only .pdf
- [ ] Text input: version_name
- [ ] Validate file size: max 5MB
- [ ] Validate file type
- [ ] **Learning:** File inputs, validation

### ✅ Task 5.5: Implement File Upload
- [ ] Get file from input
- [ ] Generate unique filename: `${userId}/${Date.now()}_${filename}`
- [ ] Call: `supabase.storage.from('resumes').upload(path, file)`
- [ ] Get public URL
- [ ] **Learning:** File upload, Storage API

### ✅ Task 5.6: Save Resume Metadata
- [ ] After upload, insert to resumes table
- [ ] Data: user_id, version_name, file_url, upload_date
- [ ] **Learning:** Metadata storage

### ✅ Task 5.7: Display Resume Cards
- [ ] Create `components/resumes/ResumeCard.tsx`
- [ ] Show: version_name, upload_date, times_used, success_rate
- [ ] Add download and delete buttons
- [ ] **Learning:** File listing

### ✅ Task 5.8: Implement Resume Download
- [ ] On download click
- [ ] Call: `supabase.storage.from('resumes').download(path)`
- [ ] Create blob and trigger download
- [ ] **Learning:** File download

### ✅ Task 5.9: Link Resume to Application
- [ ] In Add/Edit Application form
- [ ] Add "Resume Used" dropdown
- [ ] Populate with user's resumes
- [ ] Store resume_id
- [ ] **Learning:** Related data selection

### ✅ Task 5.10: Track Resume Usage
- [ ] When application created with resume_id
- [ ] Increment: `SET times_used = times_used + 1`
- [ ] **Learning:** Usage tracking

### ✅ Task 5.11: Calculate Resume Success Rate
- [ ] For each resume, query linked applications
- [ ] Count total and count offers
- [ ] Success rate = (offers / total) * 100
- [ ] Update resumes table
- [ ] **Learning:** Complex calculations

### ✅ Task 5.12: Delete Resume with File
- [ ] Delete from storage first
- [ ] Then delete from database
- [ ] Handle FK constraints
- [ ] **Learning:** Cascading deletes

---

## PHASE 6: Interview Tracker (User-Scoped)
**Duration:** 3-4 hours | **Day 8**

### ✅ Task 6.1: Create Interviews Page
- [ ] Create file: `app/(protected)/interviews/page.tsx`
- [ ] Heading: "Upcoming Interviews"
- [ ] "Schedule Interview" button
- [ ] **Learning:** Page organization

### ✅ Task 6.2: Create Add Interview Form
- [ ] Fields: application_id, round_name, scheduled_date, scheduled_time, prep_notes
- [ ] Application dropdown: user's applications
- [ ] Round examples: Phone Screen, Technical, Managerial, HR
- [ ] **Learning:** DateTime inputs

### ✅ Task 6.3: Implement Interview CRUD
- [ ] createInterview(data)
- [ ] updateInterview(id, data)
- [ ] deleteInterview(id)
- [ ] **Learning:** CRUD patterns

### ✅ Task 6.4: Display Interview Schedule
- [ ] Query: ORDER BY scheduled_date ASC
- [ ] Create `components/interviews/InterviewCard.tsx`
- [ ] Show: company, role, round, date/time
- [ ] Highlight today's interviews
- [ ] **Learning:** Sorting by date

### ✅ Task 6.5: Add Interview Status Tracking
- [ ] Status: Scheduled, Completed, Cancelled
- [ ] Status dropdown for quick update
- [ ] **Learning:** Status management

### ✅ Task 6.6: Create Prep Notes Section
- [ ] Rich textarea for notes
- [ ] Save to prep_notes column
- [ ] Show in expandable section
- [ ] **Learning:** Text content management

### ✅ Task 6.7: Add Feedback Field
- [ ] After completion, add feedback
- [ ] Show only when status = Completed
- [ ] **Learning:** Conditional fields

### ✅ Task 6.8: Link Interview to Application
- [ ] In application detail, show related interviews
- [ ] Query: WHERE application_id = ?
- [ ] Display as timeline/list
- [ ] **Learning:** Related data display

### ✅ Task 6.9: Update Application Status
- [ ] When interview completed
- [ ] Prompt: "Update application status?"
- [ ] **Learning:** Business logic, state transitions

### ✅ Task 6.10: Create Simple Calendar View
- [ ] Show interviews on monthly calendar
- [ ] Basic calendar grid (7 columns)
- [ ] Click date to see interviews
- [ ] **Learning:** Calendar UI

---

## PHASE 6.5: Email Notifications with Resend
**Duration:** 2-3 hours | **Day 9 Morning**

### ✅ Task 6.5.1: Create Resend Account
- [ ] Go to resend.com and sign up
- [ ] Verify email
- [ ] Navigate to API Keys
- [ ] Create and copy API key
- [ ] **Learning:** Third-party service setup

### ✅ Task 6.5.2: Install Resend Package
- [ ] Run: `npm install resend`
- [ ] Add to .env.local: `RESEND_API_KEY=re_xxx`
- [ ] **Learning:** API keys management

### ✅ Task 6.5.3: Create Email Utility Functions
- [ ] Create file: `lib/email/resend.ts`
- [ ] Initialize Resend client
- [ ] Export send function
- [ ] **Learning:** Service initialization

### ✅ Task 6.5.4: Design Email Templates
- [ ] Create folder: `lib/email/templates/`
- [ ] Create interviewReminderTemplate.ts
- [ ] Create followUpReminderTemplate.ts
- [ ] Create dailyDigestTemplate.ts
- [ ] Use inline CSS
- [ ] **Learning:** HTML emails

### ✅ Task 6.5.5: Create Send Email API Route
- [ ] Create: `app/api/send-email/route.ts`
- [ ] Accept POST with email type and data
- [ ] Call resend.emails.send()
- [ ] **Learning:** API routes, POST handling

### ✅ Task 6.5.6: Create Notification Preferences Page
- [ ] Create: `app/(protected)/settings/page.tsx`
- [ ] Form to save user email
- [ ] Toggles for different notification types
- [ ] Save to user_preferences
- [ ] **Learning:** Settings management

### ✅ Task 6.5.7: Implement Interview Reminder Logic
- [ ] Function: checkUpcomingInterviews(userId)
- [ ] Query: scheduled_date within 24 hours
- [ ] Send email if not already sent
- [ ] **Learning:** Reminder logic

### ✅ Task 6.5.8: Implement Follow-up Reminders
- [ ] Function: checkOverdueFollowUps(userId)
- [ ] Query: follow_up_date <= TODAY
- [ ] Send email for overdue items
- [ ] **Learning:** Overdue detection

### ✅ Task 6.5.9: Create Daily Digest Function
- [ ] Function: generateDailyDigest(userId)
- [ ] Aggregate: applications today, interviews today, pending
- [ ] Send summary email
- [ ] **Learning:** Data aggregation

### ✅ Task 6.5.10: Create Manual Trigger Endpoint
- [ ] Create: `app/api/send-reminders/route.ts`
- [ ] Loop through all users
- [ ] Call reminder functions
- [ ] **Learning:** Batch processing

### ✅ Task 6.5.11: Test Email Delivery
- [ ] Call manual trigger
- [ ] Check Gmail inbox
- [ ] Verify formatting
- [ ] Test on mobile email
- [ ] **Learning:** Email testing

---

## PHASE 6.6: Telegram Bot Integration
**Duration:** 3-4 hours | **Day 9 Afternoon**

### ✅ Task 6.6.1: Create Telegram Bot
- [ ] Open Telegram app
- [ ] Search @BotFather
- [ ] Send: /newbot
- [ ] Choose name and username
- [ ] Copy bot token
- [ ] **Learning:** Telegram Bot API

### ✅ Task 6.6.2: Add Telegram Token to Env
- [ ] Add: `TELEGRAM_BOT_TOKEN=123456:ABC...`
- [ ] **Learning:** Token management

### ✅ Task 6.6.3: Get User Chat ID
- [ ] Start chat with bot
- [ ] Send message
- [ ] Call: getUpdates API
- [ ] Extract chat_id
- [ ] **Learning:** Telegram API exploration

### ✅ Task 6.6.4: Create Telegram Utility Functions
- [ ] Create file: `lib/telegram/client.ts`
- [ ] Write sendMessage function
- [ ] Use fetch to call Telegram API
- [ ] **Learning:** REST API calls

### ✅ Task 6.6.5: Test Sending Message
- [ ] Create: `app/api/test-telegram/route.ts`
- [ ] Send: "Hello from Job Tracker!"
- [ ] Check Telegram app
- [ ] **Learning:** API testing

### ✅ Task 6.6.6: Add Chat ID to Preferences
- [ ] In settings, add Telegram Chat ID input
- [ ] Add instructions
- [ ] Save to user_preferences
- [ ] **Learning:** User configuration

### ✅ Task 6.6.7: Design Telegram Message Templates
- [ ] Use emojis: 🎯 📅 🏢 💼
- [ ] Format with newlines
- [ ] Create templates for notifications
- [ ] **Learning:** Message formatting

### ✅ Task 6.6.8: Implement Interview Reminders
- [ ] Check if telegram_notifications enabled
- [ ] Send message via Telegram
- [ ] Send 24h and 2h before
- [ ] **Learning:** Multi-channel notifications

### ✅ Task 6.6.9: Send Follow-up Reminders
- [ ] Same logic as email
- [ ] Send via Telegram
- [ ] **Learning:** Consistent patterns

### ✅ Task 6.6.10: Create Daily Summary
- [ ] Send morning message with stats
- [ ] Format as bullet points
- [ ] **Learning:** Summary messaging

### ✅ Task 6.6.11: Handle Telegram Errors
- [ ] Wrap in try-catch
- [ ] Handle: bot blocked, invalid chat_id, network errors
- [ ] Don't break app
- [ ] **Learning:** Error handling

### ✅ Task 6.6.12: Create Combined Notification Function
- [ ] Function: sendNotification(userId, type, data)
- [ ] Check preferences
- [ ] Send email and/or Telegram
- [ ] **Learning:** Multi-channel orchestration

---

## PHASE 6.7: Automated Reminders with Vercel Cron
**Duration:** 2-3 hours | **Day 10 Morning**

### ✅ Task 6.7.1: Understand Vercel Cron
- [ ] Read Vercel Cron docs
- [ ] Learn cron syntax: `0 8 * * *`
- [ ] Understand time zones
- [ ] **Learning:** Cron jobs, scheduled tasks

### ✅ Task 6.7.2: Create Cron API Route
- [ ] Create: `app/api/cron/send-reminders/route.ts`
- [ ] Handle GET request
- [ ] **Learning:** Cron endpoints

### ✅ Task 6.7.3: Implement Multi-User Logic
- [ ] Query all users
- [ ] Loop through each
- [ ] Check interviews and follow-ups
- [ ] Send notifications per preferences
- [ ] **Learning:** Batch processing

### ✅ Task 6.7.4: Add Cron Configuration
- [ ] Create/update `vercel.json`
- [ ] Add crons section with path and schedule
- [ ] Schedule: "30 2 * * *" for 8 AM IST
- [ ] **Learning:** Vercel configuration

### ✅ Task 6.7.5: Add Cron Authorization
- [ ] Protect route from unauthorized access
- [ ] Check Vercel cron secret header
- [ ] **Learning:** API security

### ✅ Task 6.7.6: Add Logging
- [ ] Log when cron runs
- [ ] Log users processed
- [ ] Log notifications sent
- [ ] Log errors
- [ ] **Learning:** Production logging

### ✅ Task 6.7.7: Test Locally
- [ ] Create test button to call endpoint
- [ ] Verify logic works
- [ ] **Learning:** Testing scheduled tasks

### ✅ Task 6.7.8: Deploy and Verify
- [ ] Deploy to Vercel
- [ ] Check Vercel → Cron Jobs
- [ ] Verify scheduled
- [ ] Check logs
- [ ] **Learning:** Production cron

---

## PHASE 7: Analytics & Insights
**Duration:** 3-4 hours | **Day 10 Afternoon - Day 11**

### ✅ Task 7.1: Create Analytics Page
- [ ] Create: `app/(protected)/analytics/page.tsx`
- [ ] Grid layout for analytics sections
- [ ] **Learning:** Analytics structure

### ✅ Task 7.2: Response Rate by Resume
- [ ] Group applications by resume_id
- [ ] Calculate response rate per resume
- [ ] Display as bar chart
- [ ] **Learning:** GROUP BY queries

### ✅ Task 7.3: Success by Company Tier
- [ ] Add company_tier field or mapping
- [ ] Tiers: FAANG, Unicorn, Mid-Size, Startup
- [ ] Calculate success rates
- [ ] **Learning:** Categorization

### ✅ Task 7.4: Referral vs Direct
- [ ] Group: referral_id NOT NULL vs NULL
- [ ] Calculate response rates
- [ ] Display comparison
- [ ] **Learning:** NULL handling

### ✅ Task 7.5: Avg Time to Response
- [ ] Add response_date field
- [ ] Calculate: AVG(response_date - applied_date)
- [ ] Display in days
- [ ] **Learning:** Date arithmetic

### ✅ Task 7.6: Avg Time to Offer
- [ ] For status = Offer
- [ ] Calculate: AVG(offer_date - applied_date)
- [ ] Display by tier
- [ ] **Learning:** Timeline analytics

### ✅ Task 7.7: Application Funnel
- [ ] Stages: Applied → OA → Interview → Offer
- [ ] Count at each stage
- [ ] Calculate drop-off rates
- [ ] **Learning:** Funnel analysis

### ✅ Task 7.8: Best Days to Apply
- [ ] Extract day of week
- [ ] Calculate response rate per day
- [ ] Display as bar chart
- [ ] **Learning:** Day-of-week analysis

### ✅ Task 7.9: Fastest Responding Companies
- [ ] Calculate avg response time per company
- [ ] Sort by fastest
- [ ] Display top 10
- [ ] **Learning:** Company analytics

### ✅ Task 7.10: Success Rate by Company
- [ ] Calculate offer rate per company
- [ ] Identify best companies
- [ ] **Learning:** Performance analytics

### ✅ Task 7.11: Monthly Trend Chart
- [ ] Group by month
- [ ] Count per month
- [ ] Display as line chart
- [ ] **Learning:** Monthly aggregation

### ✅ Task 7.12: Add Date Range Filter
- [ ] Date range picker
- [ ] Filter all analytics
- [ ] Update charts dynamically
- [ ] **Learning:** Dynamic filtering

### ✅ Task 7.13: Mobile Responsive
- [ ] Stack charts vertically
- [ ] Horizontal scroll
- [ ] Smaller dimensions
- [ ] **Learning:** Responsive data viz

---

## PHASE 8: Calendar & Timeline View
**Duration:** 3 hours | **Day 11 Afternoon**

### ✅ Task 8.1: Create Calendar Page
- [ ] Create: `app/(protected)/calendar/page.tsx`
- [ ] Or use list view for MVP
- [ ] **Learning:** Calendar vs list

### ✅ Task 8.2: Fetch All Events
- [ ] Query interviews with dates
- [ ] Query referrals with follow-up dates
- [ ] Combine into events array
- [ ] **Learning:** Multi-source aggregation

### ✅ Task 8.3: Display Events in List
- [ ] Sort by date
- [ ] Group: Today, Tomorrow, This Week, Later
- [ ] **Learning:** Date grouping

### ✅ Task 8.4: Build Month Grid (Optional)
- [ ] 7-column grid for days
- [ ] Place events on dates
- [ ] Click to see details
- [ ] **Learning:** Calendar grid

### ✅ Task 8.5: Add Today Indicator
- [ ] Highlight current date
- [ ] Show "Today" label
- [ ] Auto-scroll
- [ ] **Learning:** Current date handling

### ✅ Task 8.6: Month Navigation
- [ ] Previous/Next buttons
- [ ] Update month display
- [ ] **Learning:** State management

### ✅ Task 8.7: Action Items Section
- [ ] Show today's tasks
- [ ] Interviews today
- [ ] Follow-ups due
- [ ] **Learning:** Task lists

### ✅ Task 8.8: Mobile Responsive
- [ ] Use list view on mobile
- [ ] Weekly view instead of monthly
- [ ] **Learning:** Mobile calendar UX

---

## PHASE 9: Mobile Responsiveness & UX Polish
**Duration:** 4-5 hours | **Day 12-13**

### ✅ Task 9.1: Mobile Navigation
- [ ] Use shadcn Sheet for menu
- [ ] Hamburger icon
- [ ] Slide-out menu
- [ ] **Learning:** Mobile navigation

### ✅ Task 9.2: Test All Pages Mobile
- [ ] Use Chrome DevTools
- [ ] Test 375px, 768px, 1024px
- [ ] Note issues
- [ ] **Learning:** Responsive testing

### ✅ Task 9.3: Optimize Forms Mobile
- [ ] 44px min height for inputs/buttons
- [ ] Use type="email", type="tel"
- [ ] Ensure keyboard doesn't hide inputs
- [ ] **Learning:** Mobile forms

### ✅ Task 9.4: Sheet for Mobile Dialogs
- [ ] Replace Dialog with Sheet on mobile
- [ ] Slides from bottom
- [ ] **Learning:** Adaptive components

### ✅ Task 9.5: Optimize Tables
- [ ] Convert to cards on mobile
- [ ] Hide less important columns
- [ ] **Learning:** Responsive tables

### ✅ Task 9.6: Adjust Typography
- [ ] Reduce heading sizes
- [ ] 16px min for body (prevents zoom)
- [ ] Increase line height
- [ ] **Learning:** Responsive typography

### ✅ Task 9.7: Optimize Spacing
- [ ] Reduce padding on mobile
- [ ] Comfortable thumb reach
- [ ] More tap area
- [ ] **Learning:** Mobile spacing

### ✅ Task 9.8: Add Skeletons Everywhere
- [ ] Every loading component
- [ ] Match content shape
- [ ] **Learning:** Loading states

### ✅ Task 9.9: Improve Error Messages
- [ ] User-friendly errors
- [ ] Add error boundaries
- [ ] Add retry buttons
- [ ] **Learning:** Error UX

### ✅ Task 9.10: Success Feedback
- [ ] Toast for all actions
- [ ] Use shadcn Toast/Sonner
- [ ] **Learning:** User feedback

### ✅ Task 9.11: Test Touch
- [ ] Tap all buttons
- [ ] Test dropdowns
- [ ] **Learning:** Touch usability

### ✅ Task 9.12: Test Real Device
- [ ] Open on phone
- [ ] Test all features
- [ ] Note lag
- [ ] **Learning:** Real device testing

### ✅ Task 9.13: Offline Indicator
- [ ] Detect offline
- [ ] Show banner
- [ ] **Learning:** Network detection

### ✅ Task 9.14: Optimize Performance
- [ ] Compress images
- [ ] Lazy load
- [ ] Use WebP
- [ ] **Learning:** Performance

---

## PHASE 10: Deployment & Final Testing
**Duration:** 4-5 hours | **Day 14**

### ✅ Task 10.1: Review Environment Variables
- [ ] List all needed env vars
- [ ] Prepare for production
- [ ] **Learning:** Deployment prep

### ✅ Task 10.2: Configure Production Auth
- [ ] Update Supabase Site URL to production
- [ ] Add production to redirect URLs
- [ ] Update email templates
- [ ] **Learning:** Production auth

### ✅ Task 10.3: Connect GitHub to Vercel
- [ ] Push to GitHub
- [ ] Go to vercel.com
- [ ] Import repository
- [ ] **Learning:** CI/CD setup

### ✅ Task 10.4: Configure Vercel Env Vars
- [ ] Add all env vars in Vercel
- [ ] Set for all environments
- [ ] **Learning:** Production config

### ✅ Task 10.5: Deploy
- [ ] Click "Deploy"
- [ ] Monitor build logs
- [ ] Fix errors
- [ ] **Learning:** Deployment process

### ✅ Task 10.6: Test Production Auth
- [ ] Test signup with real email
- [ ] Test confirmation
- [ ] Test login/logout
- [ ] Test forgot password
- [ ] **Learning:** Production testing

### ✅ Task 10.7: Test Multi-User Production
- [ ] Create two accounts
- [ ] Verify data isolation
- [ ] **Learning:** Security verification

### ✅ Task 10.8: Verify RLS Production
- [ ] Try to manipulate URLs
- [ ] Verify can't access others' data
- [ ] **Learning:** Security testing

### ✅ Task 10.9: Test All Features
- [ ] Complete user flow
- [ ] Desktop and mobile
- [ ] Email and Telegram
- [ ] Verify cron
- [ ] **Learning:** Comprehensive testing

### ✅ Task 10.10: Performance Testing
- [ ] Run Lighthouse audit
- [ ] Check scores (aim >90)
- [ ] Fix critical issues
- [ ] **Learning:** Performance metrics

### ✅ Task 10.11: Custom Domain (Optional)
- [ ] Add domain to Vercel
- [ ] Configure DNS
- [ ] Wait for SSL
- [ ] **Learning:** Domain config

### ✅ Task 10.12: Write README
- [ ] Project description
- [ ] Features list with emojis
- [ ] Screenshots
- [ ] Tech stack
- [ ] Setup instructions
- [ ] Live demo link
- [ ] **Learning:** Documentation

### ✅ Task 10.13: Create Demo Video
- [ ] Record screen
- [ ] Show mobile view
- [ ] Create GIF
- [ ] **Learning:** Product demo

### ✅ Task 10.14: Prepare for Interviews
- [ ] 3 technical challenges solved
- [ ] Practice 2-min architecture explanation
- [ ] Prepare to demo live
- [ ] Think of improvements
- [ ] **Learning:** Interview prep

### ✅ Task 10.15: Get Feedback
- [ ] Share with friends/peers
- [ ] Note bugs and issues
- [ ] Create backlog
- [ ] Fix critical issues
- [ ] **Learning:** User feedback

---

## 🎯 Success Metrics

By completing all phases, you will have:

### Technical Skills Gained
- ✅ Next.js 14 App Router mastery
- ✅ TypeScript with React
- ✅ Supabase (PostgreSQL, Auth, Storage, RLS)
- ✅ Tailwind CSS responsive design
- ✅ shadcn/ui component library
- ✅ API integration (Resend, Telegram)
- ✅ Deployment with Vercel
- ✅ Cron jobs and scheduled tasks

### Project Deliverables
- ✅ Production-ready web application
- ✅ Mobile-responsive UI
- ✅ Multi-user authentication system
- ✅ Automated email/Telegram notifications
- ✅ Data analytics and visualization
- ✅ Comprehensive documentation
- ✅ Portfolio-worthy demo

### Interview Readiness
- ✅ Full-stack project to discuss
- ✅ Understanding of modern web architecture
- ✅ Experience with production deployment
- ✅ Security best practices (RLS, auth)
- ✅ Real-world problem solving

---

## 📝 Daily Progress Tracker

**Week 1:**
- [ ] Day 1: Phases 0, 0.5, 0.6 (Setup + Auth)
- [ ] Day 2: Phase 1 (Database)
- [ ] Day 3: Phase 2 Part 1 (Applications CRUD)
- [ ] Day 4: Phase 2 Part 2 (Filters + Views)

**Week 2:**
- [ ] Day 5: Phase 3 (Dashboard)
- [ ] Day 6: Phase 4 (Referrals)
- [ ] Day 7: Phase 5 (Resumes)
- [ ] Day 8: Phase 6 (Interviews)

**Week 3:**
- [ ] Day 9: Phases 6.5, 6.6 (Notifications)
- [ ] Day 10: Phases 6.7, 7 (Cron + Analytics)
- [ ] Day 11: Phase 8 (Calendar)
- [ ] Day 12-13: Phase 9 (Mobile Polish)

**Week 4:**
- [ ] Day 14: Phase 10 (Deployment)
- [ ] Day 15: Buffer for fixes

---

## 🚀 Getting Started

1. **Save this file** in your project root as `TASKS.md`
2. **Check off tasks** as you complete them
3. **Commit frequently** to Git after each completed task
4. **Test thoroughly** before moving to next phase
5. **Document learnings** in your daily journal

**Ready to build? Let's start with Phase 0!** 🎯
