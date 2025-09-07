"use client"

import { motion } from 'framer-motion'
import { RecommendationCard } from '@/components/dashboard/recommendation-card'
import { copy } from '@/content/copy'

const mockRecommendations = [
  { id: 'rec_content_001', scope: 'content' as const, title: 'Double down on quantum physics content', body: 'Your quantum computing videos have 40% higher engagement than average. Consider a 3-part series.', priority: 'high' as const, confidence: 87 },
  { id: 'rec_timing_001', scope: 'timing' as const, title: 'Optimize posting schedule', body: 'Your crew is most active Tue 7–9pm. Shift your drops to prime time.', priority: 'medium' as const, confidence: 92 },
  { id: 'rec_spend_001', scope: 'spend' as const, title: 'Reallocate 15% from Meta to Google Ads', body: 'Google Ads ROAS is 2.3x higher this week. Rebalance for better yield.', priority: 'high' as const, confidence: 89 },
  { id: 'rec_trend_001', scope: 'trend' as const, title: 'Ride the AI ethics surge', body: 'Mentions are +180%. Produce a quick-turn explainer to catch the wave.', priority: 'urgent' as any, confidence: 94 },
]

export default function RecommendationsPage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-display font-bold">{copy.recommendations.title}</h1>
          <p className="text-muted-foreground text-lg">{copy.recommendations.subtitle}</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {mockRecommendations.map((rec, i) => (
          <motion.div key={rec.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}>
            <RecommendationCard {...rec} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

