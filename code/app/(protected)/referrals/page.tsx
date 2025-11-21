import { Suspense } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import ReferralsList from '@/components/referrals/ReferralsList'

export const metadata = {
  title: 'My Referrals | ApplyFlow',
  description: 'Track and manage your job referrals',
}

export default function ReferralsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Referrals</h1>
          <p className="text-muted-foreground mt-2">
            Track people who can refer you and manage follow-ups
          </p>
        </div>
      </div>

      <Suspense fallback={<ReferralsListSkeleton />}>
        <ReferralsList />
      </Suspense>
    </div>
  )
}

function ReferralsListSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Skeleton key={i} className="h-64 w-full" />
      ))}
    </div>
  )
}
