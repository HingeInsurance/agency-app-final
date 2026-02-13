'use client'

import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import MultiStepForm from '@/components/multi-step-form'

interface FormModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function FormModal({ isOpen, onClose }: FormModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Focus management and backdrop click handling
  useEffect(() => {
    if (isOpen) {
      // Trap focus in modal
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose()
        }
      }

      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'

      return () => {
        document.removeEventListener('keydown', handleKeyDown)
        document.body.style.overflow = 'unset'
      }
    }
  }, [isOpen, onClose])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      ref={modalRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
      role="presentation"
      aria-label="Insurance quote form"
    >
      {/* Modal Container */}
      <div
        ref={contentRef}
        className="w-full max-h-screen sm:max-h-[90vh] overflow-y-auto bg-background rounded-t-2xl sm:rounded-2xl shadow-2xl animate-in slide-in-from-bottom-5 sm:slide-in-from-center sm:zoom-in-95 duration-300 relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 hover:bg-muted rounded-lg transition-colors duration-200"
          aria-label="Close form"
          type="button"
        >
          <X className="w-6 h-6 text-foreground" />
        </button>

        {/* Modal Header */}
        <div className="sticky top-0 bg-background border-b border-border/50 px-4 sm:px-6 py-6 pt-8 sm:pt-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-balance">
            Get Your Insurance Quote
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Complete this quick form to receive personalized quotes
          </p>
        </div>

        {/* Form Content */}
        <div className="px-4 sm:px-6 py-6 pb-8">
          <MultiStepForm onSuccess={onClose} />
        </div>
      </div>
    </div>
  )
}
