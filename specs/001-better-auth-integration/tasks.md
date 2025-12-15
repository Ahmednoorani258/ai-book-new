# Tasks: Better Auth Integration

**Input**: Design documents from `specs/001-better-auth-integration/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Tests**: The feature specification did not explicitly request test tasks within each user story, but general testing (unit, integration, E2E) is included in the final phase.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story?] Description with file path`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `backend/src/`, `src/` (for Docusaurus frontend)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure for Better Auth integration.

- [x] T001 Install `better-auth` and `@better-auth/cli` packages in `backend/package.json`.
- [x] T002 Install `better-auth/client` package in `package.json` (frontend). (Note: `better-auth/client` is a subpath import from `better-auth` package, which is already installed in backend/package.json).
- [x] T003 Create `backend/src/auth.ts` for Better Auth server-side configuration.
- [x] T004 Create `src/contexts/AuthContext.js` for Better Auth client-side configuration and context.

---

## Phase 2: Foundational (User Story 3 - Database Setup and Schema Management - P1)

**Purpose**: Establish the core database infrastructure required for Better Auth.

**Goal**: The necessary database tables for Better Auth are created correctly, and the system is configured to interact with them.

**Independent Test**: The provided scripts can be executed against an empty database, resulting in the creation of all required tables and their schemas without errors. (Ref: `specs/001-better-auth-integration/quickstart.md#1-database-setup-verification-user-story-3---p1`)

