# Tasks: User Authentication and Personalization

**Input**: Design documents from `/specs/001-user-auth-personalization/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `backend/src/`, `frontend/src/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Initialize the backend project structure in the `backend/` directory
- [X] T002 Create subdirectories for `components`, `pages`, `contexts` in `src/`
- [X] T003 Set up Neon Serverless Postgres database and connect it to the backend
- [X] T004 [P] Set up Better Auth in the backend
- [X] T005 [P] Set up Jest and React Testing Library for the frontend
- [X] T006 [P] Set up Cypress for end-to-end testing

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [X] T007 [P] Implement User and Profile data models in `backend/src/models/`
- [X] T008 [P] Implement authentication service in `backend/src/services/` to handle Better Auth integration
- [X] T009 Implement API endpoints for user registration and profile management in the backend `backend/src/api/`

---

## Phase 3: User Story 1 - New User Registration and Personalization (Priority: P1) 🎯 MVP

**Goal**: A new user can create an account, provide their background, and see personalized content.

**Independent Test**: A new user can complete the sign-up flow, and upon visiting a chapter with personalized content, they see the version appropriate for their selected experience level.

### Implementation for User Story 1

- [X] T010 [P] [US1] Create the registration UI component in `src/components/RegistrationForm.js`
- [X] T011 [P] [US1] Create the questionnaire UI component in `src/components/Questionnaire.js`
- [X] T012 [US1] Implement the registration page in `src/pages/register.js` that uses the registration and questionnaire components
- [X] T013 [US1] Implement the logic to call the `/register` API endpoint from the registration page
- [X] T014 [US1] Implement a content personalization component in `src/components/PersonalizedContent.js` that conditionally renders content based on `experienceLevel`
- [X] T015 [US1] Integrate the `PersonalizedContent` component into at least 5 key chapters

---

## Phase 4: User Story 2 - Returning User Login (Priority: P2)

**Goal**: A returning user can log in and access their personalized content.

**Independent Test**: A user who has previously registered can log in, and when they navigate to a chapter, they see personalized content based on their profile.

### Implementation for User Story 2

- [X] T016 [P] [US2] Create the login UI component in `src/components/LoginForm.js`
- [X] T017 [US2] Implement the login page in `src/pages/login.js`
- [X] T018 [US2] Implement the logic for user login using Better Auth on the frontend
- [X] T019 [US2] Implement a mechanism to fetch and display the user's profile and personalized content after login

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T020 Implement error handling for all API calls
- [X] T021 [P] Write end-to-end tests with Cypress for the registration flow
- [X] T022 [P] Write end-to-end tests with Cypress for the login flow
- [X] T023 [P] Write unit/integration tests for the new React components in `src/components/__tests__/`
- [X] T024 Review and ensure UI consistency with the Docusaurus theme

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion. BLOCKS all user stories.
- **User Stories (Phase 3+)**: All depend on Foundational phase completion.
- **Polish (Phase 5)**: Depends on all desired user stories being complete.

### User Story Dependencies

- **User Story 1 (P1)**: Depends on Foundational (Phase 2). No dependencies on other stories.
- **User Story 2 (P2)**: Depends on Foundational (Phase 2). Depends on User Story 1 for user creation.

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel.
- All Foundational tasks marked [P] can run in parallel.
- Once Foundational phase completes, implementation of UI components for US1 and US2 can start in parallel.
- All Polish tasks marked [P] can run in parallel.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently.

### Incremental Delivery

1. Complete Setup + Foundational.
2. Add User Story 1 → Test independently.
3. Add User Story 2 → Test independently.
