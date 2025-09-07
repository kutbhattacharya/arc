"use client"

import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface ROASChartProps {
  data: Array<{
    date: string
    google: number
    meta: number
    youtube: number
  }>
}

export function ROASChart({ data }: ROASChartProps) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
          <XAxis 
            dataKey="date" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            domain={[2, 4]}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              color: 'hsl(var(--foreground))'
            }}
            labelFormatter={(value) => new Date(value).toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric',
              year: 'numeric'
            })}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="google" 
            stroke="#3b82f6" 
            strokeWidth={2}
            name="Google Ads"
            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="meta" 
            stroke="#8b5cf6" 
            strokeWidth={2}
            name="Meta Ads"
            dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="youtube" 
            stroke="#ef4444" 
            strokeWidth={2}
            name="YouTube Ads"
            dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
