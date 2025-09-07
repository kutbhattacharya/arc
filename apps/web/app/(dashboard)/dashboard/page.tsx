"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { KpiCard } from '@/components/dashboard/kpi-card'
import { TrendTile } from '@/components/dashboard/trend-tile'
import { RecommendationCard } from '@/components/dashboard/recommendation-card'
import { ActivityFeed } from '@/components/dashboard/activity-feed'
import { copy } from '@/content/copy'

// Mock data - in real app this would come from API
const mockKpis = [
  {
    title: "12-Week ROAS",
    value: "2.4x",
    change: "+15%",
    trend: "up" as const,
    description: "Return on ad spend"
  },
  {
    title: "Customer Acquisition Cost",
    value: "$45",
    change: "-8%",
    trend: "down" as const,
    description: "Cost per new customer"
  },
  {
    title: "Total Revenue",
    value: "$24,500",
    change: "+23%",
    trend: "up" as const,
    description: "Last 30 days"
  },
  {
    title: "Engagement Velocity",
    value: "8.5x",
    change: "+12%",
    trend: "up" as const,
    description: "Comments per hour"
  }
]

const mockTrends = [
  {
    tag: "AI ethics",
    score: 92,
    velocity: 180,
    sentiment: "positive" as const,
    mentions: 45
  },
  {
    tag: "quantum computing",
    score: 87,
    velocity: 95,
    sentiment: "positive" as const,
    mentions: 32
  },
  {
    tag: "climate tech",
    score: 78,
    velocity: 45,
    sentiment: "positive" as const,
    mentions: 28
  }
]

const mockRecommendations = [
  {
    id: "rec_001",
    scope: "content" as const,
    title: "Double down on quantum physics content",
    body: "Your quantum computing videos have 40% higher engagement than average.",
    priority: "high" as const,
    confidence: 87
  },
  {
    id: "rec_002",
    scope: "timing" as const,
    title: "Optimize posting schedule",
    body: "Your audience is most active Tuesday 7-9pm EST.",
    priority: "medium" as const,
    confidence: 92
  },
  {
    id: "rec_003",
    scope: "spend" as const,
    title: "Reduce Meta Ads budget by 15%",
    body: "Google Ads is delivering 2.3x better ROAS.",
    priority: "high" as const,
    confidence: 89
  }
]

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-muted animate-pulse rounded" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-muted animate-pulse rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-display font-bold">
          {copy.dashboard.welcome}
        </h1>
        <p className="text-muted-foreground text-lg">
          {copy.dashboard.subtitle}
        </p>
      </motion.div>

      {/* KPI Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {mockKpis.map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
          >
            <KpiCard {...kpi} />
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trends Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-2 space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-violet animate-pulse" />
                Trending Topics
              </CardTitle>
              <CardDescription>
                What's resonating with your audience right now
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTrends.map((trend, index) => (
                  <motion.div
                    key={trend.tag}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  >
                    <TrendTile {...trend} />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activity Feed */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest comments and engagement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ActivityFeed />
            </CardContent>
          </Card>
        </motion.div>

        {/* Recommendations Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
                AI Recommendations
              </CardTitle>
              <CardDescription>
                Actionable insights to level up your game
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockRecommendations.map((rec, index) => (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                >
                  <RecommendationCard {...rec} />
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg border hover:bg-muted transition-colors">
                📊 Upload CSV Data
              </button>
              <button className="w-full text-left p-3 rounded-lg border hover:bg-muted transition-colors">
                🔗 Connect New Account
              </button>
              <button className="w-full text-left p-3 rounded-lg border hover:bg-muted transition-colors">
                📈 Generate Report
              </button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
