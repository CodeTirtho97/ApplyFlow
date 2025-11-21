'use client'

import { useState } from 'react'
import type { Application, ApplicationStatus } from '@/types/database.types'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
import { MoreHorizontal, ExternalLink, Edit, Trash2 } from 'lucide-react'
import { updateApplication, deleteApplication } from '@/lib/supabase/queries'
import { useToast } from '@/hooks/use-toast'
import { format } from 'date-fns'
import {
  logApplicationStatusChanged,
  logApplicationDeleted,
} from '@/lib/supabase/actions/activity-actions'
import EditApplicationDialog from './EditApplicationDialog'

interface ApplicationsTableProps {
  applications: Application[]
  onUpdated: (application: Application) => void
  onDeleted: (id: string) => void
}

const statusColors = {
  Applied: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
  OA: 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20',
  Interview: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20',
  Offer: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20',
  Rejected: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20',
  Ghosted: 'bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20',
  Withdrawn: 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20',
}

const priorityColors = {
  Low: 'bg-slate-500/10 text-slate-700 dark:text-slate-400',
  Medium: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
  High: 'bg-orange-500/10 text-orange-700 dark:text-orange-400',
  Critical: 'bg-red-500/10 text-red-700 dark:text-red-400',
}

export default function ApplicationsTable({
  applications,
  onUpdated,
  onDeleted,
}: ApplicationsTableProps) {
  const [editingApp, setEditingApp] = useState<Application | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [updatingStatusId, setUpdatingStatusId] = useState<string | null>(null)
  const { toast } = useToast()

  const handleStatusChange = async (appId: string, newStatus: ApplicationStatus) => {
    setUpdatingStatusId(appId)
    try {
      // Find the current application to get old status and company name
      const currentApp = applications.find((app) => app.id === appId)
      const oldStatus = currentApp?.status || 'Unknown'
      const companyName = currentApp?.company_name || 'Unknown Company'

      const updatedApp = await updateApplication(appId, { status: newStatus })
      onUpdated(updatedApp)

      // Log the status change activity
      await logApplicationStatusChanged(appId, companyName, oldStatus, newStatus)

      toast({
        title: 'Status updated',
        description: `Application status changed to ${newStatus}`,
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update status',
        variant: 'destructive',
      })
    } finally {
      setUpdatingStatusId(null)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      // Find the application to get details for logging
      const app = applications.find((a) => a.id === id)
      const companyName = app?.company_name || 'Unknown Company'
      const role = app?.role || 'Unknown Role'

      await deleteApplication(id)
      onDeleted(id)

      // Log the deletion activity
      await logApplicationDeleted(id, companyName, role)

      toast({
        title: 'Application deleted',
        description: 'Application has been removed',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete application',
        variant: 'destructive',
      })
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <>
      <div className="rounded-md border overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-40">Company</TableHead>
              <TableHead className="min-w-40">Role</TableHead>
              <TableHead className="min-w-[140px]">Status</TableHead>
              <TableHead className="min-w-[90px]">Priority</TableHead>
              <TableHead className="min-w-[110px]">Applied</TableHead>
              <TableHead className="min-w-[110px]">Source</TableHead>
              <TableHead className="min-w-[120px]">Salary</TableHead>
              <TableHead className="text-right sticky right-0 bg-card min-w-20">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                  No applications found
                </TableCell>
              </TableRow>
            ) : (
              applications.map((app) => (
                <TableRow key={app.id} className="group">
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span className="font-semibold">{app.company_name}</span>
                      {app.job_id && (
                        <span className="text-xs text-muted-foreground">ID: {app.job_id}</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{app.role}</span>
                      {app.tech_stack && app.tech_stack.length > 0 && (
                        <span className="text-xs text-muted-foreground">
                          {app.tech_stack.slice(0, 2).join(', ')}
                          {app.tech_stack.length > 2 && ` +${app.tech_stack.length - 2}`}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={app.status}
                      onValueChange={(value) => handleStatusChange(app.id, value as ApplicationStatus)}
                      disabled={updatingStatusId === app.id}
                    >
                      <SelectTrigger className="w-[130px] h-8">
                        <SelectValue>
                          <Badge variant="outline" className={statusColors[app.status]}>
                            {app.status}
                          </Badge>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Applied">
                          <Badge variant="outline" className={statusColors.Applied}>
                            Applied
                          </Badge>
                        </SelectItem>
                        <SelectItem value="OA">
                          <Badge variant="outline" className={statusColors.OA}>
                            OA
                          </Badge>
                        </SelectItem>
                        <SelectItem value="Interview">
                          <Badge variant="outline" className={statusColors.Interview}>
                            Interview
                          </Badge>
                        </SelectItem>
                        <SelectItem value="Offer">
                          <Badge variant="outline" className={statusColors.Offer}>
                            Offer
                          </Badge>
                        </SelectItem>
                        <SelectItem value="Rejected">
                          <Badge variant="outline" className={statusColors.Rejected}>
                            Rejected
                          </Badge>
                        </SelectItem>
                        <SelectItem value="Ghosted">
                          <Badge variant="outline" className={statusColors.Ghosted}>
                            Ghosted
                          </Badge>
                        </SelectItem>
                        <SelectItem value="Withdrawn">
                          <Badge variant="outline" className={statusColors.Withdrawn}>
                            Withdrawn
                          </Badge>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={priorityColors[app.priority]}>
                      {app.priority}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {format(new Date(app.applied_date), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell>
                    {app.application_source && (
                      <span className="text-sm">{app.application_source}</span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm">
                    {app.salary_range || <span className="text-muted-foreground">—</span>}
                  </TableCell>
                  <TableCell className="text-right sticky right-0 bg-card border-l">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        {app.job_link && (
                          <>
                            <DropdownMenuItem asChild>
                              <a
                                href={app.job_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center cursor-pointer"
                              >
                                <ExternalLink className="h-4 w-4 mr-2" />
                                View Job Link
                              </a>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                          </>
                        )}
                        <DropdownMenuItem onClick={() => setEditingApp(app)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setDeletingId(app.id)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      {editingApp && (
        <EditApplicationDialog
          application={editingApp}
          open={!!editingApp}
          onOpenChange={(open) => !open && setEditingApp(null)}
          onApplicationUpdated={(updated) => {
            onUpdated(updated)
            setEditingApp(null)
          }}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingId} onOpenChange={(open) => !open && setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Application</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this application? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingId && handleDelete(deletingId)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
