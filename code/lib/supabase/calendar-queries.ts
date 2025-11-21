/**
 * Calendar Queries for ApplyFlow
 * Fetches and aggregates events from multiple sources
 */

import { createClient } from '@/lib/supabase/client'
import type { Interview, Referral } from '@/types/database.types'
import { parseISO, isToday, isTomorrow, isThisWeek, isBefore, startOfDay } from 'date-fns'

// =====================================================
// EVENT TYPES
// =====================================================

export interface CalendarEvent {
  id: string
  title: string
  description: string
  date: string // ISO date string
  type: 'interview' | 'referral-followup'
  status?: string
  metadata: {
    company?: string
    person?: string
    round?: string
    interview_id?: string
    referral_id?: string
  }
}

export interface GroupedEvents {
  today: CalendarEvent[]
  tomorrow: CalendarEvent[]
  thisWeek: CalendarEvent[]
  later: CalendarEvent[]
  overdue: CalendarEvent[]
}

// =====================================================
// QUERY FUNCTIONS
// =====================================================

/**
 * Get all calendar events from interviews and referrals
 */
export async function getCalendarEvents(
  startDate?: string,
  endDate?: string
): Promise<CalendarEvent[]> {
  const supabase = createClient()

  // Fetch interviews
  let interviewQuery = supabase
    .from('interviews')
    .select('*, applications(company_name, role)')
    .not('scheduled_date', 'is', null)
    .order('scheduled_date', { ascending: true })

  if (startDate) interviewQuery = interviewQuery.gte('scheduled_date', startDate)
  if (endDate) interviewQuery = interviewQuery.lte('scheduled_date', endDate)

  const { data: interviews, error: interviewError } = await interviewQuery

  if (interviewError) throw interviewError

  // Fetch referrals with follow-up dates
  let referralQuery = supabase
    .from('referrals')
    .select('*')
    .not('follow_up_date', 'is', null)
    .order('follow_up_date', { ascending: true })

  if (startDate) referralQuery = referralQuery.gte('follow_up_date', startDate)
  if (endDate) referralQuery = referralQuery.lte('follow_up_date', endDate)

  const { data: referrals, error: referralError } = await referralQuery

  if (referralError) throw referralError

  // Convert interviews to events
  const interviewEvents: CalendarEvent[] = (interviews || []).map((interview: any) => ({
    id: `interview-${interview.id}`,
    title: `${interview.applications?.company_name || 'Unknown Company'} - ${interview.round_name}`,
    description: `Interview: ${interview.round_name}`,
    date: interview.scheduled_date,
    type: 'interview' as const,
    status: interview.status,
    metadata: {
      company: interview.applications?.company_name,
      round: interview.round_name,
      interview_id: interview.id,
    },
  }))

  // Convert referrals to events
  const referralEvents: CalendarEvent[] = (referrals || []).map((referral: Referral) => ({
    id: `referral-${referral.id}`,
    title: `Follow up with ${referral.person_name}`,
    description: `Referral follow-up at ${referral.company}`,
    date: referral.follow_up_date!,
    type: 'referral-followup' as const,
    status: referral.status,
    metadata: {
      person: referral.person_name,
      company: referral.company,
      referral_id: referral.id,
    },
  }))

  // Combine and sort by date
  const allEvents = [...interviewEvents, ...referralEvents].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime()
  })

  return allEvents
}

/**
 * Group events by time periods
 */
export function groupEventsByPeriod(events: CalendarEvent[]): GroupedEvents {
  const now = startOfDay(new Date())

  const grouped: GroupedEvents = {
    today: [],
    tomorrow: [],
    thisWeek: [],
    later: [],
    overdue: [],
  }

  events.forEach((event) => {
    const eventDate = parseISO(event.date)
    const eventDayStart = startOfDay(eventDate)

    if (isBefore(eventDayStart, now)) {
      grouped.overdue.push(event)
    } else if (isToday(eventDate)) {
      grouped.today.push(event)
    } else if (isTomorrow(eventDate)) {
      grouped.tomorrow.push(event)
    } else if (isThisWeek(eventDate, { weekStartsOn: 0 })) {
      grouped.thisWeek.push(event)
    } else {
      grouped.later.push(event)
    }
  })

  return grouped
}

/**
 * Get action items for today
 */
export async function getTodayActionItems(): Promise<{
  interviews: CalendarEvent[]
  followUps: CalendarEvent[]
}> {
  const events = await getCalendarEvents()
  const today = events.filter((event) => isToday(parseISO(event.date)))

  return {
    interviews: today.filter((event) => event.type === 'interview'),
    followUps: today.filter((event) => event.type === 'referral-followup'),
  }
}

/**
 * Get events for a specific month
 */
export async function getMonthEvents(year: number, month: number): Promise<CalendarEvent[]> {
  const startDate = new Date(year, month, 1).toISOString()
  const endDate = new Date(year, month + 1, 0, 23, 59, 59).toISOString()

  return getCalendarEvents(startDate, endDate)
}
