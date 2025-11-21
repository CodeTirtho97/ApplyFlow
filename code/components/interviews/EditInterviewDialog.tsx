'use client'

import { useState, useEffect } from 'react'
import type { Interview, InterviewUpdate, Application } from '@/types/database.types'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { updateInterview, getApplications } from '@/lib/supabase/queries'
import { useToast } from '@/hooks/use-toast'
import { logInterviewUpdated } from '@/lib/supabase/actions/activity-actions'

interface EditInterviewDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  interview: Interview | null
  onInterviewUpdated: (interview: Interview) => void
}

const ROUND_SUGGESTIONS = [
  'Phone Screen',
  'Technical Round 1',
  'Technical Round 2',
  'System Design',
  'Managerial Round',
  'HR Round',
  'Final Round',
  'Behavioral Interview',
  'Culture Fit',
]

export default function EditInterviewDialog({
  open,
  onOpenChange,
  interview,
  onInterviewUpdated,
}: EditInterviewDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [applications, setApplications] = useState<Application[]>([])
  const [status, setStatus] = useState(interview?.status || 'Scheduled')
  const { toast} = useToast()

  useEffect(() => {
    if (open) {
      loadApplications()
      setStatus(interview?.status || 'Scheduled')
    }
  }, [open, interview])

  const loadApplications = async () => {
    try {
      const data = await getApplications()
      const activeApps = data.filter(
        (app) => !['Rejected', 'Ghosted', 'Withdrawn'].includes(app.status)
      )
      setApplications(activeApps)
    } catch (error) {
      console.error('Failed to load applications:', error)
    }
  }

  if (!interview) return null

  // Parse the scheduled_date to get date and time
  const scheduledDateTime = interview.scheduled_date
    ? new Date(interview.scheduled_date)
    : null
  const scheduledDate = scheduledDateTime
    ? scheduledDateTime.toISOString().split('T')[0]
    : ''
  const scheduledTime = scheduledDateTime
    ? scheduledDateTime.toTimeString().slice(0, 5)
    : ''

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Capture form data before async operations
    const form = e.currentTarget
    const formData = new FormData(form)

    const newScheduledDate = formData.get('scheduled_date') as string
    const newScheduledTime = formData.get('scheduled_time') as string

    // Combine date and time into ISO datetime
    const scheduledDateTime = newScheduledDate && newScheduledTime
      ? new Date(`${newScheduledDate}T${newScheduledTime}`).toISOString()
      : null

    const updates: InterviewUpdate = {
      application_id: formData.get('application_id') as string,
      round_name: formData.get('round_name') as string,
      scheduled_date: scheduledDateTime,
      status: formData.get('status') as any,
      prep_notes: (formData.get('prep_notes') as string) || null,
      feedback: (formData.get('feedback') as string) || null,
    }

    setIsSubmitting(true)

    try {
      const updatedInterview = await updateInterview(interview.id, updates)

      // Get application details for logging
      const app = applications.find((a) => a.id === updates.application_id)

      // Log the activity
      await logInterviewUpdated(
        interview.id,
        app?.company_name || 'Unknown Company',
        'Updated interview details'
      )

      toast({
        title: 'Interview updated',
        description: `Successfully updated ${updates.round_name}`,
      })

      onInterviewUpdated(updatedInterview)
      onOpenChange(false)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update interview. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Interview</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="application_id">
              Application <span className="text-red-500">*</span>
            </Label>
            <Select name="application_id" defaultValue={interview.application_id} required>
              <SelectTrigger>
                <SelectValue placeholder="Select an application" />
              </SelectTrigger>
              <SelectContent>
                {applications.map((app) => (
                  <SelectItem key={app.id} value={app.id}>
                    {app.company_name} - {app.role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="round_name">
              Interview Round <span className="text-red-500">*</span>
            </Label>
            <Select name="round_name" defaultValue={interview.round_name} required>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ROUND_SUGGESTIONS.map((round) => (
                  <SelectItem key={round} value={round}>
                    {round}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">
              Status <span className="text-red-500">*</span>
            </Label>
            <Select
              name="status"
              defaultValue={interview.status}
              onValueChange={setStatus}
              required
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Scheduled">Scheduled</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
                <SelectItem value="Rescheduled">Rescheduled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="scheduled_date">
                Interview Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="scheduled_date"
                name="scheduled_date"
                type="date"
                defaultValue={scheduledDate}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="scheduled_time">
                Interview Time <span className="text-red-500">*</span>
              </Label>
              <Input
                id="scheduled_time"
                name="scheduled_time"
                type="time"
                defaultValue={scheduledTime}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="prep_notes">Preparation Notes</Label>
            <Textarea
              id="prep_notes"
              name="prep_notes"
              placeholder="Topics to prepare, questions to ask, things to research..."
              rows={5}
              defaultValue={interview.prep_notes || ''}
            />
          </div>

          {/* Feedback Field - Only show when status is Completed */}
          {status === 'Completed' && (
            <div className="space-y-2 p-4 border border-green-500/20 bg-green-500/5 rounded-lg">
              <Label htmlFor="feedback">
                Interview Feedback
                {status === 'Completed' && <span className="text-red-500">*</span>}
              </Label>
              <Textarea
                id="feedback"
                name="feedback"
                placeholder="How did the interview go? Key points discussed, your performance, next steps..."
                rows={5}
                defaultValue={interview.feedback || ''}
                required={status === 'Completed'}
              />
              <p className="text-xs text-muted-foreground">
                Add feedback about how the interview went
              </p>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
