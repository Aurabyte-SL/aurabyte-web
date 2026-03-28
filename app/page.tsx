import { Header } from "@/components/header"
import { HeroAdvanced } from "@/components/hero-advanced"
import { LampSection } from "@/components/lamp-effect"
import { BentoGridSection } from "@/components/bento-grid"
import { FeatureCarousel } from "@/components/feature-carousel"
import { OrbitingSkills } from "@/components/orbiting-skills"
import { ProcessSection } from "@/components/tracing-beam"
import { OrbitalTimeline } from "@/components/orbital-timeline"
import { PortfolioAdvanced } from "@/components/portfolio-advanced"
import { TestimonialsSection } from "@/components/infinite-moving-cards"
import { Partners } from "@/components/partners"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { ShaderBackground } from "@/components/shader-background"
import { BackgroundBeams } from "@/components/background-beams"

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative">
      <ShaderBackground />
      <BackgroundBeams className="opacity-30" />
      <Header />
      <HeroAdvanced />
      <LampSection />
      <BentoGridSection />
      <FeatureCarousel />
      <OrbitingSkills />
      <ProcessSection />
      <OrbitalTimeline />
      <PortfolioAdvanced />
      <TestimonialsSection />
      <Partners />
      <Contact />
      <Footer />
    </main>
  )
}
