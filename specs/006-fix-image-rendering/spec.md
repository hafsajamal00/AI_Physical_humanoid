# Feature Specification: Fix Image Rendering in Docusaurus UI

**Feature Branch**: `006-fix-image-rendering`
**Created**: 2025-12-28
**Status**: Draft
**Input**: User description: "Fix Docusaurus UI so homepage hero image and navbar logo actually render. Show: Hero image on homepage, Navbar logo (light & dark), Images loaded from static/img/, Responsive layout. Do not break Modules 1–4. Docusaurus v3 compatible."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Visible Homepage Hero Image (Priority: P1)

Site visitors should see a professional hero image on the homepage that provides visual context for the Physical AI & Humanoid Robotics course.

**Why this priority**: The hero image is the first visual element users see and establishes the site's professional appearance and topic relevance. Currently missing, making the site feel incomplete.

**Independent Test**: Visit homepage at root URL - hero image should be visible, responsive on mobile/desktop, and not hidden by CSS or broken paths.

**Acceptance Scenarios**:

1. **Given** a user visits the homepage, **When** the page loads, **Then** the hero image displays in the hero section alongside the title and subtitle
2. **Given** a user on desktop (>768px width), **When** viewing the homepage, **Then** the hero image appears on the right side next to the text content
3. **Given** a user on mobile (≤768px width), **When** viewing the homepage, **Then** the hero image appears above the text content in stacked layout
4. **Given** the hero image is displayed, **When** resizing the browser window, **Then** the image scales responsively without distortion

---

### User Story 2 - Visible Navbar Logo (Priority: P2)

Site visitors should see a branding logo in the navbar that identifies the course and switches appropriately between light and dark themes.

**Why this priority**: The navbar logo provides consistent branding across all pages and enhances professional appearance. Missing logo makes the site look unfinished.

**Independent Test**: Navigate to any page - navbar logo should be visible in both light mode and dark mode, positioned left of the site title.

**Acceptance Scenarios**:

1. **Given** a user visits any page in light mode, **When** the navbar loads, **Then** the light-themed logo displays on the left side next to the site title
2. **Given** a user in light mode, **When** they toggle to dark mode, **Then** the logo automatically switches to the dark-themed version
3. **Given** a user visits any page in dark mode, **When** the navbar loads, **Then** the dark-themed logo displays appropriately for dark backgrounds
4. **Given** a user on mobile, **When** viewing the navbar, **Then** the logo remains visible and properly sized

---

### Edge Cases

- **Missing image files**: If image files are not present in `static/img/`, images will not display but site will still function
- **Incorrect file types**: If SVG code is saved as .png instead of real PNG binary, browser may fail to render
- **Large file sizes**: If images exceed 2MB, page load time may be noticeably slow (>3 seconds)
- **Theme toggle during load**: Logo must smoothly transition between themes without showing broken state

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Homepage MUST display a hero image in the hero section without CSS hiding it
- **FR-002**: Navbar MUST display a logo icon on the left side of the site title
- **FR-003**: Navbar logo MUST automatically switch between light and dark variants based on theme
- **FR-004**: Hero image MUST be responsive and scale appropriately on mobile and desktop viewports
- **FR-005**: Hero image MUST load from `static/img/hero.png` path
- **FR-006**: Light mode logo MUST load from `static/img/logo.png` path
- **FR-007**: Dark mode logo MUST load from `static/img/logo-dark.png` path
- **FR-008**: Images MUST be actual PNG or JPG binary files, not SVG code saved with .png extension
- **FR-009**: Hero image MUST appear on the right side of text on desktop (>768px width)
- **FR-010**: Hero image MUST appear above text on mobile (≤768px width) in stacked layout
- **FR-011**: Image container CSS MUST NOT use `display:none` or other hiding properties
- **FR-012**: Images MUST have `max-width: 100%` to ensure responsive scaling
- **FR-013**: Solution MUST NOT break existing Modules 1-4 markdown content
- **FR-014**: Solution MUST be compatible with Docusaurus v3
- **FR-015**: Build process MUST pass successfully with `npm run build`

### Key Entities

*This section is not applicable - this is a visual/UI fix with no data entities.*

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: When any stakeholder visits the homepage, they can immediately see both the hero image and navbar logo without needing to inspect code
- **SC-002**: When a user toggles between light and dark modes, the navbar logo visibly changes to the appropriate variant within 1 second
- **SC-003**: When viewing the site on devices from 375px to 1920px width, images scale appropriately and layout adjusts as expected
- **SC-004**: When running `npm run build`, the build completes without errors related to missing images or broken paths
- **SC-005**: When accessing any of the 4 module pages, all existing content displays correctly without any broken links

## Scope *(mandatory)*

### In Scope

1. Adding real PNG/JPG image files to `static/img/` directory
2. Verifying hero image path references `/img/hero.png`
3. Verifying navbar logo configuration references `img/logo.png` and `img/logo-dark.png`
4. Ensuring CSS does not hide images
5. Verifying responsive layout styling
6. Testing image visibility in both light and dark themes
7. Validating build passes with images present
8. Documenting image specifications

### Out of Scope

1. Creating custom logo designs (placeholder images acceptable)
2. Optimizing image file sizes beyond basic web standards
3. Adding image lazy loading or advanced performance features
4. Creating additional images beyond the 3 required
5. Modifying any markdown content in Modules 1-4
6. Changing navbar structure or hero section layout
7. Adding image alt text beyond what's in code
8. Implementing image galleries or additional visual elements

## Dependencies *(mandatory)*

- **Docusaurus v3**: Site build system (already installed)
- **Image assets**: Require 3 real PNG/JPG files to be obtained (not currently present)
- **Static asset serving**: Docusaurus built-in static file serving
- **Homepage code**: `src/pages/index.tsx` hero section (already implemented)
- **CSS styling**: `src/css/custom.css` styles (already implemented)
- **Docusaurus config**: `docusaurus.config.js` navbar logo config (already implemented)

## Assumptions *(mandatory)*

1. User will provide or obtain 3 real PNG/JPG image files from stock image sites or AI generation
2. Image specifications: Hero ~600x500px, Logos 32x32px
3. Homepage hero structure, navbar logo configuration, and CSS are already correctly implemented
4. PNG format with transparency for logos, PNG or JPG for hero
5. Modern browsers with standard image format support
6. Images under 500KB total size for acceptable load times

## Risks *(mandatory)*

### Risk 1: Image Quality/Resolution

**Impact**: Medium - Site will function but may not look professional

**Mitigation**: Provide clear image specifications and suggest reputable image sources

### Risk 2: License Compliance

**Impact**: High - Potential legal issues for commercial use

**Mitigation**: Recommend royalty-free sources (Unsplash, Pexels) or AI-generated images

### Risk 3: Image Not Found Errors

**Impact**: High - Feature will not work at all

**Mitigation**: Create validation checklist to verify files exist before testing
