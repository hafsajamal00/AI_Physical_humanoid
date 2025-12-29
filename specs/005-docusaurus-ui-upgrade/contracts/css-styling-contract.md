# CSS Styling Contract

**Feature**: 005-docusaurus-ui-upgrade
**Purpose**: Define CSS custom properties, class naming conventions, and styling standards

## CSS Custom Properties (Variables)

### Colors

**Light Theme** (`:root`):
```css
:root {
  /* Primary brand colors */
  --color-primary: #2563eb;
  --color-primary-hover: #1d4ed8;

  /* Background colors */
  --color-bg: #ffffff;
  --color-bg-secondary: #f9fafb;
  --color-bg-card: #ffffff;

  /* Text colors */
  --color-text: #1f2937;
  --color-text-muted: #6b7280;
  --color-heading: #111827;

  /* Border colors */
  --color-border: #e5e7eb;
  --color-border-hover: #d1d5db;

  /* Code block colors */
  --color-code-bg: #f3f4f6;
  --color-code-text: #1f2937;
}
```

**Dark Theme** (`[data-theme='dark']`):
```css
[data-theme='dark'] {
  /* Primary brand colors */
  --color-primary: #60a5fa;
  --color-primary-hover: #93c5fd;

  /* Background colors */
  --color-bg: #111827;
  --color-bg-secondary: #1f2937;
  --color-bg-card: #1f2937;

  /* Text colors */
  --color-text: #f3f4f6;
  --color-text-muted: #9ca3af;
  --color-heading: #ffffff;

  /* Border colors */
  --color-border: #374151;
  --color-border-hover: #4b5563;

  /* Code block colors */
  --color-code-bg: #1f2937;
  --color-code-text: #e5e7eb;
}
```

### Typography

```css
:root {
  /* Font sizes (modular scale 1.25) */
  --font-size-xs: 14px;
  --font-size-base: 16px;
  --font-size-lg: 20px;
  --font-size-xl: 25px;
  --font-size-2xl: 31px;
  --font-size-3xl: 39px;

  /* Line heights */
  --line-height-tight: 1.2;
  --line-height-base: 1.6;
  --line-height-relaxed: 1.8;

  /* Font weights */
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Font families */
  --font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  --font-family-mono: 'JetBrains Mono', 'Fira Code', Consolas, 'Courier New', monospace;
}
```

### Spacing

```css
:root {
  /* Spacing scale */
  --space-xs: 0.5rem;   /* 8px */
  --space-sm: 1rem;     /* 16px */
  --space-md: 1.5rem;   /* 24px */
  --space-lg: 2rem;     /* 32px */
  --space-xl: 3rem;     /* 48px */
  --space-2xl: 4rem;    /* 64px */
  --space-3xl: 6rem;    /* 96px */
}
```

### Borders and Shadows

```css
:root {
  /* Border radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;

  /* Border widths */
  --border-width: 1px;
  --border-width-thick: 2px;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

[data-theme='dark'] {
  /* Shadows (adjusted for dark theme) */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.4);
}
```

### Transitions

```css
:root {
  /* Transition durations */
  --transition-fast: 150ms;
  --transition-base: 200ms;
  --transition-slow: 300ms;

  /* Transition easing */
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
}
```

### Breakpoints

```css
:root {
  /* Responsive breakpoints (matches Docusaurus defaults) */
  --breakpoint-mobile: 768px;
  --breakpoint-tablet: 996px;
  --breakpoint-desktop: 1200px;
}
```

---

## CSS Class Naming Conventions

### BEM (Block-Element-Modifier) Pattern

**Format**: `.block__element--modifier`

**Module Card Example**:
```css
/* Block */
.module-card {
  display: flex;
  flex-direction: column;
  padding: var(--space-md);
}

/* Elements */
.module-card__header {}
.module-card__icon {}
.module-card__number {}
.module-card__title {}
.module-card__description {}
.module-card__link {}

/* Modifiers */
.module-card--featured {}
.module-card--hover {}
```

### Component-Scoped Classes (CSS Modules)

If using CSS Modules (Docusaurus supports this):
```css
/* ModuleCard.module.css */
.card {}
.icon {}
.title {}
```

Imported as:
```tsx
import styles from './ModuleCard.module.css';
<div className={styles.card} />
```

---

## Component-Specific Styles

### ModuleCard Component

