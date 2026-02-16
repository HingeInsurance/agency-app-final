'use server'

import { createClient } from '@supabase/supabase-js'

export async function submitLead(formData: FormData) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return { success: false, error: 'Server configuration error' }
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  const full_name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const line_of_business = formData.get('line') as string
  const effective_date = formData.get('date') as string

  let is_hot_lead = false
  if (effective_date) {
    const today = new Date()
    const targetDate = new Date(effective_date)
    const diffTime = targetDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    if (diffDays <= 30 && diffDays > -5) is_hot_lead = true
  }

  const { error } = await supabase.from('leads').insert([{
    full_name, email, phone, line_of_business, effective_date, is_hot_lead
  }])

  if (error) return { success: false, error: error.message }
  return { success: true }
}
