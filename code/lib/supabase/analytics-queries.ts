/**
 * Analytics Queries for ApplyFlow
 * All analytics and reporting queries
 */

import { createClient } from '@/lib/supabase/client'
import type { Application, Resume } from '@/types/database.types'
import { differenceInDays, parseISO, format, startOfMonth, endOfMonth } from 'date-fns'

// =====================================================
// ANALYTICS DATA TYPES
// =====================================================

export interface ResumeAnalytics {
  resume_id: string
  resume_name: string
  total_applications: number
  responses: number
  response_rate: number
}

export interface CompanyTierAnalytics {
  tier: string
  total_applications: number
  offers: number
  success_rate: number
}

export interface ReferralAnalytics {
  type: 'Referral' | 'Direct'
  total_applications: number
  responses: number
  response_rate: number
}

export interface TimeMetrics {
  avg_time_to_response: number // in days
  avg_time_to_offer: number // in days
}

export interface FunnelStage {
  stage: string
  count: number
  percentage: number
}

export interface DayAnalytics {
  day: string
  applications: number
  responses: number
  response_rate: number
}

export interface CompanyMetrics {
  company_name: string
  total_applications: number
  avg_response_time: number
  offers: number
  success_rate: number
}

export interface MonthlyTrend {
  month: string
  applications: number
  offers: number
}

// =====================================================
// ANALYTICS QUERY FUNCTIONS
// =====================================================

/**
 * Get response rate by resume
 */
export async function getResumeAnalytics(
  startDate?: string,
  endDate?: string
): Promise<ResumeAnalytics[]> {
  const supabase = createClient()

  let query = supabase
    .from('applications')
    .select('resume_id, status, resumes(version_name)')

  if (startDate) query = query.gte('applied_date', startDate)
  if (endDate) query = query.lte('applied_date', endDate)

  const { data: applications, error } = await query

  if (error) throw error

  // Group by resume_id
  const resumeMap = new Map<string, ResumeAnalytics>()

  applications?.forEach((app: any) => {
    const resumeId = app.resume_id || 'no-resume'
    const resumeName = app.resumes?.version_name || 'No Resume'

    if (!resumeMap.has(resumeId)) {
      resumeMap.set(resumeId, {
        resume_id: resumeId,
        resume_name: resumeName,
        total_applications: 0,
        responses: 0,
        response_rate: 0,
      })
    }

    const stats = resumeMap.get(resumeId)!
    stats.total_applications++

    // Count responses (anything beyond Applied)
    if (
      app.status !== 'Applied' &&
      app.status !== 'Ghosted' &&
      app.status !== 'Withdrawn'
    ) {
      stats.responses++
    }
  })

  // Calculate response rates
  const results: ResumeAnalytics[] = Array.from(resumeMap.values()).map(
    (stats) => ({
      ...stats,
      response_rate:
        stats.total_applications > 0
          ? (stats.responses / stats.total_applications) * 100
          : 0,
    })
  )

  return results.sort((a, b) => b.response_rate - a.response_rate)
}

/**
 * Get success by company tier
 */
export async function getCompanyTierAnalytics(
  startDate?: string,
  endDate?: string
): Promise<CompanyTierAnalytics[]> {
  const supabase = createClient()

  let query = supabase
    .from('applications')
    .select('company_tier, status')

  if (startDate) query = query.gte('applied_date', startDate)
  if (endDate) query = query.lte('applied_date', endDate)

  const { data: applications, error } = await query

  if (error) throw error

  // Group by company_tier
  const tierMap = new Map<string, CompanyTierAnalytics>()
  const tiers = ['FAANG', 'Unicorn', 'Mid-Size', 'Startup', 'Unknown']

  tiers.forEach((tier) => {
    tierMap.set(tier, {
      tier,
      total_applications: 0,
      offers: 0,
      success_rate: 0,
    })
  })

  applications?.forEach((app: any) => {
    const tier = app.company_tier || 'Unknown'
    const stats = tierMap.get(tier)!

    stats.total_applications++
    if (app.status === 'Offer') {
      stats.offers++
    }
  })

  // Calculate success rates
  const results: CompanyTierAnalytics[] = Array.from(tierMap.values())
    .filter((stats) => stats.total_applications > 0)
    .map((stats) => ({
      ...stats,
      success_rate:
        stats.total_applications > 0
          ? (stats.offers / stats.total_applications) * 100
          : 0,
    }))

  return results.sort((a, b) => b.success_rate - a.success_rate)
}

/**
 * Get referral vs direct comparison
 */
