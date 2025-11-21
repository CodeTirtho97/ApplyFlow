# Activity Logger Fix - Server Actions Approach

## Problem
The activity logging system was failing with empty error objects `{}` when trying to insert activities from client components. This was due to RLS (Row Level Security) policy issues with client-side database inserts.

## Root Cause
Client components using `@/lib/supabase/client` don't reliably provide the authenticated user context needed for RLS policies to work correctly. The `auth.uid()` function in RLS policies wasn't matching the user_id being inserted.

## Solution
**Converted activity logging to use Server Actions instead of client-side inserts.**

Server Actions:
- Run on the server with proper authentication context
- Can explicitly fetch and set the `user_id` from `supabase.auth.getUser()`
- Work reliably with RLS policies
- Use `@/lib/supabase/server` which has proper SSR authentication

## Changes Made

### 1. Created Server Actions File
**File:** `lib/supabase/actions/activity-actions.ts`

Key features:
- `'use server'` directive at the top
- Uses `createClient()` from `@/lib/supabase/server`
- Explicitly fetches user with `supabase.auth.getUser()`
- Sets `user_id` manually in insert
- Calls `revalidatePath('/dashboard')` to refresh dashboard data
- Returns success/error status

### 2. Updated Components

#### AddApplicationDialog.tsx
Changed import from:
```typescript
import { logApplicationCreated } from '@/lib/supabase/activity-logger'
```

To:
```typescript
import { logApplicationCreated } from '@/lib/supabase/actions/activity-actions'
```

#### ApplicationsTable.tsx
Changed imports from:
```typescript
import {
  logApplicationStatusChanged,
  logApplicationDeleted,
} from '@/lib/supabase/activity-logger'
```

To:
```typescript
import {
  logApplicationStatusChanged,
  logApplicationDeleted,
} from '@/lib/supabase/actions/activity-actions'
```

### 3. RLS Policies Verification
Created migration file: `005_verify_activities_policies.sql`

This file:
- Drops and recreates all RLS policies to ensure correct syntax
- Verifies table structure
- Confirms RLS is enabled

## How to Apply the Fix

### Step 1: Run the RLS verification migration
In Supabase Dashboard → SQL Editor, run:
```bash
supabase/migrations/005_verify_activities_policies.sql
```

Or if using local development:
```bash
npx supabase db reset
```

### Step 2: Restart the Next.js dev server
```bash
# Stop the current server (Ctrl+C)
npm run dev
```

### Step 3: Test activity logging
1. Go to Applications page
2. Add a new application
3. Change the status of an application
4. Delete an application
5. Go to Dashboard and check "Recent Activity" section

## Expected Results
- No more "Failed to log activity: {}" errors in console
- Activities appear in the Recent Activity section on the dashboard
- Each action (created, status_changed, deleted) is properly logged with timestamp

## Why Server Actions Work Better

| Aspect | Client-side Insert (OLD) | Server Action (NEW) |
|--------|-------------------------|---------------------|
| Authentication Context | Unreliable | ✅ Reliable |
| RLS Compatibility | ❌ Issues | ✅ Works perfectly |
| user_id Handling | Implicit | ✅ Explicit |
| Error Messages | Empty `{}` | ✅ Detailed errors |
| Cache Revalidation | Manual | ✅ Built-in |

## Files Modified

1. ✅ `lib/supabase/actions/activity-actions.ts` (NEW)
2. ✅ `components/applications/AddApplicationDialog.tsx` (UPDATED)
3. ✅ `components/applications/ApplicationsTable.tsx` (UPDATED)
4. ✅ `supabase/migrations/005_verify_activities_policies.sql` (NEW)

## Files You Can Keep (No Changes Needed)

- `lib/supabase/activity-logger.ts` - Keep for reference, but not used anymore
- `lib/supabase/dashboard-queries.ts` - Already correct
- `components/dashboard/RecentActivity.tsx` - Already correct
- `supabase/migrations/004_activities_table.sql` - Already applied

## Future Activity Logging

When adding logging to other features (Referrals, Resumes, Interviews), always:
1. Import from `@/lib/supabase/actions/activity-actions`
2. Call the appropriate helper function (e.g., `logReferralCreated()`)
3. The server action will handle authentication and RLS automatically

## Debugging Tips

If you still see errors:
1. Check browser console for detailed error messages
2. Verify user is authenticated: Check Supabase Dashboard → Authentication
3. Check RLS policies: Supabase Dashboard → Table Editor → activities → Policies tab
4. Verify the activities table exists: Supabase Dashboard → Table Editor
5. Check server console (terminal running `npm run dev`) for server-side errors
