'use client'

import { useState, useEffect } from 'react'
import type { Application, ApplicationInsert, Referral, Resume } from '@/types/database.types'
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
import { createApplication, getReferrals, getResumes } from '@/lib/supabase/queries'
import { useToast } from '@/hooks/use-toast'
import { logApplicationCreated } from '@/lib/supabase/actions/activity-actions'

interface AddApplicationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onApplicationAdded: (application: Application) => void
}

export default function AddApplicationDialog({
  open,
  onOpenChange,
  onApplicationAdded,
}: AddApplicationDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [referrals, setReferrals] = useState<Referral[]>([])
  const [resumes, setResumes] = useState<Resume[]>([])
  const { toast } = useToast()

  useEffect(() => {
    if (open) {
      loadReferrals()
      loadResumes()
    }
  }, [open])

  const loadReferrals = async () => {
    try {
      const data = await getReferrals()
      setReferrals(data)
    } catch (error) {
      console.error('Failed to load referrals:', error)
    }
  }

  const loadResumes = async () => {
    try {
      const data = await getResumes()
      setResumes(data)
    } catch (error) {
      console.error('Failed to load resumes:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)

    const techStackInput = formData.get('tech_stack') as string
    const techStack = techStackInput
      ? techStackInput.split(',').map((tech) => tech.trim())
      : null

    const referralId = formData.get('referral_id') as string
    const resumeId = formData.get('resume_id') as string
    const data: Omit<ApplicationInsert, 'user_id'> = {
      company_name: formData.get('company_name') as string,
      role: formData.get('role') as string,
      job_link: (formData.get('job_link') as string) || null,
      job_id: (formData.get('job_id') as string) || null,
      application_source: (formData.get('application_source') as any) || null,
      status: (formData.get('status') as any) || 'Applied',
      applied_date: (formData.get('applied_date') as string) || new Date().toISOString().split('T')[0],
      response_date: null,
      offer_date: null,
      company_tier: null,
      priority: (formData.get('priority') as any) || 'Medium',
      salary_range: (formData.get('salary_range') as string) || null,
      tech_stack: techStack,
      notes: (formData.get('notes') as string) || null,
      resume_id: resumeId && resumeId !== '' ? resumeId : null,
      referral_id: referralId && referralId !== '' ? referralId : null,
    }

    try {
      const newApplication = await createApplication(data as ApplicationInsert)

      // Log the activity
      await logApplicationCreated(newApplication.id, data.company_name, data.role)

      toast({
        title: 'Application added',
        description: `Successfully added application to ${data.company_name}`,
      })
      onApplicationAdded(newApplication)
      onOpenChange(false)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add application. Please try again.',
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
          <DialogTitle>Add New Application</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company_name">
                Company Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="company_name"
                name="company_name"
                placeholder="Google, Microsoft, etc."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">
                Role <span className="text-red-500">*</span>
              </Label>
              <Input
                id="role"
                name="role"
                placeholder="Software Engineer, etc."
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select name="status" defaultValue="Applied">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Applied">Applied</SelectItem>
                  <SelectItem value="OA">OA</SelectItem>
                  <SelectItem value="Interview">Interview</SelectItem>
                  <SelectItem value="Offer">Offer</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                  <SelectItem value="Ghosted">Ghosted</SelectItem>
                  <SelectItem value="Withdrawn">Withdrawn</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select name="priority" defaultValue="Medium">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="applied_date">Applied Date</Label>
              <Input
                id="applied_date"
                name="applied_date"
                type="date"
                defaultValue={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="application_source">Application Source</Label>
              <Select name="application_source">
                <SelectTrigger>
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                  <SelectItem value="Naukri">Naukri</SelectItem>
                  <SelectItem value="Indeed">Indeed</SelectItem>
                  <SelectItem value="WellFound">WellFound</SelectItem>
                  <SelectItem value="Instahyre">Instahyre</SelectItem>
                  <SelectItem value="Company-Portal">Company Portal</SelectItem>
                  <SelectItem value="Referral">Referral</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="job_link">Job Posting URL</Label>
            <Input
              id="job_link"
              name="job_link"
              type="url"
              placeholder="https://..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="job_id">Job ID</Label>
              <Input
                id="job_id"
                name="job_id"
                placeholder="REQ-12345"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="salary_range">Salary Range</Label>
              <Input
                id="salary_range"
                name="salary_range"
                placeholder="₹15-20 LPA or $100k-$150k"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="resume_id">Resume Used (Optional)</Label>
              <Select name="resume_id">
                <SelectTrigger>
                  <SelectValue placeholder="Select resume version" />
                </SelectTrigger>
                <SelectContent>
                  {resumes.map((resume) => (
                    <SelectItem key={resume.id} value={resume.id}>
                      {resume.version_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="referral_id">From Referral? (Optional)</Label>
              <Select name="referral_id">
                <SelectTrigger>
                  <SelectValue placeholder="Select a referral (if any)" />
                </SelectTrigger>
                <SelectContent>
                  {referrals.map((referral) => (
                    <SelectItem key={referral.id} value={referral.id}>
                      {referral.person_name} - {referral.company}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tech_stack">Tech Stack (comma-separated)</Label>
            <Input
              id="tech_stack"
              name="tech_stack"
              placeholder="React, Node.js, TypeScript, AWS"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Any additional notes..."
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
              {isSubmitting ? 'Adding...' : 'Add Application'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
