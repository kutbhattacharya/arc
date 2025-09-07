"use client"

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Heart, MessageCircle, Reply, Flag } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface CommentCardProps {
  id: string
  platform: string
  author: string
  text: string
  publishedAt: Date
  sentiment: 'positive' | 'negative' | 'neutral'
  confidence: number
  likeCount: number
  replyCount: number
  topicTags: string[]
  contentTitle: string
}

export function CommentCard({
  platform,
  author,
  text,
  publishedAt,
  sentiment,
  confidence,
  likeCount,
  replyCount,
  topicTags,
  contentTitle
}: CommentCardProps) {
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

  const getPlatformColor = () => {
    switch (platform) {
      case 'YouTube':
        return 'bg-red-500/10 text-red-500 border-red-500/20'
      case 'Instagram':
        return 'bg-pink-500/10 text-pink-500 border-pink-500/20'
      default:
        return 'bg-muted text-muted-foreground border-muted'
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="hover:shadow-soft transition-all duration-200">
        <CardContent className="p-4">
          <div className="space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-brand-gradient flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {author.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-sm">{author}</div>
                  <div className="text-xs text-muted-foreground">
                    {formatDistanceToNow(publishedAt, { addSuffix: true })}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={getPlatformColor()}>
                  {platform}
                </Badge>
                <Badge variant="outline" className={getSentimentColor()}>
                  {sentiment} ({Math.round(confidence * 100)}%)
                </Badge>
              </div>
            </div>

            {/* Content */}
            <div>
              <p className="text-sm leading-relaxed">{text}</p>
              <div className="text-xs text-muted-foreground mt-1">
                on "{contentTitle}"
              </div>
            </div>

            {/* Topic Tags */}
            {topicTags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {topicTags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="gap-1 h-8">
                  <Heart className="w-3 h-3" />
                  {likeCount}
                </Button>
                <Button variant="ghost" size="sm" className="gap-1 h-8">
                  <MessageCircle className="w-3 h-3" />
                  {replyCount}
                </Button>
                <Button variant="ghost" size="sm" className="gap-1 h-8">
                  <Reply className="w-3 h-3" />
                  Reply
                </Button>
              </div>
              <Button variant="ghost" size="sm" className="gap-1 h-8 text-muted-foreground">
                <Flag className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
