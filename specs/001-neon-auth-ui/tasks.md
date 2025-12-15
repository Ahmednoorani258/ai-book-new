# Tasks: Neon Auth UI Integration

**Input**: Design documents from `specs/001-neon-auth-ui/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Tests**: The feature specification did not explicitly request test tasks within each user story, but general testing is included in the final phase.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story?] Description with file path`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `backend/src/`, `src/` (for Docusaurus frontend)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initial setup and configuration for Neon Serverless Postgres.

- [x] T001 Configure `backend/.env` with Neon Serverless Postgres `DATABASE_URL` and `BETTER_AUTH_SECRET` (if not already done).
- [x] T002 Ensure `better-auth` and `@better-auth/cli` are installed in `backend/package.json`.
- [x] T003 Ensure `better-auth/client` is conceptually available for the frontend (via subpath import from `better-auth`).

---

## Phase 2: Foundational (User Story 1 - Integrate Neon Serverless Postgres for Auth - P1)

**Purpose**: Establish the core database connection and schema management for Neon.

**Goal**: The backend authentication system successfully connects to and uses Neon Serverless Postgres.

**Independent Test**: The backend authentication service successfully connects to and performs CRUD operations (create user, find user, update session) on the Neon Serverless Postgres database. (Ref: `specs/001-neon-auth-ui/quickstart.md#1-neon-serverless-postgres-integration-verification-user-story-1---p1`)

- [x] T004 [US1] Verify or update `backend/src/db.ts` and `backend/src/auth.ts` to ensure `DATABASE_URL` is correctly utilized for Neon Serverless Postgres connection.
- [x] T005 [US1] Ensure `db:migrate-auth` script in `backend/package.json` correctly uses `npx @better-auth/cli migrate` to apply schema to Neon.
- [x] T006 [US1] Run `npm run db:migrate-auth` in `backend/` to create Better Auth schema on Neon.
- [x] T007 [US1] Verify table existence (users, accounts, sessions, tokens) in Neon using a PostgreSQL client.

**Checkpoint**: Neon Serverless Postgres is configured and accessible by Better Auth.

---

## Phase 3: User Story 2 - Login/Register Buttons in Header (P1) 🎯 MVP

**Goal**: Unauthenticated users can see visible Login and Register buttons in the website header.

**Independent Test**: While logged out, I can see "Login" and "Register" buttons in the site's header, and clicking them navigates me to the respective authentication pages. (Ref: `specs/001-neon-auth-ui/quickstart.md#2-login/register-buttons-in-header-verification-user-story-2---p1-&-user-story-3---p2`)

### Implementation for User Story 2

- [x] T008 [P] [US2] Modify `src/pages/index.tsx` `HomepageHeader` component to display "Login" and "Register" buttons when the user is unauthenticated.
- [x] T009 [US2] Ensure "Login" button navigates to `/login`.
- [x] T010 [US2] Ensure "Register" button navigates to `/register`.

**Checkpoint**: User Story 2 should be fully functional and testable independently.

---

## Phase 4: User Story 3 - Authenticated User Info in Header (P2)

**Goal**: Authenticated users can see their user information and a Logout button in the header.

**Independent Test**: While logged in, I can see my welcome message and a "Logout" button in the header, and clicking "Logout" successfully logs me out and redirects me to the login page. (Ref: `specs/001-neon-auth-ui/quickstart.md#2-login/register-buttons-in-header-verification-user-story-2---p1-&-user-story-3---p2`)

### Implementation for User Story 3

- [x] T011 [P] [US3] Modify `src/pages/index.tsx` `HomepageHeader` component to display user info and a "Logout" button when the user is authenticated.
- [x] T012 [US3] Ensure "Logout" button triggers `authClient.signOut()` and redirects to `/login`.

**Checkpoint**: User Story 3 should be fully functional.

---

## Phase 5: User Story 4 - Improve Authentication UI (P2)

**Goal**: The Login and Registration pages have a modern, consistent, and user-friendly interface.

**Independent Test**: Both Login and Registration pages display a consistent, responsive design that aligns with the application's theme, and form interactions are smooth. (Ref: `specs/001-neon-auth-ui/quickstart.md#3-improved-authentication-ui-verification-user-story-4---p2`)

### Implementation for User Story 4

