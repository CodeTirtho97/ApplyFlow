'use client'

import { useState, useMemo } from 'react'
import type { Application, ApplicationStatus } from '@/types/database.types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus, Search, LayoutGrid, Columns3, TableIcon } from 'lucide-react'
import ApplicationCard from './ApplicationCard'
import ApplicationsTable from './ApplicationsTable'
import AddApplicationDialog from './AddApplicationDialog'
import EmptyState from './EmptyState'
import KanbanBoard from './KanbanBoard'

interface ApplicationsClientProps {
  initialApplications: Application[]
}

type ViewMode = 'table' | 'grid' | 'kanban'

export default function ApplicationsClient({
  initialApplications,
}: ApplicationsClientProps) {
  const [applications, setApplications] = useState<Application[]>(initialApplications)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('date-desc')
  const [viewMode, setViewMode] = useState<ViewMode>('table')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  // Filter and sort applications
  const filteredApplications = useMemo(() => {
    let filtered = applications

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (app) =>
          app.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          app.role.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((app) => app.status === statusFilter)
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.applied_date).getTime() - new Date(a.applied_date).getTime()
        case 'date-asc':
          return new Date(a.applied_date).getTime() - new Date(b.applied_date).getTime()
        case 'company-asc':
          return a.company_name.localeCompare(b.company_name)
        case 'company-desc':
          return b.company_name.localeCompare(a.company_name)
        default:
          return 0
      }
    })

    return sorted
  }, [applications, searchQuery, statusFilter, sortBy])

  const handleApplicationAdded = (newApplication: Application) => {
    setApplications((prev) => [newApplication, ...prev])
    setIsAddDialogOpen(false)
  }

  const handleApplicationUpdated = (updatedApplication: Application) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === updatedApplication.id ? updatedApplication : app))
    )
  }

  const handleApplicationDeleted = (id: string) => {
    setApplications((prev) => prev.filter((app) => app.id !== id))
  }

  if (applications.length === 0) {
    return (
      <>
        <EmptyState onAddClick={() => setIsAddDialogOpen(true)} />
        <AddApplicationDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onApplicationAdded={handleApplicationAdded}
        />
      </>
    )
  }

  return (
    <>
      <div className="space-y-6">
        {/* Filters and Controls */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search companies or roles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Applied">Applied</SelectItem>
                <SelectItem value="OA">OA</SelectItem>
                <SelectItem value="Interview">Interview</SelectItem>
                <SelectItem value="Offer">Offer</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
                <SelectItem value="Ghosted">Ghosted</SelectItem>
                <SelectItem value="Withdrawn">Withdrawn</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-desc">Newest First</SelectItem>
                <SelectItem value="date-asc">Oldest First</SelectItem>
                <SelectItem value="company-asc">Company (A-Z)</SelectItem>
                <SelectItem value="company-desc">Company (Z-A)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* View Mode and Add Button */}
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'table' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('table')}
              title="Table View"
            >
              <TableIcon className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'kanban' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('kanban')}
              title="Kanban View"
            >
              <Columns3 className="h-4 w-4" />
            </Button>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Application
            </Button>
          </div>
        </div>

        {/* Results count */}
        <div className="text-sm text-muted-foreground">
          Showing {filteredApplications.length} of {applications.length} applications
        </div>

        {/* View */}
        {viewMode === 'table' ? (
          <ApplicationsTable
            applications={filteredApplications}
            onUpdated={handleApplicationUpdated}
            onDeleted={handleApplicationDeleted}
          />
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredApplications.map((application) => (
              <ApplicationCard
                key={application.id}
                application={application}
                onUpdated={handleApplicationUpdated}
                onDeleted={handleApplicationDeleted}
              />
            ))}
          </div>
        ) : (
          <KanbanBoard
            applications={filteredApplications}
            onUpdated={handleApplicationUpdated}
            onDeleted={handleApplicationDeleted}
          />
        )}
      </div>

      <AddApplicationDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onApplicationAdded={handleApplicationAdded}
      />
    </>
  )
}
