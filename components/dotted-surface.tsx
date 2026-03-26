"use client"

import { useEffect, useRef } from "react"

interface DottedSurfaceProps {
  className?: string
  dotColor?: string
  dotSize?: number
  gap?: number
}

export function DottedSurface({
  className = "",
  dotColor = "rgba(0, 180, 180, 0.3)",
  dotSize = 2,
  gap = 24,
}: DottedSurfaceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    const draw = () => {
      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)

      const cols = Math.ceil(rect.width / gap)
      const rows = Math.ceil(rect.height / gap)
      const { x: mouseX, y: mouseY } = mouseRef.current

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = i * gap
          const y = j * gap
          
          // Calculate distance from mouse
          const dx = x - mouseX
          const dy = y - mouseY
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 150
          
          // Scale and opacity based on distance
          const influence = Math.max(0, 1 - distance / maxDistance)
          const scale = 1 + influence * 2
          const opacity = 0.3 + influence * 0.7

          ctx.beginPath()
          ctx.arc(x, y, dotSize * scale, 0, Math.PI * 2)
          ctx.fillStyle = dotColor.replace(/[\d.]+\)$/, `${opacity})`)
          ctx.fill()
        }
      }

      animationRef.current = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener("resize", resize)
    canvas.addEventListener("mousemove", handleMouseMove)
    draw()

    return () => {
      window.removeEventListener("resize", resize)
      canvas.removeEventListener("mousemove", handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [dotColor, dotSize, gap])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-auto ${className}`}
      style={{ width: "100%", height: "100%" }}
    />
  )
}
