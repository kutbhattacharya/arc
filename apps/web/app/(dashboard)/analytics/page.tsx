"use client"

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ROASChart } from '@/components/campaigns/roas-chart'
import { SpendBreakdown } from '@/components/campaigns/spend-breakdown'

const roasData = [
  { date: '2024-01-15', google: 3.2, meta: 1.4, youtube: 2.1 },
  { date: '2024-01-16', google: 2.9, meta: 1.3, youtube: 2.4 },
  { date: '2024-01-17', google: 3.0, meta: 1.5, youtube: 2.2 },
  { date: '2024-01-18', google: 3.4, meta: 1.6, youtube: 2.3 },
]

const spendData = [
  { platform: 'Google Ads', amount: 3331.5, percentage: 42.6 },
  { platform: 'Meta Ads', amount: 2491.5, percentage: 31.9 },
  { platform: 'YouTube Ads', amount: 1200.0, percentage: 25.5 },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-display font-bold">Analytics</h1>
        <p className="text-muted-foreground text-lg">Cross-channel ROAS and spend mix at a glance</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>ROAS over time</CardTitle>
          </CardHeader>
          <CardContent>
            <ROASChart data={roasData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Spend breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <SpendBreakdown data={spendData} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

