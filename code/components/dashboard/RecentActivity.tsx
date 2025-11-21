import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDistanceToNow } from 'date-fns'
import { FileText, UserPlus, Calendar, Trash2, Edit, RefreshCw, Plus } from 'lucide-react'

export interface ActivityItem {
  id: string
  type: 'application' | 'referral' | 'resume' | 'interview'
  action: 'created' | 'updated' | 'deleted' | 'status_changed'
  title: string
  description: string
  timestamp: string
}

interface RecentActivityProps {
  activities: ActivityItem[]
}

const activityIcons = {
  application: FileText,
  referral: UserPlus,
  resume: FileText,
  interview: Calendar,
}

const actionIcons = {
  created: Plus,
  updated: Edit,
  deleted: Trash2,
  status_changed: RefreshCw,
}

const actionColors = {
  created: 'text-green-600 bg-green-50 dark:bg-green-950 dark:text-green-400',
  updated: 'text-blue-600 bg-blue-50 dark:bg-blue-950 dark:text-blue-400',
  deleted: 'text-red-600 bg-red-50 dark:bg-red-950 dark:text-red-400',
  status_changed: 'text-purple-600 bg-purple-50 dark:bg-purple-950 dark:text-purple-400',
}

const actionLabels = {
  created: 'Created',
  updated: 'Updated',
  deleted: 'Deleted',
  status_changed: 'Status Changed',
}

export default function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No recent activity
          </p>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => {
              const TypeIcon = activityIcons[activity.type]
              const ActionIcon = actionIcons[activity.action]

              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0"
                >
                  <div
                    className={`p-2 rounded-lg ${actionColors[activity.action]}`}
                  >
                    <ActionIcon className="h-4 w-4" />
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <TypeIcon className="h-3 w-3 text-muted-foreground" />
                      <p className="text-sm font-medium">{activity.title}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(activity.timestamp), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>

                  <Badge variant="outline" className="capitalize">
                    {actionLabels[activity.action] || activity.action}
                  </Badge>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
