"use client"

import { motion } from 'framer-motion'
import { MessageSquare, TrendingUp, Calendar, DollarSign, BarChart3, Target } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const FEATURE_CARDS = [
  {
    icon: MessageSquare,
    title: "Comments Explorer",
    description: "AI-powered sentiment analysis and topic clustering",
    preview: "Analyze 10k+ comments in seconds",
    color: "brand-violet"
  },
  {
    icon: TrendingUp,
    title: "Trends",
    description: "Real-time trend detection and velocity tracking",
    preview: "Spot viral topics before they peak",
    color: "brand-cyan"
  },
  {
    icon: Calendar,
    title: "Planner",
    description: "Smart content calendar with optimal timing",
    preview: "Schedule at peak engagement windows",
    color: "brand-purple"
  },
  {
    icon: DollarSign,
    title: "ROI",
    description: "Multi-attribution ROAS and CAC tracking",
    preview: "See which channels actually convert",
    color: "brand-blue"
  }
]

const DEMO_METRICS = [
  { label: "Comments Analyzed", value: "127K", trend: "+23%" },
  { label: "ROAS Improved", value: "2.4x", trend: "+15%" },
  { label: "Trends Detected", value: "45", trend: "+8%" },
  { label: "Time Saved", value: "12h/wk", trend: "+30%" },
]

export function ShowTellSection() {
  return (
    <div className="space-y-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center space-y-4"
      >
        <h2 className="text-4xl md:text-5xl font-display font-bold">
          Show & Tell
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          See how creators and SMBs are using Rust to turn their content into revenue
        </p>
      </motion.div>

      {/* Feature cards grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {FEATURE_CARDS.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="space-y-4">
                <div className={`
                  w-12 h-12 rounded-xl flex items-center justify-center
                  bg-${feature.color}/10 group-hover:bg-${feature.color}/20 transition-colors
                `}>
                  <feature.icon className={`w-6 h-6 text-${feature.color}`} />
                </div>
                <div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Mini demo visualization */}
                  <div className="p-4 rounded-lg bg-muted/50 border">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs text-muted-foreground">Live Demo</div>
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    </div>
                    
                    {feature.title === "Comments Explorer" && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                          <div className="text-xs">Positive: 73%</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-yellow-500" />
                          <div className="text-xs">Neutral: 21%</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-red-500" />
                          <div className="text-xs">Negative: 6%</div>
                        </div>
                      </div>
                    )}
                    
                    {feature.title === "Trends" && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>AI Ethics</span>
                          <span className="text-green-500">+180%</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Quantum Computing</span>
                          <span className="text-green-500">+95%</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Climate Tech</span>
                          <span className="text-yellow-500">+12%</span>
                        </div>
                      </div>
                    )}
                    
                    {feature.title === "Planner" && (
                      <div className="space-y-1">
                        <div className="text-xs text-muted-foreground">Next optimal window:</div>
                        <div className="text-sm font-medium">Tuesday 8:00 PM</div>
                        <div className="text-xs text-green-500">92% engagement score</div>
                      </div>
                    )}
                    
                    {feature.title === "ROI" && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Google Ads</span>
                          <span className="text-green-500">3.2x ROAS</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Meta Ads</span>
                          <span className="text-yellow-500">1.4x ROAS</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-2">
                          → Reallocate $1.5k to Google
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {feature.preview}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Metrics showcase */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-brand-violet/5 via-brand-purple/5 to-brand-cyan/5 rounded-2xl" />
        <div className="relative p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-display font-bold mb-2">
              Real Results
            </h3>
            <p className="text-muted-foreground">
              From creators and SMBs using Rust
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {DEMO_METRICS.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center space-y-2"
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text">
                  {metric.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {metric.label}
                </div>
                <div className="text-xs text-green-500 font-medium">
                  {metric.trend}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}


