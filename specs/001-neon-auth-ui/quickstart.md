# Quickstart Guide: Neon Auth UI Integration

**Feature Branch**: `001-neon-auth-ui`  
**Date**: 2025-12-14  
**Purpose**: This guide provides quick steps to set up and verify the basic functionality of the "Neon Auth UI Integration" feature, focusing on core user stories.

## 1. Neon Serverless Postgres Integration Verification (User Story 1 - P1)

**Goal**: Ensure the backend authentication system successfully connects to and uses Neon Serverless Postgres.

**Pre-requisites**: Neon Serverless Postgres database instance is provisioned and its connection string (including SSL details) is available. `backend/.env` is configured with `DATABASE_URL` pointing to Neon.

**Steps**:
1.  **Start the backend server**: (Refer to previous instructions)
    ```bash
    cd backend/
    npm run build
    npm start
    ```
2.  **Verify connection in backend logs**: Check the backend console output for any database connection errors. Successful startup should indicate a connection.
3.  **Run database migrations on Neon**: If not already done, run the Better Auth migrations:
    ```bash
    cd backend/
    npm run db:migrate-auth
    ```
4.  **Verify table existence in Neon**: Use a PostgreSQL client (e.g., Neon's SQL Editor, `psql`, pgAdmin) to connect to your Neon database and confirm the presence of tables like `users`, `accounts`, `sessions`, and `tokens` (or similar names created by Better Auth).
5.  **Perform a test user registration**: Use the frontend registration form to create a new user.
6.  **Verify user data in Neon**: Check the Neon database to confirm the new user's details are stored in the `users` and `accounts` tables.

## 2. Login/Register Buttons in Header Verification (User Story 2 - P1 & User Story 3 - P2)

**Goal**: Verify that header buttons (Login/Register or User Info/Logout) display correctly based on authentication status.

**Pre-requisites**: Backend server is running, frontend is running.

**Steps**:
1.  **Access the frontend application**: Navigate to the homepage (e.g., `http://localhost:3000`).
2.  **Verify unauthenticated state**:
    *   Ensure you are logged out.
    *   **Visual Inspection**: Check the header area. You should clearly see "Login" and "Register" buttons.
    *   **Functional Check**: Click the "Login" button; it should navigate to `/login`. Click the "Register" button; it should navigate to `/register`.
3.  **Verify authenticated state**:
    *   Log in using a registered user account.
    *   **Visual Inspection**: Check the header area. The "Login" and "Register" buttons should no longer be visible. Instead, you should see a "Welcome, [Username]!" message and a "Logout" button.
    *   **Functional Check**: Click the "Logout" button; it should log you out and redirect you to `/login`.

## 3. Improved Authentication UI Verification (User Story 4 - P2)

**Goal**: Visually confirm the modern, consistent, and user-friendly interface of the Login and Registration pages.

**Pre-requisites**: Backend server is running, frontend is running.

**Steps**:
1.  **Navigate to the Login Page**: (e.g., `http://localhost:3000/login`).
2.  **Visual Inspection**: Assess the layout, styling, form elements, and responsiveness. Confirm it looks modern and consistent with the application's theme.
3.  **Navigate to the Registration Page**: (e.g., `http://localhost:3000/register`).
4.  **Visual Inspection**: Assess the layout, styling, form elements, and responsiveness. Confirm it looks modern and consistent with the Login page and the overall theme.
