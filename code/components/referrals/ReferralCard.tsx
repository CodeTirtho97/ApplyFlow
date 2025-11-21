'use client'

import { useState, useEffect } from 'react'
import type { Referral, Application, ReferralStatus } from '@/types/database.types'
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
  User,
  Building2,
  Calendar,
  ExternalLink,
  Edit,
  Trash2,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  Briefcase,
  AlertCircle,
} from 'lucide-react'
import { format, isAfter, isBefore, parseISO } from 'date-fns'
import { updateReferral, deleteReferral, getApplicationsByReferralId } from '@/lib/supabase/queries'
import { useToast } from '@/hooks/use-toast'
import {
  logReferralUpdated,
  logReferralDeleted,
} from '@/lib/supabase/actions/activity-actions'

interface ReferralCardProps {
  referral: Referral
  onUpdated: (referral: Referral) => void
  onDeleted: (id: string) => void
  onEdit: (referral: Referral) => void
}

const statusColors = {
  Pending: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20',
  Agreed: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
  Referred: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20',
  Declined: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20',
}

const relationshipIcons: Record<string, string> = {
  Friend: '👥',
  Colleague: '💼',
  Alumni: '🎓',
  Family: '👨‍👩‍👧‍👦',
  Other: '🤝',
}

export default function ReferralCard({
  referral,
  onUpdated,
  onDeleted,
  onEdit,
}: ReferralCardProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [updatingStatus, setUpdatingStatus] = useState(false)
  const [showApplications, setShowApplications] = useState(false)
  const [linkedApplications, setLinkedApplications] = useState<Application[]>([])
  const [loadingApplications, setLoadingApplications] = useState(false)
  const { toast } = useToast()

  // Check if follow-up is overdue
  const isOverdue =
    referral.follow_up_date &&
    referral.status !== 'Referred' &&
    referral.status !== 'Declined' &&
    isBefore(parseISO(referral.follow_up_date), new Date())

  // Calculate success rate
  const successRate =
    linkedApplications.length > 0
      ? (linkedApplications.filter((app) => app.status === 'Offer').length /
          linkedApplications.length) *
        100
      : 0

  useEffect(() => {
    if (showApplications && linkedApplications.length === 0) {
      loadLinkedApplications()
    }
  }, [showApplications])

  const loadLinkedApplications = async () => {
    setLoadingApplications(true)
    try {
      const apps = await getApplicationsByReferralId(referral.id)
      setLinkedApplications(apps)
    } catch (error) {
      console.error('Failed to load linked applications:', error)
    } finally {
      setLoadingApplications(false)
    }
  }

  const handleStatusChange = async (newStatus: ReferralStatus) => {
    setUpdatingStatus(true)
    try {
      const updatedReferral = await updateReferral(referral.id, { status: newStatus })
      onUpdated(updatedReferral)

      // Log the activity
      await logReferralUpdated(
        referral.id,
        referral.person_name,
        `Status changed to ${newStatus}`
      )

      toast({
        title: 'Status updated',
        description: `Referral status changed to ${newStatus}`,
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
      await deleteReferral(referral.id)
      onDeleted(referral.id)

      // Log the activity
      await logReferralDeleted(referral.id, referral.person_name, referral.company)

      toast({
        title: 'Referral deleted',
        description: 'Referral has been removed',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete referral',
        variant: 'destructive',
      })
    } finally {
      setDeletingId(null)
    }
  }

  const toggleApplications = () => {
    setShowApplications(!showApplications)
  }

  return (
    <>
      <Card
        className={`transition-all hover:shadow-md ${
          isOverdue ? 'border-red-500 border-2' : ''
        }`}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-semibold text-lg">{referral.person_name}</h3>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="h-3.5 w-3.5" />
                <span className="text-sm">{referral.company}</span>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(referral)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                {referral.linkedin_url && (
                  <DropdownMenuItem asChild>
                    <a
                      href={referral.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View LinkedIn
                    </a>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setDeletingId(referral.id)}
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
          {/* Status Quick Update */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Status</label>
            <Select
              value={referral.status}
              onValueChange={(value) => handleStatusChange(value as ReferralStatus)}
              disabled={updatingStatus}
            >
              <SelectTrigger className="w-full">
                <SelectValue>
                  <Badge variant="outline" className={statusColors[referral.status]}>
                    {referral.status}
                  </Badge>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Agreed">Agreed</SelectItem>
                <SelectItem value="Referred">Referred</SelectItem>
                <SelectItem value="Declined">Declined</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Relationship */}
          {referral.relationship && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-lg">{relationshipIcons[referral.relationship] || '🤝'}</span>
              <span className="text-muted-foreground">{referral.relationship}</span>
            </div>
          )}

          {/* Dates */}
          <div className="space-y-2 text-sm">
            {referral.date_asked && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <span>Asked: {format(parseISO(referral.date_asked), 'MMM dd, yyyy')}</span>
              </div>
            )}
            {referral.follow_up_date && (
              <div
                className={`flex items-center gap-2 ${
                  isOverdue ? 'text-red-600 font-medium' : 'text-muted-foreground'
                }`}
              >
                {isOverdue && <AlertCircle className="h-3.5 w-3.5" />}
                <Calendar className="h-3.5 w-3.5" />
                <span>
                  Follow-up: {format(parseISO(referral.follow_up_date), 'MMM dd, yyyy')}
                  {isOverdue && ' (Overdue!)'}
                </span>
              </div>
            )}
          </div>

          {/* Notes Preview */}
          {referral.notes && (
            <p className="text-xs text-muted-foreground line-clamp-2 border-l-2 pl-2 border-muted">
              {referral.notes}
            </p>
          )}

          {/* Linked Applications Section */}
          <div className="pt-2 border-t">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleApplications}
              className="w-full justify-between"
            >
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {linkedApplications.length > 0
                    ? `${linkedApplications.length} Application${linkedApplications.length > 1 ? 's' : ''}`
                    : 'Load Applications'}
                </span>
                {successRate > 0 && (
                  <Badge variant="outline" className="text-xs">
                    {successRate.toFixed(0)}% success
                  </Badge>
                )}
              </div>
              {showApplications ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>

            {showApplications && (
              <div className="mt-2 space-y-2">
                {loadingApplications ? (
                  <p className="text-xs text-muted-foreground text-center py-2">Loading...</p>
                ) : linkedApplications.length > 0 ? (
                  linkedApplications.map((app) => (
                    <div
                      key={app.id}
                      className="flex items-center justify-between p-2 bg-muted/50 rounded text-xs"
                    >
                      <div>
                        <p className="font-medium">{app.company_name}</p>
                        <p className="text-muted-foreground">{app.role}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {app.status}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-muted-foreground text-center py-2">
                    No applications linked yet
                  </p>
                )}
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="text-xs text-muted-foreground pt-0">
          Added {format(parseISO(referral.created_at), 'MMM dd, yyyy')}
        </CardFooter>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deletingId === referral.id} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Referral</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this referral from {referral.person_name}? This
              action cannot be undone. Applications linked to this referral will not be deleted.
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
