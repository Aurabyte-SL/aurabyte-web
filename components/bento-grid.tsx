"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { 
  Globe, 
  Smartphone, 
  BarChart3, 
  Gamepad2, 
  Brain, 
  Palette,
  Zap,
  Shield
} from "lucide-react"
import { PlasmaShader } from "./plasma-shader"

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  )
}

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string
  title?: string | React.ReactNode
  description?: string | React.ReactNode
  header?: React.ReactNode
  icon?: React.ReactNode
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input p-4 bg-card border border-border justify-between flex flex-col space-y-4 overflow-hidden relative",
        className
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        {icon}
        <div className="font-bold text-foreground mb-2 mt-2">
          {title}
        </div>
        <div className="text-muted-foreground text-sm">
          {description}
        </div>
      </div>
    </motion.div>
  )
}

const GridBackground = ({ className }: { className?: string }) => (
  <div className={cn("absolute inset-0 overflow-hidden", className)}>
    <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-transparent" />
    <div className="absolute inset-0" style={{
      backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
      backgroundSize: '24px 24px'
    }} />
  </div>
)

const WaveBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 320" fill="none">
      <motion.path
        d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,128C960,139,1056,181,1152,186.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        fill="rgba(20, 184, 166, 0.1)"
        animate={{
          d: [
            "M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,128C960,139,1056,181,1152,186.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
            "M0,192L48,181.3C96,171,192,149,288,160C384,171,480,213,576,218.7C672,224,768,192,864,165.3C960,139,1056,117,1152,128C1248,139,1344,181,1392,202.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ]
        }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
      />
    </svg>
  </div>
)

const CircuitBackground = () => (
  <div className="absolute inset-0 overflow-hidden opacity-20">
    <svg className="w-full h-full" viewBox="0 0 100 100">
      <motion.path
        d="M10,50 L30,50 L30,30 L50,30 L50,50 L70,50 L70,70 L90,70"
        stroke="currentColor"
        strokeWidth="0.5"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.circle cx="30" cy="50" r="2" fill="currentColor" 
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.circle cx="50" cy="30" r="2" fill="currentColor"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
      />
      <motion.circle cx="70" cy="50" r="2" fill="currentColor"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
      />
    </svg>
  </div>
)

export function BentoGridSection() {
  return (
    <section className="py-20 px-4 bg-background relative overflow-hidden" id="capabilities">
      <PlasmaShader className="opacity-50" />
      <div className="container mx-auto mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-bold text-center text-foreground mb-4"
        >
          Our Capabilities
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground text-center max-w-2xl mx-auto"
        >
          Full-spectrum digital solutions powered by cutting-edge technology and creative excellence.
        </motion.p>
      </div>

      <BentoGrid className="max-w-6xl mx-auto">
        <BentoGridItem
          title="Web Development"
          description="Custom websites and web applications built with modern frameworks and optimized for performance."
          header={<GridBackground className="rounded-t-lg" />}
          className="md:col-span-2"
          icon={<Globe className="h-6 w-6 text-accent" />}
        />
        <BentoGridItem
          title="Mobile Apps"
          description="Native and cross-platform mobile applications for iOS and Android."
          header={<WaveBackground />}
          icon={<Smartphone className="h-6 w-6 text-accent" />}
        />
        <BentoGridItem
          title="Data Analytics"
          description="Transform raw data into actionable insights with advanced analytics solutions."
          header={<CircuitBackground />}
          icon={<BarChart3 className="h-6 w-6 text-accent" />}
        />
        <BentoGridItem
          title="Game Development"
          description="Immersive gaming experiences across multiple platforms with stunning visuals."
          header={<GridBackground />}
          className="md:col-span-2"
          icon={<Gamepad2 className="h-6 w-6 text-accent" />}
        />
        <BentoGridItem
          title="AI & Machine Learning"
          description="Intelligent solutions that learn, adapt, and automate complex processes."
          header={<WaveBackground />}
          className="md:col-span-2"
          icon={<Brain className="h-6 w-6 text-accent" />}
        />
        <BentoGridItem
          title="Product Design"
          description="User-centric design that blends aesthetics with functionality for intuitive digital products."
          header={<CircuitBackground />}
          icon={<Palette className="h-6 w-6 text-accent" />}
        />
      </BentoGrid>
    </section>
  )
}
