import { Suspense } from 'react'
import SettingsClient from '@/components/settings/SettingsClient'
import { Skeleton } from '@/components/ui/skeleton'

function SettingsClientSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-64" />
      <div className="space-y-4">
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
      </div>
    </div>
  )
}

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account settings and preferences
        </p>
      </div>

      <Suspense fallback={<SettingsClientSkeleton />}>
        <SettingsClient />
      </Suspense>
    </div>
  )
}
