# Quickstart Guide: Docusaurus UI Upgrade Implementation

**Feature**: 005-docusaurus-ui-upgrade
**Audience**: Developers implementing the UI upgrade
**Prerequisites**: Node.js 18+, npm 9+, Docusaurus v3 knowledge

## Overview

This guide provides a rapid implementation path for the Docusaurus UI upgrade, organized by user story priority (P1 → P2 → P3) for incremental delivery.

## Setup

### 1. Install Dependencies

```bash
cd book_frontend
npm install lucide-react
```

**Installed**:
- `lucide-react`: Icon library for module cards and UI elements

### 2. Verify Docusaurus Environment

```bash
npm start  # Starts development server at http://localhost:3000
```

**Verify**:
- Site loads successfully
- All 4 modules (Module 1-4) appear in sidebar
- Existing content renders correctly

---

## Implementation Path 1: Landing Page (P1 - MVP)

**Goal**: Create modern landing page with hero section and module cards

**Estimated Time**: 3-4 hours

### Step 1.1: Swizzle HomePage Component

```bash
npm run swizzle @docusaurus/theme-classic HomePage -- --eject
```

**Output**: Creates `src/pages/index.tsx` (or index.js)

**Verify**: File created at `book_frontend/src/pages/index.tsx`

### Step 1.2: Create ModuleCard Component

**File**: `src/components/ModuleCard.tsx`

**Template**:
```tsx
import React from 'react';
import Link from '@docusaurus/Link';
import styles from './ModuleCard.module.css';

export interface ModuleCardProps {
  number: 1 | 2 | 3 | 4;
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

export default function ModuleCard({
  number,
  title,
  description,
  icon,
  link
}: ModuleCardProps): JSX.Element {
  return (
    <article className={styles.card}>
      <div className={styles.icon}>{icon}</div>
      <span className={styles.number}>Module {number}</span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <Link to={link} className={styles.link}>
        Start Learning →
      </Link>
    </article>
  );
}
```

**CSS File**: `src/components/ModuleCard.module.css`
- Copy styles from `/contracts/css-styling-contract.md` (ModuleCard section)

### Step 1.3: Update HomePage

**File**: `src/pages/index.tsx`

**Structure**:
```tsx
import React from 'react';
import Layout from '@theme/Layout';
import ModuleCard from '@site/src/components/ModuleCard';
import { Network, Cuboid, Eye, Zap } from 'lucide-react';

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Physical AI & Humanoid Robotics"
      description="Master autonomous robotics from ROS 2 to AI-powered systems">

      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero__title">
          Physical AI & Humanoid Robotics
        </h1>
        <p className="hero__subtitle">
          From ROS 2 Foundations to Autonomous Intelligence
        </p>
        <a href="#modules" className="hero__cta">
          Explore Modules
        </a>
      </section>

      {/* Module Cards */}
      <section id="modules" className="module-cards-grid">
        <ModuleCard
          number={1}
          title="The Robotic Nervous System (ROS 2)"
          description="Master ROS 2 middleware connecting AI to robotic embodiment"
          icon={<Network size={48} />}
          link="/docs/module-1/chapter-1-ros2-foundations"
        />

        <ModuleCard
          number={2}
          title="Digital Twins & Simulation"
          description="Test and validate robots safely in Gazebo and Isaac Sim"
          icon={<Cuboid size={48} />}
          link="/docs/module-2"
        />

        <ModuleCard
          number={3}
          title="Isaac ROS & Nav2"
          description="Perception and autonomous navigation for humanoid robots"
          icon={<Eye size={48} />}
          link="/docs/module-3"
        />

        <ModuleCard
          number={4}
          title="Vision-Language-Action (VLA)"
          description="Voice-controlled, LLM-powered autonomous execution"
          icon={<Zap size={48} />}
          link="/docs/module-4"
        />
      </section>
    </Layout>
  );
}
```

### Step 1.4: Add Hero and Grid CSS

**File**: `src/css/custom.css`

