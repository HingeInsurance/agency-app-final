# Quick Start Guide

## Getting Started

### Preview the Application
1. Click the Preview button in v0
2. The landing page loads with hero section
3. Click "Get Started" to open the insurance quote form

### Form Navigation
1. **Step 1**: Select insurance type (Auto, Home, or Commercial)
2. **Step 2**: Choose coverage start date
3. **Step 3**: Enter your contact information
4. **Step 4**: Upload your insurance declarations page
5. **Submit**: Review and submit your quote request

---

## File Structure Quick Reference

```
Components Used:
- /components/hero-section.tsx          → Hero banner with CTA buttons
- /components/form-modal.tsx            → Modal container
- /components/multi-step-form.tsx       → Form state and orchestration
- /components/form/step*.tsx            → Individual form steps
```

---

## Customization Quick Tips

### Change Brand Color
Edit `/app/globals.css` line 12:
```css
--primary: 217 100% 43%;  /* Change these HSL values */
```

### Change Form Copy
Edit individual files:
- Hero text: `/components/hero-section.tsx` (line 20-22)
- Step headers: `/components/form/step*.tsx` files

### Add New Insurance Type
1. Edit `/components/form/step1-insurance-type.tsx`
2. Add to `insuranceOptions` array
3. Add new icon from Lucide React

### Integrate Backend API
1. Open `/components/multi-step-form.tsx`
2. Find `handleSubmit()` function (line 113)
3. Replace the timeout with your API call:
```typescript
const response = await fetch('/api/insurance-quote', {
  method: 'POST',
  body: formData,
})
```

---

## Key Features at a Glance

| Feature | Location | Status |
|---------|----------|--------|
| Hero Section | `hero-section.tsx` | ✓ Ready |
| Modal Form | `form-modal.tsx` | ✓ Ready |
| Step 1: Insurance Type | `form/step1-insurance-type.tsx` | ✓ Ready |
| Step 2: Start Date | `form/step2-start-date.tsx` | ✓ Ready |
| Step 3: Personal Info | `form/step3-personal-info.tsx` | ✓ Ready |
| Step 4: File Upload | `form/step4-file-upload.tsx` | ✓ Ready |
| Progress Indicator | `form/progress-indicator.tsx` | ✓ Ready |
| Success Message | `form/success-message.tsx` | ✓ Ready |
| Accessibility | All components | ✓ WCAG 2.1 AA |
| Mobile Responsive | All components | ✓ Mobile-first |

---

## Common Tasks

### Test on Mobile
1. Open preview in mobile browser
2. Verify 44px minimum touch targets
3. Test form input on mobile keyboard
4. Test landscape orientation

### Check Accessibility
1. Open DevTools → Accessibility
2. Run axe DevTools audit
3. Check color contrast (target 4.5:1)
4. Test keyboard navigation (Tab key)
5. Test with screen reader

### Customize Error Messages
1. Open relevant step component
2. Find error message strings
3. Update text as needed
4. Errors appear in red boxes with icons

### Add Form Analytics
1. In `multi-step-form.tsx` `handleSubmit()`
2. Add tracking before API call:
```typescript
gtag.event('quote_submitted', {
  insurance_type: formData.insuranceType,
  timestamp: new Date()
})
```

---

## Design System

### Colors
- **Primary Blue**: #2563eb (trust, CTAs)
- **Secondary Blue**: #3b82f6 (accents)
- **Success Green**: #059669 (validation)
- **Error Red**: #ef4444 (errors)
- **Background**: #ffffff (main)
- **Foreground**: #1f2937 (text)

### Spacing
- Mobile: 16px padding
- Desktop: 32px padding
- Gap between items: 16-24px

### Typography
- Headings: Bold, 24-48px
- Body: Regular, 16px minimum
- Labels: Semibold, 14px

### Touch Targets
- Minimum: 44x44px
- Buttons: Full width on mobile
- Form fields: 44px height minimum

---

## Troubleshooting

### Form Not Submitting
- Check all required fields are filled
- Verify no validation errors shown
- Check browser console for errors
- Ensure file upload not pending

### File Upload Issues
- Verify file type (JPG, PNG, WebP, PDF)
- Check file size (max 5MB)
- Ensure proper permissions
- Try different file if error persists

### Mobile Layout Issues
- Check viewport meta tag in layout.tsx
- Verify Tailwind mobile classes applied
- Test with `max-width: 640px` DevTools setting
- Check for hardcoded pixel values

### Accessibility Issues
- Test with keyboard only (Tab/Shift+Tab)
- Run axe DevTools audit
- Check focus indicators visible
- Verify color contrast with WCAG tool

---

## Performance Tips

### Optimize Bundle
- Tree-shake unused Lucide icons
- Minify production CSS with Tailwind
- Lazy load form modal if needed
- Use Next.js Image for any hero images

### Improve Loading
- Preload critical CSS
- Defer non-critical JavaScript
- Use image optimization
- Enable gzip compression

---

## Before Going Live

### Checklist
- [ ] Test form submission with backend
- [ ] Set up email notifications
- [ ] Configure file storage (AWS S3, etc.)
- [ ] Add analytics tracking
- [ ] Test on real mobile devices
- [ ] Run accessibility audit
- [ ] Set up error logging (Sentry)
- [ ] Add HTTPS certificate
- [ ] Set up CDN for assets
- [ ] Create privacy policy link
- [ ] Test across browsers
- [ ] Performance optimize images

---

## Need Help?

**Read**: See `IMPLEMENTATION_GUIDE.md` for detailed architecture
**Reference**: Check component files for inline code comments
**Expand**: Existing patterns in files are models for new features

---

## Next Steps

1. **Test the form**: Complete full form flow
2. **Check responsive**: View on multiple devices
3. **Connect backend**: Replace API simulation
4. **Customize content**: Update copy and branding
5. **Deploy**: Push to production via Vercel

---

Good luck with your insurance agency landing page!
