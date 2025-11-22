// Server-side dashboard query functions
import { createClient } from '@/lib/supabase/server'
import type { ActivityItem } from '@/components/dashboard/RecentActivity'
import type { Application, Referral, Resume, Interview } from '@/types/database.types'

export async function getDashboardStats() {
  const supabase = await createClient()

  // Fetch all data in parallel
  const [applicationsRes, referralsRes, resumesRes, interviewsRes] =
    await Promise.all([
      supabase.from('applications').select('*'),
      supabase.from('referrals').select('*'),
      supabase.from('resumes').select('*'),
      supabase.from('interviews').select('*'),
    ])

  const applications = (applicationsRes.data || []) as Application[]
  const referrals = (referralsRes.data || []) as Referral[]
  const resumes = (resumesRes.data || []) as Resume[]
  const interviews = (interviewsRes.data || []) as Interview[]

  // Calculate application stats
  const interviewCount = applications.filter((a) => a.status === 'Interview').length
  const offerCount = applications.filter((a) => a.status === 'Offer').length
  const responseRate = applications.length > 0
    ? ((interviewCount + offerCount) / applications.length) * 100
    : 0

  const applicationStats = {
    total: applications.length,
    byStatus: {
      Applied: applications.filter((a) => a.status === 'Applied').length,
      OA: applications.filter((a) => a.status === 'OA').length,
      Interview: interviewCount,
      Offer: offerCount,
      Rejected: applications.filter((a) => a.status === 'Rejected').length,
      Ghosted: applications.filter((a) => a.status === 'Ghosted').length,
      Withdrawn: applications.filter((a) => a.status === 'Withdrawn').length,
    },
    responseRate,
  }

  // Calculate referral stats
  const referralStats = {
    total: referrals.length,
    byStatus: {
      Pending: referrals.filter((r) => r.status === 'Pending').length,
      Agreed: referrals.filter((r) => r.status === 'Agreed').length,
      Referred: referrals.filter((r) => r.status === 'Referred').length,
      Declined: referrals.filter((r) => r.status === 'Declined').length,
    },
  }

  // Calculate resume stats with acceptance rate
  const resumeStats = {
    total: resumes.length,
    totalUsed: resumes.reduce((sum, r) => sum + (r.times_used || 0), 0),
    averageSuccessRate:
      resumes.length > 0
        ? resumes.reduce((sum, r) => sum + (r.success_rate || 0), 0) /
          resumes.length
        : 0,
    topResume:
      resumes.length > 0
        ? resumes.reduce((prev, current) =>
            (prev.success_rate || 0) > (current.success_rate || 0)
              ? prev
              : current
          )
        : null,
  }

  // Calculate interview stats
  const interviewStats = {
    total: interviews.length,
    byStatus: {
      Scheduled: interviews.filter((i) => i.status === 'Scheduled').length,
      Completed: interviews.filter((i) => i.status === 'Completed').length,
      Cancelled: interviews.filter((i) => i.status === 'Cancelled').length,
      Rescheduled: interviews.filter((i) => i.status === 'Rescheduled').length,
    },
    upcoming: interviews.filter(
      (i) =>
        i.status === 'Scheduled' &&
        i.scheduled_date &&
        new Date(i.scheduled_date) > new Date()
    ).length,
  }

  return {
    applicationStats,
    referralStats,
    resumeStats,
    interviewStats,
  }
}

export async function getRecentActivity(): Promise<ActivityItem[]> {
  const supabase = await createClient()

  // Fetch recent activities from activities table
  const { data: activitiesData, error } = await supabase
    .from('activities')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(20)

  if (error) {
    console.error('Error fetching activities:', error)
    return []
  }

  // Map database activities to ActivityItem format
  const activities: ActivityItem[] = ((activitiesData || []) as any[]).map((activity) => {
    let title = ''
    let description = activity.description || ''

    // Generate title based on activity type and action
    switch (activity.activity_type) {
      case 'application':
        if (activity.action === 'created') {
          title = `Application to ${activity.entity_name}`
        } else if (activity.action === 'status_changed') {
          title = `Status changed: ${activity.entity_name}`
        } else if (activity.action === 'updated') {
          title = `Updated application: ${activity.entity_name}`
        } else if (activity.action === 'deleted') {
          title = `Deleted application: ${activity.entity_name}`
        }
        break
      case 'referral':
        if (activity.action === 'created') {
          title = `Referral from ${activity.entity_name}`
        } else if (activity.action === 'updated') {
          title = `Updated referral: ${activity.entity_name}`
        } else if (activity.action === 'deleted') {
          title = `Deleted referral: ${activity.entity_name}`
        }
        break
      case 'resume':
        if (activity.action === 'created') {
          title = `Resume uploaded: ${activity.entity_name}`
        } else if (activity.action === 'updated') {
          title = `Updated resume: ${activity.entity_name}`
        } else if (activity.action === 'deleted') {
          title = `Deleted resume: ${activity.entity_name}`
        }
        break
      case 'interview':
        if (activity.action === 'created') {
          title = `Interview at ${activity.entity_name}`
        } else if (activity.action === 'updated') {
          title = `Updated interview: ${activity.entity_name}`
        } else if (activity.action === 'deleted') {
          title = `Deleted interview: ${activity.entity_name}`
        }
        break
    }

    return {
      id: activity.id,
      type: activity.activity_type,
      action: activity.action,
      title,
      description,
      timestamp: activity.created_at,
    }
  })

  return activities.slice(0, 15)
}
