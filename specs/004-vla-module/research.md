# Research & Technical Decisions: Module 4 – Vision-Language-Action (VLA)

**Feature**: 004-vla-module
**Created**: 2025-12-27
**Status**: Complete

## Overview

This document captures research findings and technical decisions for Module 4 content authoring. Module 4 serves as the **capstone module**, integrating voice control, LLM cognitive planning, and all prior modules (ROS 2, simulation, perception, navigation) into a complete autonomous humanoid system.

## Decision 1: Content Structure (3 Sequential Chapters)

**Context**: Module 4 must cover voice control, LLM planning, and system integration—three distinct but interdependent topics.

**Decision**: Organize content into 3 sequential chapters:
1. Chapter 1: Voice-to-Action with OpenAI Whisper (speech recognition → ROS 2 actions)
2. Chapter 2: Cognitive Planning with LLMs (task decomposition, LLM → action sequences)
3. Chapter 3: Capstone: Autonomous Humanoid Execution (complete system integration)

**Rationale**:
- Sequential dependency: Voice control (P1) provides foundation for LLM planning (P2), which feeds into complete integration (P3)
- Mirrors user story priorities from spec.md (P1 → P2 → P3)
- Consistent with Modules 1-3 pattern (3 chapters per module)
- Chapter 3 as capstone synthesizes all 4 modules (unique to Module 4)

**Alternatives Considered**:
- 2 chapters (combine voice + LLM): Rejected—loses independent testability, violates Modules 1-3 pattern
- 4+ chapters (split capstone): Rejected—over-fragments content, Chapter 3 should be comprehensive integration showcase
- Reverse order (capstone first): Rejected—students need voice/LLM foundations before understanding integration

## Decision 2: Diagram Strategy (Workflow-Focused Mermaid)

**Context**: VLA involves complex multi-component workflows (voice → NLU → action mapping, LLM → task planning → execution, complete system integration).

**Decision**: Emphasize Mermaid workflow diagrams showing data flow between components, with comparison tables for decision frameworks (speech recognition options, LLM vs. scripted planning).

**Rationale**:
- VLA is inherently workflow-oriented (sequential processing from voice input to robot actuation)
- Mermaid flowcharts illustrate component interactions better than static text
- Modules 1-3 precedent: Successfully used Mermaid for ROS 2 communication, Gazebo simulation loops, VSLAM workflows, Nav2 pipelines
- Target diagrams for Module 4:
  - Chapter 1: Voice-to-action pipeline (audio capture → speech-to-text → NLU → intent → ROS 2 action)
  - Chapter 2: LLM task decomposition workflow (high-level task → LLM planning → action sequence → validation)
  - Chapter 3: Complete VLA system architecture (voice → LLM → Isaac ROS → Nav2 → manipulation)

**Alternatives Considered**:
- Text-only explanations: Rejected—workflows too complex to follow without visual aids
- Static architecture diagrams (PNG): Rejected—not version-controlled, harder to update
- Video demonstrations: Rejected—breaks Docusaurus inline rendering, scope creep into production-level demos

## Decision 3: LLM Planning Depth (Conceptual, Not Prompt Engineering Details)

**Context**: LLM planning for robotics involves prompt engineering, few-shot examples, chain-of-thought reasoning—but detailed prompt optimization is beyond scope.

**Decision**: Explain LLM planning conceptually (how LLMs decompose tasks, map to robot capabilities, handle errors) with illustrative prompt examples, but defer production prompt engineering to hands-on modules.

**Rationale**:
- Conceptual focus constraint: Module 4 is conceptual understanding, not hands-on implementation
- Target audience: Students need to understand *what* LLMs do for robots (task planning) and *when* to use them (vs. scripted behaviors), not optimize prompts
- Avoids rapid obsolescence: LLM APIs and best practices evolve quickly; conceptual understanding remains stable

**Alternatives Considered**:
- Comprehensive prompt library: Rejected—maintenance burden, scope creep, violates conceptual focus
- No LLM prompt examples: Rejected—students need concrete illustrations to understand planning workflows
- Focus on specific LLM (GPT-4 only): Rejected—should be LLM-agnostic (mention Whisper for speech but keep planning general)

## Decision 4: Safety Coverage (Conceptual Safety Constraints)

**Context**: Voice-controlled autonomous robots pose safety risks (misinterpreted commands, LLM errors leading to dangerous actions).

**Decision**: Include dedicated safety discussion in Chapter 3 (capstone) covering conceptual strategies: human-in-the-loop confirmation, emergency stop, restricted action sets near humans, graceful failure recovery.

