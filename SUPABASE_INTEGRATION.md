# Supabase Integration Guide

## Overview

This document outlines how the insurance lead capture form integrates with Supabase to store lead submissions.

## Environment Setup

Add these environment variables to your Vercel project:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

These are public variables (prefixed with `NEXT_PUBLIC_`) and are safe to expose in the browser.

## Database Schema

The `leads` table should have the following structure:

```sql
CREATE TABLE leads (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  created_at TIMESTAMP DEFAULT NOW(),
  
  -- Personal Information
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  
  -- Insurance Details
  insurance_type VARCHAR(50) NOT NULL, -- 'auto', 'home', or 'commercial'
  start_date DATE,
  
  -- Conditional Fields
  property_address VARCHAR(500),
  vehicle_count VARCHAR(50),
  
  -- File Upload
  declarations_file_url VARCHAR(500),
  
  -- Lead Classification
  is_hot_lead BOOLEAN DEFAULT FALSE,
  lead_score INT DEFAULT 0,
  created_day_of_week VARCHAR(10),
  created_time_of_day VARCHAR(50),
  
  -- Additional Metadata
  ip_address VARCHAR(50),
  user_agent TEXT
);
```

## Hot Lead Detection

The system automatically classifies leads as "hot leads" based on:

- **High Intent Signals**:
  - Immediate start date (within 7 days)
  - Complete profile with all optional fields filled
  - Valid phone number
  - Professional email domain

- **Timing Factors**:
  - Submission during business hours (9 AM - 6 PM)
  - Weekday submissions
  - Rapid form completion

- **Lead Score Calculation**:
  - Base score: 0
  - Complete contact info: +10
  - Immediate start date: +15
  - Property address provided: +10
  - Submitted during business hours: +10
  - Weekday submission: +5
  - **Hot Lead Threshold**: Score ≥ 40

## File Upload

The form supports file uploads (images and PDFs) with a max size of 5MB. Files are stored in Supabase Storage:

- Storage bucket: `declarations`
- Naming convention: `${leadId}/${timestamp}-${originalFilename}`

## Integration Points

### 1. Supabase Client Initialization (`lib/supabase.ts`)

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### 2. Server Action (`app/actions/submit-lead.ts`)

Handles:
- Form data validation
- Hot lead detection logic
- File upload to Supabase Storage
- Lead record creation in database
- Error handling and logging

### 3. Form Component Integration (`components/multi-step-form.tsx`)

The form calls `submitLead()` server action with:
- Insurance type
- Start date
- Personal information (name, email, phone)
- Conditional fields (property address, vehicle count)
- Declarations file

## Conditional Fields by Insurance Type

### Auto Insurance
- **Vehicle Count**: Dropdown (1, 2, 3, 4+)
- Used for multi-vehicle discount calculations

### Home Insurance
- **Property Address**: Text input
- Used for risk assessment and location-based pricing

### Commercial Insurance
- **Business Type**: Dropdown (Retail, Services, Contractor, Manufacturing, Other)
- Used for coverage type recommendations

## Data Validation

**Email Validation**:
- Standard email format validation
- Must be unique per IP/day to prevent spam

**Phone Validation**:
- Minimum 10 digits
- Supports international formats

**Date Validation**:
- Start date must be within next 365 days
- Cannot be in the past

**File Validation**:
- Accepted formats: JPG, PNG, WebP, PDF
- Maximum file size: 5MB

## Hot Lead Workflow

1. User submits form
2. Server action validates data
3. File uploaded to Supabase Storage
4. Lead record created in database
5. Hot lead score calculated
6. If hot lead (score ≥ 40):
   - Flag as `is_hot_lead = true`
   - Potentially trigger real-time notifications
   - Add to priority queue for agent follow-up

## Error Handling

Common error scenarios:

- **Missing Environment Variables**: Warning logged, form submission fails gracefully
- **File Upload Failure**: User notified, form can be resubmitted
- **Database Error**: Transaction rolled back, user sees generic error
- **Validation Errors**: Returned to form for user correction

## Security Considerations

1. **Row Level Security (RLS)**: Implement policies to restrict direct database access
2. **File Storage**: Files stored in private bucket, served only through authenticated URLs
3. **Rate Limiting**: Consider implementing rate limiting to prevent spam
4. **Data Privacy**: All data encrypted in transit via HTTPS
5. **Email Verification**: Consider adding email verification for high-priority leads

## Future Enhancements

- Real-time notifications for hot leads
- Lead assignment workflow
- Email confirmation to users
- SMS notifications for hot leads
- Integration with CRM systems
- Lead scoring refinement based on actual conversion data
