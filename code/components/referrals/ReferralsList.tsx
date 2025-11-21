'use client'

import { useState, useEffect } from 'react'
import type { Referral } from '@/types/database.types'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { getReferrals } from '@/lib/supabase/queries'
import ReferralCard from './ReferralCard'
import AddReferralDialog from './AddReferralDialog'
import EditReferralDialog from './EditReferralDialog'
import { isBefore, parseISO } from 'date-fns'

export default function ReferralsList() {
  const [referrals, setReferrals] = useState<Referral[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [editingReferral, setEditingReferral] = useState<Referral | null>(null)

  useEffect(() => {
    loadReferrals()
  }, [])

  const loadReferrals = async () => {
    try {
      const data = await getReferrals()
      // Sort: overdue first, then by follow_up_date, then by created_at
      const sorted = data.sort((a, b) => {
        const aOverdue =
          a.follow_up_date &&
          a.status !== 'Referred' &&
          a.status !== 'Declined' &&
          isBefore(parseISO(a.follow_up_date), new Date())
        const bOverdue =
          b.follow_up_date &&
          b.status !== 'Referred' &&
          b.status !== 'Declined' &&
          isBefore(parseISO(b.follow_up_date), new Date())

        // Overdue items come first
        if (aOverdue && !bOverdue) return -1
        if (!aOverdue && bOverdue) return 1

        // Then sort by follow_up_date
        if (a.follow_up_date && b.follow_up_date) {
          return parseISO(a.follow_up_date).getTime() - parseISO(b.follow_up_date).getTime()
        }
        if (a.follow_up_date) return -1
        if (b.follow_up_date) return 1

        // Finally sort by created_at (newest first)
        return parseISO(b.created_at).getTime() - parseISO(a.created_at).getTime()
      })
      setReferrals(sorted)
    } catch (error) {
      console.error('Failed to load referrals:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleReferralAdded = (referral: Referral) => {
    setReferrals((prev) => [referral, ...prev])
  }

  const handleReferralUpdated = (updatedReferral: Referral) => {
    setReferrals((prev) =>
      prev.map((ref) => (ref.id === updatedReferral.id ? updatedReferral : ref))
    )
  }

  const handleReferralDeleted = (id: string) => {
    setReferrals((prev) => prev.filter((ref) => ref.id !== id))
  }

  const handleEdit = (referral: Referral) => {
    setEditingReferral(referral)
  }

  if (loading) {
    return <div className="text-center text-muted-foreground py-8">Loading referrals...</div>
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Referral
        </Button>
      </div>

      {referrals.length === 0 ? (
        <div className="text-center py-12 space-y-4">
          <p className="text-muted-foreground">No referrals yet</p>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Your First Referral
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {referrals.map((referral) => (
            <ReferralCard
              key={referral.id}
              referral={referral}
              onUpdated={handleReferralUpdated}
              onDeleted={handleReferralDeleted}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}

      <AddReferralDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onReferralAdded={handleReferralAdded}
      />

      <EditReferralDialog
        open={!!editingReferral}
        onOpenChange={(open) => !open && setEditingReferral(null)}
        referral={editingReferral}
        onReferralUpdated={handleReferralUpdated}
      />
    </>
  )
}
