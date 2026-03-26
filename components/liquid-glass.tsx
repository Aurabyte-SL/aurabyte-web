"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"

interface LiquidGlassProps {
  children: React.ReactNode
  className?: string
  intensity?: number
}

export function LiquidGlass({ children, className = "", intensity = 1 }: LiquidGlassProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      setMousePosition({ x, y })
    }

    container.addEventListener("mousemove", handleMouseMove)
    return () => container.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const gradientX = mousePosition.x * 100
  const gradientY = mousePosition.y * 100
  const rotateX = (mousePosition.y - 0.5) * 10 * intensity
  const rotateY = (mousePosition.x - 0.5) * -10 * intensity

  return (
    <motion.div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      animate={{
        rotateX: isHovering ? rotateX : 0,
        rotateY: isHovering ? rotateY : 0,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
    >
      {/* Glass background layers */}
      <div 
        className="absolute inset-0 rounded-2xl"
        style={{
          background: `
            radial-gradient(
              circle at ${gradientX}% ${gradientY}%, 
              rgba(255, 255, 255, 0.15) 0%, 
              rgba(255, 255, 255, 0.05) 40%,
              transparent 70%
            )
          `,
          transition: "background 0.1s ease-out",
        }}
      />
      
      {/* Refraction layer */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-50"
        style={{
          background: `
            linear-gradient(
              ${135 + (mousePosition.x - 0.5) * 30}deg,
              rgba(100, 200, 200, 0.1) 0%,
              transparent 50%,
              rgba(200, 100, 200, 0.1) 100%
            )
          `,
        }}
      />

      {/* Blur overlay */}
      <div 
        className="absolute inset-0 rounded-2xl backdrop-blur-xl"
        style={{
          background: "rgba(255, 255, 255, 0.03)",
          boxShadow: `
            inset 0 0 0 1px rgba(255, 255, 255, 0.1),
            0 25px 50px -12px rgba(0, 0, 0, 0.4)
          `,
        }}
      />

      {/* Highlight streak */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{
          background: isHovering 
            ? `linear-gradient(
                ${90 + (mousePosition.x - 0.5) * 60}deg,
                transparent 0%,
                rgba(255, 255, 255, 0.1) ${45 + (mousePosition.y - 0.5) * 10}%,
                transparent ${55 + (mousePosition.y - 0.5) * 10}%
              )`
            : "transparent"
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}

export function LiquidGlassCard({ 
  title, 
  description, 
  icon,
  className = ""
}: { 
  title: string
  description: string
  icon: React.ReactNode
  className?: string
}) {
  return (
    <LiquidGlass className={`p-6 rounded-2xl border border-white/10 ${className}`}>
      <div className="flex flex-col gap-4">
        <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </LiquidGlass>
  )
}
