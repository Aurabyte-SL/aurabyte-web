"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { Globe, Smartphone, BarChart3, Gamepad2, Cpu, Palette } from "lucide-react"

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description: "Custom websites and web applications built with modern frameworks, optimized for performance and scalability.",
    gradient: "from-teal-500/20 to-cyan-500/20",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Native and cross-platform mobile applications for iOS and Android that deliver exceptional user experiences.",
    gradient: "from-blue-500/20 to-indigo-500/20",
  },
  {
    icon: BarChart3,
    title: "Consults & Maintenance",
    description: "Strategic technical consulting and proactive maintenance to keep your digital assets secure and performing at their best.",
    gradient: "from-emerald-500/20 to-green-500/20",
  },
  {
    icon: Gamepad2,
    title: "Game Development",
    description: "Immersive gaming experiences across platforms, from casual mobile games to complex multiplayer environments.",
    gradient: "from-pink-500/20 to-rose-500/20",
  },
  {
    icon: Cpu,
    title: "AI Agents",
    description: "Custom AI agents and autonomous workflows designed to handle complex tasks, optimize operations, and scale your business intelligence.",
    gradient: "from-amber-500/20 to-orange-500/20",
  },
  {
    icon: Palette,
    title: "Product Design",
    description: "User-centric design that blends aesthetics with functionality to create intuitive and engaging digital products.",
    gradient: "from-pink-500/20 to-rose-500/20",
  },
]

function AnimatedCard({ service, index }: { service: typeof services[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative group"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Glow effect */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: isHovering
            ? `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 180, 180, 0.15), transparent 40%)`
            : "none",
        }}
      />

      {/* Card */}
      <div className={`relative h-full rounded-2xl border border-border bg-gradient-to-br ${service.gradient} backdrop-blur-sm p-8 overflow-hidden transition-all duration-300 hover:border-accent/50`}>
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={`grid-${index}`} width="32" height="32" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="currentColor" className="text-foreground/20" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#grid-${index})`} />
          </svg>
        </div>

        {/* Icon container with animation */}
        <motion.div
          className="relative z-10 flex h-14 w-14 items-center justify-center rounded-xl bg-background/50 border border-border mb-6"
          whileHover={{ rotate: 5, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <service.icon className="h-7 w-7 text-accent" />
        </motion.div>

        <h3 className="relative z-10 text-xl font-semibold mb-3">{service.title}</h3>
        <p className="relative z-10 text-muted-foreground leading-relaxed">{service.description}</p>

        {/* Hover arrow */}
        <motion.div
          className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100"
          initial={{ x: -10, opacity: 0 }}
          whileHover={{ x: 0, opacity: 1 }}
        >
          <span className="text-accent text-2xl">&rarr;</span>
        </motion.div>
      </div>
    </motion.div>
  )
}

export function AnimatedCards() {
  return (
    <section id="services" className="py-24 lg:py-32 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center mb-16"
        >
          <p className="text-sm font-medium uppercase tracking-wider text-accent">What we do</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Our collection of tech services spans every stage of transformation.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Explore how we help businesses transform through innovative technology solutions.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <AnimatedCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
