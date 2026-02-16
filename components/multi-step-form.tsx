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
    } 
    // STEP 4 VALIDATION REMOVED - It is now optional!
    // else if (step === 4) {
    //   if (!formData.file) {
    //     newErrors.file = 'Please upload your declarations
