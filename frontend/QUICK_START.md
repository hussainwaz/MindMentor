# 🎨 MindMentor - Quick Start Guide

## 🚀 Run the Application

```bash
cd frontend
npm install      # First time only
npm run dev      # Start development server
```

Visit: **http://localhost:3000**

---

## 📄 Page Routes

| Route | Description | Key Features |
|-------|-------------|--------------|
| `/` | Landing Page | Hero, Features, Testimonials, CTA |
| `/tutor` | AI Chat Interface | Real-time chat, Model selector, History |
| `/dashboard` | User Dashboard | Stats, Progress, Achievements, Charts |
| `/auth` | Login/Signup | Social auth, Email/Password |
| `/about` | About/Team | Mission, Tech stack, Team profiles |

---

## 🎨 Design Tokens

### Colors
```javascript
Primary: Indigo (#4F46E5, #6366F1)
Secondary: Cyan (#06B6D4, #0891B2)
Accent: Purple (#9333EA, #A855F7)
Background: White / Gray-950 (dark)
```

### Spacing Scale (Tailwind)
```
xs: 0.5rem (2)    md: 1rem (4)      xl: 1.5rem (6)
sm: 0.75rem (3)   lg: 1.25rem (5)   2xl: 2rem (8)
```

### Border Radius
```
lg: 0.5rem        xl: 0.75rem       2xl: 1rem       3xl: 1.5rem
```

---

## 🧩 Key Components

### Navbar (`components/Navbar.js`)
- Fixed position with glass effect
- Theme toggle (sun/moon)
- Mobile menu (hamburger)
- Smooth scroll behavior
- Logo with glow effect

**Props:** None (self-contained)

### Footer (`components/Footer.js`)
- 4-column link sections
- Social media icons
- Newsletter signup form
- Brand section

**Props:** None (self-contained)

### Loading (`app/loading.js`)
- Animated logo spinner
- Brand name with gradient
- Loading dots
- Auto-displays during navigation

---

## 🎭 Animations

### Framer Motion Patterns

**Page Entrance:**
```javascript
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}
```

**Staggered Children:**
```javascript
variants={containerVariants}
// containerVariants defined with staggerChildren
```

**Hover Effects:**
```javascript
whileHover={{ scale: 1.05, y: -5 }}
whileTap={{ scale: 0.95 }}
```

**Viewport Animations:**
```javascript
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
```

### CSS Animations

**Gradient Shift:**
```css
.animate-gradient {
  background-size: 200% 200%;
  animation: gradient-shift 8s ease infinite;
}
```

**Pulse Glow:**
```css
.animate-pulse-glow {
  animation: pulse-glow 4s ease-in-out infinite;
}
```

**Float:**
```css
.animate-float {
  animation: float 6s ease-in-out infinite;
}
```

---

## 🌓 Theme System

### Toggle Theme
```javascript
const [isDark, setIsDark] = useState(false);

const toggleTheme = () => {
  setIsDark(!isDark);
  document.documentElement.classList.toggle('dark');
};
```

### Dark Mode Classes
```html
<!-- Light mode -->
<div className="bg-white text-gray-900">

<!-- Dark mode -->
<div className="dark:bg-gray-950 dark:text-white">
```

### Glass Effects
```html
<!-- Light glass -->
<div className="glass">

<!-- Strong glass -->
<div className="glass-strong">
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile first approach */
<div className="
  text-base         /* Mobile (default) */
  sm:text-lg        /* Tablet: 640px+ */
  md:text-xl        /* Desktop: 768px+ */
  lg:text-2xl       /* Large: 1024px+ */
">
```

**Common Patterns:**
- `flex-col sm:flex-row` - Stack on mobile, row on tablet+
- `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` - Responsive grid
- `hidden md:block` - Hide on mobile, show on desktop
- `px-4 sm:px-6 lg:px-8` - Responsive padding

---

## 🎨 Utility Classes

### Gradients
```html
<!-- Text gradients -->
<span className="gradient-text">Purple gradient</span>
<span className="gradient-text-cyan">Cyan gradient</span>
<span className="gradient-text-electric">Multi-color</span>

<!-- Background gradients -->
<div className="bg-gradient-to-r from-indigo-600 to-cyan-600">
<div className="bg-gradient-to-br from-purple-500 to-pink-500">
```

