'use client'

import { useState, useEffect } from 'react'
import type { Resume } from '@/types/database.types'
import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'
import { getResumes } from '@/lib/supabase/queries'
import ResumeCard from './ResumeCard'
import UploadResumeDialog from './UploadResumeDialog'

export default function ResumesList() {
  const [resumes, setResumes] = useState<Resume[]>([])
  const [loading, setLoading] = useState(true)
  const [showUploadDialog, setShowUploadDialog] = useState(false)

  useEffect(() => {
    loadResumes()
  }, [])

  const loadResumes = async () => {
    try {
      const data = await getResumes()
      // Sort by upload date (newest first)
      const sorted = data.sort(
        (a, b) => new Date(b.upload_date).getTime() - new Date(a.upload_date).getTime()
      )
      setResumes(sorted)
    } catch (error) {
      console.error('Failed to load resumes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleResumeUploaded = (resume: Resume) => {
    setResumes((prev) => [resume, ...prev])
  }

  const handleResumeDeleted = (id: string) => {
    setResumes((prev) => prev.filter((resume) => resume.id !== id))
  }

  if (loading) {
    return <div className="text-center text-muted-foreground py-8">Loading resumes...</div>
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button onClick={() => setShowUploadDialog(true)}>
          <Upload className="mr-2 h-4 w-4" />
          Upload New Resume
        </Button>
      </div>

      {resumes.length === 0 ? (
        <div className="text-center py-12 space-y-4">
          <p className="text-muted-foreground">No resumes uploaded yet</p>
          <Button onClick={() => setShowUploadDialog(true)}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Your First Resume
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {resumes.map((resume) => (
            <ResumeCard
              key={resume.id}
              resume={resume}
              onDeleted={handleResumeDeleted}
            />
          ))}
        </div>
      )}

      <UploadResumeDialog
        open={showUploadDialog}
        onOpenChange={setShowUploadDialog}
        onResumeUploaded={handleResumeUploaded}
      />
    </>
  )
}
