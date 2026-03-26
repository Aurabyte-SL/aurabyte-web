"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export const BackgroundBeams = ({ className }: { className?: string }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className={cn("fixed inset-0 pointer-events-none z-0", className)}>
      <svg
        className="absolute inset-0 w-full h-full opacity-50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
          <filter id="beam-blur">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.line
            key={i}
            x1={`${(i + 1) * 12}%`}
            y1="0"
            x2={`${mousePosition.x * 0.02 + (i + 1) * 10}%`}
            y2="100%"
            stroke="url(#beam-gradient)"
            strokeWidth="1"
            filter="url(#beam-blur)"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              x1: [`${(i + 1) * 12}%`, `${(i + 1) * 12 + 2}%`, `${(i + 1) * 12}%`],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  )
}

export const BackgroundBeamsWithCollision = ({
  className,
}: {
  className?: string
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [beams, setBeams] = useState<Array<{
    id: number
    x: number
    delay: number
    duration: number
    height: number
  }>>([])

  useEffect(() => {
    const newBeams = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 4 + Math.random() * 4,
      height: 100 + Math.random() * 200,
    }))
    setBeams(newBeams)
  }, [])

  return (
    <div ref={containerRef} className={cn("absolute inset-0 overflow-hidden", className)}>
      {beams.map((beam) => (
        <motion.div
          key={beam.id}
          className="absolute w-px bg-gradient-to-b from-transparent via-accent to-transparent"
          style={{
            left: `${beam.x}%`,
            height: beam.height,
          }}
          initial={{ y: -200, opacity: 0 }}
          animate={{
            y: ["0%", "100%"],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: beam.duration,
            delay: beam.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
    </div>
  )
}
