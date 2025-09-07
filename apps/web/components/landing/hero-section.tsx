"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { copy } from '@/content/copy'
import { PlayfulModeToggle } from './playful-mode-toggle'
import { CursorTrail } from './cursor-trail'

export function HeroSection() {
  const [playfulMode, setPlayfulMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('playful-mode')
    if (stored) {
      setPlayfulMode(JSON.parse(stored))
    }
  }, [])

  const togglePlayfulMode = () => {
    const newMode = !playfulMode
    setPlayfulMode(newMode)
    localStorage.setItem('playful-mode', JSON.stringify(newMode))
  }

  if (!mounted) return null

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with grain and parallax */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/5" />
      <div className="absolute inset-0 bg-grain opacity-[0.015]" />
      
      {/* Playful mode cursor trail */}
      {playfulMode && <CursorTrail />}
      
      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-brand-gradient opacity-10 blur-xl"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full bg-brand-violet/20 blur-xl"
        animate={{
          y: [0, 15, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Headline with hover effect */}
          <motion.h1
            className="font-hero text-hero gradient-text mb-6 leading-[0.85] tracking-tight cursor-default select-none"
            whileHover={{
              scale: 1.02,
              rotateX: 2,
              rotateY: 1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {copy.hero.headline}
          </motion.h1>
          
          {/* Subheadline */}
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto font-display"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {copy.hero.subheadline}
          </motion.p>
          
          {/* Description */}
          <motion.p
            className="text-lg text-muted-foreground/80 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {copy.hero.description}
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              size="xl"
              variant="gradient"
              className="group relative overflow-hidden"
              onClick={() => window.location.href = '/onboarding'}
            >
              <span className="relative z-10">{copy.hero.cta.primary}</span>
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
            </Button>
            
            <Button
              size="xl"
              variant="outline"
              className="hover:bg-accent/50 transition-all duration-200"
            >
              {copy.hero.cta.secondary}
            </Button>
            
            <Button
              size="xl"
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
            >
              {copy.hero.cta.tertiary}
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Playful mode toggle */}
      <div className="absolute bottom-8 right-8">
        <PlayfulModeToggle 
          enabled={playfulMode} 
          onToggle={togglePlayfulMode}
        />
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-muted-foreground/50 to-transparent" />
      </motion.div>
    </section>
  )
}


