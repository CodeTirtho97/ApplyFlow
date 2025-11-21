'use client'

import { useState, useEffect } from 'react'
import type { Interview, InterviewInsert, Application } from '@/types/database.types'
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
import { createInterview, getApplications } from '@/lib/supabase/queries'
import { useToast } from '@/hooks/use-toast'
import { logInterviewCreated } from '@/lib/supabase/actions/activity-actions'

interface AddInterviewDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onInterviewAdded: (interview: Interview) => void
  preselectedApplicationId?: string
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

export default function AddInterviewDialog({
  open,
  onOpenChange,
  onInterviewAdded,
  preselectedApplicationId,
}: AddInterviewDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [applications, setApplications] = useState<Application[]>([])
  const { toast } = useToast()

  useEffect(() => {
    if (open) {
      loadApplications()
    }
  }, [open])

  const loadApplications = async () => {
    try {
      const data = await getApplications()
      // Filter to only active applications
      const activeApps = data.filter(
        (app) => !['Rejected', 'Ghosted', 'Withdrawn'].includes(app.status)
      )
      setApplications(activeApps)
    } catch (error) {
      console.error('Failed to load applications:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Capture form data before async operations
    const form = e.currentTarget
    const formData = new FormData(form)

    const scheduledDate = formData.get('scheduled_date') as string
    const scheduledTime = formData.get('scheduled_time') as string

    // Combine date and time into ISO datetime
    const scheduledDateTime = scheduledDate && scheduledTime
      ? new Date(`${scheduledDate}T${scheduledTime}`).toISOString()
      : null

    const data: Omit<InterviewInsert, 'user_id'> = {
      application_id: formData.get('application_id') as string,
      round_name: formData.get('round_name') as string,
      scheduled_date: scheduledDateTime,
      status: 'Scheduled',
      prep_notes: (formData.get('prep_notes') as string) || null,
      feedback: null,
    }

    setIsSubmitting(true)

    try {
      const newInterview = await createInterview(data as InterviewInsert)

      // Get application details for logging
      const app = applications.find((a) => a.id === data.application_id)

      // Log the activity
      await logInterviewCreated(
        newInterview.id,
        app?.company_name || 'Unknown Company',
        data.round_name
      )

      toast({
        title: 'Interview scheduled',
        description: `Successfully scheduled ${data.round_name}`,
      })

      onInterviewAdded(newInterview)
      onOpenChange(false)

      // Reset form
      form.reset()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to schedule interview. Please try again.',
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
          <DialogTitle>Schedule Interview</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="application_id">
              Application <span className="text-red-500">*</span>
            </Label>
            <Select
              name="application_id"
              defaultValue={preselectedApplicationId || ''}
              required
            >
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
            {applications.length === 0 && (
              <p className="text-xs text-muted-foreground">
                No active applications found. Add an application first.
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="round_name">
              Interview Round <span className="text-red-500">*</span>
            </Label>
            <Select name="round_name" required>
              <SelectTrigger>
                <SelectValue placeholder="Select or type round name" />
              </SelectTrigger>
              <SelectContent>
                {ROUND_SUGGESTIONS.map((round) => (
                  <SelectItem key={round} value={round}>
                    {round}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Or type a custom round name in the input above
            </p>
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
            />
            <p className="text-xs text-muted-foreground">
              Add notes about what to prepare for this interview
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || applications.length === 0}>
              {isSubmitting ? 'Scheduling...' : 'Schedule Interview'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