**Add**:
- Copy hero styles from `/contracts/css-styling-contract.md` (HeroSection)
- Copy grid styles from `/contracts/css-styling-contract.md` (ModuleCardGrid)

### Step 1.5: Test P1 MVP

```bash
npm start
```

**Validate**:
- Visit http://localhost:3000
- Hero section displays with title and tagline
- 4 module cards render in grid (2x2 on desktop)
- Clicking cards navigates to modules
- Responsive design works (test mobile viewport)

---

## Implementation Path 2: Navigation Enhancements (P2)

**Goal**: Improve breadcrumbs and sidebar organization

**Estimated Time**: 2-3 hours

### Step 2.1: Enhance Breadcrumb Styling

**File**: `src/css/custom.css`

**Add**:
- Copy breadcrumb styles from `/contracts/css-styling-contract.md` (Breadcrumb Navigation)

### Step 2.2: Update Module Category Configs

For each module, ensure `_category_.json` has:

**File**: `docs/module-N/_category_.json`

```json
{
  "label": "Module N: [Title]",
  "position": N,
  "collapsible": true,
  "collapsed": false,
  "link": {
    "type": "generated-index",
    "description": "[Module description]"
  }
}
```

**Modules to update**:
- `docs/module-1/_category_.json`
- `docs/module-2/_category_.json`
- `docs/module-3/_category_.json`
- `docs/module-4/_category_.json`

### Step 2.3: Enhance Sidebar Styling

**File**: `src/css/custom.css`

**Add**:
- Copy sidebar styles from `/contracts/css-styling-contract.md` (Sidebar Styling)

### Step 2.4: Test P2 Navigation

```bash
npm start
```

**Validate**:
- Navigate to any chapter
- Breadcrumbs show correct hierarchy
- Sidebar displays modules as collapsible groups
- Current chapter is highlighted
- Breadcrumbs are clickable and functional

---

## Implementation Path 3: Visual Polish & Themes (P3)

**Goal**: Add dark theme support, improve typography, refine spacing

**Estimated Time**: 2-3 hours

### Step 3.1: Define CSS Custom Properties

**File**: `src/css/custom.css`

**Add at top of file**:
```css
/* Import base variables */
:root {
  /* Copy all CSS custom properties from /contracts/css-styling-contract.md */
  /* Colors, Typography, Spacing, Borders, Shadows, Transitions, Breakpoints */
}

[data-theme='dark'] {
  /* Copy dark theme color overrides */
}
```

### Step 3.2: Apply Typography System

**File**: `src/css/custom.css`

**Add**:
- Copy global typography styles from `/contracts/css-styling-contract.md` (Global Typography)

### Step 3.3: Configure Mermaid Theme

**File**: `docusaurus.config.js`

**Add** to module.exports:
```javascript
module.exports = {
  // ... existing config
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
  themeConfig: {
    mermaid: {
      theme: { light: 'default', dark: 'dark' },
    },
  },
};
```

### Step 3.4: Add Theme Toggle (If Not Present)

**Check**: Docusaurus v3 includes theme toggle by default in navbar

**If missing**, swizzle:
```bash
npm run swizzle @docusaurus/theme-classic ColorModeToggle -- --eject
```

### Step 3.5: Test P3 Visual Polish

```bash
npm start
```

**Validate**:
- Toggle between light and dark themes
- All text is readable in both themes
- Code blocks have proper syntax highlighting
- Mermaid diagrams adapt to theme
- Typography hierarchy is clear
- Spacing feels balanced

**Test Devices**:
- Desktop (1920x1080)
- Tablet (768x1024)
- Mobile (375x667)

---

## Build and Deployment

### Local Build Test

```bash
cd book_frontend
npm run build
```

**Verify**:
- Build completes without errors
- No warnings about broken links or invalid MDX
- Output in `build/` directory

### Serve Production Build

```bash
npm run serve
```

**Verify**:
- Visit http://localhost:3000
- Test all functionality in production mode
- Run Lighthouse audit (should be 90+ desktop, 85+ mobile)

