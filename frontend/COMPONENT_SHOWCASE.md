# 🎨 MindMentor Component Showcase

## Quick Visual Reference for All UI Components

---

## 🎯 Buttons

### Primary Button (Gradient)
```jsx
<button className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all flex items-center space-x-2">
  <Sparkles className="w-5 h-5" />
  <span>Get Started</span>
</button>
```
**Usage:** Primary CTAs, important actions
**Colors:** Indigo → Cyan gradient
**Effects:** Shadow glow, hover shadow increase

### Secondary Button (Glass)
```jsx
<button className="px-8 py-4 rounded-xl glass-strong font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
  Learn More
</button>
```
**Usage:** Secondary actions, alternative paths
**Colors:** Transparent with glass effect
**Effects:** Background darkens on hover

### Icon Button
```jsx
<button className="p-2 rounded-lg glass hover:glass-strong transition-all">
  <Settings className="w-5 h-5" />
</button>
```
**Usage:** Settings, tools, actions
**Size:** 40x40px (p-2 + icon)

---

## 📦 Cards

### Glass Card
```jsx
<div className="p-8 rounded-2xl glass-strong hover:shadow-xl transition-all">
  {/* Content */}
</div>
```
**Usage:** Main content containers
**Padding:** 2rem (8 * 4px)
**Border Radius:** 1rem (2xl)

### Feature Card
```jsx
<div className="p-8 rounded-2xl glass-strong hover:shadow-2xl transition-all duration-300 cursor-pointer group">
  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 mb-5 group-hover:scale-110 transition-transform">
    <Brain className="w-7 h-7 text-white" />
  </div>
  <h3 className="text-xl font-bold mb-3">Feature Title</h3>
  <p className="text-gray-600 dark:text-gray-400">Description text</p>
</div>
```
**Usage:** Features, benefits, services
**Icon Size:** 56x56px
**Hover:** Lifts up, icon scales

### Stat Card
```jsx
<div className="p-6 rounded-2xl glass-strong">
  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 mb-4">
    <Flame className="w-6 h-6 text-white" />
  </div>
  <div className="text-3xl font-bold mb-1">12</div>
  <div className="text-sm font-medium mb-2">Day Streak</div>
  <div className="text-xs text-gray-500">+2 from last week</div>
</div>
```
**Usage:** Metrics, statistics, KPIs
**Layout:** Icon, value, label, change

---

## 💬 Message Bubbles

### User Message
```jsx
<div className="flex gap-4 flex-row-reverse">
  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
    <User className="w-5 h-5 text-white" />
  </div>
  <div className="px-4 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white">
    <p className="text-sm">Message content</p>
  </div>
</div>
```
**Alignment:** Right
**Colors:** Purple → Pink avatar, Indigo → Cyan bubble

### AI Message
```jsx
<div className="flex gap-4">
  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
    <Bot className="w-5 h-5 text-white" />
  </div>
  <div>
    <div className="px-4 py-3 rounded-2xl glass-strong">
      <p className="text-sm text-gray-800 dark:text-gray-200">Message content</p>
    </div>
    <div className="flex items-center gap-2 mt-2">
      <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
        <Copy className="w-4 h-4 text-gray-500" />
      </button>
      {/* More action buttons */}
    </div>
  </div>
</div>
```
**Alignment:** Left
**Colors:** Indigo → Cyan avatar, Glass bubble
**Actions:** Copy, Like, Dislike, Regenerate

---

## 📝 Form Elements

### Input Field with Icon
```jsx
<div className="relative">
  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
  <input
    type="email"
    placeholder="you@example.com"
    className="w-full pl-12 pr-4 py-3 rounded-xl glass-strong focus:outline-none focus:ring-2 focus:ring-indigo-500"
  />
</div>
```
**Icon Position:** Absolute, left-4
**Input Padding:** pl-12 to accommodate icon
**Focus:** Ring with indigo color

