'use client'

import { useState } from 'react'
import HeroSection from '@/components/hero-section'
import FormModal from '@/components/form-modal'

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <main className="min-h-screen bg-background">
      <HeroSection onGetStarted={() => setIsFormOpen(true)} />
      <FormModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </main>
  )
}
