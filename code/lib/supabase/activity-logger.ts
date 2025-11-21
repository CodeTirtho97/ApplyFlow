// Activity Logger - Logs all user actions
import { createClient } from '@/lib/supabase/client'

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
    const supabase = createClient()

    const { error } = await supabase.from('activities').insert({
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
    }
  } catch (error) {
    console.error('Error logging activity:', error)
  }
}

// Specific helper functions for common actions
export async function logApplicationCreated(applicationId: string, companyName: string, role: string) {
  await logActivity({
    activityType: 'application',
    action: 'created',
    entityId: applicationId,
    entityName: companyName,
    description: `Applied for ${role} at ${companyName}`,
  })
}

export async function logApplicationUpdated(applicationId: string, companyName: string, changes: string) {
  await logActivity({
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
  await logActivity({
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
  await logActivity({
    activityType: 'application',
    action: 'deleted',
    entityId: applicationId,
    entityName: companyName,
    description: `Deleted application for ${role} at ${companyName}`,
  })
}

export async function logReferralCreated(referralId: string, personName: string, company: string) {
  await logActivity({
    activityType: 'referral',
    action: 'created',
    entityId: referralId,
    entityName: personName,
    description: `Added referral from ${personName} at ${company}`,
  })
}

export async function logReferralUpdated(referralId: string, personName: string, changes: string) {
  await logActivity({
    activityType: 'referral',
    action: 'updated',
    entityId: referralId,
    entityName: personName,
    description: `Updated referral: ${changes}`,
  })
}

export async function logReferralDeleted(referralId: string, personName: string, company: string) {
  await logActivity({
    activityType: 'referral',
    action: 'deleted',
    entityId: referralId,
    entityName: personName,
    description: `Deleted referral from ${personName} at ${company}`,
  })
}

export async function logResumeCreated(resumeId: string, versionName: string) {
  await logActivity({
    activityType: 'resume',
    action: 'created',
    entityId: resumeId,
    entityName: versionName,
    description: `Uploaded resume: ${versionName}`,
  })
}

export async function logResumeUpdated(resumeId: string, versionName: string, changes: string) {
  await logActivity({
    activityType: 'resume',
    action: 'updated',
    entityId: resumeId,
    entityName: versionName,
    description: `Updated resume: ${changes}`,
  })
}

export async function logResumeDeleted(resumeId: string, versionName: string) {
  await logActivity({
    activityType: 'resume',
    action: 'deleted',
    entityId: resumeId,
    entityName: versionName,
    description: `Deleted resume: ${versionName}`,
  })
}

export async function logInterviewCreated(interviewId: string, companyName: string, roundName: string) {
  await logActivity({
    activityType: 'interview',
    action: 'created',
    entityId: interviewId,
    entityName: companyName,
    description: `Scheduled ${roundName} interview at ${companyName}`,
  })
}

export async function logInterviewUpdated(interviewId: string, companyName: string, changes: string) {
  await logActivity({
    activityType: 'interview',
    action: 'updated',
    entityId: interviewId,
    entityName: companyName,
    description: `Updated interview: ${changes}`,
  })
}

export async function logInterviewDeleted(interviewId: string, companyName: string, roundName: string) {
  await logActivity({
    activityType: 'interview',
    action: 'deleted',
    entityId: interviewId,
    entityName: companyName,
    description: `Deleted ${roundName} interview at ${companyName}`,
  })
}