- [x] T005 [US3] Configure `backend/src/db.ts` to connect to PostgreSQL database (if not already configured for Better Auth's needs).
- [x] T006 [US3] Create database migration script or integrate `npx @better-auth/cli migrate` into backend scripts (e.g., `backend/scripts/init-better-auth-db.js`) to manage Better Auth schema.
- [x] T007 [US3] Verify database schema creation by running the script and checking tables using database tools.

**Checkpoint**: Database foundation ready - user story implementation can now begin.

---

## Phase 3: User Story 1 - Secure User Registration (P1) 🎯 MVP

**Goal**: New users can securely register for an account.

**Independent Test**: A new user can navigate to the registration page, fill in their details, submit the form, and receive confirmation of account creation. (Ref: `specs/001-better-auth-integration/quickstart.md#3-user-registration-verification-user-story-1---p1`)

### Implementation for User Story 1

- [x] T008 [P] [US1] Implement `auth.api.signUpEmail` route in `backend/src/api/auth.ts` to handle user registration requests.
- [x] T009 [US1] Modify `src/pages/register.js` to integrate with `authClient.signUp.email` for user registration.
- [x] T010 [US1] Implement client-side form validation for registration in `src/pages/register.js` (email format, password strength).
- [x] T011 [US1] Handle successful registration (e.g., redirect to dashboard/login, display success message) in `src/pages/register.js`.
- [x] T012 [US1] Handle and display registration errors (e.g., email already exists, invalid password) in `src/pages/register.js`.

**Checkpoint**: User Story 1 should be fully functional and testable independently.

---

## Phase 4: User Story 2 - User Login and Session Management (P1)

**Goal**: Registered users can log in and maintain their sessions across pages.

**Independent Test**: A registered user can navigate to the login page, enter their credentials, submit the form, and be successfully logged in, retaining their session. (Ref: `specs/001-better-auth-integration/quickstart.md#4-user-login-verification-user-story-2---p1`)

### Implementation for User Story 2

- [x] T013 [P] [US2] Implement `auth.api.signInEmail` route in `backend/src/api/auth.ts` to handle user login requests.
- [x] T014 [US2] Modify `src/pages/login.js` to integrate with `authClient.signIn.email` for user login.
- [x] T015 [US2] Implement client-side form validation for login in `src/pages/login.js` (email format, password).
- [x] T016 [US2] Handle successful login (e.g., redirect to dashboard, store session) in `src/pages/login.js`.
- [x] T017 [US2] Handle and display login errors (e.g., invalid credentials) in `src/pages/login.js`.
- [x] T018 [P] [US2] Implement `auth.api.getSession` route in `backend/src/api/auth.ts` to retrieve session data.
- [x] T019 [US2] Implement `authClient.useSession()` or `authClient.getSession()` in `src/contexts/AuthContext.js` to provide session context to the frontend.
- [x] T020 [US2] Protect frontend routes (e.g., Docusaurus pages) based on authentication status using session data from `src/contexts/AuthContext.js`.
- [x] T021 [P] [US2] Implement `auth.api.signOut` route in `backend/src/api/auth.ts` to handle user logout requests.
- [x] T022 [US2] Implement `authClient.signOut()` functionality in the frontend (e.g., a logout button/component).

**Checkpoint**: User Stories 1 AND 2 should both work independently.

---

## Phase 5: User Story 4 - UI/UX Improvement for Auth Pages (P2)

**Goal**: The login and registration pages have an improved and consistent user interface.

**Independent Test**: The login and registration pages display updated styling and a consistent layout, making them easy to use. (Ref: `specs/001-better-auth-integration/quickstart.md#5-ui/ux-improvement-verification-user-story-4---p2`)

### Implementation for User Story 4

- [x] T023 [P] [US4] Update CSS for `src/pages/login.js` (e.g., in `src/css/custom.css` or create a new module CSS file).
- [x] T024 [P] [US4] Update CSS for `src/pages/register.js` (e.g., in `src/css/custom.css` or create a new module CSS file).
- [x] T025 [US4] Ensure consistent styling and responsiveness between login and registration pages.

**Checkpoint**: All core user stories should now be functional and meet basic UI/UX requirements.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Implement additional features, enhance robustness, and add comprehensive testing.

- [x] T026 Implement email verification flow (server-side `sendVerificationEmail` function in `backend/src/auth.ts`, client-side `authClient.sendVerificationEmail`).
- [x] T027 Implement password reset flow (server-side `sendResetPassword`, `onPasswordReset` in `backend/src/auth.ts`, client-side `authClient.requestPasswordReset`, `authClient.resetPassword`).
- [x] T028 Add environment variable configuration for Better Auth (e.g., client IDs/secrets for social logins, if applicable) in `backend/.env`.
- [x] T029 Integrate error logging and monitoring for authentication flows on both backend and frontend.
- [x] T030 Write unit/integration tests for new backend authentication logic in `backend/tests/auth.test.ts`.
- [x] T031 Write end-to-end tests using Cypress for user registration and login flows in `cypress/e2e/auth.cy.ts`.

---

## Dependencies & Execution Order

### Phase Dependencies

-   **Phase 1: Setup**: No dependencies - can start immediately.
-   **Phase 2: Foundational**: Depends on Phase 1 completion - BLOCKS all user stories.
-   **User Stories (Phase 3-5)**: All depend on Foundational phase completion.
    -   User stories can then proceed in parallel (if staffed)
    -   Or sequentially in priority order (P1 → P2 → P3).
-   **Phase 6: Polish & Cross-Cutting Concerns**: Depends on all desired user stories being complete.

### User Story Dependencies

-   **User Story 1 (P1 - Registration)**: Depends on Foundational (Phase 2).
-   **User Story 2 (P1 - Login/Session)**: Depends on Foundational (Phase 2). Can integrate with US1 (e.g., login after registration).
-   **User Story 3 (P1 - DB Setup)**: Covered as Foundational Phase 2.
-   **User Story 4 (P2 - UI/UX)**: Depends on User Stories 1 and 2 being present to apply styling.

### Within Each User Story

-   Core implementation before integration.
-   Tasks are generally sequential within a story unless marked [P].

### Parallel Opportunities

-   **Phase 1**: T001, T002, T003, T004 can be executed in parallel.
-   **Phase 2**: T005, T006 (script creation) could be parallel. T007 depends on T006.
-   **Phase 3 (US1)**: T008, T009, T010, T011, T012 generally follow a flow but some sub-parts could be parallel (e.g., initial UI work for form alongside backend endpoint).
-   **Phase 4 (US2)**: Similar to US1, tasks follow a flow. T013, T014, T015, T016, T017 for login. T018, T019, T020 for session management. T021, T022 for logout. The backend and frontend tasks can be parallel.
-   **Phase 5 (US4)**: T023 and T024 can run in parallel.
-   **Phase 6 (Polish)**: Many tasks (T026, T027, T028, T029, T030, T031) can be run in parallel, though T030 and T031 should come after implementation.

---

## Parallel Example: User Story 1 (Secure User Registration)

```bash
# Frontend and Backend work can be done in parallel:
# Developer A:
Task: "Implement auth.api.signUpEmail route in backend/src/api/auth.ts"

# Developer B (after backend endpoint is stubbed out or contract is clear):
Task: "Modify src/pages/register.js to integrate with authClient.signUp.email for user registration."
Task: "Implement client-side form validation for registration in src/pages/register.js"
Task: "Handle successful registration (e.g., redirect to dashboard/login, display success message) in src/pages/register.js"
Task: "Handle and display registration errors (e.g., email already exists, invalid password) in src/pages/register.js"
```

---

## Implementation Strategy

### MVP First (User Story 1 & Foundational & Setup)

1.  Complete Phase 1: Setup
2.  Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3.  Complete Phase 3: User Story 1
4.  **STOP and VALIDATE**: Test User Story 1 independently (Registration works, DB tables exist)
5.  Deploy/demo if ready

### Incremental Delivery

1.  Complete Setup + Foundational → Foundation ready
2.  Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3.  Add User Story 2 → Test independently → Deploy/Demo
4.  Add User Story 4 → Test independently → Deploy/Demo
5.  Add Phase 6: Polish → Test → Deploy

### Parallel Team Strategy

With multiple developers:

1.  Team completes Setup + Foundational together
2.  Once Foundational is done:
    -   Developer A: User Story 1 (Registration)
    -   Developer B: User Story 2 (Login/Session)
    -   Developer C: User Story 4 (UI/UX)
3.  Stories complete and integrate independently. Phase 6 tasks can be distributed or tackled by a dedicated QA/Security engineer.

---

## Notes

-   [P] tasks = different files, no dependencies
-   [Story] label maps task to specific user story for traceability
-   Each user story should be independently completable and testable
-   Verify tests fail before implementing (for tasks T030, T031)
-   Commit after each task or logical group
-   Stop at any checkpoint to validate story independently
-   Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
