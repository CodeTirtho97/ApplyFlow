import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import InterviewsList from '@/components/interviews/InterviewsList'

export const metadata = {
  title: 'Upcoming Interviews | ApplyFlow',
  description: 'Track and manage your upcoming interviews',
}

export default function InterviewsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Upcoming Interviews</h1>
          <p className="text-muted-foreground mt-2">
            Prepare for and track all your scheduled interviews
          </p>
        </div>
      </div>

      <Suspense fallback={<InterviewsListSkeleton />}>
        <InterviewsList />
      </Suspense>
    </div>
  )
}

function InterviewsListSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-40 w-full" />
      ))}
    </div>
  )
}
