"use client"

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Check, X, ArrowRight } from 'lucide-react'

interface RecommendationCardProps {
  id: string
  scope: 'content' | 'spend' | 'timing' | 'trend'
  title: string
  body: string
  priority: 'high' | 'medium' | 'low'
  confidence: number
}

export function RecommendationCard({ 
  id, 
  scope, 
  title, 
  body, 
  priority, 
  confidence 
}: RecommendationCardProps) {
  const getScopeColor = () => {
    switch (scope) {
      case 'content':
        return 'bg-brand-violet/10 text-brand-violet border-brand-violet/20'
      case 'spend':
        return 'bg-brand-cyan/10 text-brand-cyan border-brand-cyan/20'
      case 'timing':
        return 'bg-brand-purple/10 text-brand-purple border-brand-purple/20'
      case 'trend':
        return 'bg-brand-blue/10 text-brand-blue border-brand-blue/20'
      default:
        return 'bg-muted text-muted-foreground border-muted'
    }
  }

  const getPriorityColor = () => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/10 text-red-500 border-red-500/20'
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
      case 'low':
        return 'bg-green-500/10 text-green-500 border-green-500/20'
      default:
        return 'bg-muted text-muted-foreground border-muted'
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="hover:shadow-soft transition-all duration-200">
        <CardContent className="p-4">
          <div className="space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={getScopeColor()}>
                  {scope}
                </Badge>
                <Badge variant="outline" className={getPriorityColor()}>
                  {priority}
                </Badge>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-brand-violet">
                  {confidence}% confidence
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <h3 className="font-semibold text-sm mb-1">
                {title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {body}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button size="sm" className="flex-1">
                <Check className="w-3 h-3 mr-1" />
                Apply
              </Button>
              <Button size="sm" variant="outline">
                <ArrowRight className="w-3 h-3" />
              </Button>
              <Button size="sm" variant="ghost">
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
