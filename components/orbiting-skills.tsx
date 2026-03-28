"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { 
  Globe, Smartphone, BarChart3, Gamepad2, Brain, Cloud,
  Code2, Database, Palette, Shield, Zap, Users
} from "lucide-react"
import { DottedSurface } from "./dotted-surface"

interface Skill {
  name: string
  icon: React.ElementType
  color: string
  orbit: number
  speed: number
  startAngle: number
}

const skills: Skill[] = [
  { name: "Web Dev", icon: Globe, color: "#22d3ee", orbit: 1, speed: 30, startAngle: 0 },
  { name: "Mobile", icon: Smartphone, color: "#a855f7", orbit: 1, speed: 30, startAngle: 120 },
  { name: "Analytics", icon: BarChart3, color: "#22c55e", orbit: 1, speed: 30, startAngle: 240 },
  { name: "Gaming", icon: Gamepad2, color: "#f97316", orbit: 2, speed: 25, startAngle: 45 },
  { name: "AI/ML", icon: Brain, color: "#ec4899", orbit: 2, speed: 25, startAngle: 135 },
  { name: "Cloud", icon: Cloud, color: "#3b82f6", orbit: 2, speed: 25, startAngle: 225 },
  { name: "DevOps", icon: Code2, color: "#eab308", orbit: 2, speed: 25, startAngle: 315 },
  { name: "Database", icon: Database, color: "#14b8a6", orbit: 3, speed: 20, startAngle: 30 },
  { name: "UI/UX", icon: Palette, color: "#f43f5e", orbit: 3, speed: 20, startAngle: 90 },
  { name: "Security", icon: Shield, color: "#6366f1", orbit: 3, speed: 20, startAngle: 150 },
  { name: "Performance", icon: Zap, color: "#facc15", orbit: 3, speed: 20, startAngle: 210 },
  { name: "Consulting", icon: Users, color: "#8b5cf6", orbit: 3, speed: 20, startAngle: 270 },
]

function OrbitingSkill({ skill, orbitRadius }: { skill: Skill; orbitRadius: number }) {
  const Icon = skill.icon
  
  return (
    <motion.div
      className="absolute"
      style={{
        width: orbitRadius * 2,
        height: orbitRadius * 2,
        left: "50%",
        top: "50%",
        marginLeft: -orbitRadius,
        marginTop: -orbitRadius,
      }}
      animate={{ rotate: 360 }}
      transition={{
        duration: skill.speed,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <motion.div
        className="absolute flex flex-col items-center gap-1 group cursor-pointer"
        style={{
          left: "50%",
          top: 0,
          transform: `rotate(${skill.startAngle}deg) translateY(-${orbitRadius}px) rotate(-${skill.startAngle}deg)`,
          transformOrigin: "center",
        }}
        whileHover={{ scale: 1.2 }}
      >
        {/* Counter-rotate to keep icons upright */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: skill.speed,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex flex-col items-center gap-1"
        >
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all duration-300 group-hover:border-white/40"
            style={{ 
              backgroundColor: `${skill.color}20`,
              boxShadow: `0 0 20px ${skill.color}40`,
            }}
          >
            <Icon className="w-6 h-6" style={{ color: skill.color }} />
          </div>
          <span 
            className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
            style={{ color: skill.color }}
          >
            {skill.name}
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export function OrbitingSkills() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 600, height: 600 })

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = Math.min(containerRef.current.offsetWidth, 600)
        setDimensions({ width, height: width })
      }
    }
    
    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  const baseRadius = dimensions.width / 2
  const orbitRadii = [
    baseRadius * 0.35,
    baseRadius * 0.55,
    baseRadius * 0.75,
  ]

  return (
    <section className="py-24 relative overflow-hidden bg-transparent">
      <DottedSurface className="opacity-20" />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-accent text-sm font-medium tracking-wider uppercase">Our Skills</span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-2">
            Technologies We Master
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            A constellation of expertise orbiting around your success
          </p>
        </motion.div>

        <div 
          ref={containerRef}
          className="relative mx-auto"
          style={{ width: dimensions.width, height: dimensions.height }}
        >
          {/* Center logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <motion.div
              className="w-24 h-24 rounded-full bg-gradient-to-br from-accent/30 to-accent/10 border border-accent/50 flex items-center justify-center backdrop-blur-xl"
              animate={{ 
                boxShadow: [
                  "0 0 20px rgba(100, 200, 200, 0.3)",
                  "0 0 40px rgba(100, 200, 200, 0.5)",
                  "0 0 20px rgba(100, 200, 200, 0.3)",
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-2xl font-bold text-accent">AB</span>
            </motion.div>
          </div>

          {/* Orbit rings */}
          {orbitRadii.map((radius, index) => (
            <div
              key={index}
              className="absolute left-1/2 top-1/2 rounded-full border border-white/5"
              style={{
                width: radius * 2,
                height: radius * 2,
                marginLeft: -radius,
                marginTop: -radius,
              }}
            />
          ))}

          {/* Orbiting skills */}
          {skills.map((skill) => (
            <OrbitingSkill 
              key={skill.name} 
              skill={skill} 
              orbitRadius={orbitRadii[skill.orbit - 1]} 
            />
          ))}
        </div>
      </div>
    </section>
  )
}
