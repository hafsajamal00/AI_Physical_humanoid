# Implementation Plan: Docusaurus UI Upgrade

**Branch**: `005-docusaurus-ui-upgrade` | **Date**: 2025-12-27 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/005-docusaurus-ui-upgrade/spec.md`

## Summary

Upgrade the Docusaurus-based Physical AI & Humanoid Robotics book to a modern, course-grade learning experience through: (1) custom landing page with hero section and 4 module cards, (2) enhanced navigation with breadcrumbs and improved sidebar, (3) visual polish with dark/light themes, improved typography, and theme-aware diagrams. Implementation uses Docusaurus v3 swizzling for custom components, CSS custom properties for theming, and Lucide React for icons—all while maintaining 100% backward compatibility with existing content.

## Technical Context

**Language/Version**: TypeScript/JavaScript (ES2020+), React 18.x (Docusaurus v3 dependency)
**Primary Dependencies**: Docusaurus 3.x, React 18.x, Lucide React 0.x, Docusaurus Mermaid theme
**Storage**: N/A (static site, theme preference in browser localStorage)
**Testing**: Manual testing (visual regression, responsive design, accessibility), Lighthouse performance audits, browser DevTools
**Target Platform**: Modern web browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+), static site deployment (GitHub Pages, Netlify, or equivalent)
**Project Type**: Frontend web (Docusaurus static site generator)
**Performance Goals**: Lighthouse 90+ (desktop), 85+ (mobile), LCP less than 2.5s, CLS less than 0.1, theme toggle less than 100ms
**Constraints**: Docusaurus v3 compatible, no breaking changes to existing content/URLs, performance-first design, WCAG AA accessibility
**Scale/Scope**: 4 modules, 12+ chapters, ~5,000 words of content, 20+ Mermaid diagrams, estimated 500-1000 monthly visitors

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Principle I: Accuracy

**Status**: ✅ PASS

- UI upgrade does not alter content accuracy
- All technical content remains unchanged
- External references and documentation links preserved
- No risk to factual correctness of educational material

### Principle II: Clarity

**Status**: ✅ PASS

- Improved navigation (breadcrumbs, sidebar) enhances clarity of learning path
- Module cards provide clear overview of course structure
- Better typography improves readability of technical concepts
- Hero section clarifies course value proposition

### Principle III: Reproducibility

**Status**: ✅ PASS

- All UI changes documented in research.md (technology choices, design decisions)
- Component interfaces defined in contracts/ for reproducible implementation
- CSS custom properties documented for consistent theming
- Quickstart.md provides step-by-step implementation guide

### Principle IV: Interactivity

**Status**: ✅ PASS (No Impact)

- UI upgrade does not affect RAG chatbot functionality
- Chatbot will continue to provide context-aware answers based on book content
- Theme changes (light/dark) will apply to chatbot UI when integrated

### Principle V: Citation and Traceability

**Status**: ✅ PASS (No Impact)

- UI changes do not affect citations or references in content
- External links to documentation remain unchanged
- Code examples and attributions preserved

### Principle VI: Code Quality

**Status**: ✅ PASS

- Custom React components will follow TypeScript best practices
- CSS custom properties promote maintainability and consistency
- Lucide React icons are production-ready, tree-shakeable components
- Component interfaces enforce type safety
- Performance budgets defined (Lighthouse 90+/85+)

### Principle VII: Architectural Simplicity

**Status**: ✅ PASS

- Leverages Docusaurus built-in features (swizzling, theme system, CSS variables)
- Minimal custom code (3 components: ModuleCard, ModuleCardGrid, HomePage)
- No additional dependencies beyond Lucide React
- CSS-first approach for styling (no styled-components or CSS-in-JS frameworks)
- Follows Docusaurus conventions (file structure, configuration patterns)

**Justification for Complexity**:
- **Swizzling HomePage**: Necessary to create custom landing page (Docusaurus recommended approach)
- **Custom CSS**: Required for theme customization (standard Docusaurus pattern)
- **Lucide React**: Minimal dependency (50KB total, tree-shakeable) for professional icons

**Simpler Alternatives Rejected**:
- Markdown-only landing page: Rejected - cannot achieve module card layout and interactive elements
- Inline styles: Rejected - poor maintainability, no theme support
- Font Awesome: Rejected - larger bundle size, license concerns

---

## Project Structure

### Documentation (this feature)

```text
specs/005-docusaurus-ui-upgrade/
├── spec.md                           # Feature specification (complete)
├── plan.md                           # This file (implementation plan)
├── research.md                       # Technical decisions (complete)
├── data-model.md                     # UI component entities (complete)
├── quickstart.md                     # Implementation guide (complete)
├── contracts/
│   ├── component-interfaces.md       # TypeScript interfaces for components
│   └── css-styling-contract.md       # CSS custom properties and naming conventions
├── checklists/
│   └── requirements.md               # Specification quality validation (passed)
└── tasks.md                          # Task breakdown (created by /sp.tasks command)
```

### Source Code (repository root)

```text
book_frontend/                        # Docusaurus site (frontend only)
├── src/
│   ├── components/
│   │   ├── ModuleCard.tsx           # Module card component (NEW)
│   │   ├── ModuleCard.module.css    # Module card styles (NEW)
│   │   └── ModuleCardGrid.tsx       # Card grid container (NEW)
│   ├── pages/
│   │   └── index.tsx                # Swizzled HomePage (MODIFIED)
│   ├── css/
│   │   └── custom.css               # CSS custom properties, global styles (MODIFIED)
│   └── utils/
│       └── moduleConfig.ts          # Module metadata and icon mapping (NEW)
├── docs/
│   ├── intro.md                     # Course introduction (EXISTING)
│   ├── module-1/
│   │   ├── _category_.json          # Module 1 category config (VERIFIED)
│   │   ├── chapter-1-ros2-foundations.md
│   │   ├── chapter-2-communication.md
│   │   └── chapter-3-urdf.md
│   ├── module-2/
│   │   └── _category_.json          # Module 2 category config (VERIFIED)
│   ├── module-3/
│   │   └── _category_.json          # Module 3 category config (VERIFIED)
│   └── module-4/
│       └── _category_.json          # Module 4 category config (VERIFIED)
├── static/
│   └── img/
│       └── modules/                 # Module icons (if using static images) (OPTIONAL)
├── docusaurus.config.js             # Docusaurus configuration (MODIFIED - Mermaid theme)
├── sidebars.js                      # Sidebar configuration (EXISTING - autogenerated)
└── package.json                     # Dependencies (MODIFIED - add lucide-react)
```

**Structure Decision**: Frontend-only Docusaurus site. All changes isolated to `book_frontend/` directory. No backend or API changes. Uses Docusaurus v3 conventions: components in `src/components/`, pages in `src/pages/`, global styles in `src/css/`. Existing content in `docs/` remains unchanged except for category config verification.

---

## Complexity Tracking

**Status**: No constitution violations. All complexity justified by Docusaurus best practices.

---

## Architecture

### Component Architecture

**Landing Page Flow**:
```
HomePage (index.tsx)
├── Layout (Docusaurus wrapper)
│   ├── Navbar (with theme toggle)
│   └── Footer
├── HeroSection (inline component)
│   ├── Title
│   ├── Subtitle
│   └── CTA Button
└── ModuleCardGrid
    ├── ModuleCard (Module 1)
    ├── ModuleCard (Module 2)
    ├── ModuleCard (Module 3)
    └── ModuleCard (Module 4)
