'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProgressIndicator from '@/components/form/progress-indicator'
import Step1InsuranceType from '@/components/form/step1-insurance-type'
import Step2StartDate from '@/components/form/step2-start-date'
import Step3PersonalInfo from '@/components/form/step3-personal-info'
import Step4FileUpload from '@/components/form/step4-file-upload'
import SuccessMessage from '@/components/form/success-message'
import { submitLead } from '@/app/actions/submit-lead'

export interface FormData {
  insuranceType: 'auto' | 'home' | 'commercial' | null
  startDate: string | null
  fullName: string
  email: string
  phone: string
  file: File | null
  propertyAddress?: string
  vehicleCount?: string
}

interface MultiStepFormProps {
  onSuccess: () => void
}

const TOTAL_STEPS = 4

export default function MultiStepForm({ onSuccess }: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    insuranceType: null,
    startDate: null,
    fullName: '',
    email: '',
    phone: '',
    file: null,
    propertyAddress: '',
    vehicleCount: '',
  })

  // Validation functions for each step
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.insuranceType) {
        newErrors.insuranceType = 'Please select an insurance type'
      }
    } else if (step === 2) {
      if (!formData.startDate) {
        newErrors.startDate = 'Please select a start date'
      }
    } else if (step === 3) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Full name is required'
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required'
      } else if (!isValidEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email'
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required'
      } else if (!isValidPhone(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number'
      }
      // Validate conditional fields
      if (formData.insuranceType === 'home' && !formData.propertyAddress?.trim()) {
        newErrors.propertyAddress = 'Property address is required'
      }
      if (formData.insuranceType === 'auto' && !formData.vehicleCount) {
        newErrors.vehicleCount = 'Number of vehicles is required'
      }
    } else if (step === 4) {
      if (!formData.file) {
        newErrors.file = 'Please upload your declarations page'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const isValidPhone = (phone: string): boolean => {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/
    return phoneRegex.test(phone.replace(/\s/g, ''))
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < TOTAL_STEPS) {
        setCurrentStep(currentStep + 1)
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setErrors({})
    }
  }

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      return
    }

    setIsSubmitting(true)

    try {
      // Prepare form data with file handling
      const formDataToSubmit = new FormData()
      formDataToSubmit.append('insuranceType', formData.insuranceType || '')
      formDataToSubmit.append('startDate', formData.startDate || '')
      formDataToSubmit.append('fullName', formData.fullName)
      formDataToSubmit.append('email', formData.email)
      formDataToSubmit.append('phone', formData.phone)
      
      // Add conditional fields
      if (formData.propertyAddress) {
        formDataToSubmit.append('propertyAddress', formData.propertyAddress)
      }
      if (formData.vehicleCount) {
        formDataToSubmit.append('vehicleCount', formData.vehicleCount)
      }
      
      if (formData.file) {
        formDataToSubmit.append('file', formData.file)
      }

      // Submit to Supabase via server action
      const result = await submitLead(formDataToSubmit)

      if (!result.success) {
        throw new Error(result.error || 'Failed to submit lead')
      }

      // Show success state
      setIsSuccess(true)

      // Close modal after delay
      setTimeout(() => {
        onSuccess()
      }, 2000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setErrors({ 
        submit: error instanceof Error ? error.message : 'Failed to submit form. Please try again.' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }))
    setErrors({})
  }

  // Render current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1InsuranceType
            value={formData.insuranceType}
            onChange={(value) => updateFormData({ insuranceType: value })}
            error={errors.insuranceType}
          />
        )
      case 2:
        return (
          <Step2StartDate
            value={formData.startDate}
            onChange={(value) => updateFormData({ startDate: value })}
            error={errors.startDate}
          />
        )
      case 3:
        return (
          <Step3PersonalInfo
            fullName={formData.fullName}
            email={formData.email}
            phone={formData.phone}
            onFullNameChange={(value) => updateFormData({ fullName: value })}
            onEmailChange={(value) => updateFormData({ email: value })}
            onPhoneChange={(value) => updateFormData({ phone: value })}
            errors={{
              fullName: errors.fullName,
              email: errors.email,
              phone: errors.phone,
            }}
            insuranceType={formData.insuranceType}
            propertyAddress={formData.propertyAddress || ''}
            onPropertyAddressChange={(value) => updateFormData({ propertyAddress: value })}
            vehicleCount={formData.vehicleCount || ''}
            onVehicleCountChange={(value) => updateFormData({ vehicleCount: value })}
          />
        )
      case 4:
        return (
          <Step4FileUpload
            file={formData.file}
            onChange={(file) => updateFormData({ file })}
            error={errors.file}
          />
        )
      default:
        return null
    }
  }

  // Show success message
  if (isSuccess) {
    return <SuccessMessage onClose={onSuccess} />
  }

  return (
    <div className="w-full space-y-6">
      {/* Progress Indicator */}
      <ProgressIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />

      {/* Step Content */}
      <div className="min-h-96">
        {renderStep()}
        {errors.submit && (
          <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
            {errors.submit}
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-3 pt-6 border-t border-border/50">
        <Button
          onClick={handlePrevious}
          disabled={currentStep === 1 || isSubmitting}
          variant="outline"
          className="flex-1 h-11 rounded-lg"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {currentStep < TOTAL_STEPS ? (
          <Button
            onClick={handleNext}
            disabled={isSubmitting}
            className="flex-1 h-11 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg flex items-center justify-center"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 h-11 bg-success hover:bg-success/90 text-success-foreground rounded-lg flex items-center justify-center"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
          </Button>
        )}
      </div>
    </div>
  )
}
