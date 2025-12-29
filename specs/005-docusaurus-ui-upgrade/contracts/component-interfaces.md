# Component Interface Contracts

**Feature**: 005-docusaurus-ui-upgrade
**Purpose**: Define TypeScript interfaces and prop contracts for React components

## ModuleCard Component

**File**: `src/components/ModuleCard.tsx`

**Interface**:
```typescript
interface ModuleCardProps {
  /** Module number (1-4) */
  number: 1 | 2 | 3 | 4;

  /** Module title (max 60 chars) */
  title: string;

  /** Brief description (max 200 chars) */
  description: string;

  /** Lucide React icon component */
  icon: React.ReactNode;

  /** Navigation link to module content */
  link: string;

  /** Optional visual variant */
  variant?: 'default' | 'featured';

  /** Optional CSS class name */
  className?: string;
}
```

**Usage Example**:
```tsx
import { Network } from 'lucide-react';
import ModuleCard from '@site/src/components/ModuleCard';

<ModuleCard
  number={1}
  title="ROS 2 Robotic Nervous System"
  description="Master ROS 2 middleware connecting AI to robotics"
  icon={<Network />}
  link="/docs/module-1"
/>
```

**Validation Requirements**:
- `number` must be literal type 1, 2, 3, or 4
- `title` must not be empty and max 60 characters
- `description` must not be empty and max 200 characters
- `icon` must be a valid React element (Lucide icon)
- `link` must start with "/" (internal route)

**Acceptance Criteria**:
- Component renders without errors
- Clicking card navigates to `link` URL
- Card is keyboard accessible (tab, enter to activate)
- Card has hover state for visual feedback
- Card is responsive (adapts to mobile/desktop)

---

## HeroSection Component

**File**: `src/pages/index.tsx` (within HomePage)

**Interface**:
```typescript
interface HeroSectionProps {
  /** Course main title */
  title: string;

  /** Course tagline/subtitle */
  subtitle: string;

  /** Call-to-action button text */
  ctaText?: string;

  /** CTA button link */
  ctaLink?: string;
}
```

**Default Props**:
```typescript
const defaultProps: Partial<HeroSectionProps> = {
  ctaText: 'Start Learning',
  ctaLink: '/docs/intro',
};
```

**Usage Example**:
```tsx
<HeroSection
  title="Physical AI & Humanoid Robotics"
  subtitle="From ROS 2 to Autonomous Intelligence"
  ctaText="Explore Modules"
  ctaLink="/#modules"
/>
```

**Validation Requirements**:
- `title` must not be empty
- `subtitle` must not be empty
- `ctaLink` must be a valid URL (internal or external)

**Acceptance Criteria**:
- Hero section displays prominently at top of page
- Title and subtitle are readable in both light and dark themes
- CTA button navigates correctly
- Section is responsive (stacks on mobile, side-by-side on desktop)

---

## ModuleCardGrid Component

**File**: `src/components/ModuleCardGrid.tsx`

**Interface**:
```typescript
interface ModuleCardGridProps {
  /** Array of module card props */
  modules: ModuleCardProps[];

  /** Optional grid layout (default: auto-responsive) */
  columns?: 1 | 2 | 3 | 4;

  /** Optional CSS class name */
  className?: string;
}
```

**Usage Example**:
```tsx
import ModuleCardGrid from '@site/src/components/ModuleCardGrid';

const modules = [
  { number: 1, title: '...', description: '...', icon: <Network />, link: '/docs/module-1' },
  { number: 2, title: '...', description: '...', icon: <Cuboid />, link: '/docs/module-2' },
  // ... modules 3-4
];

<ModuleCardGrid modules={modules} />
```

**Validation Requirements**:
- `modules` array must contain 1-4 items
- Each module must have unique `number` value
- Grid must be responsive (1 column mobile, 2 columns desktop)

**Acceptance Criteria**:
- Grid displays all module cards
- Grid layout adapts to screen size
- Cards have consistent spacing (gap: 1.5rem)
- Grid is accessible (proper semantic HTML)

---

## Theme Toggle Component

**File**: Docusaurus built-in (no custom interface needed)

**Usage**:
```tsx
import useColorMode from '@docusaurus/useColorMode';

function MyComponent() {
  const { colorMode, setColorMode } = useColorMode();

  return (
    <button onClick={() => setColorMode(colorMode === 'dark' ? 'light' : 'dark')}>
      {colorMode === 'dark' ? <Moon /> : <Sun />}
    </button>
  );
}
```

**Acceptance Criteria**:
- Toggle switches between light and dark themes instantly
- Theme preference persists across sessions (localStorage)
- No layout shift or flicker when toggling
- Icon updates to reflect current theme

---

## Testing Contracts

### Component Rendering Tests

**File**: `src/components/__tests__/ModuleCard.test.tsx`

**Test Cases**:
```typescript
describe('ModuleCard', () => {
  it('renders with all props', () => {
    // Test that component displays all provided props
  });

  it('navigates when clicked', () => {
    // Test that clicking card navigates to link
  });

  it('is keyboard accessible', () => {
    // Test tab navigation and enter key activation
  });

  it('displays hover state', () => {
    // Test hover styling applies correctly
  });

  it('validates number prop', () => {
    // Test that invalid number (e.g., 5) throws error or warning
  });
});
```

### Visual Regression Tests

**Tool**: Storybook (optional) or manual testing

