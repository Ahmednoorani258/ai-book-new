description: "Task list for Physical AI & Humanoid Robotics Textbook implementation"
---

# Tasks: Physical AI & Humanoid Robotics Textbook

**Input**: Design documents from `/specs/1-physical-ai-textbook/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are OPTIONAL for this project, as content verification is primarily via Docusaurus build and manual review.

**Organization**: Tasks are grouped by logical phase and content modules to enable independent implementation and testing of each part.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which module/chapter this task belongs to (e.g., MOD1.CH1, RI)
- Include exact file paths in descriptions

## Path Conventions

- All content paths assume `docs/` as the root.
- Images in `/static/img/`.
- Custom Docusaurus theme elements in `src/docusaurus-theme/`.

---

## Phase 1: Setup (Project Initialization)

**Purpose**: Initialize the Docusaurus project and establish the basic repository structure.

- [x] T001 Initialize Docusaurus project in the root directory
- [x] T002 Configure `docusaurus.config.js` with basic site metadata and plugin setup
- [x] T003 Create `docs/` directory and initial `docs/index.mdx` file
- [x] T004 [P] Create `static/img/` directory for diagrams
- [x] T005 [P] Setup basic `sidebar.js` for Docusaurus navigation in `sidebar.js`

---

## Phase 2: Foundational (Reusable Intelligence & Site Structure)

**Purpose**: Implement core reusable intelligence (RI) objects and configure essential Docusaurus site structure elements.

**⚠️ CRITICAL**: Content creation tasks in later phases depend on these foundational RI objects and structures.

### Reusable Intelligence Implementation

- [x] T006 [P] [RI] Implement `ri.GlossaryGenerator` component/logic in `scripts/glossary-generator.js` (or similar)
- [x] T007 [P] [RI] Implement `ri.RobotDiagram` custom MDX component in `src/docusaurus-theme/components/RobotDiagram.js`
- [x] T008 [P] [RI] Implement `ri.WarningBlock` custom MDX component in `src/docusaurus-theme/components/WarningBlock.js`
- [x] T009 [P] [RI] Implement `ri.CodeExampleTemplate` custom MDX component in `src/docusaurus-theme/components/CodeExample.js`
- [x] T010 [P] [RI] Implement `ri.FigureCaptionTemplate` custom MDX component (or integrate into `ri.RobotDiagram`) in `src/docusaurus-theme/components/FigureCaption.js`
- [x] T011 [P] [RI] Define `ri.PageMetadata` usage guidelines and example in `docs/templates/page-metadata-template.mdx`
- [x] T012 [P] [RI] Implement `ri.ExerciseTemplate` custom MDX component in `src/docusaurus-theme/components/Exercise.js`
- [x] T013 [P] [RI] Implement `ri.LabTask` custom MDX component in `src/docusaurus-theme/components/LabTask.js`
- [x] T014 [P] [RI] Implement `ri.CapstoneMilestone` custom MDX component in `src/docusaurus-theme/components/CapstoneMilestone.js`

### Core Site Structure & Standards

- [x] T015 Create `docs/glossary.md` file for glossary output
- [x] T016 Integrate glossary generation into `npm run build` process via `package.json` script or Docusaurus plugin
- [x] T017 Implement Slate-like clean UI theme and dark/light toggle in `src/docusaurus-theme/`
- [x] T018 Define consistent typography and color palette in `src/docusaurus-theme/styles/custom.css`

**Checkpoint**: Foundational elements are ready. Content creation can now begin.

---

## Phase 3: Content Creation - Module 1: The Robotic Nervous System (ROS 2)

**Goal**: Complete all chapters and sections for Module 1, focusing on ROS 2 fundamentals.

**Independent Test**: Module 1 content builds without errors (`npm run build`) and is navigable in the sidebar.

### Chapter 1: Introduction to ROS 2 Core Concepts

- [x] T019 [MOD1.CH1] Create `docs/modules/module-1-ros2/chapters/chapter-ros2-core-concepts.mdx`
- [x] T020 [MOD1.CH1] Add Learning Objectives, Introduction, and Key Concepts sections to chapter file
- [x] T021 [MOD1.CH1] Write content for Nodes, Topics, Services sections in `docs/modules/module-1-ros2/chapters/chapter-ros2-core-concepts.mdx`
- [x] T022 [P] [MOD1.CH1] Add `ri.CodeExampleTemplate` for ROS 2 nodes in `docs/modules/module-1-ros2/chapters/chapter-ros2-core-concepts.mdx`
- [x] T023 [MOD1.CH1] Write content for `rclpy` Controllers section in `docs/modules/module-1-ros2/chapters/chapter-ros2-core-concepts.mdx`
- [x] T024 [P] [MOD1.CH1] Add `ri.CodeExampleTemplate` for `rclpy` controller in `docs/modules/module-1-ros2/chapters/chapter-ros2-core-concepts.mdx`
- [x] T025 [MOD1.CH1] Add Summary and References sections to chapter file
- [x] T026 [MOD1.CH1] Add `ri.ExerciseTemplate` for ROS 2 core concepts to chapter file

### Chapter 2: Humanoid Modeling with URDF

- [x] T027 [MOD1.CH2] Create `docs/modules/module-1-ros2/chapters/chapter-humanoid-urdf-modeling.mdx`
- [x] T028 [MOD1.CH2] Add Learning Objectives, Introduction, and Key Concepts sections to chapter file
- [x] T029 [MOD1.CH2] Write content for URDF for humanoids section in `docs/modules/module-1-ros2/chapters/chapter-humanoid-urdf-modeling.mdx`
- [x] T030 [P] [MOD1.CH2] Add `ri.CodeExampleTemplate` for URDF structure in `docs/modules/module-1-ros2/chapters/chapter-humanoid-urdf-modeling.mdx`
- [x] T031 [P] [MOD1.CH2] Add `ri.RobotDiagram` for humanoid URDF visual representation in `static/img/module1_chapter2_urdf_diagram.png` and chapter file
- [x] T032 [MOD1.CH2] Write content for ROS Packages & Launch Files section in `docs/modules/module-1-ros2/chapters/chapter-humanoid-urdf-modeling.mdx`
- [x] T033 [P] [MOD1.CH2] Add `ri.CodeExampleTemplate` for ROS launch file in `docs/modules/module-1-ros2/chapters/chapter-humanoid-urdf-modeling.mdx`
- [x] T034 [MOD1.CH2] Add Summary and References sections to chapter file
- [x] T035 [MOD1.CH2] Add `ri.ExerciseTemplate` for URDF and ROS packages to chapter file

### Module 1 Integration

- [x] T036 Update `sidebar.js` to include Module 1 and its chapters
- [x] T037 Create `docs/modules/module-1-ros2/index.mdx` for module introduction, prerequisites, concept map, and practical assignments (`ri.LabTask`)

---

## Phase 4: Content Creation - Module 2: The Digital Twin (Gazebo & Unity)

**Goal**: Complete all chapters and sections for Module 2, focusing on simulation environments.

**Independent Test**: Module 2 content builds without errors (`npm run build`) and is navigable in the sidebar.

### Chapter 1: Gazebo for Digital Twins

- [x] T038 [MOD2.CH1] Create `docs/modules/module-2-digital-twin/chapters/chapter-gazebo-digital-twins.mdx`
- [x] T039 [MOD2.CH1] Add Learning Objectives, Introduction, and Key Concepts sections to chapter file
- [x] T040 [MOD2.CH1] Write content for Physics simulation, Gravity, collisions sections in `docs/modules/module-2-digital-twin/chapters/chapter-gazebo-digital-twins.mdx`
- [x] T041 [P] [MOD2.CH1] Add `ri.CodeExampleTemplate` for Gazebo physics configuration in chapter file
- [x] T042 [MOD2.CH1] Write content for Sensors (LiDAR, Depth, IMU) section in `docs/modules/module-2-digital-twin/chapters/chapter-gazebo-digital-twins.mdx`
- [x] T043 [P] [MOD2.CH1] Add `ri.CodeExampleTemplate` for Gazebo sensor configuration in chapter file
- [x] T044 [P] [MOD2.CH1] Add `ri.RobotDiagram` for sensor placement on a robot in `static/img/module2_chapter1_sensor_placement.png` and chapter file
- [x] T045 [MOD2.CH1] Add Summary and References sections to chapter file
- [x] T046 [MOD2.CH1] Add `ri.ExerciseTemplate` for Gazebo simulation setup to chapter file

### Chapter 2: Human-Robot Interaction in Unity

- [x] T047 [MOD2.CH2] Create `docs/modules/module-2-digital-twin/chapters/chapter-unity-hri.mdx`
- [x] T048 [MOD2.CH2] Add Learning Objectives, Introduction, and Key Concepts sections to chapter file
- [x] T049 [MOD2.CH2] Write content for Unity for human-robot interaction section in `docs/modules/module-2-digital-twin/chapters/chapter-unity-hri.mdx`
- [x] T050 [P] [MOD2.CH2] Add `ri.CodeExampleTemplate` for Unity interaction script in chapter file
- [x] T051 [P] [MOD2.CH2] Add `ri.RobotDiagram` for Unity HRI scene setup in `static/img/module2_chapter2_unity_hri.png` and chapter file
- [x] T052 [MOD2.CH2] Add Summary and References sections to chapter file
- [x] T053 [MOD2.CH2] Add `ri.ExerciseTemplate` for Unity HRI project to chapter file

### Module 2 Integration

- [x] T054 Update `sidebar.js` to include Module 2 and its chapters
- [x] T055 Create `docs/modules/module-2-digital-twin/index.mdx` for module introduction, prerequisites, concept map, and practical assignments (`ri.LabTask`)

---

## Phase 5: Content Creation - Module 3: The AI Robot Brain (NVIDIA Isaac)

**Goal**: Complete all chapters and sections for Module 3, focusing on NVIDIA Isaac platform.

**Independent Test**: Module 3 content builds without errors (`npm run build`) and is navigable in the sidebar.

### Chapter 1: Introduction to Isaac Sim and Synthetic Data

- [x] T056 [MOD3.CH1] Create `docs/modules/module-3-nvidia-isaac/chapters/chapter-isaac-sim-synthetic-data.mdx`
- [x] T057 [MOD3.CH1] Add Learning Objectives, Introduction, and Key Concepts sections to chapter file
- [x] T058 [MOD3.CH1] Write content for Isaac Sim, Synthetic data generation sections in chapter file
- [x] T059 [P] [MOD3.CH1] Add `ri.CodeExampleTemplate` for synthetic data generation script in chapter file
- [x] T060 [P] [MOD3.CH1] Add `ri.RobotDiagram` for Isaac Sim environment setup in `static/img/module3_chapter1_isaac_sim_env.png` and chapter file
- [x] T061 [MOD3.CH1] Add Summary and References sections to chapter file
- [x] T062 [MOD3.CH1] Add `ri.ExerciseTemplate` for Isaac Sim environment setup to chapter file

### Chapter 2: Isaac ROS for Navigation and SLAM

- [x] T063 [MOD3.CH2] Create `docs/modules/module-3-nvidia-isaac/chapters/chapter-isaac-ros-navigation-slam.mdx`
- [x] T064 [MOD3.CH2] Add Learning Objectives, Introduction, and Key Concepts sections to chapter file
- [x] T065 [MOD3.CH2] Write content for Isaac ROS (VSLAM, Nav2) section in chapter file
- [x] T066 [P] [MOD3.CH2] Add `ri.CodeExampleTemplate` for VSLAM or Nav2 integration with Isaac ROS in chapter file
- [x] T067 [MOD3.CH2] Add Summary and References sections to chapter file
- [x] T068 [MOD3.CH2] Add `ri.ExerciseTemplate` for Isaac ROS navigation project to chapter file

### Chapter 3: Bipedal Robot Planning with Isaac

- [x] T069 [MOD3.CH3] Create `docs/modules/module-3-nvidia-isaac/chapters/chapter-bipedal-planning-isaac.mdx`
- [x] T070 [MOD3.CH3] Add Learning Objectives, Introduction, and Key Concepts sections to chapter file
- [x] T071 [MOD3.CH3] Write content for Biped planning section in chapter file
- [x] T072 [P] [MOD3.CH3] Add `ri.CodeExampleTemplate` for bipedal motion planning in Isaac Sim in chapter file
- [x] T073 [P] [MOD3.CH3] Add `ri.RobotDiagram` for bipedal robot kinematics in `static/img/module3_chapter3_bipedal_kinematics.png` and chapter file
- [x] T074 [MOD3.CH3] Add Summary and References sections to chapter file
- [x] T075 [MOD3.CH3] Add `ri.ExerciseTemplate` for bipedal planning in Isaac to chapter file

### Module 3 Integration

- [x] T076 Update `sidebar.js` to include Module 3 and its chapters
- [x] T077 Create `docs/modules/module-3-nvidia-isaac/index.mdx` for module introduction, prerequisites, concept map, and practical assignments (`ri.LabTask`)

---

## Phase 6: Content Creation - Module 4: Vision–Language–Action (VLA)

**Goal**: Complete all chapters and sections for Module 4, focusing on Vision-Language-Action systems.

**Independent Test**: Module 4 content builds without errors (`npm run build`) and is navigable in the sidebar.

### Chapter 1: Vision-Language-Action Systems

- [x] T078 [MOD4.CH1] Create `docs/modules/module-4-vision-language-action/chapters/chapter-vla-systems.mdx`
- [x] T079 [MOD4.CH1] Add Learning Objectives, Introduction, and Key Concepts sections to chapter file
- [x] T080 [MOD4.CH1] Write content for Whisper -> Action and LLM Planning for ROS 2 sections in chapter file
- [x] T081 [P] [MOD4.CH1] Add `ri.CodeExampleTemplate` for Whisper integration or LLM planning example in chapter file
- [x] T082 [MOD4.CH1] Write content for Multi-step action generation section in chapter file
- [x] T083 [P] [MOD4.CH1] Add `ri.CodeExampleTemplate` for multi-step action generation in chapter file
- [x] T084 [MOD4.CH1] Add Summary and References sections to chapter file
- [x] T085 [MOD4.CH1] Add `ri.ExerciseTemplate` for VLA system implementation to chapter file

### Chapter 2: Capstone Project: Autonomous Humanoid Pipeline

- [x] T086 [MOD4.CH2] Create `docs/modules/module-4-vision-language-action/chapters/chapter-capstone-humanoid-pipeline.mdx`
- [x] T087 [MOD4.CH2] Add Learning Objectives, Introduction, and Key Concepts sections to chapter file
- [x] T088 [MOD4.CH2] Write content for Final capstone: Autonomous humanoid pipeline section in chapter file
- [x] T089 [MOD4.CH2] Include `ri.CapstoneMilestone` for project phases and deliverables in chapter file
- [x] T090 [MOD4.CH2] Write content for Conversational robotics section in chapter file
- [x] T091 [P] [MOD4.CH2] Add `ri.CodeExampleTemplate` for conversational AI integration in chapter file
- [x] T092 [MOD4.CH2] Add Summary and References sections to chapter file
- [x] T093 [MOD4.CH2] Add `ri.ExerciseTemplate` for capstone project extension to chapter file

### Module 4 Integration

- [x] T094 Update `sidebar.js` to include Module 4 and its chapters
- [x] T095 Create `docs/modules/module-4-vision-language-action/index.mdx` for module introduction, prerequisites, concept map, and practical assignments (`ri.LabTask`, `ri.CapstoneMilestone`)

---

## Phase 7: Content Creation - Hardware Architecture & Foundational AI Principles

**Goal**: Complete the hardware architecture section and introductory chapters.

**Independent Test**: Hardware architecture section builds without errors and is navigable. Introductory chapters build without errors.

### Chapter 1: Introduction to Physical AI and Embodiment

- [x] T096 [MOD0.CH1] Create `docs/modules/intro-physical-ai/chapters/chapter-physical-ai-embodiment.mdx`
- [x] T097 [MOD0.CH1] Add Learning Objectives, Introduction, and Key Concepts sections to chapter file
- [x] T098 [MOD0.CH1] Write content for Physical AI principles section in chapter file
- [x] T099 [MOD0.CH1] Write content for Embodiment section in chapter file
- [x] T100 [MOD0.CH1] Add Summary and References sections to chapter file
- [x] T101 [MOD0.CH1] Add `ri.ExerciseTemplate` for foundational AI concepts to chapter file

### Chapter 2: Kinematics and Humanoid Control

- [x] T102 [MOD0.CH2] Create `docs/modules/humanoid-development/chapters/chapter-kinematics-control.mdx`
- [x] T103 [MOD0.CH2] Add Learning Objectives, Introduction, and Key Concepts sections to chapter file
- [x] T104 [MOD0.CH2] Write content for Kinematics section in chapter file
- [x] T105 [MOD0.CH2] Add Summary and References sections to chapter file
- [x] T106 [MOD0.CH2] Add `ri.ExerciseTemplate` for kinematics concepts to chapter file

### Chapter 3: Humanoid Design Principles

- [x] T107 [MOD0.CH3] Create `docs/modules/humanoid-development/chapters/chapter-humanoid-design.mdx`
- [x] T108 [MOD0.CH3] Add Learning Objectives, Introduction, and Key Concepts sections to chapter file
- [x] T109 [MOD0.CH3] Write content for Humanoid design section in chapter file
- [x] T110 [MOD0.CH3] Add Summary and References sections to chapter file
- [x] T111 [MOD0.CH3] Add `ri.ExerciseTemplate` for humanoid design to chapter file

### Chapter 4: Perception Pipelines for Humanoids

- [x] T112 [MOD0.CH4] Create `docs/modules/humanoid-development/chapters/chapter-perception-pipelines.mdx`
- [x] T113 [MOD0.CH4] Add Learning Objectives, Introduction, and Key Concepts sections to chapter file
- [x] T114 [MOD0.CH4] Write content for Perception pipelines section in chapter file
- [x] T115 [MOD0.CH4] Add Summary and References sections to chapter file
- [ ] T116 [MOD0.CH4] Add `ri.ExerciseTemplate` for perception pipeline to chapter file

### Hardware Architecture Section

- [x] T117 Create `docs/hardware-architecture/workstation-jetson-sensors.mdx`
- [x] T118 Add `ri.SectionTemplate.HardwareArchitecture` content for Digital Twin Workstation (RTX + Ubuntu), Jetson Orin Edge Kit, Sensors (RealSense, IMU), Robots (Unitree Go2, G1), Cloud-native lab (AWS Omniverse) in `docs/hardware-architecture/workstation-jetson-sensors.mdx`
- [x] T119 Update `sidebar.js` to include `hardware-architecture` section

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Finalize the website, improve user experience, and ensure deployment readiness.

- [x] T120 Develop Landing Page Hero section in `src/docusaurus-theme/pages/index.js`
- [x] T121 Develop Landing Page Call-to-action (CTA) section in `src/docusaurus-theme/pages/index.js`
- [x] T122 Develop Landing Page Course roadmap visual section in `src/docusaurus-theme/pages/index.js`
- [x] T123 Develop Landing Page "About Physical AI" section in `src/docusaurus-theme/pages/index.js`
- [x] T124 Develop Landing Page "Modules Overview" section in `src/docusaurus-theme/pages/index.js`
- [x] T125 Implement professional design guidelines for the landing page in `src/docusaurus-theme/styles/landing-page.css`
- [x] T126 Run `npm run build` to validate Docusaurus build process
- [x] T127 Perform comprehensive link checking across the entire site
- [x] T128 Final review of all content for consistency (terminology, formatting, style)
- [x] T129 Implement GitHub Actions workflow for automated build and deployment to GitHub Pages in `.github/workflows/deploy.yml`
- [x] T130 Add versioning configuration and initial version tag (e.g., v1.0.0)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all content creation phases (Phase 3-7) and Polish (Phase 8).
- **Content Creation (Phase 3-7)**: All depend on Foundational phase completion. These phases can proceed in parallel once Phase 2 is complete.
- **Polish (Phase 8)**: Depends on all content creation phases being largely complete.

### Module/Chapter Dependencies

- Content creation within each module/chapter (e.g., MOD1.CH1, MOD1.CH2) can proceed sequentially or in parallel.
- Introduction to Physical AI and Embodiment (MOD0.CH1) is a foundational content chapter and can be prioritized early in content creation.

### Within Each Chapter Task

- Creating the chapter file should precede adding content.
- Adding content sections can be parallelized.
- RI object integration should follow content drafting.
- Summary, references, and exercises are typically the last steps for a chapter.

### Parallel Opportunities

- All tasks marked `[P]` within a phase can run in parallel.
- Once the Foundational phase (Phase 2) is complete, multiple content creation modules/chapters can be worked on in parallel by different team members.
- Within a chapter, writing different sections and creating diagrams/code examples can often be done in parallel.

---

## Implementation Strategy

### Incremental Content Delivery

1. Complete Phase 1: Setup.
2. Complete Phase 2: Foundational (CRITICAL - enables efficient content creation).
3. Iteratively complete Content Creation Phases (3-7) in any order, focusing on one module/chapter at a time for review and integration.
4. **STOP and VALIDATE**: After each module is substantially complete, build the site and review for completeness and correctness.
5. Complete Phase 8: Polish & Cross-Cutting Concerns.

### Parallel Team Strategy

With multiple contributors:

1. Team completes Setup (Phase 1) and Foundational (Phase 2) together.
2. Once Foundational is done:
   - Contributor A: Module 1 Content Creation (Phase 3).
   - Contributor B: Module 2 Content Creation (Phase 4).
   - Contributor C: Module 3 Content Creation (Phase 5).
   - Contributor D: Module 4 Content Creation (Phase 6).
   - Contributor E: Hardware Architecture & Foundational AI Principles (Phase 7).
3. Content for modules is created and integrated independently.
4. Polish & Cross-Cutting Concerns (Phase 8) can be handled by a dedicated contributor or the team collaboratively once most content is in place.

---

## Notes

- Each task includes a file path for clear guidance.
- `[MODX.CHY]` labels link tasks to specific modules and chapters for traceability.
- Tasks are designed to be atomic and independently completable where possible.
- Verify Docusaurus build after major content additions or structural changes.
- Avoid: vague tasks, same file conflicts without explicit dependency, cross-chapter dependencies that break modularity.