export async function getReferralAnalytics(
  startDate?: string,
  endDate?: string
): Promise<ReferralAnalytics[]> {
  const supabase = createClient()

  let query = supabase.from('applications').select('referral_id, status')

  if (startDate) query = query.gte('applied_date', startDate)
  if (endDate) query = query.lte('applied_date', endDate)

  const { data: applications, error } = await query

  if (error) throw error

  const referralStats: ReferralAnalytics = {
    type: 'Referral',
    total_applications: 0,
    responses: 0,
    response_rate: 0,
  }

  const directStats: ReferralAnalytics = {
    type: 'Direct',
    total_applications: 0,
    responses: 0,
    response_rate: 0,
  }

  applications?.forEach((app: any) => {
    const isReferral = app.referral_id !== null
    const hasResponse =
      app.status !== 'Applied' &&
      app.status !== 'Ghosted' &&
      app.status !== 'Withdrawn'

    if (isReferral) {
      referralStats.total_applications++
      if (hasResponse) referralStats.responses++
    } else {
      directStats.total_applications++
      if (hasResponse) directStats.responses++
    }
  })

  // Calculate response rates
  referralStats.response_rate =
    referralStats.total_applications > 0
      ? (referralStats.responses / referralStats.total_applications) * 100
      : 0

  directStats.response_rate =
    directStats.total_applications > 0
      ? (directStats.responses / directStats.total_applications) * 100
      : 0

  return [referralStats, directStats]
}

/**
 * Get average time metrics
 */
export async function getTimeMetrics(
  startDate?: string,
  endDate?: string
): Promise<TimeMetrics> {
  const supabase = createClient()

  let query = supabase
    .from('applications')
    .select('applied_date, response_date, offer_date, status')

  if (startDate) query = query.gte('applied_date', startDate)
  if (endDate) query = query.lte('applied_date', endDate)

  const { data: applications, error } = await query

  if (error) throw error

  let totalResponseTime = 0
  let responseCount = 0
  let totalOfferTime = 0
  let offerCount = 0

  applications?.forEach((app: any) => {
    if (app.response_date) {
      const days = differenceInDays(
        parseISO(app.response_date),
        parseISO(app.applied_date)
      )
      totalResponseTime += days
      responseCount++
    }

    if (app.offer_date) {
      const days = differenceInDays(
        parseISO(app.offer_date),
        parseISO(app.applied_date)
      )
      totalOfferTime += days
      offerCount++
    }
  })

  return {
    avg_time_to_response: responseCount > 0 ? totalResponseTime / responseCount : 0,
    avg_time_to_offer: offerCount > 0 ? totalOfferTime / offerCount : 0,
  }
}

/**
 * Get application funnel
 */
export async function getApplicationFunnel(
  startDate?: string,
  endDate?: string
): Promise<FunnelStage[]> {
  const supabase = createClient()

  let query = supabase.from('applications').select('status')

  if (startDate) query = query.gte('applied_date', startDate)
  if (endDate) query = query.lte('applied_date', endDate)

  const { data: applications, error } = await query

  if (error) throw error

  const total = applications?.length || 0
  const stages = ['Applied', 'OA', 'Interview', 'Offer']

  const counts = {
    Applied: total,
    OA: 0,
    Interview: 0,
    Offer: 0,
  }

  applications?.forEach((app: any) => {
    if (app.status === 'OA' || app.status === 'Interview' || app.status === 'Offer') {
      counts.OA++
    }
    if (app.status === 'Interview' || app.status === 'Offer') {
      counts.Interview++
    }
    if (app.status === 'Offer') {
      counts.Offer++
    }
  })

  return stages.map((stage) => ({
    stage,
    count: counts[stage as keyof typeof counts],
    percentage: total > 0 ? (counts[stage as keyof typeof counts] / total) * 100 : 0,
  }))
}

/**
 * Get best days to apply
 */
export async function getDayAnalytics(
  startDate?: string,
  endDate?: string
): Promise<DayAnalytics[]> {
  const supabase = createClient()

  let query = supabase
    .from('applications')
    .select('applied_date, status')

  if (startDate) query = query.gte('applied_date', startDate)
  if (endDate) query = query.lte('applied_date', endDate)

  const { data: applications, error } = await query

  if (error) throw error

  const dayMap = new Map<string, DayAnalytics>()
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  days.forEach((day) => {
    dayMap.set(day, {
      day,
      applications: 0,
      responses: 0,
      response_rate: 0,
    })
  })

  applications?.forEach((app: any) => {
    const dayIndex = parseISO(app.applied_date).getDay()
    const dayName = days[dayIndex]
    const stats = dayMap.get(dayName)!

    stats.applications++
    if (
      app.status !== 'Applied' &&
      app.status !== 'Ghosted' &&
      app.status !== 'Withdrawn'
    ) {
      stats.responses++
    }
  })

  // Calculate response rates
  const results: DayAnalytics[] = Array.from(dayMap.values()).map((stats) => ({
    ...stats,
    response_rate:
      stats.applications > 0 ? (stats.responses / stats.applications) * 100 : 0,
  }))

  return results
}

