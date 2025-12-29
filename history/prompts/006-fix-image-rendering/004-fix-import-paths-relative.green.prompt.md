---
id: 004
title: Fix import paths to relative
stage: green
date: 2025-12-30
surface: agent
model: claude-sonnet-4-5-20250929
feature: 006-fix-image-rendering
branch: 006-fix-image-rendering
user: laiba
command: /sp.implement
labels: ["bugfix", "imports", "typescript", "docusaurus"]
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

Fix ONLY the import errors in `src/pages/index.tsx`.

Errors:
- Cannot resolve `@site/src/components/ModuleCard`
- Cannot resolve `@site/src/components/ModuleCardGrid`
- Cannot resolve `@site/src/utils/moduleConfig`

Actions:
- Verify correct file names and paths
- Fix imports using correct relative paths if aliases are not configured
- Do NOT change UI, JSX, or logic
- Return the fully corrected `index.tsx` file only

## Response snapshot

Fixed import statements by converting `@site` aliases to relative paths:

**Before:**
```tsx
import ModuleCard from '@site/src/components/ModuleCard';
import ModuleCardGrid from '@site/src/components/ModuleCardGrid';
import { moduleConfigs } from '@site/src/utils/moduleConfig';
```

**After:**
```tsx
import ModuleCard from '../components/ModuleCard';
import ModuleCardGrid from '../components/ModuleCardGrid';
import { moduleConfigs } from '../utils/moduleConfig';
```

Build passes successfully.

## Outcome

- ✅ Impact: All import errors resolved, components load correctly
- 🧪 Tests: Build passes (npm run build - SUCCESS)
- 📁 Files: 1 file modified (index.tsx)
- 🔁 Next prompts: None - imports now work correctly
- 🧠 Reflection: Relative paths more reliable when @site alias not properly configured

## Evaluation notes (flywheel)

- Failure modes observed: @site alias not resolving in build context
- Graders run and results (PASS/FAIL): Build PASS
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