**Scenarios**:
- Module card in light theme
- Module card in dark theme
- Module card on mobile viewport
- Module card hover state
- Grid of 4 cards (desktop)
- Grid of 4 cards (mobile, stacked)

---

## Accessibility Contracts

### ARIA Labels

**ModuleCard**:
```tsx
<div
  role="article"
  aria-label={`Module ${number}: ${title}`}
  className="module-card"
>
  <Link
    to={link}
    aria-label={`Start Module ${number}: ${title}`}
  >
    {/* Card content */}
  </Link>
</div>
```

**HeroSection**:
```tsx
<section aria-label="Course Introduction" className="hero">
  <h1>{title}</h1>
  <p className="subtitle">{subtitle}</p>
  <Link to={ctaLink} aria-label={ctaText}>
    {ctaText}
  </Link>
</section>
```

### Keyboard Navigation Requirements

- All interactive elements (cards, links, buttons) must be keyboard accessible
- Tab order must be logical (top-to-bottom, left-to-right)
- Focus indicators must be visible (outline or custom styling)
- Enter/Space keys must activate links and buttons

### Color Contrast Requirements

**WCAG AA Compliance** (all text must meet minimum contrast ratios):
- Normal text (18px or less): 4.5:1 contrast ratio
- Large text (18px+ or 14px+ bold): 3:1 contrast ratio
- Interactive elements: 3:1 contrast ratio

**Validation**:
- Test all color combinations in light theme
- Test all color combinations in dark theme
- Use browser DevTools Lighthouse audit
- Use axe DevTools for accessibility scanning

---

## Performance Contracts

### Bundle Size Limits

- **ModuleCard component**: Max 5 KB (minified + gzipped)
- **Lucide icons**: Only import used icons (tree-shaking)
- **Custom CSS**: Max 10 KB total (minified + gzipped)
- **Hero section**: Inline critical CSS, defer non-critical

### Rendering Performance

- **First Contentful Paint (FCP)**: Less than 1.5 seconds
- **Largest Contentful Paint (LCP)**: Less than 2.5 seconds
- **Cumulative Layout Shift (CLS)**: Less than 0.1
- **Time to Interactive (TTI)**: Less than 3 seconds

**Measurement**: Use Lighthouse and Chrome DevTools Performance panel

---

## CSS Contracts

### CSS Custom Property Naming Convention

**Format**: `--{category}-{property}-{variant?}`

**Examples**:
- `--color-primary`
- `--color-bg-card`
- `--font-size-base`
- `--space-md`
- `--breakpoint-tablet`

### CSS Class Naming Convention

**Format**: BEM (Block-Element-Modifier)

**Examples**:
- `.module-card` (block)
- `.module-card__icon` (element)
- `.module-card--featured` (modifier)

**Alternative**: CSS Modules (scoped classes)
- `.card` (auto-scoped by Docusaurus)
- `.card_icon` (element)

---

## Responsive Design Contracts

### Breakpoint Behavior

| Breakpoint | Viewport Width | Module Cards | Hero Section |
|-----------|----------------|--------------|--------------|
| Mobile | 0-767px | 1 column stack | Title/subtitle stacked |
| Tablet | 768-995px | 2 columns | Title/subtitle side-by-side |
| Desktop | 996px+ | 2x2 grid | Full-width with CTA |

### Touch Target Sizes

- Interactive elements (cards, buttons): Minimum 44x44 pixels
- Links: Minimum 24px height with adequate padding
- Icons: Minimum 24x24 pixels (default Lucide size)

---

## Browser Compatibility

**Minimum Supported Browsers**:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Features to Polyfill** (if needed):
- CSS custom properties (unlikely needed for modern browsers)
- CSS Grid (native support in all target browsers)
- ES6+ features (handled by Docusaurus/Webpack transpilation)

---

## Documentation Contracts

### Component Documentation

Each component must have:
- JSDoc comments for props
- Usage examples in comments or README
- Storybook story (optional but recommended)
- TypeScript interface exported

**Example**:
```typescript
/**
 * ModuleCard component displays a single learning module card
 * with icon, title, description, and navigation link.
 *
 * @example
 * ```tsx
 * <ModuleCard
 *   number={1}
 *   title="ROS 2"
 *   description="Learn ROS 2 middleware"
 *   icon={<Network />}
 *   link="/docs/module-1"
 * />
 * ```
 */
export function ModuleCard(props: ModuleCardProps): JSX.Element {
  // Implementation
}
```

---

## Error Handling Contracts

### Component Error Boundaries

- All custom components should be wrapped in React Error Boundaries
- Docusaurus provides default error boundaries
- Custom errors should display user-friendly messages

### Prop Validation

- Use TypeScript for compile-time validation
- Add runtime validation for critical props (if needed)
- Log warnings for invalid props in development mode

**Example**:
```typescript
if (process.env.NODE_ENV === 'development') {
  if (title.length > 60) {
    console.warn(`ModuleCard title exceeds 60 characters: "${title}"`);
  }
}
```

---

## Summary

All components, styles, and interactions must conform to these contracts to ensure:
- Type safety (TypeScript interfaces)
- Accessibility (WCAG AA, keyboard navigation)
- Performance (bundle size, Core Web Vitals)
- Consistency (naming conventions, responsive behavior)
- Quality (testing requirements, documentation)

Implementation must validate against these contracts before deployment.
