"use client"

import { useEffect, useId, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SparkleType {
  id: string
  x: string
  y: string
  color: string
  delay: number
  scale: number
  lifespan: number
}

export const SparklesCore = ({
  id,
  background,
  minSize,
  maxSize,
  speed,
  particleColor,
  particleDensity,
  className,
}: {
  id?: string
  background?: string
  minSize?: number
  maxSize?: number
  speed?: number
  particleColor?: string
  particleDensity?: number
  className?: string
}) => {
  const [sparkles, setSparkles] = useState<SparkleType[]>([])
  const generatedId = useId()

  useEffect(() => {
    const generateSparkle = (): SparkleType => {
      return {
        id: Math.random().toString(36).slice(2),
        x: Math.random() * 100 + "%",
        y: Math.random() * 100 + "%",
        color: particleColor || "#FFF",
        delay: Math.random() * 2,
        scale: Math.random() * ((maxSize || 2) - (minSize || 1)) + (minSize || 1),
        lifespan: Math.random() * 10 + 5,
      }
    }

    const initialSparkles = Array.from(
      { length: particleDensity || 50 },
      generateSparkle
    )
    setSparkles(initialSparkles)

    const interval = setInterval(() => {
      setSparkles((prev) => {
        const newSparkles = prev.map((sparkle) => {
          if (Math.random() > 0.7) {
            return generateSparkle()
          }
          return sparkle
        })
        return newSparkles
      })
    }, (speed || 1) * 1000)

    return () => clearInterval(interval)
  }, [maxSize, minSize, particleColor, particleDensity, speed])

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none",
        className
      )}
      style={{ background: background || "transparent" }}
    >
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        id={id || generatedId}
      >
        <defs>
          <filter id={`glow-${id || generatedId}`}>
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {sparkles.map((sparkle) => (
          <motion.circle
            key={sparkle.id}
            cx={sparkle.x}
            cy={sparkle.y}
            r={sparkle.scale}
            fill={sparkle.color}
            filter={`url(#glow-${id || generatedId})`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, sparkle.scale, 0],
            }}
            transition={{
              duration: sparkle.lifespan / 10,
              delay: sparkle.delay,
              repeat: Infinity,
              repeatDelay: Math.random() * 2,
            }}
          />
        ))}
      </svg>
    </div>
  )
}

export function SparklesSection({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("relative w-full", className)}>
      <SparklesCore
        id="sparkles"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={100}
        particleColor="#A0FF7A"
        speed={2}
      />
      {children}
    </div>
  )
}
