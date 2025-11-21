import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import ApplicationsClient from '@/components/applications/ApplicationsClient'
import type { Application } from '@/types/database.types'

export default async function ApplicationsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/signin')
  }

  // Fetch applications directly from server
  const { data: applications, error } = await supabase
    .from('applications')
    .select('*')
    .order('applied_date', { ascending: false })

  if (error) {
    console.error('Error fetching applications:', error)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Applications</h1>
          <p className="text-muted-foreground mt-2">
            Track and manage your job applications
          </p>
        </div>
      </div>

      <ApplicationsClient initialApplications={(applications as Application[]) || []} />
    </div>
  )
}
