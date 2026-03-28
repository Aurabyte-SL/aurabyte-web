"use client"

import { motion } from "framer-motion"

export function AnimatedBuildingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Left flowing shape (Morphs between sharp and organic) */}
      <motion.div
        className="absolute border border-primary/30 bg-gradient-to-br from-primary/10 to-transparent backdrop-blur-md"
        style={{ left: "-5%", top: "25%", width: "25%", height: "55%" }}
        animate={{
          borderRadius: ["0%", "40% 60% 80% 20%", "20% 80% 60% 40%", "0%"],
          rotate: [0, 15, -15, 0],
          y: [0, -30, 30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Right flowing shape (Morphs between organic and sharp) */}
      <motion.div
        className="absolute border border-accent/20 bg-gradient-to-bl from-accent/10 to-transparent backdrop-blur-md"
        style={{ right: "-5%", top: "10%", width: "30%", height: "70%" }}
        animate={{
          borderRadius: ["60% 40% 20% 80%", "0%", "40% 60% 80% 20%", "60% 40% 20% 80%"],
          rotate: [0, -10, 10, 0],
          y: [0, 40, -40, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Bottom flowing shape (Building foundation metaphor) */}
      <motion.div
        className="absolute border-t border-secondary/30 bg-gradient-to-t from-secondary/10 to-transparent backdrop-blur-md"
        style={{ left: "10%", bottom: "-10%", width: "80%", height: "35%" }}
        animate={{
          borderRadius: ["30% 70% 0% 0%", "0% 0% 0% 0%", "70% 30% 0% 0%", "30% 70% 0% 0%"],
          scaleY: [1, 1.15, 0.95, 1],
          x: [0, 20, -20, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Additional smaller geometry: Cube to Circle to signify transformation */}
      <motion.div
        className="absolute w-32 h-32 border border-primary/40 bg-gradient-to-tr from-primary/20 to-transparent backdrop-blur-lg"
        style={{ right: "18%", top: "35%" }}
        animate={{
          borderRadius: ["0%", "50%", "25%", "0%"],
          rotate: [0, 90, 180, 270, 360],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Additional smaller geometry: Circle to Cube */}
      <motion.div
        className="absolute w-24 h-24 border border-secondary/40 bg-gradient-to-tl from-secondary/20 to-transparent backdrop-blur-lg"
        style={{ left: "15%", bottom: "25%" }}
        animate={{
          borderRadius: ["50%", "0%", "50%"],
          rotate: [360, 180, 0],
          scale: [1, 0.8, 1.2, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Innovation sparks (floating tech dots) */}
      <motion.div
        className="absolute w-3 h-3 rounded-full bg-accent shadow-[0_0_15px_rgba(160,255,122,0.8)]"
        style={{ left: "30%", top: "40%" }}
        animate={{
          y: [0, -80, 40, 0],
          x: [0, 60, -40, 0],
          opacity: [0.3, 1, 0.3],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-primary shadow-[0_0_15px_rgba(141,59,255,0.8)]"
        style={{ right: "35%", bottom: "40%" }}
        animate={{
          y: [0, 60, -60, 0],
          x: [0, -40, 40, 0],
          opacity: [0.4, 1, 0.4],
          scale: [1, 2, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}
