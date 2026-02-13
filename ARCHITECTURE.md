# Architecture & Design Overview

## System Architecture

### Page Flow
```
Landing Page (page.tsx)
    ↓
User clicks "Get Started"
    ↓
FormModal Opens
    ↓
MultiStepForm Starts (Step 1)
    ↓
User Progresses Through Steps 1-4
    ↓
Form Validates at Each Step
    ↓
User Submits on Step 4
    ↓
Success Message Shown
    ↓
Modal Closes Automatically
```

### State Management Flow
```
page.tsx (isFormOpen state)
    ├── HeroSection (onGetStarted prop)
    └── FormModal (isOpen, onClose props)
            └── MultiStepForm (onSuccess prop)
                    ├── formData (useState)
                    ├── currentStep (useState)
                    ├── errors (useState)
                    ├── isSubmitting (useState)
                    └── isSuccess (useState)
```

---

## Component Responsibilities

### Page Component (`page.tsx`)
- **Role**: Main orchestrator
- **State**: `isFormOpen` (boolean)
- **Responsibilities**:
  - Manages modal visibility
  - Renders hero section and form modal
  - Handles high-level navigation

### HeroSection (`hero-section.tsx`)
- **Role**: Landing page hero
- **Props**: `onGetStarted` callback
- **Responsibilities**:
  - Display compelling headline/subheadline
  - Render CTA buttons
  - Call callback on "Get Started" click
  - Show trust badges

### FormModal (`form-modal.tsx`)
- **Role**: Modal container
- **Props**: `isOpen` (boolean), `onClose` callback
- **Responsibilities**:
  - Show/hide modal with animations
  - Handle backdrop click
  - Manage Escape key closing
  - Prevent body scroll when open
  - Handle focus management

### MultiStepForm (`multi-step-form.tsx`)
- **Role**: Form orchestrator
- **State**:
  - `currentStep`: number (1-4)
  - `formData`: FormData interface
  - `errors`: Record of validation errors
  - `isSubmitting`: boolean
  - `isSuccess`: boolean
- **Responsibilities**:
  - Manage all form state
  - Validate each step before progression
  - Render appropriate step component
  - Handle navigation (next/back/submit)
  - Show success state

### Step Components (`step*.tsx`)
- **Role**: Individual form steps
- **Props**: 
  - Current values
  - onChange callbacks
  - Error messages
- **Responsibilities**:
  - Render step-specific UI
  - Handle user interactions
  - Format user input (phone, etc.)
  - Display validation feedback

### ProgressIndicator (`progress-indicator.tsx`)
- **Role**: Visual progress display
- **Props**: `currentStep`, `totalSteps`
- **Responsibilities**:
  - Show progress bar
  - Display step indicators
  - Show step labels
  - Indicate completed steps

### SuccessMessage (`success-message.tsx`)
- **Role**: Success confirmation
- **Props**: `onClose` callback
- **Responsibilities**:
  - Display success animation
  - Show next steps information
  - Timeline expectation
  - Close button callback

---

## Data Flow Diagram

```
User Interaction
    ↓
Component Event Handler
    ↓
Form Data Update
    ↓
Validation Check
    ↓
Error Display (if invalid)
    ↓
Either:
  A) Stay on current step (invalid)
  B) Progress to next step (valid)
  C) Show success (submit)
```

---

## Form State Structure

### FormData Interface
```typescript
{
  insuranceType: 'auto' | 'home' | 'commercial' | null
  startDate: string (YYYY-MM-DD) | null
  fullName: string
  email: string
  phone: string (formatted)
  file: File | null
}
```

### Validation Flow
```
User Input → onChange Handler → updateFormData()
                                    ↓
                            Clear Previous Errors
                                    ↓
                            Update Form State
```

### Submission Flow
```
Click Submit → validateStep(4) → All Valid?
                                    ↓
                            YES: setIsSubmitting(true)
                            Simulate API Call
                            Show Success Message
                                    ↓
                            NO: Show Errors
                            Prevent Submission
```

---

## Mobile Responsive Strategy

### Tailwind Breakpoints Used
```
Mobile First (0px - 640px)
    ↓ sm: 640px
Tablet (640px - 1024px)
    ↓ md: 768px, lg: 1024px
Desktop (1024px+)
```

### Responsive Classes Applied

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Hero Headline | text-4xl | text-5xl | lg:text-6xl |
| Form Modal | Full-screen slide up | Slightly wider | md:rounded-2xl |
| Buttons | w-full (full width) | w-auto | w-auto |
| Gap | gap-4 | gap-4 | gap-6 |
| Padding | px-4 | px-4 | sm:px-6 |

---

## Accessibility Implementation

