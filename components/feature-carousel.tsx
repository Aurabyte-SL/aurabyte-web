"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Globe, Smartphone, BarChart3, Gamepad2, Brain, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WarpBackground } from "./warp-background"

const features = [
  {
    id: 1,
    title: "Web Development",
    subtitle: "Crafting Digital Experiences",
    description: "We build blazing-fast, responsive websites and web applications using cutting-edge technologies like Next.js, React, and TypeScript. Our focus is on performance, accessibility, and stunning user interfaces.",
    icon: Globe,
    color: "from-cyan-500 to-blue-500",
    stats: [
      { label: "Projects Delivered", value: "150+" },
      { label: "Avg. Performance Score", value: "98" },
      { label: "Client Satisfaction", value: "99%" },
    ]
  },
  {
    id: 2,
    title: "Mobile Apps",
    subtitle: "Native & Cross-Platform",
    description: "From iOS to Android, we develop mobile applications that users love. Using React Native and Flutter, we create seamless experiences that work beautifully across all devices.",
    icon: Smartphone,
    color: "from-purple-500 to-pink-500",
    stats: [
      { label: "Apps Published", value: "80+" },
      { label: "App Store Rating", value: "4.8" },
      { label: "Total Downloads", value: "5M+" },
    ]
  },
  {
    id: 3,
    title: "Consults & Maintenance",
    subtitle: "Expert Guidance & Support",
    description: "Strategic consulting and proactive maintenance to ensure your digital infrastructure remains secure, scalable, and optimized for long-term success.",
    icon: BarChart3,
    color: "from-green-500 to-emerald-500",
    stats: [
      { label: "Systems Maintained", value: "500+" },
      { label: "Uptime guarantee", value: "99.9%" },
      { label: "Response Time", value: "<1hr" },
    ]
  },
  {
    id: 4,
    title: "Game Development",
    subtitle: "Immersive Experiences",
    description: "Creating captivating games across platforms using Unity and Unreal Engine. From casual mobile games to complex multiplayer experiences, we bring your gaming vision to life.",
    icon: Gamepad2,
    color: "from-orange-500 to-red-500",
    stats: [
      { label: "Games Released", value: "25+" },
      { label: "Active Players", value: "2M+" },
      { label: "Avg. Play Time", value: "45min" },
    ]
  },
  {
    id: 5,
    title: "AI Agents",
    subtitle: "Autonomous Workflows",
    description: "Build and deploy autonomous AI agents that handle complex tasks, optimize operations, and transform how your business operates at scale.",
    icon: Brain,
    color: "from-violet-500 to-purple-500",
    stats: [
      { label: "Agents Deployed", value: "100+" },
      { label: "Tasks Automated", value: "5M+" },
      { label: "Efficiency Gain", value: "400%" },
    ]
  },
  {
    id: 6,
    title: "Product Design",
    subtitle: "Aesthetics Meets Functionality",
    description: "User-centric design that blends aesthetics with functionality to create intuitive and engaging digital products. We focus on user research, prototyping, and high-fidelity UI design.",
    icon: Palette,
    color: "from-pink-500 to-rose-500",
    stats: [
      { label: "Designs Completed", value: "200+" },
      { label: "User Growth", value: "45%" },
      { label: "Design Awards", value: "12" },
    ]
  },
]

export function FeatureCarousel() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection)
    setCurrent((prev) => (prev + newDirection + features.length) % features.length)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => paginate(1), 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, paginate])

  const feature = features[current]
  const Icon = feature.icon

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
  }

  return (
    <section 
      className="py-24 relative overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <WarpBackground />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-medium tracking-wider uppercase">Our Expertise</span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-2">
            What We Excel At
          </h2>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {/* Main carousel */}
          <div className="relative h-[500px] md:h-[400px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute inset-0"
              >
                <div className="h-full rounded-3xl border border-white/10 bg-card/50 backdrop-blur-xl overflow-hidden">
                  <div className="h-full grid md:grid-cols-2 gap-8 p-8 md:p-12">
                    {/* Left side - Content */}
                    <div className="flex flex-col justify-center">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <span className="text-muted-foreground text-sm mb-2">{feature.subtitle}</span>
                      <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-8">
                        {feature.description}
                      </p>

                      <Button className="w-fit bg-accent hover:bg-accent/90 text-accent-foreground">
                        Learn More
                      </Button>
                    </div>

                    {/* Right side - Stats */}
                    <div className="flex flex-col justify-center">
                      <div className="grid gap-6">
                        {feature.stats.map((stat, index) => (
                          <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-6 rounded-2xl bg-white/5 border border-white/10"
                          >
                            <div className={`text-3xl font-bold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                              {stat.value}
                            </div>
                            <div className="text-muted-foreground text-sm mt-1">
                              {stat.label}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={() => paginate(-1)}
              className="rounded-full border-white/20 bg-white/5 hover:bg-white/10"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <div className="flex gap-2">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > current ? 1 : -1)
                    setCurrent(index)
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === current 
                      ? "w-8 bg-accent" 
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => paginate(1)}
              className="rounded-full border-white/20 bg-white/5 hover:bg-white/10"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