### Textarea
```jsx
<textarea
  placeholder="Ask me anything..."
  rows={1}
  className="w-full px-4 py-3 rounded-xl glass-strong resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
  style={{ minHeight: '48px', maxHeight: '120px' }}
/>
```
**Auto-expand:** Use ref and useEffect
**Min Height:** 48px
**Max Height:** 120px

### Select/Dropdown
```jsx
<select className="w-full px-4 py-3 rounded-xl glass-strong appearance-none cursor-pointer font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500">
  <option value="gpt4">🧠 GPT-4</option>
  <option value="deepseek">⚡ DeepSeek</option>
</select>
```
**Appearance:** None (removes default arrow)
**Cursor:** Pointer
**Add:** Custom dropdown arrow with chevron icon

---

## 🏷️ Badges & Pills

### Status Badge
```jsx
<span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-medium">
  Premium
</span>
```
**Sizes:** xs (10-11px)
**Colors:** bg-{color}-500/20, text-{color}-600

### Topic Pill
```jsx
<div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-strong">
  <Sparkles className="w-4 h-4 text-indigo-500" />
  <span className="text-sm font-medium">AI-Powered</span>
</div>
```
**Border Radius:** Full (pill shape)
**Icon + Text:** Horizontal layout

---

## 📊 Progress Bars

### Standard Progress Bar
```jsx
<div className="space-y-2">
  <div className="flex items-center justify-between text-xs">
    <span className="text-gray-600">Progress</span>
    <span className="font-semibold">75%</span>
  </div>
  <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: '75%' }}
      transition={{ duration: 0.8 }}
      className="h-full bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-full"
    />
  </div>
</div>
```
**Height:** 8px (h-2)
**Animation:** Framer Motion width
**Colors:** Gradient fill

---

## 📈 Charts

### Bar Chart
```jsx
<div className="flex items-end justify-between h-48 gap-3">
  {data.map((item, index) => (
    <div key={index} className="flex-1 flex flex-col items-center">
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: `${(item.value / maxValue) * 100}%` }}
        className="w-full bg-gradient-to-t from-indigo-600 to-cyan-600 rounded-t-lg"
      />
      <span className="text-xs mt-2">{item.label}</span>
    </div>
  ))}
</div>
```
**Container Height:** 192px (h-48)
**Bar Width:** flex-1 (equal width)
**Animation:** Height from 0 to calculated %

---

## 🎖️ Achievement Badges

### Unlocked Badge
```jsx
<div className="aspect-square rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center relative group cursor-pointer">
  <Trophy className="w-6 h-6 text-white" />
  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 rounded-xl p-2">
    <div className="text-center">
      <p className="text-xs font-semibold text-white">Achievement Title</p>
      <p className="text-[10px] text-gray-300">Description</p>
    </div>
  </div>
</div>
```
**Aspect Ratio:** Square (1:1)
**Rarity Colors:**
- Platinum: Gray-400 → Gray-600
- Gold: Yellow-400 → Yellow-600
- Silver: Gray-300 → Gray-500
- Bronze: Orange-400 → Orange-600

### Locked Badge
```jsx
<div className="aspect-square rounded-xl glass opacity-30 grayscale flex items-center justify-center">
  <Star className="w-6 h-6 text-white" />
</div>
```
**Opacity:** 30%
**Filter:** Grayscale

---

## 🎨 Gradient Text

### Electric Gradient (Multi-color)
```jsx
<h1 className="gradient-text-electric">
  Your AI Tutor
</h1>
```
**Colors:** Indigo → Purple → Cyan
**Usage:** Main headlines

### Cyan Gradient
```jsx
<span className="gradient-text-cyan">
  Master Any Topic
</span>
```
**Colors:** Cyan → Blue
**Usage:** Subheadings, emphasis

### Purple Gradient
```jsx
<span className="gradient-text">
  Powerful Features
</span>
```
**Colors:** Purple → Pink
**Usage:** Section titles

---

## 🌐 Navigation

### Desktop Nav Link
```jsx
<Link
  href="/page"
  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all"
>
  Page Name
</Link>
```
**Padding:** 16px horizontal, 8px vertical
**Hover:** Color change + background