**File**: `src/components/ModuleCard.module.css` or inline in `ModuleCard.tsx`

**Required Styles**:
```css
.module-card {
  /* Layout */
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);

  /* Spacing */
  padding: var(--space-lg);

  /* Colors */
  background-color: var(--color-bg-card);
  border: var(--border-width) solid var(--color-border);
  color: var(--color-text);

  /* Borders */
  border-radius: var(--radius-lg);

  /* Shadow */
  box-shadow: var(--shadow-sm);

  /* Transitions */
  transition: all var(--transition-base) var(--ease-in-out);

  /* Hover state */
  cursor: pointer;
}

.module-card:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.module-card__icon {
  /* Icon container */
  width: 48px;
  height: 48px;
  color: var(--color-primary);
}

.module-card__number {
  /* Module number badge */
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.module-card__title {
  /* Title styling */
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-heading);
  line-height: var(--line-height-tight);
  margin: 0;
}

.module-card__description {
  /* Description text */
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  color: var(--color-text-muted);
  margin: 0;
}

.module-card__link {
  /* CTA link */
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-primary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.module-card__link:hover {
  color: var(--color-primary-hover);
  text-decoration: underline;
}
```

**Responsive Behavior**:
```css
@media (max-width: 768px) {
  .module-card {
    padding: var(--space-md);
  }

  .module-card__title {
    font-size: var(--font-size-base);
  }
}
```

---

### HeroSection Component

**Required Styles**:
```css
.hero {
  /* Layout */
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-lg);

  /* Spacing */
  padding: var(--space-3xl) var(--space-lg);
  margin-bottom: var(--space-2xl);

  /* Background */
  background: linear-gradient(135deg, var(--color-bg) 0%, var(--color-bg-secondary) 100%);
}

.hero__title {
  font-size: clamp(var(--font-size-2xl), 5vw, var(--font-size-3xl));
  font-weight: var(--font-weight-bold);
  color: var(--color-heading);
  line-height: var(--line-height-tight);
  margin: 0;
}

.hero__subtitle {
  font-size: clamp(var(--font-size-lg), 3vw, var(--font-size-xl));
  font-weight: var(--font-weight-normal);
  color: var(--color-text-muted);
  line-height: var(--line-height-base);
  max-width: 600px;
  margin: 0;
}

.hero__cta {
  /* CTA button */
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);

  padding: var(--space-sm) var(--space-lg);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);

  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-md);

  text-decoration: none;
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.hero__cta:hover {
  background-color: var(--color-primary-hover);
}

@media (max-width: 768px) {
  .hero {
    padding: var(--space-2xl) var(--space-md);
  }
}
```

---

### ModuleCardGrid Container

**Required Styles**:
```css
.module-cards-grid {
  /* Grid layout */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-lg);

  /* Spacing */
  padding: var(--space-xl) var(--space-lg);
  max-width: 1200px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .module-cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 767px) {
  .module-cards-grid {
    grid-template-columns: 1fr;
    gap: var(--space-md);
    padding: var(--space-lg) var(--space-md);
  }
}
```

---

### Breadcrumb Navigation Styling

**File**: `src/css/custom.css` (overrides)

**Required Styles**:
```css
/* Breadcrumb container */
.theme-doc-breadcrumbs {
  margin-bottom: var(--space-md);
  font-size: var(--font-size-base);
}

/* Breadcrumb list */
.breadcrumbs__item {
  display: inline-flex;
  align-items: center;
}

/* Breadcrumb links */
.breadcrumbs__link {
  color: var(--color-text-muted);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.breadcrumbs__link:hover {
  color: var(--color-primary);
  text-decoration: underline;
}

/* Active breadcrumb (current page) */
.breadcrumbs__link--active {
  color: var(--color-text);
  font-weight: var(--font-weight-medium);
  pointer-events: none;
}

/* Breadcrumb separator */
.breadcrumbs__item:not(:last-child)::after {
  content: '›';
  margin: 0 var(--space-xs);
  color: var(--color-text-muted);
}

@media (max-width: 768px) {
  /* Condense breadcrumbs on mobile */
  .breadcrumbs__item:not(:first-child):not(:last-child) {
    display: none;
  }

  .breadcrumbs__item:nth-child(2)::before {
    content: '... ›';
    margin-right: var(--space-xs);
    color: var(--color-text-muted);
  }
}
```

