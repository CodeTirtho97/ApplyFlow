import { Suspense } from 'react'
import AnalyticsClient from '@/components/analytics/AnalyticsClient'
import { Skeleton } from '@/components/ui/skeleton'

function AnalyticsClientSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-64" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-64" />
        ))}
      </div>
    </div>
  )
}

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics & Insights</h1>
        <p className="text-muted-foreground mt-2">
          Track your application performance and identify trends
        </p>
      </div>

      <Suspense fallback={<AnalyticsClientSkeleton />}>
        <AnalyticsClient />
      </Suspense>
    </div>
  )
}
