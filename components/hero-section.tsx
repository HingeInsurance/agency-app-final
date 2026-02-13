import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'

interface HeroSectionProps {
  onGetStarted: () => void
}

export default function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center px-4">
      {/* Subtle background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl opacity-20" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center text-center">
        {/* Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance leading-tight">
          Get Your Insurance Quote in Minutes
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-muted-foreground mb-12 text-balance leading-relaxed max-w-xl">
          Competitive rates for auto, home, and commercial coverage. Get protected with trusted insurance solutions.
        </p>

        {/* CTA Buttons - Vertically Stacked on Mobile */}
        <div className="w-full flex flex-col gap-4 sm:gap-3 sm:flex-row sm:justify-center sm:items-center">
          {/* Primary Button */}
          <Button
            onClick={onGetStarted}
            size="lg"
            className="w-full sm:w-auto h-12 sm:h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-all duration-200 hover:shadow-lg flex items-center justify-center gap-2"
          >
            Get Started
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Secondary Button */}
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto h-12 sm:h-11 border-2 border-primary text-primary hover:bg-primary/5 font-semibold rounded-lg transition-all duration-200"
          >
            Learn More
          </Button>
        </div>

        {/* Trust Badge */}
        <div className="mt-16 pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full" />
            <span>Fast & Easy Process</span>
          </div>
          <div className="hidden sm:block w-1 h-1 bg-border rounded-full" />
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full" />
            <span>Trusted by Thousands</span>
          </div>
          <div className="hidden sm:block w-1 h-1 bg-border rounded-full" />
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full" />
            <span>No Obligations</span>
          </div>
        </div>
      </div>
    </section>
  )
}
