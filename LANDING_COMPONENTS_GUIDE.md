# Landing Page Components Guide

## 🎯 Quick Reference

### Page Structure Flow

```
┌─────────────────────────────────────┐
│         Navbar (Global)              │
├─────────────────────────────────────┤
│     1. HeroLanding                   │
│     Purple banner with title         │
├─────────────────────────────────────┤
│     2. AboutSection                  │
│     Logo card + description          │
├─────────────────────────────────────┤
│     3. VisionMission                 │
│     Vision text + mission list       │
├─────────────────────────────────────┤
│     4. FeaturesGrid                  │
│     6 feature cards (3x2)            │
├─────────────────────────────────────┤
│     5. ContactSection                │
│     Form + support info              │
├─────────────────────────────────────┤
│     6. CoursesShowcase               │
│     3 course cards + CTAs            │
├─────────────────────────────────────┤
│     7. CTABanner                     │
│     Purple banner with stats         │
├─────────────────────────────────────┤
│         Footer (Global)              │
└─────────────────────────────────────┘
```

## 📦 Component Details

### 1. HeroLanding

**Purpose**: Eye-catching hero section introducing the page  
**Key Features**:

- Full-width purple gradient background
- Decorative SVG elements (chessboard, course icon)
- Centered white text "عن المنصة"
- Additional decorative circles with blur effects

**Props**: None  
**Responsive**: Adjusts padding and text size

---

### 2. AboutSection

**Purpose**: Introduce the هاش بلس platform  
**Key Features**:

- Two-column layout (logo card + content)
- Gradient purple card with geometric pattern
- Badge, heading, and two descriptive paragraphs
- RTL text alignment

**Props**: None  
**Layout**:

- Desktop: Side-by-side columns
- Mobile: Stacked (logo on top)

---

### 3. VisionMission

**Purpose**: Share vision and mission statements  
**Key Features**:

- Vision paragraph
- Mission items in styled list
- Gradient card with badges
- Decorative SVG in card corner

**Props**: None  
**Content**:

- Vision: Long-form text
- Mission: 4 bullet points with dots

---

### 4. FeaturesGrid

**Purpose**: Highlight platform features  
**Key Features**:

- 6 feature cards in responsive grid
- Each card: icon, title, description, "اكتشف أكثر" link
- Hover animations (lift + shadow)
- SVG icons inline

**Props**: None  
**Grid**:

- Desktop: 3 columns
- Tablet: 2 columns
- Mobile: 1 column

**Feature List**:

1. محتوى تعليمي شامل
2. شهادات معتمدة
3. مجتمع داعم ومتفاعل
4. تعلم من أي مكان
5. مسارات تعليمية مخصصة
6. حلول مبتكرة ومتطورة

---

### 5. ContactSection

**Purpose**: Contact form and support information  
**Key Features**:

- Contact form (name, email, message)
- Form validation (HTML5 required)
- Support info card with email and hours
- Social media links
- Decorative starburst shape

**Props**: None  
**State**: Uses useState for form data  
**Layout**:

- Desktop: Form left, info right
- Mobile: Info top, form bottom

---

### 6. CoursesShowcase

**Purpose**: Display featured courses  
**Key Features**:

- 3 course cards with gradient backgrounds
- Rating display with stars
- Badge labels (جديد, شائع, متقدم)
- Two CTA buttons below

**Props**: None  
**Courses**:

1. JavaScript - Rating 5.0 - Badge: جديد
2. HTML - Rating 4.8 - Badge: شائع
3. CSS - Rating 4.9 - Badge: متقدم

---

### 7. CTABanner

**Purpose**: Final call-to-action section  
**Key Features**:

- Bold purple gradient background
- Multiple decorative shapes (circles, plus signs, squares)
- Large heading and description
- Two CTA buttons
- Statistics grid (4 stats)

**Props**: None  
**Stats**:

- +10,000 طالب نشط
- +500 دورة تدريبية
- +100 مدرب محترف
- 4.9 تقييم المنصة

---

## 🎨 Styling Patterns

### Consistent Patterns Used

**Badges**:

```jsx
<span className="rounded-full bg-primary/10 px-5 py-2 text-sm font-semibold text-primary">
  Badge Text
</span>
```

**Headings**:

```jsx
<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
  Heading Text
</h2>
```

**Paragraphs**:

```jsx
<p className="text-base md:text-lg text-gray-600 leading-relaxed">
  Paragraph text
</p>
```

**Primary Buttons**:

```jsx
<button className="px-8 py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg">
  Button Text
</button>
```

**Secondary Buttons**:

```jsx
<button className="px-8 py-4 bg-white text-primary font-semibold rounded-xl border-2 border-primary hover:-translate-y-0.5">
  Button Text
</button>
```

**Cards**:

```jsx
<div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
  Card content
</div>
```

---

## 🔄 Customization Guide

### Changing Colors

Find and replace these classes:

- `bg-primary` or `bg-[#635BFF]` → Your primary color
- `text-primary` → Text in primary color
- `bg-[#00C6AE]` → Accent teal color

### Adding New Sections

1. Create new component in `src/components/landing/`
2. Import and add to `page.js`
3. Follow RTL and responsive patterns
4. Update exports in `index.js`

### Modifying Content

Edit the inline content in each component file:

- Text strings are hardcoded for simplicity
- For dynamic content, pass as props
- For CMS integration, fetch data and pass down

---

## ⚡ Performance Tips

1. **Images**: Use Next.js Image component for optimization
2. **Fonts**: Preload custom fonts in layout
3. **Code Splitting**: Components auto-split by Next.js
4. **CSS**: Tailwind purges unused styles
5. **SVGs**: Inline small icons, external for large

---

## 🐛 Common Issues

### Issue: Text not RTL

**Solution**: Add `dir="rtl"` to parent div

### Issue: Icons not aligned

**Solution**: Use flex with `items-center` and `justify-center`

### Issue: Mobile layout broken

**Solution**: Check responsive classes (sm:, md:, lg:)

### Issue: Form not submitting

**Solution**: Add `onSubmit` handler and `type="submit"` to button

---

## 📱 Responsive Breakpoints

| Breakpoint | Min Width | Typical Use   |
| ---------- | --------- | ------------- |
| `sm`       | 640px     | Large phones  |
| `md`       | 768px     | Tablets       |
| `lg`       | 1024px    | Desktops      |
| `xl`       | 1280px    | Large screens |

### Grid Patterns

- **Desktop**: `lg:grid-cols-3` (3 columns)
- **Tablet**: `md:grid-cols-2` (2 columns)
- **Mobile**: `grid-cols-1` (1 column, default)

---

## 🌐 RTL Implementation

All sections implement RTL through:

1. `dir="rtl"` on container
2. `text-right` for text alignment
3. Reversed flex/grid order where needed
4. Rotated icons (arrows, etc.)

Example:

```jsx
<div dir="rtl" className="text-right">
  <h2>عنوان</h2>
  <p>نص عربي</p>
</div>
```

---

## 📞 Support

For questions or issues with this landing page implementation:

1. Check component file directly
2. Review LANDING_PAGE_README.md
3. Inspect browser console for errors
4. Verify Tailwind config is correct

Happy coding! 🚀
