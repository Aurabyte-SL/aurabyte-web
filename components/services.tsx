import { Globe, Smartphone, BarChart3, Gamepad2, Cpu, Palette } from "lucide-react"
import { AnomalousMatterHero } from "./anomalous-matter"

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description: "Custom websites and web applications built with modern frameworks, optimized for performance and scalability.",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Native and cross-platform mobile applications for iOS and Android that deliver exceptional user experiences.",
  },
  {
    icon: BarChart3,
    title: "Consults & Maintenance",
    description: "Strategic consulting and proactive maintenance to ensure your digital infrastructure remains secure, scalable, and optimized for long-term success.",
  },
  {
    icon: Gamepad2,
    title: "Game Development",
    description: "Immersive gaming experiences across platforms, from casual mobile games to complex multiplayer environments.",
  },
  {
    icon: Cpu,
    title: "AI Agents",
    description: "Custom AI agents and autonomous workflows designed to handle complex tasks, optimize operations, and scale your business intelligence.",
  },
  {
    icon: Palette,
    title: "Product Design",
    description: "User-centric design that blends aesthetics with functionality to create intuitive and engaging digital products.",
  },
]

export function Services() {
  return (
    <section id="services" className="py-24 lg:py-32 relative overflow-hidden bg-transparent">
      <AnomalousMatterHero className="opacity-30" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-accent">What we do</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Our collection of tech services spans every stage of transformation.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Explore how we help businesses transform through innovative technology solutions.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative rounded-2xl border border-border bg-card p-8 hover:border-accent/50 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                  <service.icon className="h-6 w-6 text-accent" />
                </div>
              </div>
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">
                {service.description}
              </p>
              <a
                href="#contact"
                className="mt-4 inline-flex items-center text-sm font-medium text-foreground hover:text-accent transition-colors"
              >
                Learn more
                <span className="ml-1 group-hover:translate-x-1 transition-transform">&rarr;</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
