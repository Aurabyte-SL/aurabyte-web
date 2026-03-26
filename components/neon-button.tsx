"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface NeonButtonProps {
  children: React.ReactNode
  className?: string
  color?: "cyan" | "purple" | "pink" | "green" | "orange"
  size?: "sm" | "md" | "lg"
  onClick?: () => void
  href?: string
}

const colorMap = {
  cyan: {
    glow: "shadow-[0_0_20px_rgba(34,211,238,0.5),0_0_40px_rgba(34,211,238,0.3),0_0_60px_rgba(34,211,238,0.1)]",
    hoverGlow: "hover:shadow-[0_0_30px_rgba(34,211,238,0.6),0_0_60px_rgba(34,211,238,0.4),0_0_90px_rgba(34,211,238,0.2)]",
    border: "border-cyan-400",
    text: "text-cyan-400",
    bg: "bg-cyan-400/10",
    gradient: "from-cyan-400 to-cyan-500",
  },
  purple: {
    glow: "shadow-[0_0_20px_rgba(168,85,247,0.5),0_0_40px_rgba(168,85,247,0.3),0_0_60px_rgba(168,85,247,0.1)]",
    hoverGlow: "hover:shadow-[0_0_30px_rgba(168,85,247,0.6),0_0_60px_rgba(168,85,247,0.4),0_0_90px_rgba(168,85,247,0.2)]",
    border: "border-purple-400",
    text: "text-purple-400",
    bg: "bg-purple-400/10",
    gradient: "from-purple-400 to-purple-500",
  },
  pink: {
    glow: "shadow-[0_0_20px_rgba(244,114,182,0.5),0_0_40px_rgba(244,114,182,0.3),0_0_60px_rgba(244,114,182,0.1)]",
    hoverGlow: "hover:shadow-[0_0_30px_rgba(244,114,182,0.6),0_0_60px_rgba(244,114,182,0.4),0_0_90px_rgba(244,114,182,0.2)]",
    border: "border-pink-400",
    text: "text-pink-400",
    bg: "bg-pink-400/10",
    gradient: "from-pink-400 to-pink-500",
  },
  green: {
    glow: "shadow-[0_0_20px_rgba(74,222,128,0.5),0_0_40px_rgba(74,222,128,0.3),0_0_60px_rgba(74,222,128,0.1)]",
    hoverGlow: "hover:shadow-[0_0_30px_rgba(74,222,128,0.6),0_0_60px_rgba(74,222,128,0.4),0_0_90px_rgba(74,222,128,0.2)]",
    border: "border-green-400",
    text: "text-green-400",
    bg: "bg-green-400/10",
    gradient: "from-green-400 to-green-500",
  },
  orange: {
    glow: "shadow-[0_0_20px_rgba(251,146,60,0.5),0_0_40px_rgba(251,146,60,0.3),0_0_60px_rgba(251,146,60,0.1)]",
    hoverGlow: "hover:shadow-[0_0_30px_rgba(251,146,60,0.6),0_0_60px_rgba(251,146,60,0.4),0_0_90px_rgba(251,146,60,0.2)]",
    border: "border-orange-400",
    text: "text-orange-400",
    bg: "bg-orange-400/10",
    gradient: "from-orange-400 to-orange-500",
  },
}

const sizeMap = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
}

export function NeonButton({ 
  children, 
  className, 
  color = "cyan", 
  size = "md",
  onClick,
  href
}: NeonButtonProps) {
  const colors = colorMap[color]
  const sizeClass = sizeMap[size]

  const buttonContent = (
    <motion.span
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-full font-medium",
        "border-2 transition-all duration-300",
        colors.border,
        colors.text,
        colors.bg,
        colors.glow,
        colors.hoverGlow,
        sizeClass,
        "overflow-hidden group",
        className
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Animated background gradient */}
      <motion.span
        className={cn(
          "absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-300",
          colors.gradient
        )}
      />
      
      {/* Shine effect */}
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute -left-full top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:left-full transition-all duration-700" />
      </span>

      {/* Pulse ring */}
      <span 
        className={cn(
          "absolute inset-0 rounded-full opacity-0 group-hover:opacity-100",
          "animate-ping border",
          colors.border
        )} 
        style={{ animationDuration: "1.5s" }}
      />

      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </motion.span>
  )

  if (href) {
    return (
      <a href={href} onClick={onClick}>
        {buttonContent}
      </a>
    )
  }

  return (
    <button onClick={onClick} className="focus:outline-none">
      {buttonContent}
    </button>
  )
}

export function NeonButtonGroup() {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-center">
      <NeonButton color="cyan" size="lg">Get Started</NeonButton>
      <NeonButton color="purple">Learn More</NeonButton>
      <NeonButton color="pink" size="sm">Contact Us</NeonButton>
      <NeonButton color="green">View Demo</NeonButton>
      <NeonButton color="orange">Subscribe</NeonButton>
    </div>
  )
}
