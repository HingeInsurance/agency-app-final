import { Calendar } from 'lucide-react'

interface Step2StartDateProps {
  value: string | null
  onChange: (value: string) => void
  error?: string
}

export default function Step2StartDate({
  value,
  onChange,
  error,
}: Step2StartDateProps) {
  // Get today's date and max date (30 days from now)
  const today = new Date()
  const minDate = today.toISOString().split('T')[0]

  const maxDate = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)
  const maxDateString = maxDate.toISOString().split('T')[0]

  // Format date for display
  const formatDateDisplay = (dateString: string | null): string => {
    if (!dateString) return ''
    const date = new Date(dateString + 'T00:00:00')
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="space-y-4">
      {/* Step Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">
          When do you want coverage to start?
        </h2>
        <p className="text-sm text-muted-foreground mt-2">
          Select your preferred coverage start date
        </p>
      </div>

      {/* Date Input */}
      <div className="mt-6 space-y-3">
        <label
          htmlFor="start-date"
          className="block text-sm font-semibold text-foreground"
        >
          Coverage Start Date
        </label>

        <div className="relative">
          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
          <input
            id="start-date"
            type="date"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            min={minDate}
            max={maxDateString}
            className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 transition-all duration-200 font-medium text-base focus:outline-none ${
              error
                ? 'border-destructive bg-destructive/5 focus:border-destructive'
                : value
                  ? 'border-success bg-success/5 focus:border-success'
                  : 'border-border focus:border-primary bg-white'
            }`}
            aria-label="Select coverage start date"
            aria-invalid={!!error}
            aria-describedby={error ? 'date-error' : undefined}
          />
        </div>

        {/* Help Text */}
        <p className="text-xs text-muted-foreground flex items-start gap-2">
          <span className="text-lg leading-none mt-0.5">ℹ️</span>
          <span>
            Coverage can start as early as today or up to 30 days in advance
          </span>
        </p>
      </div>

      {/* Selected Date Display */}
      {value && (
        <div className="p-4 bg-success/5 border border-success/20 rounded-lg space-y-2">
          <p className="text-sm font-semibold text-foreground">Selected Date:</p>
          <p className="text-base font-bold text-success">
            {formatDateDisplay(value)}
          </p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p
            id="date-error"
            className="text-sm text-destructive font-medium"
          >
            {error}
          </p>
        </div>
      )}

      {/* Quick Select Options */}
      <div className="pt-4 space-y-2">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Quick Select
        </p>
        <div className="grid grid-cols-3 gap-2">
          {[
            {
              label: 'Today',
              date: minDate,
            },
            {
              label: 'Next Week',
              date: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
                .toISOString()
                .split('T')[0],
            },
            {
              label: 'Next Month',
              date: new Date(
                today.getFullYear(),
                today.getMonth() + 1,
                today.getDate()
              )
                .toISOString()
                .split('T')[0],
            },
          ].map((option) => (
            <button
              key={option.label}
              onClick={() => onChange(option.date)}
              className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-200 ${
                value === option.date
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border text-foreground hover:border-primary/50 hover:bg-primary/5'
              }`}
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
