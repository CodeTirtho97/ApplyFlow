'use client'

import { useState, useEffect } from 'react'
import type { Application, Interview } from '@/types/database.types'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
  Edit,
  Trash2,
  MoreVertical,
  ExternalLink,
  Calendar as CalendarIcon,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Clock,
} from 'lucide-react'
import { deleteApplication, getInterviewsByApplicationId } from '@/lib/supabase/queries'
import { useToast } from '@/hooks/use-toast'
import { format, parseISO } from 'date-fns'
import { cn } from '@/lib/utils'
import EditApplicationDialog from './EditApplicationDialog'

interface ApplicationCardProps {
  application: Application
  onUpdated: (application: Application) => void
  onDeleted: (id: string) => void
}

const statusColors: Record<string, string> = {
  Applied: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
  OA: 'bg-purple-500/10 text-purple-700 dark:text-purple-400',
  Interview: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400',
  Offer: 'bg-green-500/10 text-green-700 dark:text-green-400',
  Rejected: 'bg-red-500/10 text-red-700 dark:text-red-400',
  Ghosted: 'bg-gray-500/10 text-gray-700 dark:text-gray-400',
  Withdrawn: 'bg-orange-500/10 text-orange-700 dark:text-orange-400',
}

const priorityColors: Record<string, string> = {
  Low: 'bg-gray-500/10 text-gray-700 dark:text-gray-400',
  Medium: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
  High: 'bg-red-500/10 text-red-700 dark:text-red-400',
}

const interviewStatusColors: Record<string, string> = {
  Scheduled: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
  Completed: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20',
  Cancelled: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20',
  Rescheduled: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20',
}

export default function ApplicationCard({
  application,
  onUpdated,
  onDeleted,
}: ApplicationCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showInterviews, setShowInterviews] = useState(false)
  const [interviews, setInterviews] = useState<Interview[]>([])
  const [loadingInterviews, setLoadingInterviews] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (showInterviews && interviews.length === 0) {
      loadInterviews()
    }
  }, [showInterviews])

  const loadInterviews = async () => {
    setLoadingInterviews(true)
    try {
      const data = await getInterviewsByApplicationId(application.id)
      setInterviews(data)
    } catch (error) {
      console.error('Failed to load interviews:', error)
    } finally {
      setLoadingInterviews(false)
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteApplication(application.id)
      toast({
        title: 'Application deleted',
        description: 'The application has been deleted successfully.',
      })
      onDeleted(application.id)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete application. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsDeleting(false)
      setIsDeleteDialogOpen(false)
    }
  }

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{application.company_name}</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                <Briefcase className="h-3 w-3" />
                {application.role}
              </p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setIsDeleteDialogOpen(true)}
                  className="text-red-600"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className={statusColors[application.status] || ''}>
              {application.status}
            </Badge>
            <Badge variant="outline" className={priorityColors[application.priority]}>
              {application.priority}
            </Badge>
            {application.application_source && (
              <Badge variant="secondary">{application.application_source}</Badge>
            )}
          </div>

          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarIcon className="h-3 w-3 mr-1" />
            Applied {format(new Date(application.applied_date), 'MMM d, yyyy')}
          </div>

          {application.salary_range && (
            <div className="text-sm">
              <span className="text-muted-foreground">Salary:</span> {application.salary_range}
            </div>
          )}

          {application.tech_stack && application.tech_stack.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {application.tech_stack.slice(0, 3).map((tech, index) => (
                <span
                  key={index}
                  className="text-xs bg-muted px-2 py-1 rounded"
                >
                  {tech}
                </span>
              ))}
              {application.tech_stack.length > 3 && (
                <span className="text-xs text-muted-foreground px-2 py-1">
                  +{application.tech_stack.length - 3} more
                </span>
              )}
            </div>
          )}

          {application.notes && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {application.notes}
            </p>
          )}

          {/* Interviews Section */}
          <div className="pt-3 border-t">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowInterviews(!showInterviews)}
              className="w-full justify-between"
            >
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                <span className="text-sm font-medium">
                  Interviews {interviews.length > 0 && `(${interviews.length})`}
                </span>
              </div>
              {showInterviews ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>

            {showInterviews && (
              <div className="mt-2 space-y-2">
                {loadingInterviews ? (
                  <p className="text-sm text-muted-foreground text-center py-2">
                    Loading interviews...
                  </p>
                ) : interviews.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-2">
                    No interviews scheduled yet
                  </p>
                ) : (
                  interviews.map((interview) => (
                    <div
                      key={interview.id}
                      className="p-2 bg-muted/50 rounded text-sm space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{interview.round_name}</span>
                        <Badge
                          variant="outline"
                          className={cn('text-xs', interviewStatusColors[interview.status])}
                        >
                          {interview.status}
                        </Badge>
                      </div>
                      {interview.scheduled_date && (
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>
                            {format(parseISO(interview.scheduled_date), 'MMM d, yyyy · h:mm a')}
                          </span>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="pt-3">
          {application.job_link && (
            <Button variant="outline" size="sm" className="w-full" asChild>
              <a
                href={application.job_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-3 w-3 mr-2" />
                View Job Posting
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>

      <EditApplicationDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        application={application}
        onApplicationUpdated={onUpdated}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Application?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete your application to{' '}
              <strong>{application.company_name}</strong>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
