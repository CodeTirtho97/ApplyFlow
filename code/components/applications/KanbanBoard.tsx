'use client'

import { useRef, useState, useEffect } from 'react'
import type { Application, ApplicationStatus } from '@/types/database.types'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ApplicationCard from './ApplicationCard'

interface KanbanBoardProps {
  applications: Application[]
  onUpdated: (application: Application) => void
  onDeleted: (id: string) => void
}

const statuses: ApplicationStatus[] = [
  'Applied',
  'OA',
  'Interview',
  'Offer',
  'Rejected',
  'Ghosted',
  'Withdrawn',
]

const statusInfo: Record<
  ApplicationStatus,
  {
    label: string
    description: string
    headerBg: string
    headerText: string
    headerBorder: string
    icon: string
  }
> = {
  Applied: {
    label: 'Applied',
    description: 'Waiting for response',
    headerBg: 'bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700',
    headerText: 'text-white',
    headerBorder: 'border-blue-600',
    icon: '📤',
  },
  OA: {
    label: 'Online Assessment',
    description: 'Test pending',
    headerBg: 'bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700',
    headerText: 'text-white',
    headerBorder: 'border-purple-600',
    icon: '📝',
  },
  Interview: {
    label: 'Interview',
    description: 'In interview stage',
    headerBg: 'bg-gradient-to-br from-yellow-500 to-yellow-600 dark:from-yellow-600 dark:to-yellow-700',
    headerText: 'text-white',
    headerBorder: 'border-yellow-600',
    icon: '💼',
  },
  Offer: {
    label: 'Offer Received',
    description: 'Congratulations!',
    headerBg: 'bg-gradient-to-br from-green-500 to-green-600 dark:from-green-600 dark:to-green-700',
    headerText: 'text-white',
    headerBorder: 'border-green-600',
    icon: '🎉',
  },
  Rejected: {
    label: 'Rejected',
    description: 'Not selected',
    headerBg: 'bg-gradient-to-br from-red-500 to-red-600 dark:from-red-600 dark:to-red-700',
    headerText: 'text-white',
    headerBorder: 'border-red-600',
    icon: '❌',
  },
  Ghosted: {
    label: 'Ghosted',
    description: 'No response',
    headerBg: 'bg-gradient-to-br from-gray-500 to-gray-600 dark:from-gray-600 dark:to-gray-700',
    headerText: 'text-white',
    headerBorder: 'border-gray-600',
    icon: '👻',
  },
  Withdrawn: {
    label: 'Withdrawn',
    description: 'Application withdrawn',
    headerBg: 'bg-gradient-to-br from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700',
    headerText: 'text-white',
    headerBorder: 'border-orange-600',
    icon: '🚫',
  },
}

export default function KanbanBoard({
  applications,
  onUpdated,
  onDeleted,
}: KanbanBoardProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const groupedApplications = statuses.reduce(
    (acc, status) => {
      acc[status] = applications.filter((app) => app.status === status)
      return acc
    },
    {} as Record<ApplicationStatus, Application[]>
  )

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    updateScrollButtons()
    const handleResize = () => updateScrollButtons()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [applications])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400
      const newScrollLeft =
        direction === 'left'
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="relative">
      {/* Scroll Left Button */}
      {canScrollLeft && (
        <Button
          variant="outline"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full shadow-lg bg-card hover:bg-accent"
          onClick={() => scroll('left')}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      )}

      {/* Scroll Right Button */}
      {canScrollRight && (
        <Button
          variant="outline"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full shadow-lg bg-card hover:bg-accent"
          onClick={() => scroll('right')}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      )}

      {/* Kanban Board */}
      <div
        ref={scrollContainerRef}
        onScroll={updateScrollButtons}
        className="flex gap-4 overflow-x-auto pb-4 scroll-smooth"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgb(203 213 225) transparent',
        }}
      >
        {statuses.map((status) => {
          const info = statusInfo[status]
          const apps = groupedApplications[status]

          return (
            <div key={status} className="shrink-0 w-80">
              {/* Column Header */}
              <div
                className={`rounded-xl p-4 mb-3 shadow-md border-2 ${info.headerBg} ${info.headerBorder}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{info.icon}</span>
                    <h3 className={`font-bold text-lg ${info.headerText}`}>
                      {info.label}
                    </h3>
                  </div>
                  <div
                    className={`${info.headerText} font-bold text-lg bg-white/20 rounded-full h-8 w-8 flex items-center justify-center`}
                  >
                    {apps.length}
                  </div>
                </div>
                <p className={`text-xs ${info.headerText} opacity-90`}>
                  {info.description}
                </p>
              </div>

              {/* Cards Container */}
              <div className="space-y-3 min-h-[200px]">
                {apps.length === 0 ? (
                  <div className="text-center py-12 text-sm text-muted-foreground border-2 border-dashed rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                    <div className="text-3xl mb-2 opacity-50">📭</div>
                    <div>No applications</div>
                  </div>
                ) : (
                  apps.map((app) => (
                    <div
                      key={app.id}
                      className="transform transition-all hover:scale-[1.02] hover:shadow-lg"
                    >
                      <ApplicationCard
                        application={app}
                        onUpdated={onUpdated}
                        onDeleted={onDeleted}
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
