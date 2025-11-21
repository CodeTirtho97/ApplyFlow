'use client'

import { Button } from '@/components/ui/button'
import { FileText, Plus } from 'lucide-react'

interface EmptyStateProps {
  onAddClick: () => void
}

export default function EmptyState({ onAddClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="rounded-full bg-muted p-6 mb-6">
        <FileText className="h-12 w-12 text-muted-foreground" />
      </div>

      <h2 className="text-2xl font-semibold mb-2">No applications yet</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        Start tracking your job applications by adding your first one. Keep all your application
        details organized in one place.
      </p>

      <Button onClick={onAddClick} size="lg">
        <Plus className="h-5 w-5 mr-2" />
        Add Your First Application
      </Button>
    </div>
  )
}
