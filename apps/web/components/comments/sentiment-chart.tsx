"use client"

import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

interface SentimentChartProps {
  data: {
    positive: number
    neutral: number
    negative: number
  }
}

const COLORS = {
  positive: '#10b981', // green-500
  neutral: '#6b7280',  // gray-500
  negative: '#ef4444'  // red-500
}

export function SentimentChart({ data }: SentimentChartProps) {
  const chartData = [
    { name: 'Positive', value: data.positive, color: COLORS.positive },
    { name: 'Neutral', value: data.neutral, color: COLORS.neutral },
    { name: 'Negative', value: data.negative, color: COLORS.negative }
  ]

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => [`${value}%`, 'Sentiment']}
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              color: 'hsl(var(--foreground))'
            }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            formatter={(value: string) => (
              <span className="text-sm text-muted-foreground">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
