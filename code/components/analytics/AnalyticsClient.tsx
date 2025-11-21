'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calendar, TrendingUp, TrendingDown, Award, Clock, Users, Target } from 'lucide-react'
import {
  getResumeAnalytics,
  getCompanyTierAnalytics,
  getReferralAnalytics,
  getTimeMetrics,
  getApplicationFunnel,
  getDayAnalytics,
  getFastestCompanies,
  getCompanySuccessRates,
  getMonthlyTrend,
  type ResumeAnalytics,
  type CompanyTierAnalytics,
  type ReferralAnalytics,
  type TimeMetrics,
  type FunnelStage,
  type DayAnalytics,
  type CompanyMetrics,
  type MonthlyTrend,
} from '@/lib/supabase/analytics-queries'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { format, subMonths } from 'date-fns'

const COLORS = ['#3b82f6', '#10b981', '#f97316', '#a855f7', '#ec4899']

export default function AnalyticsClient() {
  const [loading, setLoading] = useState(true)
  const [startDate, setStartDate] = useState(format(subMonths(new Date(), 6), 'yyyy-MM-dd'))
  const [endDate, setEndDate] = useState(format(new Date(), 'yyyy-MM-dd'))

  // Analytics data
  const [resumeData, setResumeData] = useState<ResumeAnalytics[]>([])
  const [tierData, setTierData] = useState<CompanyTierAnalytics[]>([])
  const [referralData, setReferralData] = useState<ReferralAnalytics[]>([])
  const [timeMetrics, setTimeMetrics] = useState<TimeMetrics>({
    avg_time_to_response: 0,
    avg_time_to_offer: 0,
  })
  const [funnelData, setFunnelData] = useState<FunnelStage[]>([])
  const [dayData, setDayData] = useState<DayAnalytics[]>([])
  const [fastestCompanies, setFastestCompanies] = useState<CompanyMetrics[]>([])
  const [successCompanies, setSuccessCompanies] = useState<CompanyMetrics[]>([])
  const [monthlyData, setMonthlyData] = useState<MonthlyTrend[]>([])

  useEffect(() => {
    loadAnalytics()
  }, [])

  const loadAnalytics = async () => {
    setLoading(true)
    try {
      const [
        resumeResults,
        tierResults,
        referralResults,
        timeResults,
        funnelResults,
        dayResults,
        fastestResults,
        successResults,
        monthlyResults,
      ] = await Promise.all([
        getResumeAnalytics(startDate, endDate),
        getCompanyTierAnalytics(startDate, endDate),
        getReferralAnalytics(startDate, endDate),
        getTimeMetrics(startDate, endDate),
        getApplicationFunnel(startDate, endDate),
        getDayAnalytics(startDate, endDate),
        getFastestCompanies(startDate, endDate, 10),
        getCompanySuccessRates(startDate, endDate, 10),
        getMonthlyTrend(startDate, endDate),
      ])

      setResumeData(resumeResults)
      setTierData(tierResults)
      setReferralData(referralResults)
      setTimeMetrics(timeResults)
      setFunnelData(funnelResults)
      setDayData(dayResults)
      setFastestCompanies(fastestResults)
      setSuccessCompanies(successResults)
      setMonthlyData(monthlyResults)
    } catch (error) {
      console.error('Failed to load analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApplyFilter = () => {
    loadAnalytics()
  }

  if (loading) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Loading analytics...
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Date Range Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Date Range Filter
          </CardTitle>
          <CardDescription>Filter analytics by date range</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="end-date">End Date</Label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleApplyFilter}>Apply Filter</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg Response Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Clock className="h-8 w-8 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">
                  {timeMetrics.avg_time_to_response.toFixed(1)} days
                </div>
                <p className="text-xs text-muted-foreground">Until first response</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg Time to Offer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Award className="h-8 w-8 text-green-500" />
              <div>
                <div className="text-2xl font-bold">
                  {timeMetrics.avg_time_to_offer.toFixed(1)} days
                </div>
                <p className="text-xs text-muted-foreground">From application to offer</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Referral Success
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="h-8 w-8 text-purple-500" />
              <div>
                <div className="text-2xl font-bold">
                  {referralData.find((d) => d.type === 'Referral')?.response_rate.toFixed(1) ||
                    0}
                  %
                </div>
                <p className="text-xs text-muted-foreground">Response rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Direct Success
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Target className="h-8 w-8 text-orange-500" />
              <div>
                <div className="text-2xl font-bold">
                  {referralData.find((d) => d.type === 'Direct')?.response_rate.toFixed(1) || 0}%
                </div>
                <p className="text-xs text-muted-foreground">Response rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Resume Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Response Rate by Resume</CardTitle>
            <CardDescription>Performance of different resume versions</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={resumeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="resume_name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="response_rate" fill="#3b82f6" name="Response Rate (%)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Company Tier Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Success by Company Tier</CardTitle>
            <CardDescription>Offer rates across company tiers</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={tierData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tier" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="success_rate" fill="#10b981" name="Success Rate (%)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Application Funnel */}
        <Card>
          <CardHeader>
            <CardTitle>Application Funnel</CardTitle>
            <CardDescription>Conversion through application stages</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={funnelData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="stage" type="category" />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#f97316" name="Applications">
                  {funnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Best Days to Apply */}
        <Card>
          <CardHeader>
            <CardTitle>Best Days to Apply</CardTitle>
            <CardDescription>Response rates by day of week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dayData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="response_rate" fill="#a855f7" name="Response Rate (%)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Trend */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Application Trend</CardTitle>
            <CardDescription>Applications and offers over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="applications"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Applications"
                />
                <Line
                  type="monotone"
                  dataKey="offers"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Offers"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Company Tables */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Fastest Responding Companies */}
        <Card>
          <CardHeader>
            <CardTitle>Fastest Responding Companies</CardTitle>
            <CardDescription>Companies with quickest response times</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {fastestCompanies.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No data available
                </p>
              ) : (
                fastestCompanies.map((company, index) => (
                  <div
                    key={company.company_name}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-muted-foreground">
                        #{index + 1}
                      </span>
                      <div>
                        <p className="font-medium">{company.company_name}</p>
                        <p className="text-xs text-muted-foreground">
                          {company.total_applications} application(s)
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-600 dark:text-blue-400">
                        {company.avg_response_time.toFixed(1)} days
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Best Success Rate Companies */}
        <Card>
          <CardHeader>
            <CardTitle>Highest Success Rate Companies</CardTitle>
            <CardDescription>Companies with best offer rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {successCompanies.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No data available
                </p>
              ) : (
                successCompanies.map((company, index) => (
                  <div
                    key={company.company_name}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-muted-foreground">
                        #{index + 1}
                      </span>
                      <div>
                        <p className="font-medium">{company.company_name}</p>
                        <p className="text-xs text-muted-foreground">
                          {company.offers}/{company.total_applications} offers
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600 dark:text-green-400">
                        {company.success_rate.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
