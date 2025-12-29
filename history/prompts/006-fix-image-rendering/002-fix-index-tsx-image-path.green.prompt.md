---
id: 002
title: Fix index.tsx image path
stage: green
date: 2025-12-30
surface: agent
model: claude-sonnet-4-5-20250929
feature: 006-fix-image-rendering
branch: 006-fix-image-rendering
user: laiba
command: /sp.implement
labels: ["bugfix", "docusaurus", "image-path"]
links:
  spec: specs/006-fix-image-rendering/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - book_frontend/src/pages/index.tsx
tests:
  - npm run build (passed)
---

## Prompt

Fix build errors in `src/pages/index.tsx` only. Correct React/TypeScript issues and Docusaurus image paths (use `/img/hero.png`). Do not change UI, layout, or logic. Return full corrected file that builds successfully.

## Response snapshot

Fixed image path in `book_frontend/src/pages/index.tsx:31`:
- Changed: `src="img/hero.png"` → `src="/img/hero.png"`
- Leading `/` ensures proper static asset resolution in Docusaurus
- Build passes successfully with no errors

## Outcome

- ✅ Impact: Hero image now loads correctly with absolute path
- 🧪 Tests: Build passes (npm run build - SUCCESS)
- 📁 Files: 1 file modified (index.tsx)
- 🔁 Next prompts: Replace placeholder images with AI-generated images
- 🧠 Reflection: Simple fix - Docusaurus requires leading slash for static assets

## Evaluation notes (flywheel)

- Failure modes observed: None - straightforward path correction
- Graders run and results (PASS/FAIL): Build PASS
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
