# Data Model: Physical AI & Humanoid Robotics Textbook Content

**Branch**: `1-physical-ai-textbook` | **Date**: 2025-12-05 | **Spec**: specs/1-physical-ai-textbook/spec.md

## Summary

This document defines the conceptual data model for the textbook content and its associated reusable intelligence (RI) objects, reflecting the hierarchical structure of Modules, Chapters, and Sections as specified in the master specification.

## Core Entities

### 1. Textbook (Root)
- **Attributes**: Title, Version, Owner, Project Type, Core Tools.
- **Relationships**: Contains multiple Modules.

### 2. Module
- **Description**: Represents a high-level thematic unit of the textbook.
- **Attributes**: Name (e.g., "The Robotic Nervous System (ROS 2)"), Slug (for URL generation), Theme, Key Topics (list of strings), Mapped Weeks (e.g., "Weeks 3–5"), Introduction (MDX content), Prerequisites (MDX content), Concept Map (link to diagram/MDX), Practical Assignments (links to `ri.LabTask` or `ri.CapstoneMilestone`), Summary (MDX content), References (list of strings/links).
- **Relationships**: Contains multiple Chapters.

### 3. Chapter
- **Description**: A deep dive into a conceptual unit within a Module.
- **Attributes**: Title, Slug, Mapped Weeks, Learning Objectives (list of strings), Illustrations/Diagrams (list of `ri.RobotDiagram` or image links), Summary (MDX content), Exercises (list of `ri.ExerciseTemplate`).
- **Relationships**: Contains multiple Sections.

### 4. Section
- **Description**: Breaks down Chapters into digestible parts, containing core content.
- **Attributes**: Title, Slug, Content (MDX, incorporating RI objects).
- **Relationships**: Can embed Reusable Intelligence objects.

## Reusable Intelligence (RI) Objects

### 1. ri.GlossaryGenerator
- **Purpose**: Generates a project-wide glossary.
- **Attributes**: Term (string, unique ID), Definition (string), Module (string, optional), Chapter (string, optional).

### 2. ri.RobotDiagram
- **Purpose**: Standardized representation for robot diagrams.
- **Attributes**: Diagram ID (string, unique), Alt Text (string), File Path (string, e.g., `/static/img/moduleX_chapterY_diagramZ.png`), Caption (string, formatted by `ri.FigureCaptionTemplate`).

### 3. ri.WarningBlock
- **Purpose**: Standardized template for safety or important warnings.
- **Attributes**: Type (enum: `Safety`, `Important`, `Note`), Content (MDX string).

### 4. ri.CodeExampleTemplate
- **Purpose**: Standardized template for code examples.
- **Attributes**: Language (string, e.g., `python`, `cpp`, `bash`), Code Block (code string), Explanation (MDX string, line-by-line/block-by-block), Expected Output (string, optional), Hardware Warnings (boolean, optional, linked to `ri.WarningBlock`).

### 5. ri.FigureCaptionTemplate
- **Purpose**: Standardized template for figure captions.
- **Attributes**: Figure Number (integer), Title (string), Description (MDX string).

### 6. ri.PageMetadata
- **Purpose**: Standardized Docusaurus front-matter metadata for each content page.
- **Attributes**: Title (string), Description (string), Keywords (list of strings), Sidebar Label (string), Sidebar Position (integer), Slug (string).

### 7. ri.ExerciseTemplate
- **Purpose**: Standardized template for end-of-chapter exercises.
- **Attributes**: Exercise Number (integer), Difficulty (enum: `Beginner`, `Intermediate`, `Advanced`), Description (MDX string), Learning Objective Reference (string, link to relevant objective), Solution (MDX string, optional, can be a separate file).

### 8. ri.LabTask
- **Purpose**: Standardized template for practical lab assignments.
- **Attributes**: Lab ID (string, unique), Title (string), Objective (MDX string), Prerequisites (list of strings/links), Equipment (list of strings), Steps (list of MDX strings), Deliverables (list of MDX strings), Assessment Criteria (MDX string).

### 9. ri.CapstoneMilestone
- **Purpose**: Standardized template for capstone project milestones.
- **Attributes**: Milestone ID (string, unique), Title (string), Description (MDX string), Objectives (list of MDX strings), Deliverables (list of MDX strings), Evaluation Metrics (MDX string).

## Relationships

- `Textbook` has `Modules`.
- `Modules` have `Chapters`.
- `Chapters` have `Sections`.
- `Sections` embed various `RI Objects` (Code Examples, Diagrams, Warnings, Exercises).
- `Modules` can link to `ri.LabTask` and `ri.CapstoneMilestone` for practical assignments.
- `ri.GlossaryGenerator` will process `Terms` from across all content to generate a master glossary.

## Data Flow (Conceptual)

- Content authors create `.mdx` files following the defined Module/Chapter/Section hierarchy.
- RI objects are instantiated within `.mdx` content using specific syntax (e.g., custom React components or markdown directives).
- Docusaurus processes `.mdx` files and `sidebar.js` to generate the static website.
- `ri.GlossaryGenerator` reads all content to compile the glossary.

