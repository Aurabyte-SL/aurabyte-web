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
    glow: "shadow-[0_0_20px_rgba(160,255,122,0.25),0_0_40px_rgba(160,255,122,0.15),0_0_60px_rgba(160,255,122,0.05)]",
    hoverGlow: "hover:shadow-[0_0_30px_rgba(160,255,122,0.3),0_0_60px_rgba(160,255,122,0.2),0_0_90px_rgba(160,255,122,0.1)]",
    border: "border-[#A0FF7A]",
    text: "text-[#A0FF7A]",
    bg: "bg-[#A0FF7A]/10",
    gradient: "from-[#A0FF7A] to-[#118E58]",
  },
  purple: {
    glow: "shadow-[0_0_20px_rgba(141,59,255,0.25),0_0_40px_rgba(141,59,255,0.15),0_0_60px_rgba(141,59,255,0.05)]",
    hoverGlow: "hover:shadow-[0_0_30px_rgba(141,59,255,0.3),0_0_60px_rgba(141,59,255,0.2),0_0_90px_rgba(141,59,255,0.1)]",
    border: "border-[#8D3BFF]",
    text: "text-[#8D3BFF]",
    bg: "bg-[#8D3BFF]/10",
    gradient: "from-[#8D3BFF] to-[#118E58]",
  },
  pink: {
    glow: "shadow-[0_0_20px_rgba(244,114,182,0.25),0_0_40px_rgba(244,114,182,0.15),0_0_60px_rgba(244,114,182,0.05)]",
    hoverGlow: "hover:shadow-[0_0_30px_rgba(244,114,182,0.3),0_0_60px_rgba(244,114,182,0.2),0_0_90px_rgba(244,114,182,0.1)]",
    border: "border-pink-400",
    text: "text-pink-400",
    bg: "bg-pink-400/10",
    gradient: "from-pink-400 to-pink-500",
  },
  green: {
    glow: "shadow-[0_0_20px_rgba(17,142,88,0.25),0_0_40px_rgba(17,142,88,0.15),0_0_60px_rgba(17,142,88,0.05)]",
    hoverGlow: "hover:shadow-[0_0_30px_rgba(17,142,88,0.3),0_0_60px_rgba(17,142,88,0.2),0_0_90px_rgba(17,142,88,0.1)]",
    border: "border-[#118E58]",
    text: "text-[#118E58]",
    bg: "bg-[#118E58]/10",
    gradient: "from-[#118E58] to-[#A0FF7A]",
  },
  orange: {
    glow: "shadow-[0_0_20px_rgba(251,146,60,0.25),0_0_40px_rgba(251,146,60,0.15),0_0_60px_rgba(251,146,60,0.05)]",
    hoverGlow: "hover:shadow-[0_0_30px_rgba(251,146,60,0.3),0_0_60px_rgba(251,146,60,0.2),0_0_90px_rgba(251,146,60,0.1)]",
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
