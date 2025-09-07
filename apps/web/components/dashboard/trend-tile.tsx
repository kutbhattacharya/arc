"use client"

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, MessageSquare, Heart } from 'lucide-react'

interface TrendTileProps {
  tag: string
  score: number
  velocity: number
  sentiment: 'positive' | 'negative' | 'neutral'
  mentions: number
}

export function TrendTile({ tag, score, velocity, sentiment, mentions }: TrendTileProps) {
  const getSentimentColor = () => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-500/10 text-green-500 border-green-500/20'
      case 'negative':
        return 'bg-red-500/10 text-red-500 border-red-500/20'
      default:
        return 'bg-muted text-muted-foreground border-muted'
    }
  }

  const getVelocityColor = () => {
    if (velocity > 100) return 'text-green-500'
    if (velocity > 50) return 'text-yellow-500'
    return 'text-muted-foreground'
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="p-4 rounded-xl border bg-card hover:shadow-soft transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-lg">#{tag}</h3>
          <Badge variant="outline" className={getSentimentColor()}>
            {sentiment}
          </Badge>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold font-display text-brand-violet">
            {score}
          </div>
          <div className="text-xs text-muted-foreground">trend score</div>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            <span className={`font-medium ${getVelocityColor()}`}>
              +{velocity}%
            </span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="w-4 h-4" />
            <span className="text-muted-foreground">
              {mentions} mentions
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Heart className="w-4 h-4" />
          <span>High engagement</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-3">
        <div className="w-full bg-muted rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-brand-violet to-brand-cyan h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(score, 100)}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
      </div>
    </motion.div>
  )
}
