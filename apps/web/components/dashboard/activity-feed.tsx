"use client"

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { MessageSquare, Heart, TrendingUp, Clock } from 'lucide-react'

const mockActivities = [
  {
    id: '1',
    type: 'comment',
    platform: 'YouTube',
    content: 'This is absolutely brilliant! Love the way you explain complex concepts.',
    author: 'ScienceFan123',
    sentiment: 'positive',
    timestamp: '2 minutes ago',
    engagement: { likes: 12, replies: 3 }
  },
  {
    id: '2',
    type: 'trend',
    platform: 'General',
    content: 'AI ethics discussions are spiking +180% this week',
    author: 'System',
    sentiment: 'neutral',
    timestamp: '15 minutes ago',
    engagement: { mentions: 45, velocity: 180 }
  },
  {
    id: '3',
    type: 'comment',
    platform: 'Instagram',
    content: 'When is the next video coming out?',
    author: 'curious_mind',
    sentiment: 'neutral',
    timestamp: '1 hour ago',
    engagement: { likes: 5, replies: 1 }
  },
  {
    id: '4',
    type: 'performance',
    platform: 'Google Ads',
    content: 'Campaign "Q4 Science Push" exceeded ROAS target by 23%',
    author: 'System',
    sentiment: 'positive',
    timestamp: '2 hours ago',
    engagement: { roas: 3.2, spend: 1250 }
  }
]

export function ActivityFeed() {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'comment':
        return <MessageSquare className="w-4 h-4" />
      case 'trend':
        return <TrendingUp className="w-4 h-4" />
      case 'performance':
        return <Heart className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-500/10 text-green-500 border-green-500/20'
      case 'negative':
        return 'bg-red-500/10 text-red-500 border-red-500/20'
      default:
        return 'bg-muted text-muted-foreground border-muted'
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'YouTube':
        return 'bg-red-500/10 text-red-500 border-red-500/20'
      case 'Instagram':
        return 'bg-pink-500/10 text-pink-500 border-pink-500/20'
      case 'Google Ads':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
      default:
        return 'bg-muted text-muted-foreground border-muted'
    }
  }

  return (
    <div className="space-y-4">
      {mockActivities.map((activity, index) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="p-4 rounded-lg border bg-card hover:shadow-soft transition-all duration-200"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-muted/50">
              {getActivityIcon(activity.type)}
            </div>
            
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={getPlatformColor(activity.platform)}>
                  {activity.platform}
                </Badge>
                <Badge variant="outline" className={getSentimentColor(activity.sentiment)}>
                  {activity.sentiment}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {activity.timestamp}
                </span>
              </div>
              
              <p className="text-sm text-foreground">
                {activity.content}
              </p>
              
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>by {activity.author}</span>
                {activity.engagement.likes && (
                  <span>{activity.engagement.likes} likes</span>
                )}
                {activity.engagement.mentions && (
                  <span>{activity.engagement.mentions} mentions</span>
                )}
                {activity.engagement.roas && (
                  <span>{activity.engagement.roas}x ROAS</span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
