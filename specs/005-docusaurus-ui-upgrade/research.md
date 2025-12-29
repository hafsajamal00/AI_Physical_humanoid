# Research & Technical Decisions: Docusaurus UI Upgrade

**Feature**: 005-docusaurus-ui-upgrade
**Created**: 2025-12-27
**Status**: Complete

## Overview

This document captures research findings and technical decisions for upgrading the Docusaurus UI to create a modern, course-grade learning experience for the Physical AI & Humanoid Robotics book.

## Decision 1: Docusaurus Theme Customization Approach

**Context**: Need to customize Docusaurus v3 UI without breaking upgrades or existing content.

**Decision**: Use **Docusaurus Swizzling** (selective component ejection) combined with **custom CSS** for styling.

**Rationale**:
- Docusaurus v3 supports "safe" swizzling for specific components (HomePage, Footer, Navbar)
- Custom CSS via `src/css/custom.css` is the recommended approach for styling without breaking updates
- Swizzling only necessary components minimizes maintenance burden
- Wrapping swizzled components preserves original functionality while adding custom UI

**Alternatives Considered**:
- **Full theme fork**: Rejected - high maintenance burden, blocks Docusaurus updates
- **External React app for homepage**: Rejected - adds deployment complexity, breaks Docusaurus navigation
- **CSS-only overrides**: Partially used - sufficient for typography/spacing, but inadequate for structural changes like module cards

**Implementation Strategy**:
1. Swizzle `HomePage` component to create custom landing page
2. Swizzle `NavbarContent` to add theme toggle
3. Use custom CSS for typography, spacing, colors
4. Use CSS variables for theme-aware styling (light/dark)

**References**:
- https://docusaurus.io/docs/swizzling
- https://docusaurus.io/docs/styling-layout

---

## Decision 2: Module Card Component Design

**Context**: Need to display 4 module cards on landing page with icons, descriptions, and navigation.

**Decision**: Create a **custom React component** (`ModuleCard.tsx`) rendered in the swizzled HomePage.

**Rationale**:
- React components provide full control over structure and interactivity
- Component can be reused if module cards appear elsewhere
- Docusaurus provides Link component for client-side navigation
- Icon libraries (Heroicons, Lucide) easily integrated via npm

**Component Structure**:
```tsx
<div className="module-cards-grid">
  <ModuleCard
    number={1}
    title="ROS 2 Robotic Nervous System"
    description="Master ROS 2 middleware..."
    icon={<RobotIcon />}
    link="/docs/module-1"
  />
  {/* Repeat for modules 2-4 */}
</div>
```

**Styling Approach**:
- CSS Grid for responsive layout (2x2 desktop, 1 column mobile)
- CSS custom properties for theme-aware colors
- Hover effects and transitions for interactivity

**Alternatives Considered**:
- **Markdown-only cards**: Rejected - insufficient flexibility for icons and complex layouts
- **Docusaurus DocCards**: Considered - but DocCards are designed for auto-generated content lists, not custom module cards

---

## Decision 3: Icon Library Selection

**Context**: Need icons for 4 modules (ROS 2, Simulation, Isaac/Nav2, VLA) and UI elements (theme toggle, breadcrumbs).

**Decision**: Use **Lucide React** icon library.

**Rationale**:
- Open source, MIT licensed (no attribution required)
- 1000+ icons with consistent design language
- Tree-shakeable (only import used icons, minimal bundle size)
- React components out-of-the-box (no SVG imports needed)
- Active maintenance and community support

**Icon Choices** (provisional):
- Module 1 (ROS 2): `Network` or `Workflow` (represents communication)
- Module 2 (Simulation): `Cuboid` or `Box` (represents virtual environment)
- Module 3 (Isaac & Nav2): `Eye` or `Radar` (represents perception)
- Module 4 (VLA): `Zap` or `Sparkles` (represents AI/intelligence)
- Theme toggle: `Sun` / `Moon`
- Breadcrumbs: `ChevronRight`

**Alternatives Considered**:
- **Heroicons**: Very similar to Lucide, slightly fewer icons
- **Font Awesome**: Rejected - requires license for pro icons, larger bundle size
- **Custom SVGs**: Rejected - inconsistent design, requires design skills

**Installation**:
```bash
npm install lucide-react
```

---

## Decision 4: Typography and Spacing System

**Context**: Need to improve readability of technical content with clear typography hierarchy and spacing.