```

**Content Page Flow**:
```
DocPage (Docusaurus default)
├── Layout
│   ├── Navbar
│   ├── Breadcrumbs (enhanced CSS)
│   ├── Sidebar (enhanced CSS)
│   └── Footer
└── MDXContent
    ├── Headings (improved typography)
    ├── Paragraphs (improved spacing)
    ├── Code Blocks (theme-aware syntax highlighting)
    ├── Tables (improved styling)
    └── Mermaid Diagrams (theme-aware)
```

### Theme Architecture

**Theme System** (CSS Custom Properties):
```
:root (Light Theme - Default)
├── Colors (primary, bg, text, border, code)
├── Typography (font-size, line-height, font-family)
├── Spacing (xs, sm, md, lg, xl, 2xl, 3xl)
├── Borders (radius, width, shadows)
└── Transitions (duration, easing)

[data-theme='dark'] (Dark Theme Override)
└── Colors (overrides for dark mode)
```

**Theme Switching**:
1. User clicks theme toggle button
2. Docusaurus `useColorMode` hook updates `data-theme` attribute
3. CSS custom properties automatically apply dark theme values
4. No JavaScript re-rendering needed (CSS-only)
5. Preference saved to localStorage

### Responsive Design Architecture

**Breakpoint Strategy**:
```
Mobile (0-767px)
├── ModuleCardGrid: 1 column stack
├── Hero: Title/subtitle stacked
├── Sidebar: Hamburger menu (Docusaurus default)
└── Breadcrumbs: Condensed (... > Current)

