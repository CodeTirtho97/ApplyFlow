'use client'

import { useState } from 'react'
import type { Referral, ReferralInsert } from '@/types/database.types'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createReferral } from '@/lib/supabase/queries'
import { useToast } from '@/hooks/use-toast'
import { logReferralCreated } from '@/lib/supabase/actions/activity-actions'

interface AddReferralDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onReferralAdded: (referral: Referral) => void
}

export default function AddReferralDialog({
  open,
  onOpenChange,
  onReferralAdded,
}: AddReferralDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)

    const data: Omit<ReferralInsert, 'user_id'> = {
      person_name: formData.get('person_name') as string,
      company: formData.get('company') as string,
      linkedin_url: (formData.get('linkedin_url') as string) || null,
      relationship: (formData.get('relationship') as string) || null,
      date_asked: (formData.get('date_asked') as string) || null,
      status: (formData.get('status') as any) || 'Pending',
      follow_up_date: (formData.get('follow_up_date') as string) || null,
      notes: (formData.get('notes') as string) || null,
    }

    try {
      const newReferral = await createReferral(data as ReferralInsert)

      // Log the activity
      await logReferralCreated(newReferral.id, data.person_name, data.company)

      toast({
        title: 'Referral added',
        description: `Successfully added referral from ${data.person_name}`,
      })
      onReferralAdded(newReferral)
      onOpenChange(false)

      // Reset form
      e.currentTarget.reset()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add referral. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Referral</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="person_name">
                Person Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="person_name"
                name="person_name"
                placeholder="John Doe"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">
                Company <span className="text-red-500">*</span>
              </Label>
              <Input
                id="company"
                name="company"
                placeholder="Google, Microsoft, etc."
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin_url">LinkedIn Profile URL</Label>
            <Input
              id="linkedin_url"
              name="linkedin_url"
              type="url"
              placeholder="https://linkedin.com/in/..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="relationship">Relationship</Label>
              <Select name="relationship">
                <SelectTrigger>
                  <SelectValue placeholder="Select relationship (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Friend">Friend</SelectItem>
                  <SelectItem value="Colleague">Colleague</SelectItem>
                  <SelectItem value="Alumni">Alumni</SelectItem>
                  <SelectItem value="Family">Family</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select name="status" defaultValue="Pending">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Agreed">Agreed</SelectItem>
                  <SelectItem value="Referred">Referred</SelectItem>
                  <SelectItem value="Declined">Declined</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date_asked">Date Asked</Label>
              <Input
                id="date_asked"
                name="date_asked"
                type="date"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="follow_up_date">Follow-up Date</Label>
              <Input
                id="follow_up_date"
                name="follow_up_date"
                type="date"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Any additional notes about this referral..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Adding...' : 'Add Referral'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