---

### Sidebar Styling Enhancements

**File**: `src/css/custom.css` (overrides)

**Required Styles**:
```css
/* Sidebar menu */
.theme-doc-sidebar-menu {
  padding: var(--space-md);
}

/* Module category headers */
.menu__list-item--collapsed .menu__link,
.menu__list-item--collapsed .menu__link:hover {
  background-color: var(--color-bg-secondary);
  font-weight: var(--font-weight-semibold);
}

/* Current active module */
.menu__list-item--collapsed.theme-doc-sidebar-item-category-level-1 {
  border-left: 3px solid var(--color-primary);
  padding-left: calc(var(--space-sm) - 3px);
}

/* Chapter links */
.menu__link {
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-sm);
  transition: background-color var(--transition-fast);
}

.menu__link:hover {
  background-color: var(--color-bg-secondary);
}

/* Active chapter */
.menu__link--active {
  background-color: var(--color-primary);
  color: white;
  font-weight: var(--font-weight-medium);
}

.menu__link--active:hover {
  background-color: var(--color-primary-hover);
}

/* Module separators */
.theme-doc-sidebar-item-category-level-1:not(:last-child) {
  margin-bottom: var(--space-md);
  padding-bottom: var(--space-md);
  border-bottom: var(--border-width) solid var(--color-border);
}
```

---

## Global Typography Styles

**File**: `src/css/custom.css`

```css
/* Base typography */
html {
  font-size: 16px;
  font-family: var(--font-family-base);
  line-height: var(--line-height-base);
  color: var(--color-text);
}

/* Headings */
h1, h2, h3, h4, h5, h6 {
  color: var(--color-heading);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  margin-top: var(--space-lg);
  margin-bottom: var(--space-sm);
}

h1 { font-size: var(--font-size-3xl); }
h2 { font-size: var(--font-size-2xl); }
h3 { font-size: var(--font-size-xl); }
h4 { font-size: var(--font-size-lg); }

/* Paragraphs */
p {
  margin-top: 0;
  margin-bottom: var(--space-md);
}

/* Links */
a {
  color: var(--color-primary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

a:hover {
  color: var(--color-primary-hover);
  text-decoration: underline;
}

/* Code blocks */
code {
  font-family: var(--font-family-mono);
  font-size: 0.875em;
  background-color: var(--color-code-bg);
  color: var(--color-code-text);
  padding: 0.2em 0.4em;
  border-radius: var(--radius-sm);
}

pre code {
  background-color: transparent;
  padding: 0;
}

/* Tables */
table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: var(--space-md);
}

th, td {
  border: var(--border-width) solid var(--color-border);
  padding: var(--space-xs) var(--space-sm);
  text-align: left;
}

th {
  background-color: var(--color-bg-secondary);
  font-weight: var(--font-weight-semibold);
}

/* Improved table readability */
tbody tr:nth-child(even) {
  background-color: var(--color-bg-secondary);
}
```

---

## Accessibility Styles

### Focus Indicators

```css
/* Visible focus for keyboard navigation */
*:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

/* Remove default outline */
*:focus:not(:focus-visible) {
  outline: none;
}
```

### Skip Link

```css
/* Skip to main content link (for screen readers and keyboard users) */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-primary);
  color: white;
  padding: var(--space-xs) var(--space-sm);
  text-decoration: none;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
```

---

## Performance Optimizations

### Critical CSS

Inline critical CSS in `<head>` for above-the-fold content:
- CSS custom properties (variables)
- Hero section styles
- Module card grid layout
- Basic typography

Defer non-critical CSS:
- Sidebar styles (below the fold on mobile)
- Footer styles
- Breadcrumb styles (secondary navigation)

### CSS Loading Strategy

```html
<!-- Critical CSS inlined -->
<style>
  /* CSS variables and hero/module card styles */
</style>

<!-- Non-critical CSS deferred -->
<link rel="preload" href="/styles/non-critical.css" as="style" onload="this.rel='stylesheet'">
```

---

## Summary

This CSS contract ensures:
- Consistent theming via CSS custom properties
- Responsive design across all breakpoints
- Accessibility compliance (focus indicators, color contrast)
- Performance optimization (critical CSS, minimal bundle size)
- Maintainability (BEM naming, scoped styles)

All components must use these variables and follow these conventions for visual consistency and ease of maintenance.
