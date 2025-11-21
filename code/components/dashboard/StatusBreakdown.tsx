import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface StatusItem {
  status: string
  count: number
  color: string
}

interface StatusBreakdownProps {
  title: string
  items: StatusItem[]
}

export default function StatusBreakdown({ title, items }: StatusBreakdownProps) {
  const total = items.reduce((sum, item) => sum + item.count, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {items.map((item) => {
            const percentage = total > 0 ? (item.count / total) * 100 : 0

            return (
              <div key={item.status} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Badge className={item.color}>{item.status}</Badge>
                  </div>
                  <span className="font-medium">
                    {item.count} ({percentage.toFixed(0)}%)
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color.replace('text-', 'bg-').replace('dark:text-', 'dark:bg-')}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
