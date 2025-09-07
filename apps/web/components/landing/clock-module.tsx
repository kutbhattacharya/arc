"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, Bell, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ClockModule() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [timeToNextPeak, setTimeToNextPeak] = useState('')

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      setCurrentTime(now)
      
      // Calculate time to next peak (example: next Tuesday 8pm)
      const nextTuesday = new Date()
      const daysUntilTuesday = (2 - now.getDay() + 7) % 7 || 7
      nextTuesday.setDate(now.getDate() + daysUntilTuesday)
      nextTuesday.setHours(20, 0, 0, 0)
      
      const diff = nextTuesday.getTime() - now.getTime()
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      
      if (hours < 24) {
        setTimeToNextPeak(`${hours}h ${minutes}m`)
      } else {
        const days = Math.floor(hours / 24)
        const remainingHours = hours % 24
        setTimeToNextPeak(`${days}d ${remainingHours}h`)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const getHandRotation = (value: number, max: number) => {
    return (value / max) * 360
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    })
  }

  return (
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      {/* Left side - Clock visualization */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="flex justify-center"
      >
        <div className="relative">
          {/* Main clock container */}
          <div className="relative w-80 h-80 rounded-full bg-gradient-to-br from-card to-card/50 border-2 border-border shadow-soft">
            {/* Clock face */}
            <div className="absolute inset-4 rounded-full bg-background border border-border/50">
              {/* Hour markers */}
              {Array.from({ length: 12 }, (_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-6 bg-muted-foreground/30"
                  style={{
                    top: '10px',
                    left: '50%',
                    transformOrigin: '50% 140px',
                    transform: `translateX(-50%) rotate(${i * 30}deg)`,
                  }}
                />
              ))}
              
              {/* Peak time indicator (8pm) */}
              <div
                className="absolute w-2 h-8 bg-brand-violet rounded-full"
                style={{
                  top: '8px',
                  left: '50%',
                  transformOrigin: '50% 142px',
                  transform: 'translateX(-50%) rotate(240deg)', // 8pm = 240 degrees
                }}
              />
              
              {/* Hour hand */}
              <motion.div
                className="absolute w-1 bg-foreground rounded-full origin-bottom"
                style={{
                  height: '80px',
                  bottom: '50%',
                  left: '50%',
                  transformOrigin: '50% 100%',
                }}
                animate={{
                  rotate: getHandRotation(currentTime.getHours() % 12, 12) + 
                           getHandRotation(currentTime.getMinutes(), 60) / 12
                }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
              />
              
              {/* Minute hand */}
              <motion.div
                className="absolute w-0.5 bg-foreground rounded-full origin-bottom"
                style={{
                  height: '110px',
                  bottom: '50%',
                  left: '50%',
                  transformOrigin: '50% 100%',
                }}
                animate={{
                  rotate: getHandRotation(currentTime.getMinutes(), 60) + 
                           getHandRotation(currentTime.getSeconds(), 60) / 60
                }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
              />
              
              {/* Second hand */}
              <motion.div
                className="absolute w-px bg-brand-violet rounded-full origin-bottom"
                style={{
                  height: '120px',
                  bottom: '50%',
                  left: '50%',
                  transformOrigin: '50% 100%',
                }}
                animate={{
                  rotate: getHandRotation(currentTime.getSeconds(), 60)
                }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
              />
              
              {/* Center dot */}
              <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-brand-violet rounded-full transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            
            {/* Digital time display */}
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-background/80 backdrop-blur-sm rounded-lg px-3 py-1 border">
              <span className="font-mono text-sm font-medium">
                {formatTime(currentTime)}
              </span>
            </div>
          </div>
          
          {/* Floating callouts */}
          <motion.div
            className="absolute -top-4 -right-4 bg-brand-violet text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg"
            animate={{ 
              y: [0, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Peak at 8pm
          </motion.div>
          
          <motion.div
            className="absolute -bottom-4 -left-4 bg-brand-cyan text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg"
            animate={{ 
              y: [0, 5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            Live audience
          </motion.div>
        </div>
      </motion.div>

      {/* Right side - Content */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-2xl bg-brand-cyan/10">
            <Clock className="w-8 h-8 text-brand-cyan" />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              Perfect Timing
            </h2>
            <p className="text-muted-foreground text-lg">
              Schedule when your audience is online
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Current time info */}
          <div className="p-6 rounded-xl bg-card border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Right Now</h3>
              <span className="text-2xl font-mono font-bold">
                {formatTime(currentTime)}
              </span>
            </div>
            <p className="text-muted-foreground">
              Your audience activity is at 
              <span className="text-brand-cyan font-medium"> 67% </span>
              of peak levels
            </p>
          </div>

          {/* Next peak info */}
          <div className="p-6 rounded-xl bg-gradient-to-r from-brand-violet/5 to-brand-cyan/5 border border-brand-violet/20">
            <div className="flex items-center gap-3 mb-3">
              <Bell className="w-5 h-5 text-brand-violet" />
              <h3 className="font-semibold">Next Peak Window</h3>
            </div>
            <p className="text-2xl font-bold gradient-text mb-2">
              Tuesday 8:00 PM
            </p>
            <p className="text-muted-foreground mb-4">
              Your audience peaks in <span className="font-medium">{timeToNextPeak}</span>
            </p>
            <Button 
              variant="gradient" 
              size="sm"
              className="w-full"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Schedule It
            </Button>
          </div>

          {/* Weekly pattern */}
          <div className="p-6 rounded-xl bg-card border">
            <h3 className="font-semibold mb-4">Weekly Pattern</h3>
            <div className="space-y-3">
              {[
                { day: 'Monday', peak: '6-8pm', activity: 'Medium' },
                { day: 'Tuesday', peak: '7-9pm', activity: 'High' },
                { day: 'Wednesday', peak: '6-8pm', activity: 'Medium' },
                { day: 'Thursday', peak: '7-9pm', activity: 'High' },
                { day: 'Friday', peak: '5-7pm', activity: 'Low' },
                { day: 'Saturday', peak: '2-4pm', activity: 'Medium' },
                { day: 'Sunday', peak: '3-5pm', activity: 'High' },
              ].map((item) => (
                <div key={item.day} className="flex items-center justify-between text-sm">
                  <span className="font-medium">{item.day}</span>
                  <span className="text-muted-foreground">{item.peak}</span>
                  <span className={`
                    px-2 py-1 rounded-full text-xs font-medium
                    ${item.activity === 'High' ? 'bg-brand-violet/20 text-brand-violet' :
                      item.activity === 'Medium' ? 'bg-brand-cyan/20 text-brand-cyan' :
                      'bg-muted text-muted-foreground'}
                  `}>
                    {item.activity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}


