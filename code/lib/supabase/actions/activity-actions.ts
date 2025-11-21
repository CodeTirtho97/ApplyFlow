'use server'

// Server Actions for Activity Logging
// This approach avoids RLS issues with client-side inserts

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export type ActivityType = 'application' | 'referral' | 'resume' | 'interview'
export type ActivityAction = 'created' | 'updated' | 'deleted' | 'status_changed'

interface LogActivityParams {
  activityType: ActivityType
  action: ActivityAction
  entityId: string
  entityName: string
  description: string
  oldValue?: string
  newValue?: string
}

export async function logActivity({
  activityType,
  action,
  entityId,
  entityName,
  description,
  oldValue,
  newValue,
}: LogActivityParams) {
  try {
    const supabase = await createClient()

    // Get the current user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      console.error('No authenticated user found for activity logging')
      return { error: 'User not authenticated' }
    }

    const { error } = await supabase.from('activities').insert({
      user_id: user.id,
      activity_type: activityType,
      action,
      entity_id: entityId,
      entity_name: entityName,
      description,
      old_value: oldValue || null,
      new_value: newValue || null,
    })

    if (error) {
      console.error('Failed to log activity:', error)
      return { error: error.message }
    }

    // Revalidate the dashboard to show new activity
    revalidatePath('/dashboard')

    return { success: true }
  } catch (error) {
    console.error('Error logging activity:', error)
    return { error: 'Failed to log activity' }
  }
}

// Specific helper functions for common actions
export async function logApplicationCreated(applicationId: string, companyName: string, role: string) {
  return await logActivity({
    activityType: 'application',
    action: 'created',
    entityId: applicationId,
    entityName: companyName,
    description: `Applied for ${role} at ${companyName}`,
  })
}

export async function logApplicationUpdated(applicationId: string, companyName: string, changes: string) {
  return await logActivity({
    activityType: 'application',
    action: 'updated',
    entityId: applicationId,
    entityName: companyName,
    description: `Updated application: ${changes}`,
  })
}

export async function logApplicationStatusChanged(
  applicationId: string,
  companyName: string,
  oldStatus: string,
  newStatus: string
) {
  return await logActivity({
    activityType: 'application',
    action: 'status_changed',
    entityId: applicationId,
    entityName: companyName,
    description: `Status changed from ${oldStatus} to ${newStatus}`,
    oldValue: oldStatus,
    newValue: newStatus,
  })
}

export async function logApplicationDeleted(applicationId: string, companyName: string, role: string) {
  return await logActivity({
    activityType: 'application',
    action: 'deleted',
    entityId: applicationId,
    entityName: companyName,
    description: `Deleted application for ${role} at ${companyName}`,
  })
}

export async function logReferralCreated(referralId: string, personName: string, company: string) {
  return await logActivity({
    activityType: 'referral',
    action: 'created',
    entityId: referralId,
    entityName: personName,
    description: `Added referral from ${personName} at ${company}`,
  })
}

export async function logReferralUpdated(referralId: string, personName: string, changes: string) {
  return await logActivity({
    activityType: 'referral',
    action: 'updated',
    entityId: referralId,
    entityName: personName,
    description: `Updated referral: ${changes}`,
  })
}

export async function logReferralDeleted(referralId: string, personName: string, company: string) {
  return await logActivity({
    activityType: 'referral',
    action: 'deleted',
    entityId: referralId,
    entityName: personName,
    description: `Deleted referral from ${personName} at ${company}`,
  })
}

export async function logResumeCreated(resumeId: string, versionName: string) {
  return await logActivity({
    activityType: 'resume',
    action: 'created',
    entityId: resumeId,
    entityName: versionName,
    description: `Uploaded resume: ${versionName}`,
  })
}

export async function logResumeUpdated(resumeId: string, versionName: string, changes: string) {
  return await logActivity({
    activityType: 'resume',
    action: 'updated',
    entityId: resumeId,
    entityName: versionName,
    description: `Updated resume: ${changes}`,
  })
}

export async function logResumeDeleted(resumeId: string, versionName: string) {
  return await logActivity({
    activityType: 'resume',
    action: 'deleted',
    entityId: resumeId,
    entityName: versionName,
    description: `Deleted resume: ${versionName}`,
  })
}

export async function logInterviewCreated(interviewId: string, companyName: string, roundName: string) {
  return await logActivity({
    activityType: 'interview',
    action: 'created',
    entityId: interviewId,
    entityName: companyName,
    description: `Scheduled ${roundName} interview at ${companyName}`,
  })
}

export async function logInterviewUpdated(interviewId: string, companyName: string, changes: string) {
  return await logActivity({
    activityType: 'interview',
    action: 'updated',
    entityId: interviewId,
    entityName: companyName,
    description: `Updated interview: ${changes}`,
  })
}

export async function logInterviewDeleted(interviewId: string, companyName: string, roundName: string) {
  return await logActivity({
    activityType: 'interview',
    action: 'deleted',
    entityId: interviewId,
    entityName: companyName,
    description: `Deleted ${roundName} interview at ${companyName}`,
  })
}