### Lighthouse Performance Test

```bash
# Open production build in Chrome
# Open DevTools > Lighthouse tab
# Run audit for Desktop and Mobile
```

**Acceptance Criteria**:
- Performance: 90+ (desktop), 85+ (mobile)
- Accessibility: 95+
- Best Practices: 95+
- SEO: 90+

---

## Common Tasks

### Adding a New Module Card

1. Edit `src/pages/index.tsx`
2. Add new `<ModuleCard>` component with props
3. Import icon from lucide-react
4. Specify module number, title, description, link

### Changing Module Icons

1. Browse Lucide icons: https://lucide.dev/icons
2. Import new icon: `import { IconName } from 'lucide-react';`
3. Replace icon prop: `icon={<IconName size={48} />}`

### Customizing Colors

1. Edit `src/css/custom.css`
2. Update CSS custom properties in `:root` (light) and `[data-theme='dark']` (dark)
3. Test in both themes

### Adjusting Spacing

1. Edit spacing variables in `src/css/custom.css`
2. Use variables in component styles: `padding: var(--space-md);`

---

## Troubleshooting

### Issue: Module cards not rendering

**Cause**: Component import error or missing icon

**Solution**:
1. Check console for errors
2. Verify Lucide icons imported correctly
3. Check ModuleCard component file path

### Issue: Dark theme not working

**Cause**: CSS custom properties not defined for dark theme

**Solution**:
1. Verify `[data-theme='dark']` selector exists
2. Check all color variables have dark theme overrides
3. Clear cache: `npm run clear` then `npm start`

### Issue: Build fails after swizzling

**Cause**: Incompatible component swizzle

**Solution**:
1. Use "wrap" instead of "eject" for safer swizzling:
   ```bash
   npm run swizzle @docusaurus/theme-classic HomePage -- --wrap
   ```
2. Check Docusaurus docs for component compatibility

### Issue: Performance score drops

**Cause**: Too many large assets or unoptimized JavaScript

**Solution**:
1. Optimize SVG icons (remove unnecessary paths)
2. Lazy load below-the-fold content
3. Check bundle analyzer: `npm run build -- --analyze`

---

## Development Workflow

1. **Feature branch**: Already on `005-docusaurus-ui-upgrade`
2. **Implement**: Follow paths P1 → P2 → P3 or work on all in parallel
3. **Test locally**: `npm start` for hot reload development
4. **Build**: `npm run build` before committing
5. **Lighthouse**: Run performance audit
6. **Commit**: Follow git commit conventions
7. **Deploy**: Merge to main, deploy to hosting platform

---

## Time Estimates by Priority

- **P1 (Landing Page)**: 3-4 hours → Delivers MVP
- **P2 (Navigation)**: 2-3 hours → Enhances learning UX
- **P3 (Visual Polish)**: 2-3 hours → Adds professional finish

**Total**: 7-10 hours for complete implementation

**Incremental Delivery**:
- Ship P1 first → users get improved landing page immediately
- Add P2 next → improves navigation for active learners
- Finish with P3 → polishes the entire experience

---

## References

- **Docusaurus Swizzling**: https://docusaurus.io/docs/swizzling
- **Docusaurus Styling**: https://docusaurus.io/docs/styling-layout
- **Lucide Icons**: https://lucide.dev/
- **Lighthouse**: https://developer.chrome.com/docs/lighthouse/
- **WCAG Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/

---

## Success Validation

After implementation, confirm:
- ✅ Landing page displays hero + 4 module cards
- ✅ All module cards navigate correctly
- ✅ Breadcrumbs show hierarchy on content pages
- ✅ Sidebar organizes chapters under modules
- ✅ Light/dark themes work without flicker
- ✅ All content readable in both themes
- ✅ Responsive design works on mobile/tablet/desktop
- ✅ `npm run build` succeeds
- ✅ Lighthouse scores: 90+ desktop, 85+ mobile
- ✅ No breaking changes to existing content URLs

**Ready for deployment!**
