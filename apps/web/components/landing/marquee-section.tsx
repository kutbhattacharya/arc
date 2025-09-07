"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'

const MARQUEE_ITEMS = [
  "Decode comments",
  "Find your hook", 
  "Invest where it hits",
  "Prime time posting",
  "Turn noise into signal",
  "Creator-first analytics",
  "ROAS that makes sense",
  "Trend before trends"
]

export function MarqueeSection() {
  const [isPaused, setIsPaused] = useState(false)

  return (
    <section className="py-16 overflow-hidden border-y border-border/50 bg-muted/30">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{
          x: isPaused ? 0 : "-50%"
        }}
        transition={{
          duration: isPaused ? 0 : 30,
          ease: "linear",
          repeat: isPaused ? 0 : Infinity,
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* First set of items */}
        {MARQUEE_ITEMS.map((item, index) => (
          <motion.div
            key={`first-${index}`}
            className="flex items-center gap-8"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-4xl md:text-6xl font-display font-bold text-muted-foreground/60 hover:text-foreground transition-colors duration-300 cursor-default">
              {item}
            </span>
            <div className="w-2 h-2 rounded-full bg-brand-violet/60" />
          </motion.div>
        ))}
        
        {/* Duplicate set for seamless loop */}
        {MARQUEE_ITEMS.map((item, index) => (
          <motion.div
            key={`second-${index}`}
            className="flex items-center gap-8"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-4xl md:text-6xl font-display font-bold text-muted-foreground/60 hover:text-foreground transition-colors duration-300 cursor-default">
              {item}
            </span>
            <div className="w-2 h-2 rounded-full bg-brand-violet/60" />
          </motion.div>
        ))}
      </motion.div>
      
      {/* Pause indicator */}
      {isPaused && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="text-center mt-4"
        >
          <span className="text-xs text-muted-foreground bg-background px-3 py-1 rounded-full border">
            Paused - move cursor to resume
          </span>
        </motion.div>
      )}
    </section>
  )
}


