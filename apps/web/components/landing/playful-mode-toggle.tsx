"use client"

import { motion } from 'framer-motion'
import { Sparkles, SparklesIcon } from 'lucide-react'

interface PlayfulModeToggleProps {
  enabled: boolean
  onToggle: () => void
}

export function PlayfulModeToggle({ enabled, onToggle }: PlayfulModeToggleProps) {
  return (
    <motion.button
      onClick={onToggle}
      className={`
        relative flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300
        ${enabled 
          ? 'bg-brand-gradient text-white border-transparent shadow-glow' 
          : 'bg-background border-border hover:border-brand-violet/50'
        }
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
    >
      <motion.div
        animate={{ rotate: enabled ? 360 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <Sparkles className="w-4 h-4" />
      </motion.div>
      
      <span className="text-sm font-medium">
        Playful mode
      </span>
      
      {enabled && (
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(139, 92, 246, 0.4)',
              '0 0 0 10px rgba(139, 92, 246, 0)',
              '0 0 0 0 rgba(139, 92, 246, 0)'
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.button>
  )
}


