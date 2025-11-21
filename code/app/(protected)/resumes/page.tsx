import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import ResumesList from '@/components/resumes/ResumesList'

export const metadata = {
  title: 'Resume Versions | ApplyFlow',
  description: 'Manage your resume versions and track their success rates',
}

export default function ResumesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resume Versions</h1>
          <p className="text-muted-foreground mt-2">
            Upload and manage different versions of your resume
          </p>
        </div>
      </div>

      <Suspense fallback={<ResumesListSkeleton />}>
        <ResumesList />
      </Suspense>
    </div>
  )
}

function ResumesListSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Skeleton key={i} className="h-48 w-full" />
      ))}
    </div>
  )
}
