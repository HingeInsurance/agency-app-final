import { User, Mail, Phone, Car, Home, Building2 } from 'lucide-react'

interface Step3PersonalInfoProps {
  fullName: string
  email: string
  phone: string
  onFullNameChange: (value: string) => void
  onEmailChange: (value: string) => void
  onPhoneChange: (value: string) => void
  errors: {
    fullName?: string
    email?: string
    phone?: string
  }
  insuranceType?: 'auto' | 'home' | 'commercial' | null
  propertyAddress?: string
  onPropertyAddressChange?: (value: string) => void
  vehicleCount?: string
  onVehicleCountChange?: (value: string) => void
}

export default function Step3PersonalInfo({
  fullName,
  email,
  phone,
  onFullNameChange,
  onEmailChange,
  onPhoneChange,
  errors,
  insuranceType,
  propertyAddress = '',
  onPropertyAddressChange,
  vehicleCount = '',
  onVehicleCountChange,
}: Step3PersonalInfoProps) {
  // Format phone number as user types
  const formatPhone = (value: string): string => {
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length <= 3) return cleaned
    if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value)
    onPhoneChange(formatted)
  }

  return (
    <div className="space-y-4">
      {/* Step Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">
          Tell us about yourself
        </h2>
        <p className="text-sm text-muted-foreground mt-2">
          We&apos;ll use this information to contact you with your quote
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-5 mt-6">
        {/* Full Name Field */}
        <div>
          <label
            htmlFor="full-name"
            className="block text-sm font-semibold text-foreground mb-2"
          >
            Full Name
            <span className="text-destructive ml-1" aria-label="required">
              *
            </span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            <input
              id="full-name"
              type="text"
              value={fullName}
              onChange={(e) => onFullNameChange(e.target.value)}
              placeholder="John Doe"
              className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 transition-all duration-200 text-base focus:outline-none ${
                errors.fullName
                  ? 'border-destructive bg-destructive/5 focus:border-destructive'
                  : fullName
                    ? 'border-success focus:border-success'
                    : 'border-border focus:border-primary'
              }`}
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? 'fullname-error' : undefined}
              autoComplete="name"
            />
          </div>
          {errors.fullName && (
            <p id="fullname-error" className="text-sm text-destructive mt-2">
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-foreground mb-2"
          >
            Email Address
            <span className="text-destructive ml-1" aria-label="required">
              *
            </span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              placeholder="john@example.com"
              className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 transition-all duration-200 text-base focus:outline-none ${
                errors.email
                  ? 'border-destructive bg-destructive/5 focus:border-destructive'
                  : email
                    ? 'border-success focus:border-success'
                    : 'border-border focus:border-primary'
              }`}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              autoComplete="email"
            />
          </div>
          {errors.email && (
            <p id="email-error" className="text-sm text-destructive mt-2">
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-semibold text-foreground mb-2"
          >
            Phone Number
            <span className="text-destructive ml-1" aria-label="required">
              *
            </span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="(123) 456-7890"
              className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 transition-all duration-200 text-base focus:outline-none ${
                errors.phone
                  ? 'border-destructive bg-destructive/5 focus:border-destructive'
                  : phone
                    ? 'border-success focus:border-success'
                    : 'border-border focus:border-primary'
              }`}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
              autoComplete="tel"
            />
          </div>
          {errors.phone && (
            <p id="phone-error" className="text-sm text-destructive mt-2">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

        {/* Insurance Type-Specific Fields */}
        {insuranceType === 'home' && (
          <div>
            <label
              htmlFor="property-address"
              className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2"
            >
              <Home className="w-4 h-4 text-primary" />
              Property Address
              <span className="text-destructive ml-1" aria-label="required">
                *
              </span>
            </label>
            <input
              id="property-address"
              type="text"
              value={propertyAddress}
              onChange={(e) => onPropertyAddressChange?.(e.target.value)}
              placeholder="123 Main St, City, State ZIP"
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 text-base focus:outline-none ${
                propertyAddress
                  ? 'border-success focus:border-success'
                  : 'border-border focus:border-primary'
              }`}
              autoComplete="street-address"
            />
            <p className="text-xs text-muted-foreground mt-1">
              This helps us assess your home&apos;s value and location
            </p>
          </div>
        )}

        {insuranceType === 'auto' && (
          <div>
            <label
              htmlFor="vehicle-count"
              className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2"
            >
              <Car className="w-4 h-4 text-primary" />
              Number of Vehicles
              <span className="text-destructive ml-1" aria-label="required">
                *
              </span>
            </label>
            <select
              id="vehicle-count"
              value={vehicleCount}
              onChange={(e) => onVehicleCountChange?.(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-border focus:border-primary focus:outline-none text-base"
            >
              <option value="">Select number of vehicles</option>
              <option value="1">1 Vehicle</option>
              <option value="2">2 Vehicles</option>
              <option value="3">3 Vehicles</option>
              <option value="4+">4 or More Vehicles</option>
            </select>
            <p className="text-xs text-muted-foreground mt-1">
              Helps us provide accurate quotes for your household
            </p>
          </div>
        )}

        {insuranceType === 'commercial' && (
          <div>
            <label
              htmlFor="business-type"
              className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2"
            >
              <Building2 className="w-4 h-4 text-primary" />
              Business Type
              <span className="text-destructive ml-1" aria-label="required">
                *
              </span>
            </label>
            <select
              id="business-type"
              className="w-full px-4 py-3 rounded-lg border-2 border-border focus:border-primary focus:outline-none text-base"
            >
              <option value="">Select your business type</option>
              <option value="retail">Retail</option>
              <option value="services">Professional Services</option>
              <option value="contractor">Contractor</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="other">Other</option>
            </select>
            <p className="text-xs text-muted-foreground mt-1">
              This helps us identify relevant coverage options
            </p>
          </div>
        )}
      </div>

      {/* Privacy Notice */}
      <div className="p-4 bg-muted/50 rounded-lg mt-6 border border-border/50">
        <p className="text-xs text-muted-foreground leading-relaxed">
          Your information is secure and will only be used to provide you with
          insurance quotes. We respect your privacy and will never share your
          details with third parties.
        </p>
      </div>
    </div>
  )
}
