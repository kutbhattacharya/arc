"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Target, TrendingUp, DollarSign, Eye, MousePointer } from 'lucide-react'
import { CampaignCard } from '@/components/campaigns/campaign-card'
import { ROASChart } from '@/components/campaigns/roas-chart'
import { SpendBreakdown } from '@/components/campaigns/spend-breakdown'

// Mock data
const mockCampaigns = [
  {
    id: '1',
    name: 'Q4 Science Push',
    platform: 'Google Ads',
    status: 'active' as const,
    budget: 5000,
    spent: 3200,
    impressions: 125000,
    clicks: 3200,
    conversions: 128,
    revenue: 8960,
    roas: 2.8,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-03-31')
  },
  {
    id: '2',
    name: 'Quantum Computing Awareness',
    platform: 'Meta Ads',
    status: 'active' as const,
    budget: 3000,
    spent: 1800,
    impressions: 85000,
    clicks: 2100,
    conversions: 84,
    revenue: 5040,
    roas: 2.8,
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-04-15')
  },
  {
    id: '3',
    name: 'Physics Education Series',
    platform: 'YouTube Ads',
    status: 'paused' as const,
    budget: 2000,
    spent: 1200,
    impressions: 45000,
    clicks: 1800,
    conversions: 72,
    revenue: 4320,
    roas: 3.6,
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-05-01')
  }
]

const roasData = [
  { date: '2024-01-01', google: 2.8, meta: 2.4, youtube: 3.2 },
  { date: '2024-01-08', google: 2.9, meta: 2.6, youtube: 3.4 },
  { date: '2024-01-15', google: 3.1, meta: 2.8, youtube: 3.6 },
  { date: '2024-01-22', google: 2.7, meta: 2.5, youtube: 3.3 },
  { date: '2024-01-29', google: 3.0, meta: 2.7, youtube: 3.5 }
]

const spendData = [
  { platform: 'Google Ads', amount: 3200, percentage: 51.6 },
  { platform: 'Meta Ads', amount: 1800, percentage: 29.0 },
  { platform: 'YouTube Ads', amount: 1200, percentage: 19.4 }
]

export default function CampaignsPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="space-y-6">Loading...</div>
  }

  const totalSpend = mockCampaigns.reduce((sum, campaign) => sum + campaign.spent, 0)
  const totalRevenue = mockCampaigns.reduce((sum, campaign) => sum + campaign.revenue, 0)
  const averageROAS = totalSpend > 0 ? totalRevenue / totalSpend : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-display font-bold">Campaigns</h1>
          <p className="text-muted-foreground text-lg">
            Manage and optimize your ad campaigns
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          New Campaign
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-brand-violet" />
              <div>
                <div className="text-2xl font-bold">${totalSpend.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Spend</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <div>
                <div className="text-2xl font-bold">{averageROAS.toFixed(1)}x</div>
                <div className="text-sm text-muted-foreground">Average ROAS</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-brand-cyan" />
              <div>
                <div className="text-2xl font-bold">{mockCampaigns.length}</div>
                <div className="text-sm text-muted-foreground">Active Campaigns</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-brand-purple" />
              <div>
                <div className="text-2xl font-bold">255K</div>
                <div className="text-sm text-muted-foreground">Total Impressions</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Campaigns List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              All Campaigns ({mockCampaigns.length})
            </h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Filter
              </Button>
              <Button variant="outline" size="sm">
                Sort
              </Button>
            </div>
          </div>
          
          <div className="space-y-3">
            {mockCampaigns.map((campaign, index) => (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <CampaignCard {...campaign} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Analytics Sidebar */}
        <div className="space-y-6">
          {/* ROAS Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">ROAS Trend</CardTitle>
              <CardDescription>
                Return on ad spend over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ROASChart data={roasData} />
            </CardContent>
          </Card>

          {/* Spend Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Spend Breakdown</CardTitle>
              <CardDescription>
                Budget allocation by platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SpendBreakdown data={spendData} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
