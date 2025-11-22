'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/hooks/use-toast'
import { User, Bell, Palette, Database, Shield, Mail } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { UserPreferences, UserPreferencesInsert } from '@/types/database.types'

export default function SettingsClient() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // User preferences state
  const [preferences, setPreferences] = useState<UserPreferences>({
    user_id: user?.id || '',
    email_notifications: true,
    telegram_notifications: false,
    telegram_chat_id: null,
    user_email: user?.email || null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  })

  useEffect(() => {
    if (user) {
      loadPreferences()
    }
  }, [user])

  const loadPreferences = async () => {
    setLoading(true)
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user!.id)
        .single()

      if (error && error.code !== 'PGRST116') {
        // PGRST116 is "not found" error, which is okay (we'll create it)
        throw error
      }

      if (data) {
        setPreferences(data)
      } else {
        // Create default preferences
        const defaultPrefs: UserPreferencesInsert = {
          user_id: user!.id,
          email_notifications: true,
          telegram_notifications: false,
          telegram_chat_id: null,
          user_email: user!.email ?? null,
        }

        const { data: newPrefs, error: createError } = await (supabase
          .from('user_preferences') as any)
          .insert(defaultPrefs)
          .select()
          .single()

        if (createError) throw createError
        if (newPrefs) setPreferences(newPrefs)
      }
    } catch (error) {
      console.error('Failed to load preferences:', error)
      toast({
        title: 'Error',
        description: 'Failed to load settings',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSavePreferences = async () => {
    setSaving(true)
    try {
      const supabase = createClient()
      const { error } = await (supabase
        .from('user_preferences') as any)
        .update({
          email_notifications: preferences.email_notifications,
          telegram_notifications: preferences.telegram_notifications,
          telegram_chat_id: preferences.telegram_chat_id,
          user_email: preferences.user_email,
        })
        .eq('user_id', user!.id)

      if (error) throw error

      toast({
        title: 'Settings saved',
        description: 'Your preferences have been updated successfully',
      })
    } catch (error) {
      console.error('Failed to save preferences:', error)
      toast({
        title: 'Error',
        description: 'Failed to save settings',
        variant: 'destructive',
      })
    } finally {
      setSaving(false)
    }
  }

  const handleExportData = async () => {
    try {
      const supabase = createClient()

      // Fetch all user data
      const [applications, interviews, referrals, resumes] = await Promise.all([
        supabase.from('applications').select('*').eq('user_id', user!.id),
        supabase.from('interviews').select('*').eq('user_id', user!.id),
        supabase.from('referrals').select('*').eq('user_id', user!.id),
        supabase.from('resumes').select('*').eq('user_id', user!.id),
      ])

      const exportData = {
        user: {
          id: user!.id,
          email: user!.email,
        },
        applications: applications.data || [],
        interviews: interviews.data || [],
        referrals: referrals.data || [],
        resumes: resumes.data || [],
        exported_at: new Date().toISOString(),
      }

      // Create blob and download
      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: 'application/json',
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `applyflow-data-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast({
        title: 'Data exported',
        description: 'Your data has been exported successfully',
      })
    } catch (error) {
      console.error('Failed to export data:', error)
      toast({
        title: 'Error',
        description: 'Failed to export data',
        variant: 'destructive',
      })
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12 text-muted-foreground">Loading settings...</div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Profile Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Information
          </CardTitle>
          <CardDescription>
            Your account details and contact information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={user?.email || ''}
              disabled
              className="bg-muted"
            />
            <p className="text-xs text-muted-foreground">
              Email cannot be changed. Contact support if needed.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="user-id">User ID</Label>
            <Input
              id="user-id"
              value={user?.id || ''}
              disabled
              className="bg-muted font-mono text-xs"
            />
          </div>
        </CardContent>
      </Card>

      {/* Notifications Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
          <CardDescription>
            Manage how you receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications" className="text-base">
                Email Notifications
              </Label>
              <p className="text-sm text-muted-foreground">
                Receive email updates about your applications
              </p>
            </div>
            <Switch
              id="email-notifications"
              checked={preferences.email_notifications}
              onCheckedChange={(checked) =>
                setPreferences({ ...preferences, email_notifications: checked })
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="telegram-notifications" className="text-base">
                Telegram Notifications
              </Label>
              <p className="text-sm text-muted-foreground">
                Get instant updates via Telegram bot
              </p>
            </div>
            <Switch
              id="telegram-notifications"
              checked={preferences.telegram_notifications}
              onCheckedChange={(checked) =>
                setPreferences({ ...preferences, telegram_notifications: checked })
              }
            />
          </div>

          {preferences.telegram_notifications && (
            <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
              <Label htmlFor="telegram-chat-id">Telegram Chat ID</Label>
              <Input
                id="telegram-chat-id"
                placeholder="Enter your Telegram chat ID"
                value={preferences.telegram_chat_id || ''}
                onChange={(e) =>
                  setPreferences({ ...preferences, telegram_chat_id: e.target.value || null })
                }
              />
              <p className="text-xs text-muted-foreground">
                Get your chat ID by messaging @userinfobot on Telegram
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="notification-email">Notification Email</Label>
            <Input
              id="notification-email"
              type="email"
              placeholder="Enter email for notifications"
              value={preferences.user_email || ''}
              onChange={(e) =>
                setPreferences({ ...preferences, user_email: e.target.value || null })
              }
            />
            <p className="text-xs text-muted-foreground">
              Leave empty to use your account email
            </p>
          </div>

          <Button onClick={handleSavePreferences} disabled={saving}>
            {saving ? 'Saving...' : 'Save Notification Settings'}
          </Button>
        </CardContent>
      </Card>

      {/* Appearance Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Appearance
          </CardTitle>
          <CardDescription>
            Customize how ApplyFlow looks
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Theme</Label>
            <p className="text-sm text-muted-foreground">
              Theme is controlled by the toggle in the navbar (top right)
            </p>
            <div className="flex gap-2">
              <div className="flex-1 p-4 border rounded-lg bg-background">
                <p className="text-sm font-medium">Light Mode</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Clean and bright interface
                </p>
              </div>
              <div className="flex-1 p-4 border rounded-lg bg-muted">
                <p className="text-sm font-medium">Dark Mode</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Easy on the eyes
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data & Privacy Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Data & Privacy
          </CardTitle>
          <CardDescription>
            Manage your data and privacy settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Export Your Data</Label>
            <p className="text-sm text-muted-foreground">
              Download all your applications, interviews, referrals, and resumes data
            </p>
            <Button onClick={handleExportData} variant="outline">
              <Database className="h-4 w-4 mr-2" />
              Export Data (JSON)
            </Button>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label className="text-red-600">Danger Zone</Label>
            <p className="text-sm text-muted-foreground">
              Permanently delete your account and all data
            </p>
            <Button variant="destructive" disabled>
              Delete Account (Coming Soon)
            </Button>
            <p className="text-xs text-muted-foreground">
              Contact support to delete your account
            </p>
          </div>
        </CardContent>
      </Card>

      {/* About Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            About
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>ApplyFlow Version</Label>
            <p className="text-sm text-muted-foreground">v1.0.0</p>
          </div>

          <div className="space-y-2">
            <Label>Support</Label>
            <p className="text-sm text-muted-foreground">
              Need help? Contact support at{' '}
              <a href="mailto:support@applyflow.com" className="text-primary hover:underline">
                support@applyflow.com
              </a>
            </p>
          </div>

          <div className="space-y-2">
            <Label>Legal</Label>
            <div className="flex gap-4 text-sm">
              <a href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </a>
              <a href="/terms" className="text-primary hover:underline">
                Terms of Service
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