Tablet (768-995px)
├── ModuleCardGrid: 2 columns
├── Hero: Side-by-side title/subtitle
├── Sidebar: Visible (Docusaurus default)
└── Breadcrumbs: Full hierarchy

Desktop (996px+)
├── ModuleCardGrid: 2x2 grid
├── Hero: Full-width with CTA
├── Sidebar: Expanded (Docusaurus default)
└── Breadcrumbs: Full hierarchy
```

---

## Key Components

### ModuleCard Component

**Purpose**: Displays a single module with icon, title, description, and navigation link

**Interface**:
```typescript
interface ModuleCardProps {
  number: 1 | 2 | 3 | 4;
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  variant?: 'default' | 'featured';
}
```

**Styling**: CSS modules with theme-aware colors, hover effects, transitions

**Accessibility**: Keyboard navigable, ARIA labels, semantic HTML (article, h3, Link)

**File**: `src/components/ModuleCard.tsx` + `ModuleCard.module.css`

---

### ModuleCardGrid Container

**Purpose**: Layout container for module cards with responsive grid

**Interface**:
```typescript
interface ModuleCardGridProps {
  modules: ModuleCardProps[];
  columns?: 1 | 2 | 3 | 4;
}
```

**Styling**: CSS Grid with auto-fit responsive columns

**File**: `src/components/ModuleCardGrid.tsx`

---

### HomePage (Swizzled)

**Purpose**: Custom landing page with hero section and module overview

**Approach**: Swizzle Docusaurus `@docusaurus/theme-classic/HomePage` component

**Content**:
1. HeroSection: Title, subtitle, CTA button
2. ModuleCardGrid: 4 module cards

**File**: `src/pages/index.tsx`

---

## Styling System

### CSS Custom Properties (Variables)

**Defined in**: `src/css/custom.css`

**Categories**:
1. **Colors**: primary, background, text, borders (light + dark theme overrides)
2. **Typography**: font-size scale, line-heights, font-family stack
3. **Spacing**: xs → 3xl scale (0.5rem to 6rem)
4. **Borders**: radius, width, shadows
5. **Transitions**: durations, easing functions
6. **Breakpoints**: mobile, tablet, desktop

**Usage Pattern**:
```css
.my-component {
  color: var(--color-text);
  font-size: var(--font-size-base);
  padding: var(--space-md);
  border-radius: var(--radius-md);
}
```

**Benefits**:
- Consistent theming across all components
- Easy maintenance (change variable once, updates everywhere)
- Dark theme support via `[data-theme='dark']` overrides

---

### Component Styles

**Approach**: CSS Modules (scoped styles)

**Pattern**:
```tsx
// ModuleCard.tsx
import styles from './ModuleCard.module.css';

