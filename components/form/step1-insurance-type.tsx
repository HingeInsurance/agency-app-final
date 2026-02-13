import { Car, Home, Building2, Check } from 'lucide-react'

interface Step1InsuranceTypeProps {
  value: 'auto' | 'home' | 'commercial' | null
  onChange: (value: 'auto' | 'home' | 'commercial') => void
  error?: string
}

const insuranceOptions = [
  {
    id: 'auto',
    label: 'Auto',
    subtitle: 'Coverage for your vehicles',
    icon: Car,
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'home',
    label: 'Home',
    subtitle: 'Protect your property',
    icon: Home,
    color: 'from-blue-600 to-blue-700',
  },
  {
    id: 'commercial',
    label: 'Commercial',
    subtitle: 'Coverage for your business',
    icon: Building2,
    color: 'from-blue-700 to-blue-800',
  },
] as const

export default function Step1InsuranceType({
  value,
  onChange,
  error,
}: Step1InsuranceTypeProps) {
  return (
    <div className="space-y-4">
      {/* Step Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">
          What type of insurance do you need?
        </h2>
        <p className="text-sm text-muted-foreground mt-2">
          Select the type of coverage that best suits your needs
        </p>
      </div>

      {/* Insurance Options */}
      <div className="space-y-3 mt-6">
        {insuranceOptions.map((option) => {
          const Icon = option.icon
          const isSelected = value === option.id
          const typedId = option.id as 'auto' | 'home' | 'commercial'

          return (
            <button
              key={option.id}
              onClick={() => onChange(typedId)}
              className={`w-full p-5 rounded-xl border-2 transition-all duration-200 text-left flex items-start justify-between group ${
                isSelected
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50 hover:bg-muted/50'
              }`}
              role="option"
              aria-selected={isSelected}
              aria-label={`${option.label} - ${option.subtitle}`}
              type="button"
            >
              {/* Left Content */}
              <div className="flex items-start gap-4 flex-1">
                {/* Icon Container */}
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                    isSelected
                      ? 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground'
                      : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                {/* Text Content */}
                <div>
                  <h3 className="font-bold text-lg text-foreground">
                    {option.label}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {option.subtitle}
                  </p>
                </div>
              </div>

              {/* Checkmark */}
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ml-4 ${
                  isSelected
                    ? 'border-primary bg-primary'
                    : 'border-border group-hover:border-primary/50'
                }`}
              >
                {isSelected && (
                  <Check className="w-4 h-4 text-primary-foreground" />
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-sm text-destructive font-medium">{error}</p>
        </div>
      )}

      {/* Selected Info */}
      {value && (
        <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
          <p className="text-sm text-success font-medium">
            ✓ {insuranceOptions.find((opt) => opt.id === value)?.label} insurance
            selected
          </p>
        </div>
      )}
    </div>
  )
}
