"use client"

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Target, TrendingUp, DollarSign, Eye, MousePointer, Calendar } from 'lucide-react'
import { format } from 'date-fns'

interface CampaignCardProps {
  id: string
  name: string
  platform: string
  status: 'active' | 'paused' | 'completed'
  budget: number
  spent: number
  impressions: number
  clicks: number
  conversions: number
  revenue: number
  roas: number
  startDate: Date
  endDate: Date
}

export function CampaignCard({
  name,
  platform,
  status,
  budget,
  spent,
  impressions,
  clicks,
  conversions,
  revenue,
  roas,
  startDate,
  endDate
}: CampaignCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'active':
        return 'bg-green-500/10 text-green-500 border-green-500/20'
      case 'paused':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
      case 'completed':
        return 'bg-muted text-muted-foreground border-muted'
      default:
        return 'bg-muted text-muted-foreground border-muted'
    }
  }

  const getPlatformColor = () => {
    switch (platform) {
      case 'Google Ads':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
      case 'Meta Ads':
        return 'bg-purple-500/10 text-purple-500 border-purple-500/20'
      case 'YouTube Ads':
        return 'bg-red-500/10 text-red-500 border-red-500/20'
      default:
        return 'bg-muted text-muted-foreground border-muted'
    }
  }

  const budgetUsed = (spent / budget) * 100
  const ctr = (clicks / impressions) * 100
  const conversionRate = (conversions / clicks) * 100

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="hover:shadow-soft transition-all duration-200">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="font-semibold text-lg">{name}</h3>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={getPlatformColor()}>
                    {platform}
                  </Badge>
                  <Badge variant="outline" className={getStatusColor()}>
                    {status}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-brand-violet">
                  {roas.toFixed(1)}x ROAS
                </div>
                <div className="text-sm text-muted-foreground">
                  Return on ad spend
                </div>
              </div>
            </div>

            {/* Budget Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Budget Usage</span>
                <span>{budgetUsed.toFixed(1)}%</span>
              </div>
              <Progress value={budgetUsed} className="h-2" />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>${spent.toLocaleString()} spent</span>
                <span>${budget.toLocaleString()} budget</span>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-1">
                  <Eye className="w-3 h-3" />
                  Impressions
                </div>
                <div className="text-lg font-semibold">
                  {impressions.toLocaleString()}
                </div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-1">
                  <MousePointer className="w-3 h-3" />
                  Clicks
                </div>
                <div className="text-lg font-semibold">
                  {clicks.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">
                  {ctr.toFixed(2)}% CTR
                </div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-1">
                  <Target className="w-3 h-3" />
                  Conversions
                </div>
                <div className="text-lg font-semibold">
                  {conversions.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">
                  {conversionRate.toFixed(2)}% CVR
                </div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-1">
                  <DollarSign className="w-3 h-3" />
                  Revenue
                </div>
                <div className="text-lg font-semibold">
                  ${revenue.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{format(startDate, 'MMM d')} - {format(endDate, 'MMM d, yyyy')}</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-border">
              <Button size="sm" className="flex-1">
                View Details
              </Button>
              <Button size="sm" variant="outline">
                Edit
              </Button>
              <Button size="sm" variant="outline">
                {status === 'active' ? 'Pause' : 'Resume'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
