"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"

const categories = ["All", "Web", "Mobile", "Analytics", "Games"]

const projects = [
  {
    title: "FinanceFlow",
    category: "Web",
    description: "A comprehensive financial dashboard for enterprise clients",
    image: "/placeholder-project-1.jpg",
    tags: ["React", "Node.js", "PostgreSQL"],
  },
  {
    title: "HealthTrack Pro",
    category: "Mobile",
    description: "Cross-platform health monitoring application",
    image: "/placeholder-project-2.jpg",
    tags: ["React Native", "Firebase", "ML Kit"],
  },
  {
    title: "DataVision Analytics",
    category: "Analytics",
    description: "Real-time analytics platform for e-commerce",
    image: "/placeholder-project-3.jpg",
    tags: ["Python", "TensorFlow", "AWS"],
  },
  {
    title: "Cosmic Quest",
    category: "Games",
    description: "Multiplayer space exploration game",
    image: "/placeholder-project-4.jpg",
    tags: ["Unity", "C#", "Photon"],
  },
  {
    title: "EcoMarket",
    category: "Web",
    description: "Sustainable products marketplace platform",
    image: "/placeholder-project-5.jpg",
    tags: ["Next.js", "Stripe", "Supabase"],
  },
  {
    title: "FleetMaster",
    category: "Mobile",
    description: "Fleet management and logistics solution",
    image: "/placeholder-project-6.jpg",
    tags: ["Flutter", "Google Maps", "IoT"],
  },
]

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory)

  return (
    <section id="portfolio" className="py-24 lg:py-32 bg-gray-600/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-accent">Our Work</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Projects that showcase our expertise.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Explore our portfolio of successful projects across various industries and technologies.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className={
                activeCategory === category
                  ? "bg-foreground text-background"
                  : "border-border hover:bg-secondary"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div
              key={project.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-accent/50"
            >
              <div className="aspect-video bg-secondary relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold text-foreground/10">{project.title[0]}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wider text-accent">
                    {project.category}
                  </span>
                  <button className="p-2 rounded-full bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors">
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
                <h3 className="mt-2 text-xl font-semibold">{project.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" className="border-border hover:bg-secondary">
            View all projects
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
