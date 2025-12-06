# Implementation Plan: Improve Overall Book UI

**Branch**: `001-improve-book-ui` | **Date**: 2025-12-06 | **Spec**: specs/001-improve-book-ui/spec.md
**Input**: Feature specification from `specs/001-improve-book-ui/spec.md`

## Summary

This plan outlines the technical approach for improving the user interface of the "Physical AI & Humanoid Robotics — The Embodied Intelligence Textbook," with a special focus on the landing page. The goal is to achieve a visually appealing and relaxing theme, consistent across the entire Docusaurus-based website, to enhance the reading experience.

## Technical Context

**Language/Version**: JavaScript/TypeScript (Docusaurus, React), CSS (for styling).
**Primary Dependencies**: Docusaurus framework and its associated theming capabilities, React components.
**Storage**: Not applicable, as this feature primarily involves UI/UX improvements and does not introduce new data storage requirements.
**Testing**:
-   **Visual Inspection**: Manual review across various browsers and devices.
-   **User Feedback**: Qualitative and quantitative feedback through surveys for "good" and "relaxing" theme assessment.
-   **Lighthouse Audit**: For performance, accessibility, SEO, and best practices scores.
-   **Accessibility Checks**: Ensuring WCAG 2.1 AA compliance for color contrast and readability.
**Target Platform**: Modern web browsers, with a responsive design for mobile, tablet, and desktop viewing.
**Project Type**: Docusaurus-based educational textbook website.
**Performance Goals**:
-   Maintain fast loading times for all pages, especially the landing page (e.g., Largest Contentful Paint (LCP) < 2.5 seconds).
-   Ensure smooth transitions and interactions, if any animations are introduced.
**Constraints**:
-   Adherence to Constitution v1.0.0 principles.
-   Utilize existing Docusaurus theming capabilities and component structure.
-   Avoid introducing significant technical debt or over-engineering.
**Scale/Scope**: Styling and layout changes primarily affecting the landing page (`src/pages/index.tsx`) and general book UI via `src/css/custom.css`.
**Assumptions**: Responsive design principles will be applied as standard practice to ensure cross-device compatibility. The existing Docusaurus theme structure will be adapted rather than entirely replaced.

## Constitution Check

Compliance with the Project Constitution v1.0.0 principles will be enforced at each stage:

-   **2.1 Content Accuracy & Technical Rigor**: The UI changes will not alter content accuracy, but the visual presentation will ensure content remains highly legible and technically rigorous in appearance.
-   **2.2 Educational Clarity & Progressive Learning Pathway**: The relaxing and appealing theme will directly enhance educational clarity by reducing visual fatigue and improving focus.
-   **2.3 Consistency & Standards (STRICT)**: This feature directly addresses consistency in styling, typography, and color palette, which must strictly adhere to the defined "good and relaxing" theme across the entire book.
-   **2.4 Docusaurus Structure & Documentation Quality**: UI changes will be integrated into the existing Docusaurus theme structure, preserving documentation quality and hierarchy. New components will follow Docusaurus best practices.
-   **2.6 Deployment & Publishing Standards**: The UI improvements must not introduce build warnings and should maintain or improve page performance metrics (Lighthouse scores).

No justified violations of the Constitution Check have been identified for this planning stage.

## Project Structure

### Documentation (this feature)

```text
specs/001-improve-book-ui/
├── plan.md              # This file (/sp.plan command output)
├── spec.md              # Feature specification
└── checklists/
    └── requirements.md  # Specification quality checklist
```

### Source Code (repository root)

```text
src/
├── css/
│   └── custom.css       # Main stylesheet for global overrides
│   └── landing-page.css # New stylesheet for landing page specific styles
├── pages/
│   └── index.tsx        # Landing page component
└── docusaurus-theme/    # Custom Docusaurus theme overrides if necessary
    ├── components/      # Existing custom components (RobotDiagram, WarningBlock, etc.)
    └── styles/          # Potential new styles for theme elements

static/
└── img/                 # Existing and potentially new images for UI elements

```

**Structure Decision**: UI improvements will primarily involve modifying `src/css/custom.css` for global styles, `src/pages/index.tsx` for landing page layout and component usage, and creating `src/css/landing-page.css` for specific landing page styling. Existing custom components in `src/docusaurus-theme/components` will be utilized or enhanced if needed.

## Phase 0: Outline & Research

### Research Tasks

-   **R-001**: Research UI/UX best practices for educational websites, focusing on visual appeal and readability for long-form content.
-   **R-002**: Investigate color psychology principles for "relaxing" themes and gather examples of harmonious color palettes suitable for a technical textbook.
-   **R-003**: Explore Docusaurus theming capabilities to understand how to effectively override default styles and integrate custom CSS without disrupting the framework.

## Phase 1: Design & Contracts

### Key Entities

*(Not applicable, this feature does not involve new data entities.)*

### API Contracts

*(Not applicable, this feature does not involve API changes or new API contracts.)*