**Decision**: Implement a **typographic scale** using CSS custom properties based on modular scale (1.25 ratio).

**Rationale**:
- Modular scale creates visual harmony (16px base → 20px → 25px → 31px → 39px)
- CSS custom properties enable consistent sizing across components
- Line-height 1.6-1.8 improves readability for technical prose
- Responsive font sizes using clamp() for fluid scaling

**Typography System**:
```css
:root {
  --font-size-base: 16px;
  --font-size-lg: 20px;
  --font-size-xl: 25px;
  --font-size-2xl: 31px;
  --font-size-3xl: 39px;

  --line-height-base: 1.6;
  --line-height-heading: 1.2;

  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 1.5rem;
  --space-lg: 2rem;
  --space-xl: 3rem;
}
```

**Font Stack**:
- Primary: System font stack (SF Pro, Segoe UI, Roboto) for performance
- Monospace: JetBrains Mono or Fira Code for code blocks (if not already present)

**Alternatives Considered**:
- **Google Fonts (Inter, Poppins)**: Rejected - adds external dependency, network latency
- **Fixed sizes**: Rejected - inflexible for different screen sizes
- **Tailwind CSS spacing**: Considered - but adds dependency, Docusaurus doesn't use Tailwind by default

---

## Decision 5: Dark Theme Implementation

**Context**: Need to support light and dark themes with instant switching and no layout shift.

**Decision**: Use **Docusaurus built-in theme system** with CSS custom properties for colors.

**Rationale**:
- Docusaurus v3 has native light/dark theme support
- Theme preference stored in localStorage automatically
- Theme toggle component available via swizzling
- CSS custom properties allow theme-aware colors without JavaScript

**Color System**:
```css
/* Light theme (default) */
:root {
  --color-primary: #2563eb;
  --color-bg: #ffffff;
  --color-text: #1f2937;
  --color-border: #e5e7eb;
}

/* Dark theme */
[data-theme='dark'] {
  --color-primary: #60a5fa;
  --color-bg: #111827;
  --color-text: #f3f4f6;
  --color-border: #374151;
}
```

**Mermaid Diagram Theme**:
- Use Mermaid `theme` variable to switch between 'default' (light) and 'dark'
- Configure in `docusaurus.config.js` with `mermaid.theme.light` and `mermaid.theme.dark`

**Alternatives Considered**:
- **CSS classes (theme-light, theme-dark)**: Rejected - Docusaurus uses data attributes
- **JavaScript-based theme switching**: Rejected - causes flicker, layout shift

---

## Decision 6: Breadcrumb Navigation Enhancement

**Context**: Docusaurus has basic breadcrumbs, but need to enhance styling and ensure proper hierarchy.

**Decision**: **CSS customization only** - no component swizzling needed.

**Rationale**:
- Docusaurus breadcrumbs already follow proper hierarchy (Home > Module > Chapter)
- Structure is correct, only styling needs improvement
- CSS-only approach minimizes maintenance burden

**Styling Enhancements**:
- Increase font size (14px → 16px)
- Add spacing between crumbs (0.5rem)
- Use chevron icon for separators (via CSS ::before)
- Hover effects on links
- Responsive design (condense on mobile if needed)

**Alternatives Considered**:
- **Swizzle DocBreadcrumbs**: Rejected - unnecessary complexity, structure is already correct
- **Hide breadcrumbs on mobile**: Considered - but decided to keep for orientation

---

## Decision 7: Sidebar Organization Strategy

**Context**: Need to organize 4 modules with collapsible groups in the sidebar.

**Decision**: Use **Docusaurus category configuration** (`_category_.json` files) with custom CSS for styling.

**Rationale**:
- Docusaurus auto-generates sidebar from folder structure and `_category_.json` files
- Category files support collapsible groups natively
- No code changes needed, only configuration
- CSS can enhance visual design (colors, spacing, hover effects)

**Category Configuration** (per module):
```json
{
  "label": "Module 1: ROS 2",
  "position": 1,
  "collapsible": true,
  "collapsed": false,
  "link": {
    "type": "generated-index"
  }
}
```

**CSS Enhancements**:
- Highlight current module
- Add visual separators between modules
- Adjust spacing and indentation
- Theme-aware colors

**Alternatives Considered**:
- **Manual sidebar configuration in docusaurus.config.js**: Rejected - loses auto-generation benefits, harder to maintain
- **Custom sidebar component**: Rejected - breaks Docusaurus updates, high maintenance

