"use client"

import { cn } from "@/lib/utils"
import React, { useEffect, useState } from "react"
import { AuroraShader } from "./aurora-shader"
import { DottedSurface } from "./dotted-surface"

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string
    name: string
    title: string
  }[]
  direction?: "left" | "right"
  speed?: "fast" | "normal" | "slow"
  pauseOnHover?: boolean
  className?: string
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const scrollerRef = React.useRef<HTMLUListElement>(null)

  useEffect(() => {
    addAnimation()
  }, [])

  const [start, setStart] = useState(false)

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children)

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true)
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem)
        }
      })

      getDirection()
      getSpeed()
      setStart(true)
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        )
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        )
      }
    }
  }

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s")
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s")
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s")
      }
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            className="w-[350px] max-w-full relative rounded-2xl border border-border flex-shrink-0 px-8 py-6 md:w-[450px] bg-card/50 backdrop-blur-sm"
            key={item.name + idx}
          >
            <blockquote>
              <div
                aria-hidden="true"
                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              />
              <span className="relative z-20 text-sm leading-[1.6] text-foreground font-normal">
                {item.quote}
              </span>
              <div className="relative z-20 mt-6 flex flex-row items-center">
                <span className="flex flex-col gap-1">
                  <span className="text-sm leading-[1.6] text-foreground font-semibold">
                    {item.name}
                  </span>
                  <span className="text-sm leading-[1.6] text-muted-foreground font-normal">
                    {item.title}
                  </span>
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Aurabyte transformed our entire digital presence. Their team delivered a stunning web platform that increased our conversions by 200%.",
      name: "Sarah Chen",
      title: "CEO, TechVentures",
    },
    {
      quote:
        "The mobile app they built for us is simply outstanding. Intuitive design, flawless performance, and delivered ahead of schedule.",
      name: "Marcus Williams",
      title: "Founder, FitLife App",
    },
    {
      quote:
        "Their data analytics solution gave us insights we never knew existed. Game-changing for our business decisions.",
      name: "Emily Rodriguez",
      title: "COO, DataDriven Inc",
    },
    {
      quote:
        "Working with Aurabyte on our game was an incredible experience. They brought our vision to life with stunning graphics and smooth gameplay.",
      name: "James Park",
      title: "Creative Director, PlayStudio",
    },
    {
      quote:
        "Professional, innovative, and truly dedicated to excellence. Aurabyte is our go-to partner for all digital projects.",
      name: "Lisa Thompson",
      title: "VP of Digital, GlobalCorp",
    },
  ]

  return (
    <section className="py-20 bg-transparent relative overflow-hidden">
      <DottedSurface className="opacity-30" />
      <div className="container mx-auto px-4 mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-foreground mb-4">
          What Our Clients Say
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto">
          Don&apos;t just take our word for it. Here&apos;s what industry leaders have to say about working with Aurabyte.
        </p>
      </div>
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </section>
  )
}
