"use client"

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface TrailPoint {
  x: number
  y: number
  opacity: number
}

export function CursorTrail() {
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  
  const springX = useSpring(cursorX, { stiffness: 100, damping: 20 })
  const springY = useSpring(cursorY, { stiffness: 100, damping: 20 })
  
  const trailRef = useRef<TrailPoint[]>([])
  const animationRef = useRef<number>()

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const animate = () => {
      // Add current cursor position to trail
      const currentX = springX.get()
      const currentY = springY.get()
      
      trailRef.current.unshift({ x: currentX, y: currentY, opacity: 1 })
      
      // Limit trail length and fade out points
      trailRef.current = trailRef.current
        .slice(0, 20)
        .map((point, index) => ({
          ...point,
          opacity: Math.max(0, 1 - index * 0.1)
        }))
      
      animationRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', updateMousePosition)
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [cursorX, cursorY, springX, springY])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {trailRef.current.map((point, index) => (
        <motion.div
          key={`${point.x}-${point.y}-${index}`}
          className="absolute w-2 h-2 rounded-full bg-brand-gradient"
          style={{
            left: point.x - 4,
            top: point.y - 4,
            opacity: point.opacity,
          }}
          initial={{ scale: 1 }}
          animate={{ scale: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
    </div>
  )
}


