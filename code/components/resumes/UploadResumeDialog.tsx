'use client'

import { useState } from 'react'
import type { Resume, ResumeInsert } from '@/types/database.types'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createResume, getCurrentUserId } from '@/lib/supabase/queries'
import { uploadResume } from '@/lib/supabase/storage'
import { useToast } from '@/hooks/use-toast'
import { logResumeCreated } from '@/lib/supabase/actions/activity-actions'
import { Upload, FileText, AlertCircle } from 'lucide-react'

interface UploadResumeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onResumeUploaded: (resume: Resume) => void
}

export default function UploadResumeDialog({
  open,
  onOpenChange,
  onResumeUploaded,
}: UploadResumeDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setFileError(null)

    if (!file) {
      setSelectedFile(null)
      return
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      setFileError('Only PDF files are allowed')
      setSelectedFile(null)
      return
    }

    // Validate file size (5MB)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      setFileError('File size must be less than 5MB')
      setSelectedFile(null)
      return
    }

    setSelectedFile(file)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!selectedFile) {
      setFileError('Please select a PDF file')
      return
    }

    // Capture form data before async operations
    const form = e.currentTarget
    const formData = new FormData(form)
    const versionName = formData.get('version_name') as string

    setIsSubmitting(true)

    try {
      const userId = await getCurrentUserId()
      if (!userId) throw new Error('User not authenticated')

      // Upload file to storage
      const fileUrl = await uploadResume(selectedFile, userId)

      // Save metadata to database
      const resumeData: Omit<ResumeInsert, 'user_id'> = {
        version_name: versionName,
        file_url: fileUrl,
        upload_date: new Date().toISOString().split('T')[0],
        times_used: 0,
        success_rate: 0,
      }

      const newResume = await createResume(resumeData as ResumeInsert)

      // Log the activity
      await logResumeCreated(newResume.id, versionName)

      toast({
        title: 'Resume uploaded',
        description: `Successfully uploaded ${versionName}`,
      })

      onResumeUploaded(newResume)
      onOpenChange(false)

      // Reset form
      form.reset()
      setSelectedFile(null)
    } catch (error) {
      console.error('Upload failed:', error)
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to upload resume',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Upload New Resume</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="version_name">
              Resume Version Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="version_name"
              name="version_name"
              placeholder="e.g., Software Engineer - v2.0"
              required
            />
            <p className="text-xs text-muted-foreground">
              Give this resume version a descriptive name to identify it easily
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="file">
              Resume File (PDF) <span className="text-red-500">*</span>
            </Label>
            <div className="flex flex-col gap-2">
              <Input
                id="file"
                name="file"
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                required
                className="cursor-pointer"
              />
              {selectedFile && !fileError && (
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <FileText className="h-5 w-5 text-primary" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{selectedFile.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(selectedFile.size)}
                    </p>
                  </div>
                </div>
              )}
              {fileError && (
                <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                  <p className="text-sm text-red-600 dark:text-red-400">{fileError}</p>
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Maximum file size: 5MB. Only PDF files are accepted.
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
            <Button type="submit" disabled={isSubmitting || !!fileError || !selectedFile}>
              <Upload className="mr-2 h-4 w-4" />
              {isSubmitting ? 'Uploading...' : 'Upload Resume'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
