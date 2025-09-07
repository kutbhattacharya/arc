"use client"

import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

interface SpendBreakdownProps {
  data: Array<{
    platform: string
    amount: number
    percentage: number
  }>
}

const COLORS = {
  'Google Ads': '#3b82f6',
  'Meta Ads': '#8b5cf6', 
  'YouTube Ads': '#ef4444'
}

export function SpendBreakdown({ data }: SpendBreakdownProps) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="amount"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.platform as keyof typeof COLORS]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => [`$${value.toLocaleString()}`, 'Spend']}
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
