import { Suspense } from 'react'
import CalendarClient from '@/components/calendar/CalendarClient'
import { Skeleton } from '@/components/ui/skeleton'

function CalendarClientSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-64" />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Skeleton className="h-96" />
        </div>
        <div>
          <Skeleton className="h-96" />
        </div>
      </div>
    </div>
  )
}

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Calendar & Timeline</h1>
        <p className="text-muted-foreground mt-2">
          View all your interviews and follow-ups in one place
        </p>
      </div>

      <Suspense fallback={<CalendarClientSkeleton />}>
        <CalendarClient />
      </Suspense>
    </div>
  )
}
