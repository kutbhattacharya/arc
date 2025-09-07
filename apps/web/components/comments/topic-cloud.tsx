"use client"

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'

interface TopicCloudProps {
  topics: Array<{
    name: string
    count: number
    sentiment: 'positive' | 'negative' | 'neutral'
  }>
}

export function TopicCloud({ topics }: TopicCloudProps) {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20'
      case 'negative':
        return 'bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20'
      default:
        return 'bg-muted text-muted-foreground border-muted hover:bg-muted/80'
    }
  }

  const getSize = (count: number) => {
    const maxCount = Math.max(...topics.map(t => t.count))
    const minSize = 0.8
    const maxSize = 1.2
    return minSize + (count / maxCount) * (maxSize - minSize)
  }

  return (
    <div className="flex flex-wrap gap-2">
      {topics.map((topic, index) => (
        <motion.div
          key={topic.name}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Badge
            variant="outline"
            className={`cursor-pointer transition-all duration-200 ${getSentimentColor(topic.sentiment)}`}
            style={{ 
              fontSize: `${getSize(topic.count)}rem`,
              padding: `${0.5 * getSize(topic.count)}rem ${0.75 * getSize(topic.count)}rem`
            }}
          >
            #{topic.name}
            <span className="ml-1 text-xs opacity-70">
              {topic.count}
            </span>
          </Badge>
        </motion.div>
      ))}
    </div>
  )
}
