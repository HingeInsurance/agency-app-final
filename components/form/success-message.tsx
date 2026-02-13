import { CheckCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SuccessMessageProps {
  onClose: () => void
}

export default function SuccessMessage({ onClose }: SuccessMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-4">
      {/* Success Icon */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-success/20 rounded-full blur-xl animate-pulse" />
        <CheckCircle className="relative w-20 h-20 text-success" />
      </div>

      {/* Success Message */}
      <h2 className="text-3xl font-bold text-foreground mb-3">
        Quote Request Submitted!
      </h2>

      <p className="text-lg text-muted-foreground mb-8 max-w-md">
        Thank you for requesting a quote. An agent will contact you within 24 hours with personalized insurance options.
      </p>

      {/* Details */}
      <div className="w-full max-w-sm space-y-3 mb-8 p-4 bg-success/5 border border-success/20 rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Next Step:</span>
          <span className="font-semibold text-foreground">Receive Quote Call</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Timeframe:</span>
          <span className="font-semibold text-foreground">Within 24 Hours</span>
        </div>
      </div>

      {/* CTA Button */}
      <Button
        onClick={onClose}
        className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg flex items-center justify-center gap-2"
      >
        Back to Home
        <ArrowRight className="w-4 h-4" />
      </Button>

      {/* Additional Info */}
      <p className="text-xs text-muted-foreground mt-8">
        Check your email for a confirmation of your quote request
      </p>
    </div>
  )
}
