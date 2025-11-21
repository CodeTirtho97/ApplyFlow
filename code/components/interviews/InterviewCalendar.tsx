'use client'

import { useState } from 'react'
import type { Interview, Application } from '@/types/database.types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
  isToday,
  parseISO,
  addMonths,
  subMonths,
} from 'date-fns'
import { cn } from '@/lib/utils'

interface InterviewCalendarProps {
  interviews: Interview[]
  applications: Application[]
  onInterviewClick: (interview: Interview) => void
}

export default function InterviewCalendar({
  interviews,
  applications,
  onInterviewClick,
}: InterviewCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Get interviews for a specific date
  const getInterviewsForDate = (date: Date) => {
    return interviews.filter((interview) => {
      if (!interview.scheduled_date) return false
      return isSameDay(parseISO(interview.scheduled_date), date)
    })
  }

  // Get application for interview
  const getApplicationForInterview = (applicationId: string) => {
    return applications.find((app) => app.id === applicationId)
  }

  // Get day name (Sunday, Monday, etc.)
  const getDayName = (dayIndex: number) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    return days[dayIndex]
  }

  // Pad the calendar with empty cells for the first week
  const firstDayOfWeek = monthStart.getDay()
  const paddingDays = Array(firstDayOfWeek).fill(null)

  return (
    <div className="space-y-4">
      {/* Month Navigation */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentMonth(new Date())}
          >
            Today
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="border rounded-lg overflow-hidden bg-card">
        {/* Day Headers */}
        <div className="grid grid-cols-7 border-b bg-muted/50">
          {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => (
            <div
              key={dayIndex}
              className="p-2 text-center text-sm font-medium text-muted-foreground"
            >
              {getDayName(dayIndex)}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7">
          {/* Padding for first week */}
          {paddingDays.map((_, index) => (
            <div key={`padding-${index}`} className="border-b border-r p-2 h-24 bg-muted/20" />
          ))}

          {/* Actual days */}
          {daysInMonth.map((day) => {
            const dayInterviews = getInterviewsForDate(day)
            const isCurrentDay = isToday(day)
            const isInCurrentMonth = isSameMonth(day, currentMonth)

            return (
              <div
                key={day.toISOString()}
                className={cn(
                  'border-b border-r p-2 h-24 transition-colors',
                  !isInCurrentMonth && 'bg-muted/20 text-muted-foreground',
                  isCurrentDay && 'bg-primary/5 border-primary'
                )}
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={cn(
                        'text-sm font-medium',
                        isCurrentDay &&
                          'bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center'
                      )}
                    >
                      {format(day, 'd')}
                    </span>
                  </div>

                  {/* Interviews for this day */}
                  {dayInterviews.length > 0 && (
                    <div className="space-y-1 overflow-y-auto flex-1">
                      {dayInterviews.slice(0, 2).map((interview) => {
                        const app = getApplicationForInterview(interview.application_id)
                        return (
                          <button
                            key={interview.id}
                            onClick={() => onInterviewClick(interview)}
                            className="w-full text-left p-1 rounded text-xs bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 transition-colors"
                          >
                            <p className="font-medium truncate text-blue-700 dark:text-blue-400">
                              {app?.company_name || 'Unknown'}
                            </p>
                            <p className="truncate text-muted-foreground">
                              {interview.round_name}
                            </p>
                          </button>
                        )
                      })}
                      {dayInterviews.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{dayInterviews.length - 2} more
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-primary" />
          <span>Today</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-blue-500/10 border border-blue-500/20" />
          <span>Scheduled Interview</span>
        </div>
      </div>
    </div>
  )
}
