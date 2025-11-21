'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Calendar as CalendarIcon,
  List,
  ChevronLeft,
  ChevronRight,
  Clock,
  Users,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react'
import {
  getCalendarEvents,
  groupEventsByPeriod,
  getTodayActionItems,
  type CalendarEvent,
  type GroupedEvents,
} from '@/lib/supabase/calendar-queries'
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isToday,
  parseISO,
  addMonths,
  subMonths,
  isSameMonth,
  getDay,
} from 'date-fns'
import { cn } from '@/lib/utils'

const eventTypeColors = {
  interview: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
  'referral-followup': 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20',
}

const statusColors = {
  Scheduled: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
  Completed: 'bg-green-500/10 text-green-700 dark:text-green-400',
  Cancelled: 'bg-red-500/10 text-red-700 dark:text-red-400',
  Pending: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400',
  Agreed: 'bg-green-500/10 text-green-700 dark:text-green-400',
  Referred: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
  Declined: 'bg-red-500/10 text-red-700 dark:text-red-400',
}

export default function CalendarClient() {
  const [loading, setLoading] = useState(true)
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [groupedEvents, setGroupedEvents] = useState<GroupedEvents>({
    today: [],
    tomorrow: [],
    thisWeek: [],
    later: [],
    overdue: [],
  })
  const [todayItems, setTodayItems] = useState<{
    interviews: CalendarEvent[]
    followUps: CalendarEvent[]
  }>({ interviews: [], followUps: [] })
  const [currentMonth, setCurrentMonth] = useState(new Date())

  useEffect(() => {
    loadEvents()
  }, [currentMonth])

  const loadEvents = async () => {
    setLoading(true)
    try {
      const [allEvents, actionItems] = await Promise.all([
        getCalendarEvents(),
        getTodayActionItems(),
      ])

      setEvents(allEvents)
      setGroupedEvents(groupEventsByPeriod(allEvents))
      setTodayItems(actionItems)
    } catch (error) {
      console.error('Failed to load calendar events:', error)
    } finally {
      setLoading(false)
    }
  }

  const getEventsForDate = (date: Date) => {
    return events.filter((event) => isSameDay(parseISO(event.date), date))
  }

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Pad the calendar with empty cells for the first week
  const firstDayOfWeek = getDay(monthStart)
  const paddingDays = Array(firstDayOfWeek).fill(null)

  const getDayName = (dayIndex: number) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    return days[dayIndex]
  }

  if (loading) {
    return (
      <div className="text-center py-12 text-muted-foreground">Loading calendar...</div>
    )
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Main Calendar Area */}
      <div className="lg:col-span-2 space-y-6">
        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="list">
              <List className="mr-2 h-4 w-4" />
              List View
            </TabsTrigger>
            <TabsTrigger value="calendar">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Calendar View
            </TabsTrigger>
          </TabsList>

          {/* List View */}
          <TabsContent value="list" className="space-y-4 mt-6">
            {/* Overdue */}
            {groupedEvents.overdue.length > 0 && (
              <Card className="border-red-500/20">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    Overdue ({groupedEvents.overdue.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {groupedEvents.overdue.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Today */}
            {groupedEvents.today.length > 0 && (
              <Card className="border-orange-500/20">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="h-5 w-5 text-orange-500" />
                    Today ({groupedEvents.today.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {groupedEvents.today.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Tomorrow */}
            {groupedEvents.tomorrow.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tomorrow ({groupedEvents.tomorrow.length})</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {groupedEvents.tomorrow.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </CardContent>
              </Card>
            )}

            {/* This Week */}
            {groupedEvents.thisWeek.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">This Week ({groupedEvents.thisWeek.length})</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {groupedEvents.thisWeek.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Later */}
            {groupedEvents.later.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Upcoming ({groupedEvents.later.length})</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {groupedEvents.later.slice(0, 10).map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                  {groupedEvents.later.length > 10 && (
                    <p className="text-sm text-muted-foreground text-center py-2">
                      +{groupedEvents.later.length - 10} more events
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            {events.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No upcoming events</p>
                  <p className="text-sm mt-1">Schedule interviews or set follow-up dates to see them here</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Calendar View */}
          <TabsContent value="calendar" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">{format(currentMonth, 'MMMM yyyy')}</CardTitle>
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
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Day Headers */}
                  <div className="grid grid-cols-7 gap-2">
                    {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => (
                      <div
                        key={dayIndex}
                        className="text-center text-sm font-medium text-muted-foreground py-2"
                      >
                        {getDayName(dayIndex)}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-2">
                    {/* Padding */}
                    {paddingDays.map((_, index) => (
                      <div key={`padding-${index}`} className="aspect-square" />
                    ))}

                    {/* Days */}
                    {daysInMonth.map((day) => {
                      const dayEvents = getEventsForDate(day)
                      const isCurrentDay = isToday(day)
                      const isInCurrentMonth = isSameMonth(day, currentMonth)

                      return (
                        <div
                          key={day.toISOString()}
                          className={cn(
                            'aspect-square border rounded-lg p-2 transition-colors',
                            !isInCurrentMonth && 'bg-muted/20 text-muted-foreground',
                            isCurrentDay && 'border-primary border-2 bg-primary/5'
                          )}
                        >
                          <div className="h-full flex flex-col">
                            <div
                              className={cn(
                                'text-sm font-medium mb-1',
                                isCurrentDay &&
                                  'bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center'
                              )}
                            >
                              {format(day, 'd')}
                            </div>
                            <div className="flex-1 space-y-1 overflow-hidden">
                              {dayEvents.slice(0, 2).map((event) => (
                                <div
                                  key={event.id}
                                  className={cn(
                                    'text-xs px-1 py-0.5 rounded truncate',
                                    eventTypeColors[event.type]
                                  )}
                                  title={event.title}
                                >
                                  {event.type === 'interview' ? '📅' : '👤'} {event.metadata.company || event.metadata.person}
                                </div>
                              ))}
                              {dayEvents.length > 2 && (
                                <div className="text-xs text-muted-foreground">
                                  +{dayEvents.length - 2}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Action Items Sidebar */}
      <div className="space-y-6">
        {/* Today's Action Items */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Today's Action Items
            </CardTitle>
            <CardDescription>{format(new Date(), 'EEEE, MMMM d')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Interviews */}
            <div>
              <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                Interviews ({todayItems.interviews.length})
              </h3>
              {todayItems.interviews.length === 0 ? (
                <p className="text-sm text-muted-foreground">No interviews today</p>
              ) : (
                <div className="space-y-2">
                  {todayItems.interviews.map((event) => (
                    <div
                      key={event.id}
                      className="p-2 bg-blue-500/10 rounded border border-blue-500/20 text-sm"
                    >
                      <p className="font-medium text-blue-700 dark:text-blue-400">
                        {event.metadata.company}
                      </p>
                      <p className="text-xs text-muted-foreground">{event.metadata.round}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {format(parseISO(event.date), 'h:mm a')}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Follow-ups */}
            <div>
              <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Follow-ups ({todayItems.followUps.length})
              </h3>
              {todayItems.followUps.length === 0 ? (
                <p className="text-sm text-muted-foreground">No follow-ups today</p>
              ) : (
                <div className="space-y-2">
                  {todayItems.followUps.map((event) => (
                    <div
                      key={event.id}
                      className="p-2 bg-purple-500/10 rounded border border-purple-500/20 text-sm"
                    >
                      <p className="font-medium text-purple-700 dark:text-purple-400">
                        {event.metadata.person}
                      </p>
                      <p className="text-xs text-muted-foreground">{event.metadata.company}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {todayItems.interviews.length === 0 && todayItems.followUps.length === 0 && (
              <div className="text-center py-6">
                <CheckCircle2 className="h-12 w-12 mx-auto text-green-500 mb-2" />
                <p className="text-sm text-muted-foreground">All clear for today!</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Legend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Event Types</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-4 h-4 rounded bg-blue-500/20 border border-blue-500/30" />
              <span>Interview</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-4 h-4 rounded bg-purple-500/20 border border-purple-500/30" />
              <span>Referral Follow-up</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Event Card Component
function EventCard({ event }: { event: CalendarEvent }) {
  return (
    <div
      className={cn(
        'p-3 rounded-lg border transition-colors hover:bg-muted/50',
        eventTypeColors[event.type]
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="font-medium">{event.title}</p>
          <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className="text-xs">
              {format(parseISO(event.date), 'MMM d, yyyy · h:mm a')}
            </Badge>
            {event.status && (
              <Badge variant="outline" className={cn('text-xs', statusColors[event.status])}>
                {event.status}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
