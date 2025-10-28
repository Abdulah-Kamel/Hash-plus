# Landing Page - هاش بلس

## Overview

A fully responsive, RTL-supported Arabic landing page for the هاش بلس educational platform built with Next.js, Tailwind CSS, and modern React components.

## 📁 File Structure

```
src/
├── app/
│   └── landing/
│       └── page.js              # Main landing page
└── components/
    └── landing/
        ├── index.js             # Component exports
        ├── HeroLanding.jsx      # Hero section with title
        ├── AboutSection.jsx     # About platform section
        ├── VisionMission.jsx    # Vision & mission with card
        ├── FeaturesGrid.jsx     # 6 feature cards grid
        ├── ContactSection.jsx   # Contact form + support info
        ├── CoursesShowcase.jsx  # Course cards showcase
        └── CTABanner.jsx        # Call-to-action banner
```

## 🎨 Design System

### Colors

- **Primary**: `#635BFF` (Purple)
- **Secondary**: `#A162F7`
- **Accent**: `#00C6AE` (Teal)
- **Text**: `#1A1A1A`
- **Light Background**: `#F9F9FF`

### Typography

- Font Family: System fonts with fallback to sans-serif
- Recommended: Use "Tajawal" or "Cairo" for Arabic text
- Sizes: Responsive scaling from mobile to desktop

### Spacing & Layout

- Rounded corners: `rounded-2xl`, `rounded-3xl`
- Generous padding: `p-6`, `p-8`, `p-10`
- Consistent gaps: `gap-6`, `gap-8`
- Container max-width for content

## 📱 Sections

### 1. Hero Section

- **Component**: `HeroLanding`
- **Features**:
  - Purple gradient background
  - Decorative SVG elements
  - Centered title "عن المنصة"
  - Responsive padding

### 2. About Section

- **Component**: `AboutSection`
- **Layout**: Two-column grid (logo card + content)
- **Features**:
  - Gradient purple card with logo
  - Badge, heading, and description text
  - RTL text alignment

### 3. Vision & Mission

- **Component**: `VisionMission`
- **Layout**: Two-column grid (text + card)
- **Features**:
  - Vision text block
  - Mission list with styled items
  - Gradient card with decorative SVG
  - Pill badges

### 4. Features Grid

- **Component**: `FeaturesGrid`
- **Layout**: 3-column grid (responsive to 1 column on mobile)
- **Features**:
  - 6 feature cards with icons
  - Hover animations (lift effect)
  - "اكتشف أكثر" links
  - SVG icons inline

### 5. Contact Section

- **Component**: `ContactSection`
- **Layout**: Two-column grid (form + info)
- **Features**:
  - Contact form (name, email, message)
  - Support information card
  - Social media links
  - Decorative starburst SVG
  - Client-side form handling

### 6. Courses Showcase

- **Component**: `CoursesShowcase`
- **Layout**: 3-column grid of course cards
- **Features**:
  - Course cards with gradient backgrounds
  - Rating stars display
  - Badge labels (جديد, شائع, متقدم)
  - CTA buttons below grid

### 7. CTA Banner

- **Component**: `CTABanner`
- **Features**:
  - Bold purple gradient background
  - Multiple decorative shapes
  - Statistics grid (4 stats)
  - Two CTA buttons
  - White text overlay

## 🔧 Technical Features

### Responsive Design

- **Mobile First**: All components stack vertically on mobile
- **Breakpoints**:
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px

### RTL Support

- All text sections use `dir="rtl"`
- Text alignment: `text-right`
- Flex/grid ordering for layout mirroring
- Icons and arrows rotated appropriately

### Animations

- Hover effects: `-translate-y-1`, `-translate-y-2`
- Smooth transitions: `transition-all duration-300`
- Shadow elevation on hover
- Color transitions on interaction

### Accessibility

- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Focus states on interactive elements

## 🚀 Usage

### Access the Landing Page

Navigate to: `/landing`

### Customize Content

Edit the component files in `src/components/landing/` to update:

- Text content
- Images and icons
- Colors and styling
- Layout structure

### Add Custom Fonts

Update `src/app/layout.js` to include Arabic fonts:

```javascript
import { Tajawal } from "next/font/google";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800"],
});
```

### Customize Colors

Update Tailwind config or use CSS variables for consistent theming.

## 📦 Dependencies

Required packages (should already be in your project):

- `next` - Next.js framework
- `react` - React library
- `tailwindcss` - Utility-first CSS
- `next/image` - Optimized image component

## 🎯 Performance Optimizations

- Image optimization with Next.js Image component
- Component-based architecture for code splitting
- Minimal dependencies
- Optimized SVG usage (inline where small)
- Efficient CSS with Tailwind's purge

## 🔄 Future Enhancements

Consider adding:

- Animation library (Framer Motion) for advanced effects
- Internationalization (i18n) for multi-language support
- Form validation library (React Hook Form + Zod)
- API integration for contact form
- Analytics tracking
- SEO metadata optimization

## 📝 Notes

- All components are fully typed with proper props
- SVG icons are inline for better control
- Gradient backgrounds follow design system
- Consistent spacing throughout
- Mobile-optimized touch targets (min 44x44px)

---

Built with ❤️ for هاش بلس platform