### Mobile Nav Link
```jsx
<Link
  href="/page"
  className="block px-4 py-3 rounded-lg text-base font-medium hover:text-indigo-600 hover:bg-gray-100 dark:hover:bg-gray-800/50"
>
  Page Name
</Link>
```
**Display:** Block
**Padding:** Larger for touch targets

---

## 🔘 Icon Patterns

### Icon with Gradient Background
```jsx
<div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500">
  <Icon className="w-7 h-7 text-white" />
</div>
```
**Container:** 56x56px
**Icon:** 28x28px
**Border Radius:** xl (12px)

### Icon Button with Glass
```jsx
<button className="p-2 rounded-lg glass hover:glass-strong transition-all">
  <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
</button>
```
**Padding:** 8px
**Icon:** 20x20px
**Total Size:** 36x36px

---

## 🎭 Loading States

### Typing Indicator
```jsx
<div className="flex space-x-2">
  {[0, 1, 2].map((index) => (
    <div
      key={index}
      className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce"
      style={{ animationDelay: `${index * 0.1}s` }}
    />
  ))}
</div>
```
**Dots:** 8x8px
**Spacing:** 8px between
**Animation:** Bounce with staggered delay

### Loading Spinner (Logo)
```jsx
<motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
  className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-600 flex items-center justify-center"
>
  <Brain className="w-6 h-6 text-white" />
</motion.div>
```
**Size:** 48x48px
**Animation:** Continuous rotation

---

## 🎨 Color Reference

### Background Colors
```css
/* Light Mode */
bg-white           /* Pure white */
bg-gray-50         /* Subtle off-white */
bg-gray-100        /* Light gray */

/* Dark Mode */
dark:bg-gray-950   /* Near black */
dark:bg-gray-900   /* Very dark gray */
dark:bg-gray-800   /* Dark gray */
```

### Text Colors
```css
/* Light Mode */
text-gray-900      /* Primary text */
text-gray-600      /* Secondary text */
text-gray-500      /* Tertiary text */

/* Dark Mode */
dark:text-white    /* Primary text */
dark:text-gray-300 /* Secondary text */
dark:text-gray-400 /* Tertiary text */
```

### Accent Colors
```css
/* Gradients */
from-indigo-600 to-cyan-600      /* Primary CTA */
from-purple-500 to-pink-500      /* Creative */
from-blue-500 to-cyan-500        /* Tech */
from-green-500 to-emerald-500    /* Success */
from-orange-500 to-red-500       /* Energy */
```

---

## 📐 Spacing Scale

```css
/* Padding/Margin */
p-2  = 8px       p-6  = 24px
p-3  = 12px      p-8  = 32px
p-4  = 16px      p-10 = 40px
p-5  = 20px      p-12 = 48px

/* Gap (for flex/grid) */
gap-2 = 8px      gap-6 = 24px
gap-3 = 12px     gap-8 = 32px
gap-4 = 16px
```

---

## 🎯 Common Patterns

### Centered Content Container
```jsx
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* Content */}
</div>
```
**Max Width:** 1280px
**Responsive Padding:** 16px → 24px → 32px

### Responsive Grid
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
```
**Mobile:** 1 column
**Tablet:** 2 columns
**Desktop:** 3 columns

### Flex Layout (Responsive)
```jsx
<div className="flex flex-col sm:flex-row items-center gap-4">
  <Button>Primary</Button>
  <Button>Secondary</Button>
</div>
```
**Mobile:** Stacked vertically
**Desktop:** Horizontal row

---

## ✨ Animation Presets

### Fade In + Slide Up
```jsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}
```

### Scale In
```jsx
initial={{ scale: 0.5, opacity: 0 }}
animate={{ scale: 1, opacity: 1 }}
transition={{ type: 'spring', stiffness: 200 }}
```

### Stagger Children
```jsx
variants={{
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}}
```

---

**Use this guide as a quick reference when building new components! 🎨**
