"use client"

import { motion } from "framer-motion"

interface NeonTextProps {
  text: string
  className?: string
}

export function NeonText({ text, className = "" }: NeonTextProps) {
  return (
    <motion.span
      className={`relative inline-block ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Base text */}
      <span className="relative z-10">{text}</span>
      
      {/* Glow layers */}
      <motion.span
        className="absolute inset-0 text-secondary blur-[2px] opacity-80"
        animate={{
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute inset-0 text-secondary blur-[8px] opacity-50"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.1,
        }}
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute inset-0 text-secondary blur-[20px] opacity-30"
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2,
        }}
      >
        {text}
      </motion.span>
    </motion.span>
  )
}

export function GlitchText({ text, className = "" }: NeonTextProps) {
  return (
    <motion.span
      className={`relative inline-block ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <span className="relative z-10">{text}</span>
      
      {/* Glitch layers */}
      <motion.span
        className="absolute inset-0 text-secondary"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)" }}
        animate={{
          x: [-2, 2, -2],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatDelay: 3,
        }}
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute inset-0 text-primary"
        style={{ clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)" }}
        animate={{
          x: [2, -2, 2],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatDelay: 3,
          delay: 0.1,
        }}
      >
        {text}
      </motion.span>
    </motion.span>
  )
}
