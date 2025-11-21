'use client'

import { useState, useEffect } from 'react'
import type { Interview, Application } from '@/types/database.types'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar as CalendarIcon, List } from 'lucide-react'
import { getInterviews, getApplications } from '@/lib/supabase/queries'
import { isFuture, isPast, parseISO } from 'date-fns'
import InterviewCard from './InterviewCard'
import AddInterviewDialog from './AddInterviewDialog'
import EditInterviewDialog from './EditInterviewDialog'
import InterviewCalendar from './InterviewCalendar'

export default function InterviewsList() {
  const [interviews, setInterviews] = useState<Interview[]>([])
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [editingInterview, setEditingInterview] = useState<Interview | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [interviewsData, appsData] = await Promise.all([
        getInterviews(),
        getApplications(),
      ])
      setInterviews(interviewsData)
      setApplications(appsData)
    } catch (error) {
      console.error('Failed to load interviews:', error)
    } finally {
      setLoading(false)
    }
  }

  const getApplicationForInterview = (applicationId: string) => {
    return applications.find((app) => app.id === applicationId) || null
  }

  const handleInterviewAdded = (interview: Interview) => {
    setInterviews((prev) => [interview, ...prev])
  }

  const handleInterviewUpdated = (updatedInterview: Interview) => {
    setInterviews((prev) =>
      prev.map((int) => (int.id === updatedInterview.id ? updatedInterview : int))
    )
  }

  const handleInterviewDeleted = (id: string) => {
    setInterviews((prev) => prev.filter((int) => int.id !== id))
  }

  const handleEdit = (interview: Interview) => {
    setEditingInterview(interview)
  }

  // Filter interviews
  const upcomingInterviews = interviews.filter((int) => {
    if (!int.scheduled_date || int.status !== 'Scheduled') return false
    return isFuture(parseISO(int.scheduled_date))
  })

  const pastInterviews = interviews.filter((int) => {
    if (!int.scheduled_date) return false
    return isPast(parseISO(int.scheduled_date)) || int.status !== 'Scheduled'
  })

  if (loading) {
    return <div className="text-center text-muted-foreground py-8">Loading interviews...</div>
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button onClick={() => setShowAddDialog(true)}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          Schedule Interview
        </Button>
      </div>

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

        <TabsContent value="list" className="space-y-6 mt-6">
          {/* Upcoming Interviews */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Upcoming Interviews</h2>
            {upcomingInterviews.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No upcoming interviews</p>
                <Button onClick={() => setShowAddDialog(true)} variant="link" className="mt-2">
                  Schedule your first interview
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingInterviews.map((interview) => (
                  <InterviewCard
                    key={interview.id}
                    interview={interview}
                    application={getApplicationForInterview(interview.application_id)}
                    onUpdated={handleInterviewUpdated}
                    onDeleted={handleInterviewDeleted}
                    onEdit={handleEdit}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Past/Completed Interviews */}
          {pastInterviews.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Past Interviews</h2>
              <div className="space-y-4">
                {pastInterviews.map((interview) => (
                  <InterviewCard
                    key={interview.id}
                    interview={interview}
                    application={getApplicationForInterview(interview.application_id)}
                    onUpdated={handleInterviewUpdated}
                    onDeleted={handleInterviewDeleted}
                    onEdit={handleEdit}
                  />
                ))}
              </div>
            </div>
          )}

          {interviews.length === 0 && (
            <div className="text-center py-12 space-y-4">
              <p className="text-muted-foreground">No interviews scheduled yet</p>
              <Button onClick={() => setShowAddDialog(true)}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                Schedule Your First Interview
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="calendar" className="mt-6">
          <InterviewCalendar
            interviews={interviews}
            applications={applications}
            onInterviewClick={handleEdit}
          />
        </TabsContent>
      </Tabs>

      <AddInterviewDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onInterviewAdded={handleInterviewAdded}
      />

      <EditInterviewDialog
        open={!!editingInterview}
        onOpenChange={(open) => !open && setEditingInterview(null)}
        interview={editingInterview}
        onInterviewUpdated={handleInterviewUpdated}
      />
    </>
  )
}
