<!--
Sync Impact Report:
Version change: INITIAL → 1.0.0
Modified principles: N/A (initial constitution)
Added sections:
  - Core Principles (7 principles)
  - Book Content Standards
  - Chatbot Integration Standards
  - Deployment & Infrastructure Standards
  - Governance
Removed sections: N/A
Templates requiring updates:
  ✅ plan-template.md - reviewed, compatible with constitution principles
  ✅ spec-template.md - reviewed, compatible with constitution principles
  ✅ tasks-template.md - reviewed, compatible with constitution principles
Follow-up TODOs: None
-->

# AI/Spec-Driven Book with Embedded RAG Chatbot Constitution

## Core Principles

### I. Accuracy

All book content and AI-generated explanations MUST be factually accurate and verified. Every technical claim, code example, and conceptual explanation MUST be validated against authoritative sources including Claude Code documentation, Spec-Kit Plus specifications, and referenced technical documentation.

**Rationale**: Accuracy is the foundation of educational content. Inaccurate information undermines reader trust and learning outcomes. This principle ensures that all content delivered to readers is reliable and can be safely applied in practice.

### II. Clarity

Content MUST be understandable for readers with technical backgrounds in AI, software engineering, or data science. Technical concepts MUST be explained with appropriate context, avoiding unnecessary jargon while maintaining technical precision. Complex ideas MUST be broken down into digestible sections with clear examples.

**Rationale**: Clarity ensures knowledge transfer. Without clear explanation, even accurate content fails to educate. This principle balances technical depth with accessibility for the target audience.

### III. Reproducibility

All AI prompts, Spec-Kit Plus configurations, data sources, and implementation details MUST be fully documented to enable reproducibility. Documentation MUST include exact versions, configuration files, environment setup instructions, and step-by-step procedures.

**Rationale**: Reproducibility is essential for technical credibility and enables readers to replicate results, verify claims, and extend the work. It also facilitates maintenance and debugging.

### IV. Interactivity

The embedded RAG chatbot MUST provide precise, context-aware answers based exclusively on user-selected book content. Responses MUST be restricted to the scope of the book material to prevent hallucination or introduction of external information that contradicts the book's teachings.

**Rationale**: Interactivity enhances learning by allowing readers to explore content dynamically. Restricting responses to book content ensures consistency and prevents confusion from conflicting information sources.

### V. Citation and Traceability

All factual statements, code examples, and technical claims MUST be traceable to authoritative sources. References MUST include code file paths with line numbers, external documentation URLs, or academic citations where applicable. Diagrams and figures MUST include source attribution.

**Rationale**: Citations enable verification, support academic integrity, and help readers explore topics more deeply. Traceability also facilitates content updates when referenced materials change.

### VI. Code Quality

All code examples MUST run correctly in the specified environment without errors. Code MUST follow industry best practices for the respective language/framework, include appropriate error handling, and be tested before publication. Code snippets MUST be complete enough to be useful but concise enough to illustrate specific concepts.

**Rationale**: Working code is essential for technical education. Non-functional examples damage credibility and frustrate learners. This principle ensures practical utility of all code content.

### VII. Architectural Simplicity

The book and chatbot system MUST follow the simplest viable architecture that meets requirements. Additional complexity MUST be justified by concrete benefits. Technology choices MUST prioritize maintainability, deployment simplicity, and cost-effectiveness.

**Rationale**: Simplicity reduces maintenance burden, deployment complexity, and cost. It also makes the system more understandable for readers who may want to replicate or extend it. Following YAGNI (You Aren't Gonna Need It) prevents over-engineering.

## Book Content Standards

### Structure and Organization

Book content MUST follow Docusaurus conventions with clear chapter and section hierarchy. Content MUST be organized logically with:

- Clear navigation structure
- Consistent heading levels
- Logical progression from foundational to advanced topics
- Cross-references between related sections

### Content Length and Scope

The book MUST contain 50-100 pages of equivalent digital content. Content density MUST balance depth with readability. Each section MUST have clear learning objectives and outcomes.

### Code Examples and Tutorials

All code examples MUST:

- Include file paths and context
- Be syntax-highlighted appropriately
- Run without modification in the documented environment
- Include explanatory comments for complex logic
- Follow the language/framework's style guide

## Chatbot Integration Standards

### Technology Stack

The RAG chatbot MUST use:

- **AI Framework**: OpenAI Agents/ChatKit SDKs for agent orchestration
- **Backend**: FastAPI for API endpoints and business logic
- **Database**: Neon Serverless Postgres for relational data storage
- **Vector Store**: Qdrant Cloud Free Tier for embedding storage and similarity search
- **Embedding Model**: Compatible with Qdrant and appropriate for technical content

### Chatbot Behavior

The chatbot MUST:

- Answer questions ONLY based on user-selected book content
- Provide citations with section/page references for all responses
- Refuse to answer questions outside the selected content scope
- Handle ambiguous queries by requesting clarification
- Maintain conversation context within a session

### Data Pipeline

The content ingestion pipeline MUST:

- Extract text from book sections with metadata preservation
- Generate embeddings for semantic search
- Store embeddings in Qdrant with proper indexing
- Link embeddings back to source book sections
- Support incremental updates when content changes

## Deployment & Infrastructure Standards

### GitHub Pages Deployment

The complete book and chatbot UI MUST be deployable to GitHub Pages with:

- Static site generation via Docusaurus
- No broken links or missing assets
- Responsive design for desktop and mobile
- Functional chatbot interface
- HTTPS enabled

### Environment Configuration

All configuration MUST be externalized:

- API keys in environment variables (never committed)
- Database connection strings configurable
- Vector store endpoints configurable
- Feature flags for optional functionality

### Version Control

All source files MUST be version-controlled in GitHub with:

- Clear commit messages following conventional commits
- Branching strategy for features and releases
- Tags for published versions
- Comprehensive .gitignore to prevent committing secrets

## Governance

### Constitution Authority

This constitution supersedes all other project practices and guidelines. Any development work, content creation, or system modification MUST comply with these principles.

### Amendment Process

Constitution amendments require:

1. Documented justification for the change
2. Impact analysis on existing content and systems
3. Version bump following semantic versioning (MAJOR.MINOR.PATCH)
4. Update of all dependent templates and documentation
5. Explicit approval before implementation

### Compliance Review

All deliverables (book sections, code, chatbot features) MUST be verified against constitution principles before merge. Violations MUST be documented and justified in Complexity Tracking sections if unavoidable.

### Version Tracking

Constitution changes MUST be tracked with:

- **MAJOR bump**: Breaking changes to core principles or removal of principles
- **MINOR bump**: Addition of new principles or standards
- **PATCH bump**: Clarifications, wording improvements, non-semantic updates

**Version**: 1.0.0 | **Ratified**: 2025-12-26 | **Last Amended**: 2025-12-26