### Shadows & Glows
```html
<!-- Drop shadows -->
<div className="shadow-lg shadow-indigo-500/30">

<!-- Glow effects -->
<div className="glow-blue">
<div className="glow-cyan">
<div className="glow-purple">
```

### Glass Morphism
```html
<!-- Standard glass -->
<div className="glass backdrop-blur-10">

<!-- Strong glass -->
<div className="glass-strong backdrop-blur-20">
```

---

## 🔧 Common Customizations

### Change Primary Color
Edit `globals.css`:
```css
:root {
  --primary: #3b82f6;  /* Your color */
}
```

### Adjust Animation Speed
```css
@keyframes gradient-shift {
  /* Change 8s to your duration */
  animation: gradient-shift 5s ease infinite;
}
```

### Modify Spacing
```javascript
// In component:
className="p-8"  // Change to p-6, p-10, etc.
```

### Update Fonts
Edit `layout.js`:
```javascript
import { Inter, Roboto } from "next/font/google";
```

---

## 🐛 Common Issues & Fixes

### Issue: Dark mode not working
**Fix:** Check if `suppressHydrationWarning` is in `<html>` tag
```javascript
<html lang="en" suppressHydrationWarning>
```

### Issue: Animations jerky
**Fix:** Add `will-change` property
```css
.animated-element {
  will-change: transform, opacity;
}
```

### Issue: Glass effect not showing
**Fix:** Check parent has background
```html
<div className="bg-white dark:bg-gray-950">
  <div className="glass">...</div>
</div>
```

### Issue: Mobile menu not closing
**Fix:** Ensure state toggle in Link onClick
```javascript
<Link href="/page" onClick={() => setIsMobileMenuOpen(false)}>
```

---

## 📊 Component State Patterns

### Form State
```javascript
const [formData, setFormData] = useState({
  email: '',
  password: ''
});

<input
  value={formData.email}
  onChange={(e) => setFormData({ 
    ...formData, 
    email: e.target.value 
  })}
/>
```

### Toggle State
```javascript
const [isOpen, setIsOpen] = useState(false);

<button onClick={() => setIsOpen(!isOpen)}>
```

### Loading State
```javascript
const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async () => {
  setIsLoading(true);
  await apiCall();
  setIsLoading(false);
};
```

---

## 🎯 Best Practices

### Performance
✅ Use `whileInView` with `viewport={{ once: true }}`
✅ Lazy load images with Next.js Image component
✅ Keep animations GPU-accelerated (transform, opacity)
✅ Avoid animating width/height (use scale instead)

### Accessibility
✅ Add `aria-label` to icon buttons
✅ Use semantic HTML (`<nav>`, `<main>`, `<footer>`)
✅ Ensure focus indicators are visible
✅ Test keyboard navigation

### Code Organization
✅ Keep components under 300 lines
✅ Extract repeated patterns into components
✅ Use consistent naming conventions
✅ Comment complex logic

---

## 📦 Dependencies Explained

| Package | Purpose |
|---------|---------|
| `next` | React framework with SSR |
| `react` | UI library |
| `react-dom` | React DOM renderer |
| `tailwindcss` | Utility-first CSS |
| `framer-motion` | Animation library |
| `lucide-react` | Icon library |

---

## 🚀 Build & Deploy

### Development
```bash
npm run dev          # Start dev server
```

### Production Build
```bash
npm run build        # Create optimized build
npm run start        # Serve production build
```

### Deploy Options
- **Vercel** (Recommended): `vercel deploy`
- **Netlify**: Connect GitHub repo
- **AWS Amplify**: Follow AWS guide
- **Docker**: Use provided Dockerfile

---

## 📞 Get Help

**Documentation:**
- Next.js: https://nextjs.org/docs
- Tailwind: https://tailwindcss.com/docs
- Framer Motion: https://www.framer.com/motion

**Project Issues:**
- Check DESIGN_GUIDE.md for detailed explanations
- Review component comments for usage
- Test in browser DevTools

---

## ✨ Quick Tips

💡 **Tip 1:** Use browser DevTools to inspect animations
💡 **Tip 2:** Test dark mode with system settings
💡 **Tip 3:** Use Tailwind Play for quick prototyping
💡 **Tip 4:** Keep your gradients subtle for readability
💡 **Tip 5:** Test on real mobile devices, not just browser resize

---

**Happy Coding! Build something amazing! 🚀**
