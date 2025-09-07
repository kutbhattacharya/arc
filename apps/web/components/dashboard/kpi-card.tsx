"use client"

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface KpiCardProps {
  title: string
  value: string
  change: string
  trend: 'up' | 'down' | 'neutral'
  description: string
}

export function KpiCard({ title, value, change, trend, description }: KpiCardProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />
      default:
        return <Minus className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-500'
      case 'down':
        return 'text-red-500'
      default:
        return 'text-muted-foreground'
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="hover:shadow-soft transition-all duration-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold font-display">
                {value}
              </span>
              <div className={`flex items-center gap-1 text-sm font-medium ${getTrendColor()}`}>
                {getTrendIcon()}
                <span>{change}</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {description}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