---

## Decision 8: Responsive Design Breakpoints

**Context**: Need to ensure UI works on mobile, tablet, and desktop.

**Decision**: Use **Docusaurus default breakpoints** with custom media queries where needed.

**Rationale**:
- Docusaurus breakpoints: mobile (<768px), tablet (768-996px), desktop (>996px)
- Consistency with existing Docusaurus responsive behavior
- Custom breakpoints only for module cards and hero section

**Responsive Strategy**:
- **Module cards**: 2x2 grid on desktop, 1 column on mobile
- **Hero section**: Stack title/tagline on mobile, side-by-side on desktop
- **Sidebar**: Auto-collapses to hamburger menu on mobile (Docusaurus default)
- **Breadcrumbs**: Full on desktop, may condense on mobile ("... > Current Chapter")

**Media Queries**:
```css
/* Mobile first approach */
.module-cards-grid {
  grid-template-columns: 1fr; /* Mobile */
}

@media (min-width: 768px) {
  .module-cards-grid {
    grid-template-columns: repeat(2, 1fr); /* Tablet/Desktop */
  }
}
```

---

## Decision 9: Performance Optimization Strategy

**Context**: Must maintain Lighthouse 90+ (desktop), 85+ (mobile) performance scores.

**Decision**: Use **lazy loading**, **code splitting**, and **SVG optimization**.

**Rationale**:
- Docusaurus already code-splits by route
- Lazy load module card images/icons below the fold
- Inline critical CSS, defer non-critical
- Optimize SVG icons (remove unnecessary paths)
- Use WebP for any photos (if added later)

**Performance Checklist**:
- [x] Module card icons are SVGs (no external image requests)
- [x] Hero section uses system fonts (no web font loading)
- [x] CSS is minified in production build
- [x] No large JavaScript libraries added (Lucide is tree-shakeable)
- [x] Mermaid diagrams lazy-load (Docusaurus default)

**Monitoring**:
- Run Lighthouse before and after changes
- Use Docusaurus `npm run build` + `npm run serve` for production testing
- Verify Core Web Vitals (LCP, FID, CLS)

---

## Decision 10: Deployment and Testing Strategy

**Context**: Need to test UI changes without breaking existing deployment.

**Decision**: Use **Docusaurus development server** for testing, **GitHub Pages** for deployment (if applicable).

**Rationale**:
- `npm start` provides hot reload for rapid iteration
- `npm run build` catches build errors before deployment
- Docusaurus generates static site (no server-side dependencies)
- GitHub Pages supports Docusaurus out-of-the-box

**Testing Workflow**:
1. Develop locally with `npm start`
2. Test responsive design in browser DevTools
3. Build production bundle with `npm run build`
4. Serve locally with `npm run serve` for final validation
5. Run Lighthouse on production build
6. Deploy via GitHub Actions or manual push

**Alternatives Considered**:
- **Vercel/Netlify**: Considered - easier deployment, but GitHub Pages is free and sufficient
- **Docker deployment**: Rejected - unnecessary complexity for static site

---

## Technology Stack Summary

**Frontend Framework**:
- Docusaurus 3.x (React-based static site generator)
- React 18.x (comes with Docusaurus)
- TypeScript (for custom components, optional but recommended)

**Styling**:
- CSS custom properties (CSS variables)
- Modular CSS (component-scoped styles)
- No CSS preprocessor needed (Docusaurus supports CSS modules natively)

**UI Components**:
- Custom React components (ModuleCard, Hero section)
- Lucide React (icon library)
- Docusaurus built-in components (Link, useColorMode, DocBreadcrumbs)

**Development Tools**:
- npm (package manager)
- Docusaurus CLI (build, serve, clear)
- Browser DevTools (responsive design testing)
- Lighthouse (performance testing)

**Deployment**:
- Static site output (HTML/CSS/JS)
- GitHub Pages (or Netlify/Vercel alternative)
- No backend or database required

---

## Open Questions / Future Considerations

None at this time. All technical decisions are finalized based on:
- Docusaurus v3 best practices
- Performance constraints (Lighthouse 90+/85+)
- Backward compatibility requirement (no breaking changes)
- Simplicity principle (minimize custom code, leverage Docusaurus features)

Ready to proceed to Phase 1 (data-model.md, contracts, quickstart.md).
