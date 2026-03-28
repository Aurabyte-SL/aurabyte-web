"use client"

import { ArrowRight, Play } from "lucide-react"
import { motion } from "framer-motion"
import { NeonText } from "./neon-text"
import { FloatingSphere } from "./floating-sphere"
import { NeonButton } from "./neon-button"
import { FlipWords } from "./flip-words"
import { SparklesCore } from "./sparkles"

export function HeroAdvanced() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-accent/10 blur-[100px]"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-primary/10 blur-[100px]"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div> 

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:72px_72px]" />

      {/* Sparkles */}
      <SparklesCore
        id="hero-sparkles"
        background="transparent"
        minSize={0.4}
        maxSize={1}
        particleDensity={50}
        particleColor="#8D3BFF"
        speed={3}
        className="opacity-30"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-gray/20 px-4 py-1.5 text-sm text-muted-foreground"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              Now accepting new projects for 2026
            </motion.div>

            {/* Heading with neon effect */}
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="block"
              >
                We build
                <FlipWords 
                  words={["websites", "mobile apps", "analytics", "games", "AI solutions"]} 
                  className="ml-2"
                />
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="block mt-2"
              >
                that <NeonText text="transform businesses" className="text-secondary" />
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-lg leading-relaxed text-muted-foreground max-w-xl"
            >
              We are a collective of curious and passionate technologists, building transformative digital solutions that drive business growth through websites, mobile apps, data analytics, and game development.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-10 flex flex-col sm:flex-row items-start gap-4"
            >
              <NeonButton color="cyan" size="lg" href="#contact">
                Start your project
                <ArrowRight className="h-4 w-4" />
              </NeonButton>
              <NeonButton color="purple" size="lg" href="#portfolio">
                <Play className="h-4 w-4" />
                Watch showreel
              </NeonButton>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8"
            >
              {[
                { value: "150+", label: "Projects Delivered" },
                { value: "98%", label: "Client Satisfaction" },
                { value: "50+", label: "Team Experts" },
                { value: "8+", label: "Years Experience" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex flex-col"
                >
                  <span className="text-3xl font-bold text-foreground">{stat.value}</span>
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right content - 3D Sphere */}
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <FloatingSphere className="w-full h-[500px]" />
            
            {/* Floating cards around sphere 
            <motion.div
              className="absolute top-20 left-10 bg-card/80 backdrop-blur-sm border border-border rounded-lg p-4 shadow-lg"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="text-sm font-medium">Active Projects</div>
              <div className="text-2xl font-bold text-accent">24</div>
            </motion.div>

            <motion.div
              className="absolute bottom-32 right-10 bg-card/80 backdrop-blur-sm border border-border rounded-lg p-4 shadow-lg"
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="text-sm font-medium">Global Clients</div>
              <div className="text-2xl font-bold text-accent">50+</div>
            </motion.div>
          </motion.div> */}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <motion.div
            className="w-1 h-2 bg-accent rounded-full"
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </section>
  )
}
