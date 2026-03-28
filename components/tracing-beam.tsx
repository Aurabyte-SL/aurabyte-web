"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import { CyberGridShader } from "./cyber-grid-shader"
import { IsoLevelWarp } from "./isometric-wave-grid"

export const TracingBeam = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const contentRef = useRef<HTMLDivElement>(null)
  const [svgHeight, setSvgHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight)
    }
  }, [])

  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]),
    {
      stiffness: 500,
      damping: 90,
    }
  )
  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]),
    {
      stiffness: 500,
      damping: 90,
    }
  )

  return (
    <motion.div
      ref={ref}
      className={cn("relative w-full max-w-4xl mx-auto h-full", className)}
    >
      <div className="absolute -left-4 md:-left-20 top-3">
        <motion.div
          transition={{
            duration: 0.2,
            delay: 0.5,
          }}
          animate={{
            boxShadow:
              scrollYProgress.get() > 0
                ? "none"
                : "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
          className="ml-[27px] h-4 w-4 rounded-full border border-border shadow-sm flex items-center justify-center bg-background"
        >
          <motion.div
            transition={{
              duration: 0.2,
              delay: 0.5,
            }}
            animate={{
              backgroundColor:
                scrollYProgress.get() > 0
                  ? "var(--accent)"
                  : "var(--muted)",
            }}
            className="h-2 w-2 rounded-full border border-border bg-muted"
          />
        </motion.div>
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className="ml-4 block"
          aria-hidden="true"
        >
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="var(--border)"
            strokeOpacity="0.16"
            transition={{
              duration: 10,
            }}
          />
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="1.25"
            className="motion-reduce:hidden"
            transition={{
              duration: 10,
            }}
          />
          <defs>
            <motion.linearGradient
              id="gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1}
              y2={y2}
            >
              <stop stopColor="var(--accent)" stopOpacity="0" />
              <stop stopColor="var(--accent)" />
              <stop offset="0.325" stopColor="var(--accent)" />
              <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  )
}

export function ProcessSection() {
  const steps = [
    {
      title: "Discovery",
      description: "We begin by understanding your vision, goals, and challenges. Through in-depth consultations, we map out the perfect strategy for your project.",
    },
    {
      title: "Design",
      description: "Our creative team crafts stunning designs and prototypes. Every pixel is placed with purpose to create engaging user experiences.",
    },
    {
      title: "Development",
      description: "Using cutting-edge technologies, we bring designs to life. Our agile process ensures rapid iteration and continuous improvement.",
    },
    {
      title: "Testing",
      description: "Rigorous quality assurance across all devices and platforms. We catch bugs before your users do.",
    },
    {
      title: "Launch",
      description: "Strategic deployment with zero downtime. We ensure a smooth launch and provide ongoing support for your success.",
    },
  ]

  return (
    <section className="py-20 px-4 bg-transparent relative overflow-hidden" id="process">
      <IsoLevelWarp className="opacity-40" color="141, 59, 255" speed={0.5} density={40} />
      <div className="container mx-auto mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-bold text-center text-foreground mb-4"
        >
          Our Process
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-center max-w-2xl mx-auto"
        >
          A proven methodology that transforms ideas into exceptional digital products.
        </motion.p>
      </div>

      <TracingBeam className="px-6">
        <div className="max-w-2xl mx-auto antialiased pt-4 relative">
          {steps.map((step, index) => (
            <div key={`step-${index}`} className="mb-10">
              <h3 className="text-xl font-bold text-foreground mb-2">
                <span className="text-accent mr-2">0{index + 1}.</span>
                {step.title}
              </h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </TracingBeam>
    </section>
  )
}