/**
 * Get fastest responding companies
 */
export async function getFastestCompanies(
  startDate?: string,
  endDate?: string,
  limit: number = 10
): Promise<CompanyMetrics[]> {
  const supabase = createClient()

  let query = supabase
    .from('applications')
    .select('company_name, applied_date, response_date, offer_date, status')

  if (startDate) query = query.gte('applied_date', startDate)
  if (endDate) query = query.lte('applied_date', endDate)

  const { data: applications, error } = await query

  if (error) throw error

  const companyMap = new Map<string, CompanyMetrics>()

  applications?.forEach((app: any) => {
    if (!companyMap.has(app.company_name)) {
      companyMap.set(app.company_name, {
        company_name: app.company_name,
        total_applications: 0,
        avg_response_time: 0,
        offers: 0,
        success_rate: 0,
      })
    }

    const stats = companyMap.get(app.company_name)!
    stats.total_applications++

    if (app.status === 'Offer') {
      stats.offers++
    }

    if (app.response_date) {
      const days = differenceInDays(
        parseISO(app.response_date),
        parseISO(app.applied_date)
      )
      stats.avg_response_time += days
    }
  })

  // Calculate averages
  const results: CompanyMetrics[] = Array.from(companyMap.values())
    .filter((stats) => stats.total_applications > 0)
    .map((stats) => ({
      ...stats,
      avg_response_time: stats.avg_response_time / stats.total_applications,
      success_rate:
        stats.total_applications > 0
          ? (stats.offers / stats.total_applications) * 100
          : 0,
    }))
    .sort((a, b) => a.avg_response_time - b.avg_response_time)
    .slice(0, limit)

  return results
}

/**
 * Get success rate by company
 */
export async function getCompanySuccessRates(
  startDate?: string,
  endDate?: string,
  limit: number = 10
): Promise<CompanyMetrics[]> {
  const supabase = createClient()

  let query = supabase
    .from('applications')
    .select('company_name, status')

  if (startDate) query = query.gte('applied_date', startDate)
  if (endDate) query = query.lte('applied_date', endDate)

  const { data: applications, error } = await query

  if (error) throw error

  const companyMap = new Map<string, CompanyMetrics>()

  applications?.forEach((app: any) => {
    if (!companyMap.has(app.company_name)) {
      companyMap.set(app.company_name, {
        company_name: app.company_name,
        total_applications: 0,
        avg_response_time: 0,
        offers: 0,
        success_rate: 0,
      })
    }

    const stats = companyMap.get(app.company_name)!
    stats.total_applications++

    if (app.status === 'Offer') {
      stats.offers++
    }
  })

  // Calculate success rates
  const results: CompanyMetrics[] = Array.from(companyMap.values())
    .filter((stats) => stats.total_applications >= 2) // Only companies with 2+ applications
    .map((stats) => ({
      ...stats,
      success_rate:
        stats.total_applications > 0
          ? (stats.offers / stats.total_applications) * 100
          : 0,
    }))
    .sort((a, b) => b.success_rate - a.success_rate)
    .slice(0, limit)

  return results
}

/**
 * Get monthly trend
 */
export async function getMonthlyTrend(
  startDate?: string,
  endDate?: string
): Promise<MonthlyTrend[]> {
  const supabase = createClient()

  let query = supabase
    .from('applications')
    .select('applied_date, status')
    .order('applied_date', { ascending: true })

  if (startDate) query = query.gte('applied_date', startDate)
  if (endDate) query = query.lte('applied_date', endDate)

  const { data: applications, error } = await query

  if (error) throw error

  const monthMap = new Map<string, MonthlyTrend>()

  applications?.forEach((app: any) => {
    const month = format(parseISO(app.applied_date), 'MMM yyyy')

    if (!monthMap.has(month)) {
      monthMap.set(month, {
        month,
        applications: 0,
        offers: 0,
      })
    }

    const stats = monthMap.get(month)!
    stats.applications++

    if (app.status === 'Offer') {
      stats.offers++
    }
  })

  return Array.from(monthMap.values())
}
