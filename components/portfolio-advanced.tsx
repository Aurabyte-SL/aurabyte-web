"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"
import { NebulaShader } from "./nebula-shader"

const categories = ["All", "Web", "Mobile", "Analytics", "Games"]

const projects = [
  {
    title: "FinanceFlow",
    category: "Web",
    description: "A comprehensive financial dashboard for enterprise clients",
    gradient: "from-blue-500/30 to-cyan-500/30",
    tags: ["React", "Node.js", "PostgreSQL"],
  },
  {
    title: "HealthTrack Pro",
    category: "Mobile",
    description: "Cross-platform health monitoring application",
    gradient: "from-emerald-500/30 to-teal-500/30",
    tags: ["React Native", "Firebase", "ML Kit"],
  },
  {
    title: "DataVision Analytics",
    category: "Analytics",
    description: "Real-time analytics platform for e-commerce",
    gradient: "from-purple-500/30 to-pink-500/30",
    tags: ["Python", "TensorFlow", "AWS"],
  },
  {
    title: "Cosmic Quest",
    category: "Games",
    description: "Multiplayer space exploration game",
    gradient: "from-orange-500/30 to-red-500/30",
    tags: ["Unity", "C#", "Photon"],
  },
  {
    title: "EcoMarket",
    category: "Web",
    description: "Sustainable products marketplace platform",
    gradient: "from-green-500/30 to-emerald-500/30",
    tags: ["Next.js", "Stripe", "Supabase"],
  },
  {
    title: "FleetMaster",
    category: "Mobile",
    description: "Fleet management and logistics solution",
    gradient: "from-indigo-500/30 to-violet-500/30",
    tags: ["Flutter", "Google Maps", "IoT"],
  },
]

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
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
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Spotlight effect */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
        style={{
          background: isHovering
            ? `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 180, 180, 0.1), transparent 40%)`
            : "none",
        }}
      />

      <div className="relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 group-hover:border-accent/50 group-hover:shadow-[0_0_40px_-10px_rgba(0,180,180,0.3)]">
        {/* Image area with gradient */}
        <div className={`aspect-video bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
          {/* Animated pattern */}
          <div className="absolute inset-0 opacity-30">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id={`grid-project-${index}`} width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="currentColor" className="text-foreground/30" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#grid-project-${index})`} />
            </svg>
          </div>

          {/* Project initial */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="text-6xl font-bold text-foreground/20 group-hover:text-foreground/40 transition-colors">
              {project.title[0]}
            </span>
          </motion.div>

          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
          />
        </div>

        <div className="p-6 relative">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-accent">
              {project.category}
            </span>
            <motion.button 
              className="p-2 rounded-full bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors"
              whileHover={{ scale: 1.1, rotate: 45 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowUpRight className="h-4 w-4" />
            </motion.button>
          </div>
          <h3 className="mt-2 text-xl font-semibold group-hover:text-accent transition-colors">{project.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-secondary/80 px-2.5 py-0.5 text-xs font-medium text-muted-foreground border border-border/50"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function PortfolioAdvanced() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory)

  return (
    <section id="portfolio" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Nebula shader background */}
      <NebulaShader className="opacity-60" />
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-medium uppercase tracking-wider text-accent">Our Work</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Projects that showcase our expertise.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Explore our portfolio of successful projects across various industries and technologies.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-wrap justify-center gap-2"
        >
          {categories.map((category) => (
            <motion.div key={category} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className={
                  activeCategory === category
                    ? "bg-accent text-accent-foreground hover:bg-accent/90"
                    : "border-border hover:bg-secondary hover:border-accent/50"
                }
              >
                {category}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Button variant="outline" size="lg" className="border-border hover:bg-secondary group">
            View all projects
            <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
