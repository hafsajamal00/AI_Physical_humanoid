# Required Images for Docusaurus UI

**Status**: ⚠️ Awaiting image files

The code is fully configured to display images. You need to add 3 PNG files:

---

## 1. Navbar Logo (Light Mode)

**Path**: `book_frontend/static/img/logo.png`

**Specifications**:
- Format: PNG (with transparency)
- Size: 32x32 pixels
- Style: Minimal, modern robotics/AI icon
- Colors: Dark colors (blue #2563eb recommended)
- Background: Transparent

**Design suggestions**:
- Robot head icon
- Circuit brain icon
- Gear + AI symbol
- Abstract geometric robot

---

## 2. Navbar Logo (Dark Mode)

**Path**: `book_frontend/static/img/logo-dark.png`

**Specifications**:
- Format: PNG (with transparency)
- Size: 32x32 pixels
- Style: Same as light mode but with lighter colors
- Colors: Light colors (light blue #60a5fa recommended)
- Background: Transparent

**Note**: Should be the same design as logo.png but optimized for dark backgrounds

---

## 3. Homepage Hero Image

**Path**: `book_frontend/static/img/hero.png`

**Specifications**:
- Format: PNG or JPG
- Size: Approximately 600x500 pixels (or 1200x1000 for @2x)
- Theme: Humanoid robot, Physical AI, robotics lab
- Style: Professional, educational, modern
- Colors: Blue tones (#2563eb, #60a5fa) to match site theme

**Content suggestions**:
- Humanoid robot in learning pose
- Robot with AI neural network overlay
- Futuristic lab with robots
- Abstract robot silhouette with tech elements

---

## Where to Get Images

### Option 1: Free Stock Images (Royalty-Free)
1. **Unsplash** (https://unsplash.com)
   - Search: "humanoid robot", "AI robotics", "robot learning"
   - License: Free for commercial use

2. **Pexels** (https://pexels.com)
   - Search: "robot", "artificial intelligence", "robotics"
   - License: Free for commercial use

3. **Pixabay** (https://pixabay.com)
   - Search: "robot", "AI", "humanoid"
   - License: Free for commercial use

### Option 2: AI Image Generation
1. **DALL-E** (OpenAI)
2. **Midjourney**
3. **Stable Diffusion**

Prompt example: "Modern humanoid robot in a learning environment, blue color scheme, professional educational style, clean minimal design"

### Option 3: Design Tools
1. **Canva** - Logo maker
2. **Figma** - Custom design
3. **Adobe Express** - Quick graphics

---

## Current Code Status

✅ **Homepage** (`src/pages/index.tsx`): References `/img/hero.png`
✅ **Navbar Config** (`docusaurus.config.js`): References `logo.png` and `logo-dark.png`
✅ **CSS Styling**: Complete responsive layout ready
✅ **Build Configuration**: All paths configured

**Once you add the 3 PNG files, the site will work immediately!**

---

## Verification Steps

After adding images:

```bash
cd book_frontend

# Check images exist
ls static/img/logo.png
ls static/img/logo-dark.png
ls static/img/hero.png

# Build site
npm run build

# Serve locally
npm start
```

Visit http://localhost:3000 to verify:
- [ ] Hero image displays on homepage
- [ ] Navbar logo shows in light mode
- [ ] Navbar logo switches in dark mode (toggle theme)
- [ ] Mobile responsive layout works

---

## Quick Solution (Temporary)

If you need to test immediately, use any existing PNG from the internet:

```bash
# Example: Download a sample image (replace URL with actual image)
cd book_frontend/static/img

# On Windows PowerShell:
# Invoke-WebRequest -Uri "https://example.com/robot.png" -OutFile "hero.png"
# Invoke-WebRequest -Uri "https://example.com/logo.png" -OutFile "logo.png"
# Invoke-WebRequest -Uri "https://example.com/logo-light.png" -OutFile "logo-dark.png"
```

Then build and test the site.
