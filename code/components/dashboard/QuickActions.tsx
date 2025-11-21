import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, UserPlus, FileUp, Calendar } from 'lucide-react'

export default function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Jump to common tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Link href="/applications">
            <Button className="w-full h-20 flex flex-col gap-2" variant="outline">
              <Plus className="h-5 w-5" />
              <span className="text-sm font-medium">Add Application</span>
            </Button>
          </Link>

          <Link href="/referrals">
            <Button className="w-full h-20 flex flex-col gap-2" variant="outline">
              <UserPlus className="h-5 w-5" />
              <span className="text-sm font-medium">Add Referral</span>
            </Button>
          </Link>

          <Link href="/resumes">
            <Button className="w-full h-20 flex flex-col gap-2" variant="outline">
              <FileUp className="h-5 w-5" />
              <span className="text-sm font-medium">Upload Resume</span>
            </Button>
          </Link>

          <Link href="/interviews">
            <Button className="w-full h-20 flex flex-col gap-2" variant="outline">
              <Calendar className="h-5 w-5" />
              <span className="text-sm font-medium">Schedule Interview</span>
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
