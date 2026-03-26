"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { NoiseGradientShader } from "./noise-gradient-shader"

const timelineItems = [
  {
    year: "2018",
    title: "Foundation",
    description: "Aurabyte was founded with a vision to transform digital experiences.",
  },
  {
    year: "2019",
    title: "First Major Client",
    description: "Secured our first enterprise client and expanded the team to 15 members.",
  },
  {
    year: "2020",
    title: "Global Expansion",
    description: "Opened offices in 3 countries and launched our mobile development division.",
  },
  {
    year: "2022",
    title: "AI Integration",
    description: "Pioneered AI-driven solutions for enterprise clients across industries.",
  },
  {
    year: "2024",
    title: "Industry Leader",
    description: "Recognized as a top digital transformation partner with 100+ clients globally.",
  },
  {
    year: "2026",
    title: "Future Forward",
    description: "Continuing to push boundaries with quantum computing and next-gen tech.",
  },
]

export function OrbitalTimeline() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isHovering) return
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % timelineItems.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [isHovering])

  return (
    <section id="timeline" className="py-24 lg:py-32 relative overflow-hidden">
      <NoiseGradientShader colors={["#030508", "#051015", "#001515"]} className="opacity-70" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <p className="text-sm font-medium uppercase tracking-wider text-accent">Our Journey</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            A timeline of innovation and growth
          </h2>
        </div>

        <div 
          ref={containerRef}
          className="relative flex items-center justify-center min-h-[600px]"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Orbital rings */}
          <div className="absolute w-[500px] h-[500px] rounded-full border border-border/30" />
          <div className="absolute w-[400px] h-[400px] rounded-full border border-border/20" />
          <div className="absolute w-[300px] h-[300px] rounded-full border border-border/10" />

          {/* Orbiting nodes */}
          {timelineItems.map((item, index) => {
            const angle = (index / timelineItems.length) * 360 - 90
            const radius = 250
            const x = Math.cos((angle * Math.PI) / 180) * radius
            const y = Math.sin((angle * Math.PI) / 180) * radius

            return (
              <motion.button
                key={item.year}
                className={`absolute flex items-center justify-center w-16 h-16 rounded-full border-2 transition-all duration-500 cursor-pointer ${
                  activeIndex === index
                    ? "bg-accent border-accent text-accent-foreground scale-125"
                    : "bg-card border-border text-foreground hover:border-accent/50"
                }`}
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
                onClick={() => setActiveIndex(index)}
                animate={{
                  scale: activeIndex === index ? 1.25 : 1,
                }}
                whileHover={{ scale: 1.1 }}
              >
                <span className="text-sm font-bold">{item.year}</span>
              </motion.button>
            )
          })}

          {/* Center content */}
          <div className="relative z-10 w-[280px] text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-4xl font-bold text-accent">
                  {timelineItems[activeIndex].year}
                </span>
                <h3 className="mt-2 text-xl font-semibold">
                  {timelineItems[activeIndex].title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {timelineItems[activeIndex].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Animated pulse ring */}
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full border border-accent/30"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    </section>
  )
}