export default function ModuleCard(props) {
  return <div className={styles.card}>...</div>;
}
```

**Benefits**:
- Scoped styles (no naming conflicts)
- Tree-shaking (unused styles removed)
- TypeScript autocomplete for class names

---

## Theme Implementation

### Light Theme (Default)

**Colors**:
- Primary: Blue (#2563eb)
- Background: White (#ffffff)
- Text: Dark gray (#1f2937)
- Borders: Light gray (#e5e7eb)

**Defined in**: `:root` selector in `custom.css`

---

### Dark Theme

**Colors**:
- Primary: Light blue (#60a5fa)
- Background: Very dark gray (#111827)
- Text: Off-white (#f3f4f6)
- Borders: Medium gray (#374151)

**Defined in**: `[data-theme='dark']` selector in `custom.css`

**Mermaid Diagram Theme**:
- Configured in `docusaurus.config.js`
- Light mode: `theme: 'default'`
- Dark mode: `theme: 'dark'`

---

## Icon Strategy

**Library**: Lucide React

**Module Icon Mapping**:
- Module 1 (ROS 2): `<Network />` - represents communication/networking
- Module 2 (Simulation): `<Cuboid />` - represents virtual 3D environment
- Module 3 (Isaac & Nav2): `<Eye />` - represents perception/vision
- Module 4 (VLA): `<Zap />` - represents AI/intelligence

**UI Icons**:
- Theme toggle: `<Sun />` (light mode), `<Moon />` (dark mode)
- Navigation: `<ChevronRight />` for breadcrumb separators
- CTA: `<ArrowRight />` for call-to-action buttons

**Installation**:
```bash
npm install lucide-react
```

**Usage**:
```tsx
import { Network, Cuboid, Eye, Zap } from 'lucide-react';