**Rationale**:
- Ethical responsibility: Educational content must address safety implications
- Capstone context: Safety is system-level concern (not voice-only or LLM-only), fits naturally in integration chapter
- Prepares students for real-world deployment where safety is paramount

**Alternatives Considered**:
- Omitting safety discussion: Rejected—irresponsible for autonomous robot education
- Separate safety chapter (Chapter 4): Rejected—breaks 3-chapter pattern, safety naturally part of integration discussion
- Safety as subsection in each chapter: Accepted as complement—mention safety in voice (wake words) and LLM (validation), deep dive in capstone

## Decision 5: Capstone Integration Strategy (Explicit Module Cross-References)

**Context**: Chapter 3 must synthesize all 4 modules (ROS 2, simulation, Isaac/Nav2, VLA) into coherent autonomous system.

**Decision**: Structure Chapter 3 with explicit sections mapping VLA components to prior modules:
- Voice → ROS 2 actions (Module 1 knowledge)
- LLM planning → simulation testing (Module 2 knowledge)
- Perception integration → Isaac ROS (Module 3 Chapter 2 knowledge)
- Navigation integration → Nav2 (Module 3 Chapter 3 knowledge)
- End-to-end example demonstrating all modules working together

**Rationale**:
- Capstone purpose: Students should see how 4 modules combine, not just understand VLA in isolation
- Learning reinforcement: Explicit cross-references remind students of prior concepts, showing learning progression
- Debugging preparation: Real systems fail at module boundaries—teaching integration points prepares for troubleshooting

**Alternatives Considered**:
- Self-contained Chapter 3 (no references): Rejected—loses capstone value, students don't see integration
- Redundant explanations of prior modules: Rejected—wastes space, violates "no redundant explanations" success criterion (SC-008)
- External capstone project (not in book): Rejected—students benefit from integrated example within educational content

## Decision 6: External References (Stable Official + Research Papers)

**Context**: VLA is emerging field—less standardized than ROS 2 or Gazebo. Documentation sources mix official APIs (OpenAI Whisper), research papers (VLA models), and blog posts.

**Decision**: Prioritize official documentation (OpenAI Whisper API, ROS 2 voice packages) and seminal research papers (Google RT-1/RT-2 VLA models, grounded language planning). Avoid blog posts unless no alternative exists.

**Rationale**:
- Stability: Official APIs and published papers have persistent URLs
- Authority: OpenAI and research institutions validate accuracy
- Academic credibility: Students benefit from exposure to primary research sources

**Alternatives Considered**:
- Community tutorials only: Rejected—high link rot, varying quality
- No research papers: Rejected—VLA is research-driven field, students should understand state-of-the-art
- Embedding full tutorials: Rejected—violates conceptual focus, maintenance burden

## Technology Stack Summary

**Content Authoring** (same as Modules 1-3):
- Markdown (Docusaurus 3.x compatible syntax)
- Mermaid diagrams (inline, version-controlled)
- Markdown tables for comparisons

**Development Environment** (for content authors):
- Text editor with Markdown preview
- Docusaurus local dev server (`npm start`)
- Git for version control

**Deployment** (existing infrastructure, no changes):
- Docusaurus static site generator
- GitHub Pages hosting
- @docusaurus/theme-mermaid plugin (already installed)

## Validation Strategy

**Content Quality**:
- Manual review against spec.md functional requirements (FR-001 to FR-012)
- Spell/grammar check
- Readability test (50-70 min reading time target)

**Technical Accuracy**:
- Cross-reference voice recognition concepts with OpenAI Whisper documentation
- Cross-reference LLM planning with robotics research (RT-1/RT-2 papers, SayCan)
- Cross-reference ROS 2 integration with official ROS 2 voice packages

**Build Validation**:
- `npm run build` must succeed with zero errors
- All Mermaid diagrams must render correctly
- All external links must return 200 OK (link checker tool)

**Capstone Integration**:
- Chapter 3 must explicitly reference Modules 1, 2, and 3 concepts
- End-to-end example must demonstrate voice → LLM → Isaac ROS → Nav2 → manipulation
- System architecture diagram must show all module integration points

## Open Questions / Future Considerations

None at this time. All technical decisions finalized based on:
- Spec.md requirements (12 functional requirements, 3 user stories with capstone focus)
- Modules 1-3 established patterns (Markdown + Mermaid + external links)
- Constitution principles (accuracy, clarity, reproducibility, simplicity)
- User-provided guidance: "organize 3 chapters as Markdown files, ensure conceptual Docusaurus-compatible content"

Ready to proceed to Phase 1 (data-model.md, contracts, quickstart.md).
