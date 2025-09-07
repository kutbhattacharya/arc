"use client"

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SentimentChart } from '@/components/comments/sentiment-chart'
import { TopicCloud } from '@/components/comments/topic-cloud'
import { copy } from '@/content/copy'

const mockTrends = [
  { name: 'ai-ethics', count: 45, sentiment: 'positive' as const },
  { name: 'quantum-computing', count: 32, sentiment: 'positive' as const },
  { name: 'climate-tech', count: 28, sentiment: 'positive' as const },
  { name: 'physics-education', count: 22, sentiment: 'neutral' as const },
  { name: 'black-holes', count: 18, sentiment: 'positive' as const },
  { name: 'ml-in-marketing', count: 15, sentiment: 'neutral' as const },
  { name: 'content-cadence', count: 12, sentiment: 'negative' as const },
]

const sentimentStats = {
  positive: 68,
  neutral: 22,
  negative: 10,
}

export default function TrendsPage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-display font-bold">{copy.trends.title}</h1>
          <p className="text-muted-foreground text-lg">{copy.trends.subtitle}</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{copy.trends.rising}</CardTitle>
          </CardHeader>
          <CardContent>
            <TopicCloud topics={mockTrends} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Audience Sentiment</CardTitle>
          </CardHeader>
          <CardContent>
            <SentimentChart data={sentimentStats} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

