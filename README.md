# Lifetour - Mountain Tours Landing Page

> Modern, responsive landing page for a Russian tour company specializing in mountain adventures in the Caucasus, Altai, and Dagestan regions.

---

## 📸 Preview

<div align="center">
<picture>
  <source media="(min-width: 1440px)" srcset="bitmaps_reference/test-pp/hero-2-desktop.jpg">
  <source media="(min-width: 768px)" srcset="bitmaps_reference/test-pp/hero-2-tablet.jpg">
  <img src="bitmaps_reference/test-pp/hero-2-mobile.jpg" alt="Lifetour hero section preview">
</picture>
</div>

**🔗 Live Demo:** [View on GitHub Pages](https://olgagulyakevich.github.io/travel-landing-swiper-responsive/)

---

## 📋 About the Project

**Why Russian Language?**
This is a real-world project for a Russian tour company targeting Russian-speaking audiences in Russia, CIS countries, and Russian-speaking communities abroad.

**Business Model:**
The company offers a limited number of curated tours per season (5-12 tours), with bookings opening months in advance. This seasonal, boutique approach influenced key technical decisions:

- **Modal Windows** for tour details instead of separate pages (optimal UX for small tour catalog)
- **Dynamic JSON** data loading (easy content updates between seasons)
- **Semantic HTML** content areas (flexible for tour description updates)

**Target Audience:**
- Russian-speaking adventure travelers
- Desktop & mobile users (70% mobile traffic)
- Modern browsers: Chrome, Safari, Firefox (97%+ market share)

**Technical Challenge:**
Build a pixel-perfect, production-ready landing page following strict HTML Academy quality criteria with comprehensive automated testing (30 test scenarios).

---

## ✨ Key Features

### 🎨 **Modern UX/UI**
- ✅ Fully responsive design (320px - 1440px+)
- ✅ Pixel-perfect implementation (±2px tolerance)
- ✅ Smooth scroll animations with Intersection Observer
- ✅ Modal windows for tours catalog and details
- ✅ Accessible keyboard navigation (WCAG AA)

### ⚡ **Performance Optimized**
- ✅ **WebP images** with JPEG fallback (30-50% traffic savings)
- ✅ **Lazy loading** for off-screen images
- ✅ **Retina support** (@1x, @2x srcset)
- ✅ **Build-time optimization** (JPEG quality: 80)
- ✅ **Layout shift prevention** (width/height attributes)
- 🎯 **Lighthouse Score:** 95+ Performance

### 🏗️ **Production-Ready Architecture**
- ✅ **Modular JavaScript** (ES6+ modules, facade pattern)
- ✅ **BEM methodology** (strict naming conventions)
- ✅ **Semantic HTML5** (proper heading hierarchy, ARIA)
- ✅ **Design tokens** (centralized variables.scss)
- ✅ **Component isolation** (no CSS conflicts)

### 🧪 **Quality Assurance**
- ✅ **30 automated tests** (BackstopJS pixel-perfect testing)
- ✅ **7 linters** (HTML, CSS, JS, BEM, EditorConfig)
- ✅ **W3C validation** passing
- ✅ **Content tests** (Vitest)

---

## 🛠️ Tech Stack

### **Core**
- **JavaScript:** Vanilla ES6+ (modules, async/await, Intersection Observer)
- **HTML5:** Semantic markup, ARIA attributes
- **CSS3:** Sass (SCSS), BEM methodology
- **Build Tool:** Vite 7.2.2
- **Slider:** Swiper.js 12.0.3

### **Development**
- **Linting:** ESLint, Stylelint, LintHTML, BEM validator
- **Testing:** BackstopJS (visual regression), Vitest (content)
- **Image Optimization:** Sharp, SVGO
- **Deployment:** GitHub Pages (gh-pages)

### **No Frameworks**
This project intentionally uses **vanilla JavaScript** and **no CSS frameworks** to demonstrate:
- Deep understanding of DOM APIs
- Custom animation implementations
- Pure CSS layout techniques (Flexbox, Grid)
- Manual state management patterns

---

## 🏛️ Architecture Highlights

### **1. Image Optimization Strategy**

**Build-time Optimization:**
```html
<!-- Automatic WebP generation with JPEG fallback -->
<picture>
  <source type="image/webp" srcset="tour@1x.webp 1x, tour@2x.webp 2x" width="1200" height="800">
  <img src="tour@1x.jpg" srcset="tour@2x.jpg 2x" width="1200" height="800" loading="lazy" alt="Tour photo">
</picture>
```

**Why This Approach?**
- **Static site:** Images optimized at build time via ViteImageOptimizer
- **No server-side processing** needed (perfect for GitHub Pages)
- **In production CMS:** Backend would handle optimization on upload, CDN for on-the-fly transformations

**Results:**
- 97% of users receive WebP (smaller size)
- 3% fallback to JPEG (older browsers)
- ~40% traffic reduction

---

### **2. Modal Architecture**

**Problem:** Limited tour catalog (5-10 items) doesn't justify full routing.

**Solution:** Centralized modal system with dynamic content injection:

```javascript
// Reusable modal system
modal.js              → Generic open/close
scroll-lock.js        → Counter-based scroll management
tours-catalog.js      → Tours listing + filtering
tour-detail.js        → Detailed tour view (facade pattern)
  ├─ tour-detail-ui.js        → Content population
  ├─ tour-detail-gallery.js   → Swiper gallery
  └─ tour-detail-booking.js   → Form handling
```

**Benefits:**
- Single page load (no navigation delays)
- Shared modal infrastructure (DRY principle)
- Easy content updates (JSON-based)

---

### **3. BEM with Cascade for Content**

**Challenge:** Balance strict BEM with flexible content areas.

**Solution:**
```scss
// Structure: Strict BEM
.tour-detail__section { margin-bottom: 40px; }
.tour-detail__section-title { font-size: 22px; }

// Content: Cascade styling (no classes inside)
.tour-detail__content {
  h4 { color: $color-primary-blue; }
  p { line-height: 1.5; }
  ul { padding-left: 30px; }
}
```

**Benefits:**
- Clean HTML for content editors
- Semantic markup (proper heading hierarchy)
- Easy CMS integration (no class requirements)

---

### **4. Modular JavaScript (Facade Pattern)**

**Example: Tour Detail Module**

```javascript
// tour-detail.js (Facade - single entry point)
export const openTourDetail = (tourId) => {
  const tour = getToursData().find(t => t.id === tourId);
  populateTourUI(tour);           // UI module
  initGallery(tour.images);       // Gallery module
  attachBookingHandlers(tourId);   // Booking module
};

// Clear separation of concerns
```

**Benefits:**
- Single responsibility (each module has one job)
- Easy testing (isolated units)
- Maintainable (changes contained)

---

## 🎯 Performance

### **Implemented Optimizations:**
- ✅ **WebP format** with JPEG fallback (30-50% smaller)
- ✅ **Lazy loading** for images
- ✅ **Retina optimization** (srcset @1x/@2x)
- ✅ **SVG sprite** (single HTTP request for all icons)
- ✅ **CSS minification** (production build)
- ✅ **JavaScript tree-shaking** (Vite)

### **Results:**
- Fast page load (~2s on 3G)
- Small bundle size (~200KB gzipped)
- Smooth animations (60fps)
- No layout shifts (CLS < 0.1)

---

## 🚀 Getting Started

### **Prerequisites**
```bash
Node.js: 18.x / 20.x / 24.x
```

### **Installation**
```bash
# Clone repository
git clone https://github.com/OlgaGulyakevich/travel-landing-swiper-responsive.git
cd travel-landing-swiper-responsive

# Install dependencies
npm install

# Start dev server (port 3000)
npm run dev
```

### **Available Scripts**

**Development:**
```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build → dist/
npm run preview      # Preview production build
```

**Image Processing:**
```bash
npm run convert-rastr  # Generate WebP versions from source/img/
```

**Quality Assurance:**
```bash
npm run test              # BackstopJS pixel-perfect (requires dev server)
npm run test-content      # Vitest content tests
npm run w3c               # W3C HTML validation
npm run lint-bem          # BEM methodology validation
npm run stylelint         # SCSS linting (auto-fix)
npm run lint-js           # JavaScript linting (auto-fix)
```

**Deployment:**
```bash
npm run deploy       # Build + deploy to GitHub Pages
```

---

## 🧪 Testing

### **Visual Regression Testing**
```bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2: Run pixel-perfect tests
npm run test
```

**30 test scenarios** covering:
- 3 viewports (Desktop 1440px, Tablet 768px, Mobile 320px)
- 10 page sections (header, hero, tours, training, about, reviews, advantages, gallery, form, footer)

**Mismatch tolerance:** 0.4% - 4.3% (configured per section complexity)

---

## 📦 Deployment

**Automatic deployment** to GitHub Pages via `gh-pages` branch:

```bash
npm run deploy
```

**What happens:**
1. Runs production build (`npm run build`)
2. Optimizes images (JPEG compression, WebP generation)
3. Minifies CSS/JS
4. Publishes to `gh-pages` branch
5. Available at: https://olgagulyakevich.github.io/travel-landing-swiper-responsive/

**Environment-specific configuration:**
```javascript
// vite.config.js
const isDev = process.env.NODE_ENV === 'development';
base: isDev ? './' : '/travel-landing-swiper-responsive/'
```

---

## 📁 Project Structure

```
lifetour-landing/
├── source/
│   ├── sass/
│   │   ├── blocks/          # BEM components (header, hero, tours, etc.)
│   │   ├── common/          # Variables, mixins, fonts, animations
│   │   ├── layout/          # Container, grid
│   │   ├── ui/              # Reusable components (button, input, card)
│   │   └── vendor/          # normalize.scss
│   │
│   ├── js/
│   │   ├── main.js          # Entry point
│   │   └── modules/
│   │       ├── modal.js                    # Generic modal
│   │       ├── scroll-lock.js              # Scroll management
│   │       ├── tours-catalog/              # Tours listing
│   │       │   ├── tours-catalog-data.js
│   │       │   ├── tours-catalog-filters.js
│   │       │   └── tours-catalog-render.js
│   │       ├── tour-detail/                # Tour detail modal
│   │       │   ├── tour-detail.js          # Facade
│   │       │   ├── tour-detail-ui.js
│   │       │   ├── tour-detail-gallery.js
│   │       │   └── tour-detail-booking.js
│   │       └── utils/                      # Helpers
│   │
│   ├── img/
│   │   ├── sprite/          # SVG icons → auto-generated sprite
│   │   └── *.{jpg,webp}     # Images
│   │
│   ├── public/
│   │   ├── data/
│   │   │   └── tours.json   # Tour catalog data
│   │   └── img/tours/       # Tour images (optimized at build)
│   │
│   └── index.html
│
├── dist/                    # Production build (auto-generated)
├── bitmaps_reference/       # Pixel-perfect reference screenshots
├── vite.config.js           # Build configuration
└── package.json
```

---

## 🌍 Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | Latest | ✅ Full |
| Firefox | Latest | ✅ Full |
| Safari | 14+ | ✅ Full (WebP since iOS 14) |
| Edge | Latest | ✅ Full |

**WebP Support:** 97% global coverage (Can I Use, 2025)

---

## 🤝 Credits

**Author:** Olga Gulakevich
**Program:** HTML Academy Accelerator
**Year:** 2024-2025

---

## 📄 License

This project is part of HTML Academy educational program. All rights reserved.

---

**Note for Employers:**
While this project targets Russian-speaking users, the **technical implementation, architecture, and code quality** are universal and applicable to any modern web project. The decision to use vanilla JavaScript and manual implementations (vs. frameworks) was intentional to demonstrate deep understanding of web fundamentals.
