import { Check } from 'lucide-react'

interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
}

export default function ProgressIndicator({
  currentStep,
  totalSteps,
}: ProgressIndicatorProps) {
  const steps = ['Insurance Type', 'Start Date', 'Your Info', 'Documents']

  return (
    <div className="w-full">
      {/* Step Counter */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">
          Step {currentStep} of {totalSteps}
        </h3>
        <span className="text-xs text-muted-foreground">
          {Math.round((currentStep / totalSteps) * 100)}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>

      {/* Step Indicators */}
      <div className="flex justify-between gap-2 mt-6">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < currentStep
          const isCurrent = stepNumber === currentStep

          return (
            <div
              key={step}
              className="flex flex-col items-center flex-1 gap-2"
            >
              {/* Circle Indicator */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-200 ${
                  isCurrent
                    ? 'bg-primary text-primary-foreground ring-2 ring-primary/30'
                    : isCompleted
                      ? 'bg-success text-success-foreground'
                      : 'bg-muted text-muted-foreground'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{stepNumber}</span>
                )}
              </div>

              {/* Step Label (Hidden on mobile, visible on tablet and up) */}
              <span
                className={`text-xs font-medium text-center hidden sm:block transition-colors duration-200 ${
                  isCurrent || isCompleted
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                {step}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
