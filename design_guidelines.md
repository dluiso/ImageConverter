# Image Converter - Design Guidelines

## Design Approach
**System**: Hybrid approach inspired by Linear's minimalist clarity + Dropbox's file management UI
**Rationale**: Utility-focused application prioritizing efficiency, clarity, and trust. Clean interface that doesn't distract from the core task while feeling modern and professional.

## Core Design Elements

### A. Color Palette

**Light Mode:**
- Background: 0 0% 100% (pure white)
- Surface: 240 5% 96% (subtle gray for cards)
- Border: 240 6% 90% (soft dividers)
- Text Primary: 240 10% 15% (near black)
- Text Secondary: 240 5% 45% (muted gray)
- Primary Brand: 217 91% 60% (trust-inspiring blue)
- Success: 142 71% 45% (conversion complete)
- Warning: 38 92% 50% (file size warnings)
- Error: 0 84% 60% (validation errors)

**Dark Mode:**
- Background: 240 10% 8% (rich dark)
- Surface: 240 6% 12% (elevated cards)
- Border: 240 5% 20% (subtle contrast)
- Text Primary: 0 0% 95% (off-white)
- Text Secondary: 240 5% 65% (readable gray)
- Primary Brand: 217 91% 65% (slightly brighter blue)
- Success: 142 71% 50%
- Warning: 38 92% 55%
- Error: 0 84% 65%

### B. Typography
- **Font Family**: Inter (Google Fonts) - clean, technical, highly legible
- **Headings**: 
  - H1: 2.5rem (40px), font-weight: 700
  - H2: 1.75rem (28px), font-weight: 600
  - H3: 1.25rem (20px), font-weight: 600
- **Body**: 1rem (16px), font-weight: 400, line-height: 1.6
- **UI Elements**: 0.875rem (14px), font-weight: 500
- **Captions**: 0.75rem (12px), font-weight: 400

### C. Layout System
**Spacing Units**: Tailwind units of 2, 4, 6, 8, 12, 16 (e.g., p-4, gap-6, mt-8)
- Tight spacing: 2-4 units (buttons, form elements)
- Standard spacing: 6-8 units (card padding, section gaps)
- Large spacing: 12-16 units (page sections, major breaks)

**Container**: max-w-6xl centered, px-4 on mobile, px-8 on desktop

### D. Component Library

**1. Upload Zone (Central Focus)**
- Large dashed border (border-2, border-dashed) in border color
- Rounded corners (rounded-xl)
- Min height: 320px on desktop, 240px on mobile
- Center-aligned content with upload icon (64px), heading, and file limits
- Active drag state: border changes to primary blue, slight background tint
- File validation feedback inline with red/yellow indicator

**2. Format Selector**
- Horizontal pill-style radio buttons (rounded-full)
- Active state: primary blue background with white text
- Inactive: border-2 with transparent background
- Icons for each format (use Font Awesome)
- Arranged in responsive grid: 4 columns desktop, 2 columns mobile

**3. Image Cards (Post-Upload)**
- Compact card design (rounded-lg, border, p-4)
- Layout: Thumbnail (60px square) | File info | Format dropdown | Remove button
- Progress bar beneath during conversion (h-1, rounded-full)
- Status indicators: Blue pulsing dot (converting), green checkmark (complete), red X (error)
- Hover state: subtle shadow elevation

**4. Progress Dashboard**
- Fixed position bottom bar (sticky bottom-0) during batch processing
- Overall progress bar (h-2, rounded-full, primary blue fill)
- Time elapsed counter and estimated time remaining
- File count: "3 of 12 converted" with percentage

**5. Download Section**
- Two-button layout: "Download All as ZIP" (primary button) + individual download icons per image
- Primary button: Full-width on mobile, auto-width on desktop, rounded-lg, h-12
- Secondary download buttons: Icon-only (download icon), border variant

**6. Navigation Header**
- Simple top bar with logo/title left, dark mode toggle right
- Height: 64px, border-bottom
- Sticky positioning (sticky top-0, backdrop-blur-md)

### E. Interaction Patterns

**File Upload Flow:**
1. Empty state: Large upload zone with clear call-to-action
2. Dragging: Visual feedback with border color change and scale animation
3. Processing: Individual progress bars + overall batch progress bar
4. Complete: Download buttons appear with success state

**Responsive Breakpoints:**
- Mobile: < 640px (single column, stacked layout)
- Tablet: 640-1024px (2-column grid for format selector)
- Desktop: > 1024px (full multi-column layout)

**Animations:**
- File upload: Fade-in with slight slide-up (200ms)
- Progress bars: Smooth width transitions (300ms ease-in-out)
- Success states: Scale bounce effect (150ms)
- NO continuous animations or distracting motion

**Accessibility:**
- All inputs have visible labels and ARIA attributes
- Keyboard navigation for all interactive elements
- Error messages announced to screen readers
- Color contrast ratios meet WCAG AA standards (4.5:1 minimum)

## Page Structure

**Single Page Application Layout:**
1. **Header** (64px fixed): Logo + Dark mode toggle
2. **Hero Section** (minimal, py-12): Heading "Convert Images Instantly" + subtitle explaining privacy/client-side processing
3. **Converter Interface** (main content):
   - Format selector grid
   - Large upload zone (or image grid if files uploaded)
   - File size limits display (text-sm, text-secondary)
4. **Footer** (py-8): Privacy note "All conversions happen in your browser. Files never leave your device."

## Images
**No hero image required** - This is a utility application where the upload zone IS the hero element. Focus remains on functionality.

**Icon Usage:**
- Font Awesome via CDN for file type icons (fa-file-image, fa-file-code, etc.)
- Upload cloud icon in empty state
- Download icons for individual files
- Format-specific icons in selector (JPG, PNG, WebP, etc.)