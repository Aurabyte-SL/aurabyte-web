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
import { AnomalousMatterHero } from "@/components/anomalous-matter"
import { DottedSurface } from "@/components/dotted-surface"
import { BackgroundPaperShaders } from "@/components/background-paper-shaders"

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative">
      <ShaderBackground />
      <BackgroundBeams className="opacity-30" />
      <Header />
      <div className="relative overflow-hidden">
        <AnomalousMatterHero className="opacity-40" />
        <HeroAdvanced />
      </div>
      <LampSection />
      <div className="relative overflow-hidden">
        <DottedSurface className="absolute inset-0 opacity-30" />
        <BentoGridSection />
      </div>
      <FeatureCarousel />
      <OrbitingSkills />
      <ProcessSection />
      <div className="relative overflow-hidden">
        <BackgroundPaperShaders className="opacity-20" />
        <OrbitalTimeline />
      </div>
      <PortfolioAdvanced />
      <TestimonialsSection />
      <Partners />
      <Contact />
      <Footer />
    </main>
  )
}
