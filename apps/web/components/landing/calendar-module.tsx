"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, TrendingUp } from 'lucide-react'
import { formatDate } from '@/lib/utils'

const SAMPLE_PRIME_WINDOWS = [
  { day: 'Tuesday', time: '7-9pm', score: 92 },
  { day: 'Thursday', time: '6-8pm', score: 88 },
  { day: 'Sunday', time: '2-4pm', score: 85 },
]

export function CalendarModule() {
  const [hoveredCell, setHoveredCell] = useState<number | null>(null)
  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const generateCalendarCells = () => {
    const cells = []
    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()
    const firstDay = new Date(currentYear, currentMonth, 1).getDay()
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      cells.push(null)
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === today.getDate()
      const isPrimeDay = [2, 4, 0].includes(new Date(currentYear, currentMonth, day).getDay()) // Tue, Thu, Sun
      const engagement = isPrimeDay ? Math.random() * 40 + 60 : Math.random() * 30 + 20
      
      cells.push({
        day,
        isToday,
        isPrimeDay,
        engagement,
        isHigh: engagement > 70,
        isMedium: engagement > 45 && engagement <= 70
      })
    }

    return cells
  }

  const calendarCells = generateCalendarCells()

  return (
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      {/* Left side - Text content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-2xl bg-brand-violet/10">
            <Calendar className="w-8 h-8 text-brand-violet" />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              Prime Posting Windows
            </h2>
            <p className="text-muted-foreground text-lg">
              When your audience is most engaged
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {SAMPLE_PRIME_WINDOWS.map((window, index) => (
            <motion.div
              key={window.day}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center justify-between p-4 rounded-xl bg-card border hover:shadow-soft transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-brand-violet animate-pulse" />
                <span className="font-medium">{window.day}</span>
                <span className="text-muted-foreground">{window.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-brand-violet" />
                <span className="font-medium text-brand-violet">{window.score}%</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="p-6 rounded-xl bg-gradient-to-r from-brand-violet/5 to-brand-cyan/5 border border-brand-violet/20">
          <p className="text-sm text-muted-foreground mb-2">Best hour this week</p>
          <p className="text-2xl font-bold gradient-text">Tuesday 8pm</p>
          <p className="text-sm text-muted-foreground mt-1">
            Your audience peaks in ~2h
          </p>
        </div>
      </motion.div>

      {/* Right side - Interactive calendar */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="space-y-6"
      >
        {/* Calendar header */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">
            {formatDate(currentDate, { month: 'long', year: 'numeric' })}
          </h3>
          <p className="text-muted-foreground">
            Hover cells to see engagement scores
          </p>
        </div>

        {/* Calendar grid */}
        <div className="p-6 rounded-2xl bg-card border shadow-soft">
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar cells */}
          <div className="grid grid-cols-7 gap-2">
            {calendarCells.map((cell, index) => (
              <motion.div
                key={index}
                className={`
                  relative aspect-square flex items-center justify-center text-sm rounded-lg cursor-pointer
                  transition-all duration-200
                  ${!cell ? 'pointer-events-none' : ''}
                  ${cell?.isToday 
                    ? 'bg-brand-violet text-white font-bold' 
                    : cell?.isHigh 
                      ? 'bg-brand-violet/20 text-brand-violet hover:bg-brand-violet/30' 
                      : cell?.isMedium 
                        ? 'bg-brand-cyan/20 text-brand-cyan hover:bg-brand-cyan/30'
                        : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                  }
                `}
                onMouseEnter={() => cell && setHoveredCell(index)}
                onMouseLeave={() => setHoveredCell(null)}
                whileHover={cell ? { scale: 1.05 } : {}}
                whileTap={cell ? { scale: 0.95 } : {}}
              >
                {cell?.day}
                
                {/* Tooltip */}
                <AnimatePresence>
                  {hoveredCell === index && cell && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 z-20"
                    >
                      <div className="bg-popover border rounded-lg px-3 py-2 shadow-lg text-xs whitespace-nowrap">
                        <div className="font-medium">
                          {formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), cell.day))}
                        </div>
                        <div className="text-muted-foreground">
                          Engagement: {Math.round(cell.engagement)}%
                        </div>
                        {cell.isPrimeDay && (
                          <div className="text-brand-violet font-medium">
                            Prime Day
                          </div>
                        )}
                        {/* Tooltip arrow */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2">
                          <div className="border-4 border-transparent border-b-popover" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-brand-violet/20" />
            <span className="text-muted-foreground">High engagement</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-brand-cyan/20" />
            <span className="text-muted-foreground">Medium engagement</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-muted/50" />
            <span className="text-muted-foreground">Low engagement</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}