### Semantic HTML
```html
<form>
  <label htmlFor="name">Name</label>
  <input id="name" type="text" />
  
  <button type="submit">Submit</button>
</form>
```

### Focus Management
```
Modal Opens
    ↓
First focusable element gets focus
    ↓
Tab navigates through form
    ↓
Shift+Tab goes backward
    ↓
Escape closes modal
    ↓
Focus returns to trigger button
```

### Error Communication
```
Validation Fails
    ↓
aria-invalid="true"
aria-describedby="field-error"
    ↓
Error message displayed
    ↓
Input highlighted in red
```

---

## File Upload Flow

```
User Selects File
    ↓
Validate File Type & Size
    ↓
File Valid?
    ├─ YES → Show Preview
    │         Enable Submit
    └─ NO → Show Error Message
            Clear Input
```

### Validation Rules
- **Types**: JPG, PNG, WebP, PDF
- **Size**: Maximum 5MB
- **Drag-Drop**: Works on desktop
- **Click-Browse**: Works everywhere

---

## Styling Architecture

### Design Token Hierarchy
```
CSS Variables (:root)
    ↓
Tailwind Config Maps
    ↓
Tailwind Classes (utility)
    ↓
Component Styling
```

### Color Application Example
```
:root {
  --primary: 217 100% 43%;  /* Define in CSS */
}
    ↓
tailwind.config.ts {
  colors: {
    primary: 'hsl(var(--primary))'  /* Map in Tailwind */
  }
}
    ↓
Component:
className="bg-primary"  /* Use in components */
```

---

## Error Handling Strategy

### Step-Level Validation
```
validateStep(stepNumber) → boolean
    ↓
Checks specific step requirements
    ↓
Returns true/false
    ↓
Updates errors state with details
```

### Global Error Display
```
Submit Button Click
    ↓
validateStep(4) → false?
    ↓
YES: Display error above form
    ↓
NO: Proceed to submission
```

### User Feedback
```
Invalid Input
    ├── Field turns red
    ├── Error message appears below
    ├── Icon shows error state
    └── User cannot proceed
```

---

## Performance Optimization Points

### Bundle Size Reduction
```
Lucide Icons → Tree-shaked (only used icons)
Tailwind CSS → Purged in production
Form Modal → Ready for code-splitting
```

### Runtime Performance
```
Validation → Debounced where possible
Re-renders → Minimized via proper state
Input Changes → Handled efficiently
Modal Animations → Hardware accelerated (transform)
```

---

## Integration Points

### Backend Integration
```
Submission Handler
    ↓
POST /api/insurance-quote
    ├── Body: FormData
    ├── Content-Type: multipart/form-data
    └── Response: { success: true, quoteId: "..." }
        ↓
    Update Success State
        ↓
    Show Success Message
        ↓
    Close Modal
```

### File Storage Integration
```
File Upload Complete
    ↓
Call File Upload Service
    ├── AWS S3
    ├── Cloudinary
    ├── Or Backend
    └── Return file URL
        ↓
    Store URL in formData
        ↓
    Include in submission
```

---

## Security Considerations

### Input Validation
```
Email → Valid format check (regex)
Phone → Valid format check (regex)
File → Type whitelist, size limit
Name → Length validation
```

### File Upload Security
```
File Selected
    ├── Check MIME type
    ├── Check file extension
    ├── Check file size
    └── Reject if invalid
        ↓
    Only send valid files to API
```

### Form Submission
```
All Data Validated Client-Side
    ↓
POST to Backend
    ↓
Backend Re-validates (never trust client)
    ↓
Process & Store Securely
```

---

## Testing Strategy

### Unit Tests
```
validateEmail(email) → boolean
validatePhone(phone) → boolean
formatPhone(input) → formatted
```

### Integration Tests
```
Complete Form Flow
    ├── Fill Step 1
    ├── Fill Step 2
    ├── Fill Step 3
    ├── Upload File
    └── Submit Successfully
```

### E2E Tests
```
User Journey
    ├── Land on page
    ├── Click "Get Started"
    ├── Complete form
    ├── See success message
    └── Modal closes
```

---

## Future Scalability

### Adding Features
```
New Step?
    └── Create /components/form/step5-*.tsx
        Add to TOTAL_STEPS
        Add to renderStep() switch
        Add validation logic
        Add to ProgressIndicator

New Field Type?
    └── Create /components/form-field-*.tsx
        Reuse in step components
        Add validation function
```

### Adding Integrations
```
Email Notifications?
    └── Backend receives form data
        Sends confirmation email

Analytics?
    └── Add tracking on key events
        Button clicks
        Step completions
        Form submission

Saved Quotes?
    └── User authentication
        Database storage
        Quote history page
```

---

This architecture ensures maintainability, accessibility, and scalability while keeping code clean and understandable.