<Network size={48} color="var(--color-primary)" />
```

---

## Navigation Enhancements

### Breadcrumb Navigation

**Approach**: CSS customization of Docusaurus built-in breadcrumbs (no swizzling needed)

**Hierarchy**: Home > Module Name > Chapter Name

**Styling Enhancements**:
- Larger font size (16px)
- Custom separator (`›` instead of `/`)
- Hover effects on links
- Mobile condensation (... > Current Chapter)

**File**: `src/css/custom.css` (breadcrumb overrides)

---

### Sidebar Organization

**Approach**: Configuration via `_category_.json` files + CSS styling

**Structure**:
- Modules as collapsible category groups
- Chapters listed under parent module
- Current module expanded by default
- Visual separators between modules

**Category Config** (per module):
```json
{
  "label": "Module N: [Title]",
  "position": N,
  "collapsible": true,
  "collapsed": false,
  "link": {
    "type": "generated-index",
    "description": "[Description]"
  }
}
```

**Styling Enhancements**:
- Highlight current module (left border accent)
- Module headers use semibold font
- Active chapter has primary color background
- Increased spacing between modules

**Files**:
- Config: `docs/module-N/_category_.json` (4 files)
- Styles: `src/css/custom.css` (sidebar overrides)

---

## Responsive Design Strategy

### Mobile (0-767px)

**Module Cards**:
- 1-column stack
- Full-width cards
- Reduced padding

**Hero Section**:
- Stacked title/subtitle
- Centered text
- Smaller font sizes (clamp function)

**Sidebar**:
- Hamburger menu (Docusaurus default)
- Full-screen overlay when open

**Breadcrumbs**:
- Condensed: "... > Current Chapter"
- Hide intermediate crumbs

---

### Tablet (768-995px)

**Module Cards**:
- 2-column grid
- Cards side-by-side

**Hero Section**:
- Side-by-side title/subtitle (if space allows)
- Medium font sizes

**Sidebar**:
- Visible on larger tablets
- Collapsed on smaller tablets

---

### Desktop (996px+)

**Module Cards**:
- 2x2 grid
- Maximum 4 cards visible without scrolling

**Hero Section**:
- Full-width with CTA button
- Large font sizes

**Sidebar**:
- Always visible
- Expanded by default

---

## Performance Optimization

### Bundle Size Optimization

1. **Tree-Shaking Lucide Icons**:
   - Import only used icons (not full library)
   - Webpack tree-shakes unused icons
   - Estimated impact: 5KB total (vs. 200KB for full library)

2. **CSS Optimization**:
   - Use CSS custom properties (runtime variables, not compiled)
   - Minimal custom CSS (<10KB total)
   - Purge unused CSS in production build (Docusaurus default)

3. **Code Splitting**:
   - HomePage as separate chunk (Docusaurus automatic)
   - Components loaded only on landing page
   - Content pages unaffected

---

### Loading Performance

1. **Critical CSS**:
   - Inline CSS custom properties in `<head>`
   - Defer non-critical component styles

2. **Image Optimization**:
   - Use SVG icons (no raster images)
   - Inline small SVGs (less than 2KB)
   - Lazy-load below-the-fold icons (if needed)

3. **Font Loading**:
   - Use system font stack (no web fonts)
   - Fallback to Arial/Helvetica (instant rendering)

**Expected Metrics**:
- FCP: Less than 1.5s
- LCP: Less than 2.5s
- TTI: Less than 3s
- CLS: Less than 0.1

---

## Testing Strategy

### Manual Testing Checklist

**Landing Page** (P1):
- [ ] Hero section displays title and tagline
- [ ] 4 module cards render in grid
- [ ] Icons display correctly
- [ ] Card hover effects work
- [ ] Navigation links work
- [ ] Responsive layout on mobile/tablet/desktop
- [ ] Keyboard navigation functional

**Navigation** (P2):
- [ ] Breadcrumbs show correct hierarchy
- [ ] Breadcrumbs links navigate correctly
- [ ] Sidebar groups chapters under modules
- [ ] Current chapter highlighted
- [ ] Collapsible modules work
- [ ] Mobile sidebar (hamburger menu) works

**Visual Polish** (P3):
- [ ] Light theme readable
- [ ] Dark theme readable
- [ ] Theme toggle works without flicker
- [ ] Code blocks have syntax highlighting
- [ ] Tables styled properly
- [ ] Mermaid diagrams adapt to theme
- [ ] Typography hierarchy clear
- [ ] Spacing consistent

---

### Performance Testing

**Tool**: Google Lighthouse (Chrome DevTools)

**Test Cases**:
1. **Homepage (Desktop)**:
   - Target: Performance 90+, Accessibility 95+, Best Practices 95+, SEO 90+

2. **Homepage (Mobile)**:
   - Target: Performance 85+, Accessibility 95+, Best Practices 95+, SEO 90+

3. **Content Page (Desktop)**:
   - Target: Performance 90+, verify no regression from baseline

4. **Content Page (Mobile)**:
   - Target: Performance 85+, verify no regression from baseline

**Run Command**:
```bash
npm run build
npm run serve
# Open http://localhost:3000 in Chrome
# DevTools > Lighthouse > Run audit
```

---

### Accessibility Testing

**Tool**: axe DevTools (Chrome/Firefox extension)

**Test Cases**:
- [ ] Color contrast (WCAG AA): All text readable
- [ ] Keyboard navigation: All interactive elements accessible
- [ ] Focus indicators: Visible on all focusable elements
- [ ] ARIA labels: Present on module cards, hero section
- [ ] Semantic HTML: Proper heading hierarchy, landmark regions
- [ ] Screen reader: Test with NVDA/VoiceOver

---

### Browser Compatibility Testing

**Browsers**:
- Chrome 90+ (Windows, macOS)
- Firefox 88+ (Windows, macOS)
- Safari 14+ (macOS, iOS)
- Edge 90+ (Windows)

**Test Cases**:
- [ ] Landing page renders correctly
- [ ] Theme toggle works
- [ ] Breadcrumbs display correctly
- [ ] Sidebar functions properly
- [ ] CSS Grid layout supported (all modern browsers)
- [ ] CSS custom properties supported (all modern browsers)

---

## Deployment Strategy

### Development Workflow

1. **Local Development**:
   ```bash
   cd book_frontend
   npm start  # Hot reload at http://localhost:3000
   ```

2. **Build Production Bundle**:
   ```bash
   npm run build  # Outputs to build/
   ```

3. **Serve Production Locally**:
   ```bash
   npm run serve  # Test production build
   ```

4. **Lighthouse Audit**:
   - Run in Chrome DevTools on production build
   - Verify performance, accessibility scores

---

### Deployment Pipeline

**Assumed Platform**: GitHub Pages (or Netlify/Vercel alternative)

**Steps**:
1. Commit changes to `005-docusaurus-ui-upgrade` branch
2. Run `npm run build` to verify build succeeds
3. Run Lighthouse audits
4. Merge to main branch
5. GitHub Actions deploys to GitHub Pages (if configured)

**Alternative Manual Deploy**:
```bash
npm run build
# Copy build/ directory to hosting platform
```

---

## Implementation Phases

### Phase 1: Setup & Foundation (15 minutes)

**Tasks**:
1. Install lucide-react dependency
2. Verify development environment
3. Read research.md, data-model.md, contracts/

**Deliverable**: Development environment ready

---

### Phase 2: Landing Page (P1 - MVP) (3-4 hours)

**Tasks**:
1. Swizzle HomePage component
2. Create ModuleCard component + styles
3. Create ModuleCardGrid component
4. Update index.tsx with hero section + module cards
5. Add hero and grid CSS to custom.css
6. Test landing page functionality

**Deliverable**: Custom landing page with 4 module cards

**Independent Test**: Visit homepage, verify hero + cards display and navigate correctly

---

### Phase 3: Navigation (P2) (2-3 hours)

**Tasks**:
1. Add breadcrumb CSS overrides
2. Verify `_category_.json` configs for all modules
3. Add sidebar CSS enhancements
4. Test breadcrumb navigation
5. Test sidebar collapsible modules

**Deliverable**: Enhanced breadcrumbs and sidebar

**Independent Test**: Navigate through content, verify breadcrumbs show hierarchy and sidebar organizes by module

---

### Phase 4: Visual Polish (P3) (2-3 hours)

**Tasks**:
1. Define all CSS custom properties (colors, typography, spacing)
2. Apply typography system globally
3. Configure Mermaid theme in docusaurus.config.js
4. Test light theme readability
5. Test dark theme readability
6. Test theme toggle functionality
7. Verify all diagrams render correctly in both themes

**Deliverable**: Complete theme system with visual polish

**Independent Test**: Toggle between themes, verify all content readable and diagrams adapt

---

### Phase 5: Testing & Validation (1-2 hours)

**Tasks**:
1. Run Lighthouse audits (desktop + mobile)
2. Test responsive design on multiple viewports
3. Test browser compatibility (Chrome, Firefox, Safari, Edge)
4. Test accessibility with axe DevTools
5. Verify no broken links or content
6. Test build process

**Deliverable**: Validated, production-ready UI upgrade

**Acceptance**: All success criteria met (SC-001 through SC-008)

---

### Phase 6: Deployment (30 minutes)

**Tasks**:
1. Final build verification
2. Commit changes with descriptive message
3. Create pull request
4. Deploy to production (GitHub Pages or alternative)
5. Post-deployment smoke test

**Deliverable**: Upgraded UI deployed to production

---

## Technical Decisions Summary

See `research.md` for detailed decision rationale. Key decisions:

1. **Customization Approach**: Docusaurus swizzling + CSS custom properties
2. **Module Cards**: Custom React component with Lucide icons
3. **Icon Library**: Lucide React (MIT licensed, tree-shakeable)
4. **Typography**: Modular scale (1.25 ratio), system font stack
5. **Dark Theme**: Docusaurus built-in with CSS variable overrides
6. **Breadcrumbs**: CSS-only enhancement (no swizzling)
7. **Sidebar**: Configuration via `_category_.json` + CSS styling
8. **Responsive Design**: Docusaurus default breakpoints + custom media queries
9. **Performance**: Lazy loading, tree-shaking, CSS optimization
10. **Deployment**: Static site (GitHub Pages compatible)

---

## File Change Summary

### New Files (6)

1. `src/components/ModuleCard.tsx` - Module card component
2. `src/components/ModuleCard.module.css` - Module card styles
3. `src/components/ModuleCardGrid.tsx` - Card grid container
4. `src/pages/index.tsx` - Swizzled HomePage (generated by swizzle command)
5. `src/utils/moduleConfig.ts` - Module metadata configuration

### Modified Files (3)

1. `src/css/custom.css` - CSS custom properties, global styles, component overrides
2. `docusaurus.config.js` - Mermaid theme configuration
3. `package.json` - Add lucide-react dependency

### Verified Files (4)

1. `docs/module-1/_category_.json` - Module 1 category config (verify collapsible)
2. `docs/module-2/_category_.json` - Module 2 category config (verify collapsible)
3. `docs/module-3/_category_.json` - Module 3 category config (verify collapsible)
4. `docs/module-4/_category_.json` - Module 4 category config (verify collapsible)

**Total Changes**: 6 new files, 3 modified files, 4 verified files

---

## Risk Mitigation Plans

### Risk 1: Custom CSS Breaking Docusaurus Updates

**Mitigation**:
- Use Docusaurus theme swizzling API (official customization method)
- Minimize CSS overrides (only essential styling)
- Document all swizzled components
- Test with Docusaurus minor version updates before upgrading

**Rollback Plan**: If Docusaurus update breaks UI, revert custom CSS changes, keep default theme temporarily

---

### Risk 2: Dark Theme Diagram Readability

**Mitigation**:
- Configure Mermaid theme variables in docusaurus.config.js
- Test all existing diagrams in dark mode before deployment
- Provide diagram-specific theme overrides if needed

**Fallback**: Use `%%{init: {'theme':'dark'}}%%` directive in individual diagrams if global theme doesn't work

---

### Risk 3: Homepage Load Time Increase

**Mitigation**:
- Use SVG icons (vector, scalable, small file size)
- Inline critical CSS for above-the-fold content
- Lazy-load below-the-fold module cards (if needed)
- Monitor Lighthouse scores continuously

**Threshold**: If LCP exceeds 2.5s, implement lazy loading or reduce icon size

---

### Risk 4: Mobile Sidebar Clutter

**Mitigation**:
- Leverage Docusaurus built-in hamburger menu
- Collapsible module groups reduce visual noise
- Test on multiple mobile devices (iOS, Android)

**Adjustment**: If sidebar still cluttered, consider hiding module descriptions in mobile view

---

### Risk 5: Theme Toggle Layout Shift

**Mitigation**:
- Use CSS-only theme switching (no JavaScript DOM manipulation)
- Preload theme preference from localStorage
- Avoid conditional rendering based on theme

**Validation**: Measure CLS (Cumulative Layout Shift) with Lighthouse - must be less than 0.1

---

## Constitution Re-Check (Post-Design)

### Principle VII: Architectural Simplicity

**Complexity Introduced**:
- 3 new React components (ModuleCard, ModuleCardGrid, HomePage)
- 1 new dependency (Lucide React)
- ~500 lines of custom CSS

**Justification**:
- Components follow Docusaurus recommended patterns (swizzling)
- Lucide React is minimal (tree-shakeable, only 5KB for used icons)
- Custom CSS necessary for theme system (no simpler alternative)
- No backend complexity added (remains static site)

**Simpler Alternatives Rejected**:
- Markdown-only landing page: Cannot achieve interactive module cards
- Inline styles: Poor maintainability, no theme support
- Full theme fork: High maintenance burden

**Verdict**: ✅ PASS - Complexity justified by requirements, follows Docusaurus best practices

---

## Success Criteria Mapping

| Success Criterion | Implementation | Validation Method |
|------------------|----------------|-------------------|
| SC-001: 5-second module discovery | Module cards with icons, titles, descriptions | User testing, analytics |
| SC-002: 30% faster navigation | Direct links from module cards | Analytics tracking |
| SC-003: 90% orientation success | Breadcrumbs showing hierarchy | Usability testing |
| SC-004: 80% readability improvement | Typography system, spacing | User survey |
| SC-005: Sub-100ms theme toggle | CSS-only theme switching | Lighthouse performance |
| SC-006: Lighthouse 90+/85+ | Bundle optimization, lazy loading | Lighthouse audit |
| SC-007: Zero load time increase | Performance budgets, monitoring | Lighthouse comparison |
| SC-008: 100% URL compatibility | No content file moves or renames | Manual link testing |

---

## Next Steps

1. **Review this plan** with stakeholders
2. **Run `/sp.tasks`** to generate task breakdown
3. **Implement P1 (Landing Page)** first for MVP
4. **Test and iterate** based on user feedback
5. **Implement P2 (Navigation)** and P3 (Visual Polish)** incrementally
6. **Deploy** to production after validation

**Ready for task generation**: All design decisions finalized, contracts defined, quickstart guide ready.