- [x] T013 [P] [US4] Review and refine existing CSS styles in `src/css/custom.css` for `auth-container`, `auth-card`, form groups, inputs, and buttons to ensure consistency.
- [x] T014 [US4] Apply `auth-container` and `auth-card` classes to `src/pages/login.js` for styling.
- [x] T015 [US4] Apply `auth-form-group`, `auth-submit-button`, and `auth-link` classes to `src/components/LoginForm.js`.
- [x] T016 [US4] Apply `auth-container` and `auth-card` classes to `src/pages/register.js` for styling.
- [x] T017 [US4] Apply `auth-form-group`, `auth-submit-button`, and `auth-link` classes to `src/components/RegistrationForm.js`.
- [x] T018 [US4] Ensure consistent styling and responsiveness between login and registration pages.

**Checkpoint**: All core user stories should now be functional and meet basic UI/UX requirements.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final verification and documentation updates.

- [x] T019 Run end-to-end testing using `quickstart.md` to verify Neon integration, header UI, and improved auth UI flows.
- [x] T020 Update `README.md` or other relevant documentation with Neon setup instructions (e.g., how to get connection string).
- [x] T021 Clean up any temporary or placeholder code.

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

-   **User Story 1 (P1 - Neon Integration)**: Covered as Foundational Phase 2.
-   **User Story 2 (P1 - Header Buttons)**: Depends on Foundational (Phase 2).
-   **User Story 3 (P2 - Auth User Info)**: Depends on Foundational (Phase 2) and User Story 2 (to display alternatives).
-   **User Story 4 (P2 - Improve Auth UI)**: Depends on Foundational (Phase 2), and User Stories 2 and 3 (to apply styling to existing components).

### Within Each User Story

-   Tasks are generally sequential within a story unless marked [P].

### Parallel Opportunities

-   **Phase 1**: All tasks can be executed in parallel.
-   **Phase 2**: T004, T005 (script creation) could be parallel. T006 depends on T005, T007 depends on T006.
-   **Phase 3 (US2)**: T008, T009, T010 can be parallel if modifying distinct parts of the header.
-   **Phase 4 (US3)**: T011, T012 can be parallel if modifying distinct parts of the header.
-   **Phase 5 (US4)**: T013 is initial review. T014, T015, T016, T017 can be parallel for different components. T018 depends on the others.
-   **Phase 6 (Polish)**: Many tasks (T019, T020, T021) can be run in parallel.

---

## Parallel Example: User Story 2 & 3 (Header UI)

```bash
# Frontend work can be done in parallel for display logic and styling:
# Developer A:
Task: "Modify src/pages/index.tsx HomepageHeader component to display Login/Register buttons when unauthenticated."

# Developer B:
Task: "Modify src/pages/index.tsx HomepageHeader component to display user info and a Logout button when authenticated."
```

---

## Implementation Strategy

### MVP First (User Story 1 & User Story 2 & Setup)

1.  Complete Phase 1: Setup
2.  Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3.  Complete Phase 3: User Story 2
4.  **STOP and VALIDATE**: Test User Story 1 (Neon integration) and User Story 2 (Login/Register buttons).
5.  Deploy/demo if ready

### Incremental Delivery

1.  Complete Setup + Foundational → Foundation ready
2.  Add User Story 2 → Test independently → Deploy/Demo (MVP!)
3.  Add User Story 3 → Test independently → Deploy/Demo
4.  Add User Story 4 → Test independently → Deploy/Demo
5.  Add Phase 6: Polish → Test → Deploy

### Parallel Team Strategy

With multiple developers:

1.  Team completes Setup + Foundational together
2.  Once Foundational is done:
    -   Developer A: User Story 2 (Header Buttons)
    -   Developer B: User Story 3 (Auth User Info)
    -   Developer C: User Story 4 (Improve Auth UI)
3.  Stories complete and integrate independently. Phase 6 tasks can be distributed or tackled by a dedicated QA/Security engineer.

---

## Notes

-   [P] tasks = different files, no dependencies
-   [Story] label maps task to specific user story for traceability
-   Each user story should be independently completable and testable
-   Verify tests fail before implementing (for T019 if E2E tests are implemented)
-   Commit after each task or logical group
-   Stop at any checkpoint to validate story independently
-   Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
