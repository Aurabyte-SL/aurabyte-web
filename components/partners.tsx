"use client"

import { motion } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"
import { WaveShader } from "./wave-shader"
import { IsoLevelWarp } from "./isometric-wave-grid"

const partners = [
  { name: "BlankSpace", logo: "/partners/blankspace-logo.png" },
  { name: "BS", logo: "/partners/bs-logo.png" },
  { name: "InnoHub", logo: "/partners/inno-hub-logo.jpg" },
  { name: "Kizuri International", logo: "/partners/kizuri-international.jpg" },
]

const testimonials = [
  {
    quote: "Aurabyte transformed our digital presence completely. Their team delivered beyond our expectations.",
    author: "Sarah Chen",
    role: "CTO, BlankSpace",
    company: "BlankSpace",
  },
  {
    quote: "The mobile app they built has become essential to our operations. Exceptional quality and support.",
    author: "Michael Rodriguez",
    role: "CEO, InnoHub",
    company: "InnoHub",
  },
  {
    quote: "Their data analytics solution gave us insights we never knew we needed. Game-changing results.",
    author: "Emily Watson",
    role: "Head of Operations, Kizuri International",
    company: "Kizuri",
  },
]

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative group"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Spotlight effect */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: isHovering
            ? `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 180, 180, 0.1), transparent 40%)`
            : "none",
        }}
      />

      <div className="relative rounded-2xl border border-border bg-card p-8 h-full group-hover:border-accent/50 transition-colors">
        <div className="absolute top-6 right-6 text-6xl font-serif text-accent/20">&ldquo;</div>
        <p className="relative text-muted-foreground leading-relaxed">
          {testimonial.quote}
        </p>
        <div className="mt-6 flex items-center gap-4">
          <motion.div 
            className="h-12 w-12 rounded-full bg-gradient-to-br from-accent/30 to-cyan-500/30 flex items-center justify-center border border-accent/30 overflow-hidden"
            whileHover={{ scale: 1.1 }}
          >
            <span className="text-sm font-bold text-accent">{testimonial.company.slice(0, 2).toUpperCase()}</span>
          </motion.div>
          <div>
            <p className="font-semibold text-foreground">{testimonial.author}</p>
            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function Partners() {
  return (
    <section id="partners" className="py-24 lg:py-32 relative overflow-hidden bg-transparent">
      <IsoLevelWarp className="opacity-40" color="17, 142, 88" speed={0.4} density={45} />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Partners logos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-medium uppercase tracking-wider text-accent">Trusted By</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Partners who believe in our vision.
          </h2>
        </motion.div>

        {/* Infinite scroll marquee */}
        <div className="mt-12 relative overflow-hidden">
          <div className="flex space-x-8 animate-marquee">
            {[...partners, ...partners, ...partners].map((partner, index) => (
              <motion.div
                key={`${partner.name}-${index}`}
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex-shrink-0 flex items-center justify-center rounded-xl border border-border bg-card p-6 hover:border-accent/50 transition-colors min-w-[200px]"
              >
                <div className="relative h-12 w-32">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center mb-12"
          >
            <p className="text-sm font-medium uppercase tracking-wider text-accent">Testimonials</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-balance">
              What our clients say about us.
            </h2>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={testimonial.author} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
