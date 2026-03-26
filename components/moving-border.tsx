"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export const MovingBorder = ({
  children,
  duration = 2000,
  rx,
  ry,
  className,
  containerClassName,
  borderClassName,
  as: Component = "button",
  ...otherProps
}: {
  children: React.ReactNode
  duration?: number
  rx?: string
  ry?: string
  className?: string
  containerClassName?: string
  borderClassName?: string
  as?: React.ElementType
  [key: string]: unknown
}) => {
  return (
    <Component
      className={cn(
        "relative h-16 w-40 overflow-hidden bg-transparent p-[1px] text-xl",
        containerClassName
      )}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: rx || "1rem" }}
      >
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{
            duration: duration / 1000,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            inset: "-100%",
            background: `conic-gradient(from 0deg, transparent 0%, var(--accent) 20%, transparent 40%)`,
          }}
        />
      </div>
      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center bg-background text-foreground antialiased backdrop-blur-xl",
          className
        )}
        style={{ borderRadius: `calc(${rx || "1rem"} * 0.96)` }}
      >
        {children}
      </div>
    </Component>
  )
}

export function MovingBorderButton({
  children,
  className,
  ...props
}: {
  children: React.ReactNode
  className?: string
  [key: string]: unknown
}) {
  return (
    <MovingBorder
      duration={3000}
      rx="0.5rem"
      className={cn("px-6 py-2 font-medium", className)}
      {...props}
    >
      {children}
    </MovingBorder>
  )
}
