# Insurance Lead Capture Form - Setup Guide

## Quick Start

### 1. Environment Variables

Set these variables in your Vercel project settings:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 2. Database Setup

Run this SQL in your Supabase SQL editor to create the leads table:

```sql
CREATE TABLE leads (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  created_at TIMESTAMP DEFAULT NOW(),
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  insurance_type VARCHAR(50) NOT NULL,
  start_date DATE,
  property_address VARCHAR(500),
  vehicle_count VARCHAR(50),
  declarations_file_url VARCHAR(500),
  is_hot_lead BOOLEAN DEFAULT FALSE,
  lead_score INT DEFAULT 0,
  created_day_of_week VARCHAR(10),
  created_time_of_day VARCHAR(50),
  ip_address VARCHAR(50),
  user_agent TEXT
);

-- Create index for faster queries
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_created_at ON leads(created_at);
CREATE INDEX idx_leads_is_hot ON leads(is_hot_lead);
```

### 3. Storage Setup

Create a new storage bucket in Supabase:

1. Go to Storage in Supabase dashboard
2. Create new bucket named `declarations`
3. Set bucket to private
4. Add these storage policies for authenticated uploads

### 4. Deploy to Vercel

```bash
# Install dependencies
pnpm install

# Deploy
pnpm run build
vercel deploy
```

## Features

### Multi-Step Form
- Step 1: Insurance Type (Auto, Home, Commercial)
- Step 2: Coverage Start Date
- Step 3: Personal Information + Conditional Fields
- Step 4: Declarations File Upload

### Conditional Fields
- **Auto**: Number of vehicles (1, 2, 3, 4+)
- **Home**: Property address
- **Commercial**: Business type

### Hot Lead Detection
Automatic scoring based on:
- Complete information
- Immediate start date
- Business hours submission
- Weekday submission

### File Upload
- Supports: JPG, PNG, WebP, PDF
- Max size: 5MB
- Stored in Supabase Storage

## Testing

### Test the Form Locally

```bash
pnpm dev
```

Visit `http://localhost:3000` and fill out the form.

### Test Hot Lead Detection

Submit a form with:
- Immediate start date (within 7 days)
- All optional fields filled
- During business hours
- On a weekday

Check the Supabase console to verify `is_hot_lead = true`.

## File Structure

```
app/
├── actions/
│   └── submit-lead.ts          # Server action for form submission
├── layout.tsx                  # App layout with metadata
└── page.tsx                    # Main landing page

components/
├── hero-section.tsx            # Hero with CTA buttons
├── form-modal.tsx              # Modal container
├── multi-step-form.tsx         # Form orchestration
└── form/
    ├── progress-indicator.tsx  # Step progress
    ├── step1-insurance-type.tsx
    ├── step2-start-date.tsx
    ├── step3-personal-info.tsx # Conditional fields
    ├── step4-file-upload.tsx
    └── success-message.tsx

lib/
└── supabase.ts                 # Supabase client initialization

styles/
└── globals.css                 # Design tokens and utilities
```

## Troubleshooting

### "Supabase environment variables not set"
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
- Redeploy after adding env vars
- Check Vercel dashboard under Settings > Environment Variables

### File upload fails
- Check storage bucket permissions
- Verify file size is under 5MB
- Ensure file format is supported

### Form won't submit
- Check browser console for errors
- Verify database table exists
- Check Supabase logs for details

### Hot leads not detected
- Verify all optional fields are filled
- Check system time (must be during business hours)
- Verify start date is within 7 days

## Customization

### Change Colors
Edit design tokens in `app/globals.css`:
- Primary blue: `--primary: 217 100% 43%`
- Success green: `--success: 142 72% 29%`
- Accent: `--accent: 217 100% 43%`

### Adjust Hot Lead Scoring
Edit `app/actions/submit-lead.ts`:
- Modify scoring weights
- Adjust threshold (default 40)
- Add/remove scoring factors

### Add New Conditional Fields
1. Update `Step3PersonalInfo` component
2. Add field to `FormData` interface
3. Add validation in `multi-step-form.tsx`
4. Update database schema
5. Modify `submitLead` server action

## Performance Tips

- Images are optimized with Next.js Image component
- Icons use Lucide React (tree-shakeable)
- CSS is purged to production size
- Form uses client-side validation only (no round trips)

## Security

- All API calls use HTTPS
- Form data validated server-side
- Files scanned before storage
- Environment variables kept secure
- Row-level security can be enabled in Supabase

## Next Steps

1. Implement email confirmation workflow
2. Add SMS notifications for hot leads
3. Connect to CRM system
4. Set up lead assignment logic
5. Add analytics tracking
6. Create admin dashboard for lead management
