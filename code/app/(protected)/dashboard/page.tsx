import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getDashboardStats, getRecentActivity } from '@/lib/supabase/dashboard-queries'
import StatsCard from '@/components/dashboard/StatsCard'
import StatusBreakdown from '@/components/dashboard/StatusBreakdown'
import RecentActivity from '@/components/dashboard/RecentActivity'
import QuickActions from '@/components/dashboard/QuickActions'
import {
  FileText,
  Users,
  FileCheck,
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle,
  Target,
} from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/signin')
  }

  // Fetch all dashboard data
  const stats = await getDashboardStats()
  const activities = await getRecentActivity()

  const applicationStatusItems = [
    {
      status: 'Applied',
      count: stats.applicationStats.byStatus.Applied,
      color: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
    },
    {
      status: 'OA',
      count: stats.applicationStats.byStatus.OA,
      color: 'bg-purple-500/10 text-purple-700 dark:text-purple-400',
    },
    {
      status: 'Interview',
      count: stats.applicationStats.byStatus.Interview,
      color: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400',
    },
    {
      status: 'Offer',
      count: stats.applicationStats.byStatus.Offer,
      color: 'bg-green-500/10 text-green-700 dark:text-green-400',
    },
    {
      status: 'Rejected',
      count: stats.applicationStats.byStatus.Rejected,
      color: 'bg-red-500/10 text-red-700 dark:text-red-400',
    },
  ]

  const referralStatusItems = [
    {
      status: 'Pending',
      count: stats.referralStats.byStatus.Pending,
      color: 'bg-gray-500/10 text-gray-700 dark:text-gray-400',
    },
    {
      status: 'Agreed',
      count: stats.referralStats.byStatus.Agreed,
      color: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
    },
    {
      status: 'Referred',
      count: stats.referralStats.byStatus.Referred,
      color: 'bg-green-500/10 text-green-700 dark:text-green-400',
    },
    {
      status: 'Declined',
      count: stats.referralStats.byStatus.Declined,
      color: 'bg-red-500/10 text-red-700 dark:text-red-400',
    },
  ]

  const interviewStatusItems = [
    {
      status: 'Scheduled',
      count: stats.interviewStats.byStatus.Scheduled,
      color: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
    },
    {
      status: 'Completed',
      count: stats.interviewStats.byStatus.Completed,
      color: 'bg-green-500/10 text-green-700 dark:text-green-400',
    },
    {
      status: 'Cancelled',
      count: stats.interviewStats.byStatus.Cancelled,
      color: 'bg-red-500/10 text-red-700 dark:text-red-400',
    },
    {
      status: 'Rescheduled',
      count: stats.interviewStats.byStatus.Rescheduled,
      color: 'bg-orange-500/10 text-orange-700 dark:text-orange-400',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold mb-2">
          Welcome, {user?.email?.split('@')[0]}!
        </h1>
        <p className="text-muted-foreground">
          Here is an overview of your job application journey
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Applications"
          value={stats.applicationStats.total}
          icon={FileText}
          description="All job applications"
        />
        <StatsCard
          title="Total Referrals"
          value={stats.referralStats.total}
          icon={Users}
          description="People helping you"
        />
        <StatsCard
          title="Resumes"
          value={stats.resumeStats.total}
          icon={FileCheck}
          description={`Avg success: ${stats.resumeStats.averageSuccessRate.toFixed(1)}%`}
        />
        <StatsCard
          title="Interviews"
          value={stats.interviewStats.total}
          icon={Calendar}
          description={`${stats.interviewStats.upcoming} upcoming`}
        />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Response Rate"
          value={`${stats.applicationStats.responseRate.toFixed(1)}%`}
          icon={Target}
          description="Interview + Offer rate"
        />
        <StatsCard
          title="Offers Received"
          value={stats.applicationStats.byStatus.Offer}
          icon={CheckCircle}
          description="Congratulations!"
        />
        <StatsCard
          title="Pending Response"
          value={stats.applicationStats.byStatus.Applied}
          icon={Clock}
          description="Awaiting response"
        />
        <StatsCard
          title="Active Interviews"
          value={stats.applicationStats.byStatus.Interview}
          icon={TrendingUp}
          description="In progress"
        />
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Status Breakdowns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <StatusBreakdown
          title="Applications by Status"
          items={applicationStatusItems}
        />
        <StatusBreakdown title="Referrals by Status" items={referralStatusItems} />
        <StatusBreakdown title="Interviews by Status" items={interviewStatusItems} />
      </div>

      {/* Recent Activity */}
      <RecentActivity activities={activities} />
    </div>
  )
}
