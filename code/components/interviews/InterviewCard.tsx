'use client'

import { useState } from 'react'
import type { Interview, InterviewStatus, Application } from '@/types/database.types'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  Calendar,
  Clock,
  Building2,
  Briefcase,
  Edit,
  Trash2,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  FileText,
  MessageSquare,
} from 'lucide-react'
import { format, parseISO, isToday, isPast, isFuture } from 'date-fns'
import { updateInterview, deleteInterview } from '@/lib/supabase/queries'
import { useToast } from '@/hooks/use-toast'
import {
  logInterviewUpdated,
  logInterviewDeleted,
} from '@/lib/supabase/actions/activity-actions'
import { cn } from '@/lib/utils'

interface InterviewCardProps {
  interview: Interview
  application: Application | null
  onUpdated: (interview: Interview) => void
  onDeleted: (id: string) => void
  onEdit: (interview: Interview) => void
}

const statusColors = {
  Scheduled: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
  Completed: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20',
  Cancelled: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20',
  Rescheduled: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20',
}

export default function InterviewCard({
  interview,
  application,
  onUpdated,
  onDeleted,
  onEdit,
}: InterviewCardProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [updatingStatus, setUpdatingStatus] = useState(false)
  const [showPrepNotes, setShowPrepNotes] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const { toast } = useToast()

  const scheduledDate = interview.scheduled_date ? parseISO(interview.scheduled_date) : null
  const isInterviewToday = scheduledDate ? isToday(scheduledDate) : false
  const isInterviewPast = scheduledDate ? isPast(scheduledDate) : false
  const isInterviewUpcoming = scheduledDate ? isFuture(scheduledDate) : false

  const handleStatusChange = async (newStatus: InterviewStatus) => {
    setUpdatingStatus(true)
    try {
      const updatedInterview = await updateInterview(interview.id, { status: newStatus })
      onUpdated(updatedInterview)

      // Log the activity
      await logInterviewUpdated(
        interview.id,
        application?.company_name || 'Unknown Company',
        `Status changed to ${newStatus}`
      )

      toast({
        title: 'Status updated',
        description: `Interview status changed to ${newStatus}`,
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update status',
        variant: 'destructive',
      })
    } finally {
      setUpdatingStatus(false)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteInterview(interview.id)
      onDeleted(interview.id)

      // Log the activity
      await logInterviewDeleted(
        interview.id,
        application?.company_name || 'Unknown Company',
        interview.round_name
      )

      toast({
        title: 'Interview deleted',
        description: 'Interview has been removed',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete interview',
        variant: 'destructive',
      })
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <>
      <Card
        className={cn(
          'transition-all hover:shadow-md',
          isInterviewToday && 'border-2 border-orange-500',
          isInterviewPast && interview.status === 'Scheduled' && 'border-2 border-yellow-500'
        )}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-lg">
                  {application?.company_name || 'Unknown Company'}
                </h3>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Briefcase className="h-4 w-4" />
                <span className="text-sm">{application?.role || 'Unknown Role'}</span>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(interview)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setDeletingId(interview.id)}
                  className="text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          {/* Round Name */}
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-sm font-medium">
              {interview.round_name}
            </Badge>
            {isInterviewToday && (
              <Badge className="bg-orange-500 text-white">Today!</Badge>
            )}
          </div>

          {/* Date & Time */}
          {scheduledDate && (
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{format(scheduledDate, 'EEEE, MMMM dd, yyyy')}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{format(scheduledDate, 'hh:mm a')}</span>
              </div>
            </div>
          )}

          {/* Status Quick Update */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Status</label>
            <Select
              value={interview.status}
              onValueChange={(value) => handleStatusChange(value as InterviewStatus)}
              disabled={updatingStatus}
            >
              <SelectTrigger className="w-full">
                <SelectValue>
                  <Badge variant="outline" className={statusColors[interview.status]}>
                    {interview.status}
                  </Badge>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Scheduled">Scheduled</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
                <SelectItem value="Rescheduled">Rescheduled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Prep Notes Section */}
          {interview.prep_notes && (
            <div className="pt-2 border-t">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPrepNotes(!showPrepNotes)}
                className="w-full justify-between"
              >
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm font-medium">Prep Notes</span>
                </div>
                {showPrepNotes ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>

              {showPrepNotes && (
                <div className="mt-2 p-3 bg-muted/50 rounded text-sm whitespace-pre-wrap">
                  {interview.prep_notes}
                </div>
              )}
            </div>
          )}

          {/* Feedback Section - Only for Completed */}
          {interview.status === 'Completed' && interview.feedback && (
            <div className="pt-2 border-t">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFeedback(!showFeedback)}
                className="w-full justify-between"
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span className="text-sm font-medium">Feedback</span>
                </div>
                {showFeedback ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>

              {showFeedback && (
                <div className="mt-2 p-3 bg-green-500/10 border border-green-500/20 rounded text-sm whitespace-pre-wrap">
                  {interview.feedback}
                </div>
              )}
            </div>
          )}
        </CardContent>

        <CardFooter className="text-xs text-muted-foreground pt-0">
          <div className="flex items-center justify-between w-full">
            <span>Created {format(parseISO(interview.created_at), 'MMM dd, yyyy')}</span>
            {isInterviewPast && interview.status === 'Scheduled' && (
              <Badge variant="outline" className="text-yellow-700 dark:text-yellow-400">
                Needs Update
              </Badge>
            )}
          </div>
        </CardFooter>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deletingId === interview.id} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Interview</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this {interview.round_name} interview? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
