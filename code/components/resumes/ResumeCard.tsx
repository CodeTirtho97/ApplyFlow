'use client'

import { useState } from 'react'
import type { Resume } from '@/types/database.types'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
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
  FileText,
  Download,
  Trash2,
  Calendar,
  TrendingUp,
  Briefcase,
} from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { deleteResume } from '@/lib/supabase/queries'
import { downloadResume, deleteResumeFile, triggerDownload } from '@/lib/supabase/storage'
import { useToast } from '@/hooks/use-toast'
import { logResumeDeleted } from '@/lib/supabase/actions/activity-actions'

interface ResumeCardProps {
  resume: Resume
  onDeleted: (id: string) => void
}

export default function ResumeCard({ resume, onDeleted }: ResumeCardProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [downloading, setDownloading] = useState(false)
  const { toast } = useToast()

  const handleDownload = async () => {
    setDownloading(true)
    try {
      const blob = await downloadResume(resume.file_url)
      const filename = `${resume.version_name.replace(/[^a-zA-Z0-9._-]/g, '_')}.pdf`
      triggerDownload(blob, filename)

      toast({
        title: 'Download started',
        description: `Downloading ${resume.version_name}`,
      })
    } catch (error) {
      console.error('Download failed:', error)
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to download resume',
        variant: 'destructive',
      })
    } finally {
      setDownloading(false)
    }
  }

  const handleDelete = async () => {
    try {
      // Delete file from storage first
      await deleteResumeFile(resume.file_url)

      // Then delete from database
      await deleteResume(resume.id)

      // Log the activity
      await logResumeDeleted(resume.id, resume.version_name)

      onDeleted(resume.id)

      toast({
        title: 'Resume deleted',
        description: 'Resume has been removed',
      })
    } catch (error) {
      console.error('Delete failed:', error)
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete resume',
        variant: 'destructive',
      })
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <>
      <Card className="transition-all hover:shadow-md">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-lg line-clamp-1">{resume.version_name}</h3>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          {/* Upload Date */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Uploaded {format(parseISO(resume.upload_date), 'MMM dd, yyyy')}</span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Briefcase className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">Times Used</span>
              </div>
              <p className="text-2xl font-bold">{resume.times_used}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <TrendingUp className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">Success Rate</span>
              </div>
              <p className="text-2xl font-bold">
                {resume.success_rate.toFixed(0)}%
              </p>
            </div>
          </div>

          {/* Success Rate Badge */}
          {resume.times_used > 0 && (
            <Badge
              variant="outline"
              className={
                resume.success_rate >= 50
                  ? 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20'
                  : resume.success_rate >= 25
                  ? 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20'
                  : 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20'
              }
            >
              {resume.success_rate >= 50
                ? 'High Success'
                : resume.success_rate >= 25
                ? 'Moderate Success'
                : 'Low Success'}
            </Badge>
          )}
        </CardContent>

        <CardFooter className="flex gap-2 pt-3">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={handleDownload}
            disabled={downloading}
          >
            <Download className="mr-2 h-4 w-4" />
            {downloading ? 'Downloading...' : 'Download'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
            onClick={() => setDeletingId(resume.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deletingId === resume.id} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Resume</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{resume.version_name}"? This action cannot be
              undone. Applications linked to this resume will not be deleted, but the resume_id
              will be set to null.
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
