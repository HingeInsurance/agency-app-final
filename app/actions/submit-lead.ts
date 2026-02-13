"'use server'

import { createClient } from '@supabase/supabase-js'

interface LeadSubmissionResponse {
  success: boolean
  error?: string
  leadId?: string
}

export async function submitLead(
  formData: FormData
): Promise<LeadSubmissionResponse> {
  try {
    // Initialize Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase environment variables are not configured')
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Extract form fields
    const insuranceType = formData.get('insuranceType') as string
    const startDate = formData.get('startDate') as string
    const fullName = formData.get('fullName') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const propertyAddress = formData.get('propertyAddress') as string | null
    const vehicleCount = formData.get('vehicleCount') as string | null
    const file = formData.get('file') as File | null

    // Validate required fields
    if (!insuranceType || !startDate || !fullName || !email || !phone) {
      return {
        success: false,
        error: 'Missing required fields',
      }
    }

    // Calculate if this is a hot lead (effective date within 30 days)
    const effectiveDate = new Date(startDate)
    const today = new Date()
    const daysUntilEffective =
      Math.floor(
        (effectiveDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      ) + 1
    const isHotLead = daysUntilEffective > 0 && daysUntilEffective <= 30

    let fileUrl: string | null = null

    // Upload file to Supabase Storage if provided
    if (file) {
      const fileName = `${Date.now()}-${file.name}`
      const filePath = `policy-docs/${fileName}`

      const { data: uploadData, error: uploadError } =
        await supabase.storage
          .from('policy-docs')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
          })

      if (uploadError) {
        console.error('File upload error:', uploadError)
        // Continue without file URL - don't fail the entire submission
      } else if (uploadData) {
        fileUrl = `${supabaseUrl}/storage/v1/object/public/policy-docs/${filePath}`
      }
    }

    // Insert lead data into Supabase
    const { data: leadData, error: insertError } = await supabase
      .from('leads')
      .insert([
        {
          insurance_type: insuranceType,
          effective_date: startDate,
          is_hot_lead: isHotLead,
          full_name: fullName,
          email,
          phone,
          property_address: propertyAddress || null,
          vehicle_count: vehicleCount || null,
          policy_document_url: fileUrl,
          submitted_at: new Date().toISOString(),
          days_until_effective: daysUntilEffective,
        },
      ])
      .select()

    if (insertError) {
      console.error('Database insert error:', insertError)
      return {
        success: false,
        error: 'Failed to save lead to database',
      }
    }

    const leadId = leadData?.[0]?.id

    return {
      success: true,
      leadId: leadId || undefined,
    }
  } catch (error) {
    console.error('Error submitting lead:', error)
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    }
  }
}"
