# Quickstart Guide: Better Auth Integration

**Feature Branch**: `001-better-auth-integration`  
**Date**: 2025-12-14  
**Purpose**: This guide provides quick steps to set up and verify the basic functionality of the "Better Auth" integration, focusing on core user stories.

## 1. Database Setup Verification (User Story 3 - P1)

**Goal**: Ensure the necessary database tables for Better Auth are created correctly.

**Steps**:
1.  **Execute the database creation script**:
    *(Placeholder: This script needs to be created in a later task, but the quickstart assumes its existence for verification.)*
    ```bash
    # Assuming a script like 'scripts/db/init-better-auth.js' or 'npx @better-auth/cli migrate'
    # will be available.
    npx @better-auth/cli migrate
    ```
2.  **Verify table existence**: Connect to your PostgreSQL database and confirm the presence of tables like `users`, `accounts`, `sessions`, and `tokens` (or similar names created by Better Auth).

## 2. Server-Side Authentication Setup Verification

**Goal**: Ensure the Better Auth server instance is correctly initialized.

**Steps**:
1.  **Start the backend server**:
    ```bash
    # Assuming 'backend/src/app.ts' or similar will bootstrap the auth instance.
    npm run start:backend # or equivalent command
    ```
2.  **Access an unauthenticated endpoint**: (e.g., a public page) to confirm the server is running without auth errors.
3.  **Attempt a direct API call for signup (optional, for dev testing)**:
    *(Placeholder: Assuming `auth.api.signUpEmail` is exposed via a route.)*
    ```bash
    # Example using curl, replace with actual endpoint and data
    curl -X POST -H "Content-Type: application/json" -d '{ "email": "test@example.com", "password": "password123", "name": "Test User" }' http://localhost:3000/api/signup
    ```

## 3. User Registration Verification (User Story 1 - P1)

**Goal**: Verify that new users can successfully register for an account through the frontend.

**Pre-requisites**: Backend server is running, database is set up.

**Steps**:
1.  **Start the Docusaurus frontend**:
    ```bash
    npm run start # or equivalent command for Docusaurus
    ```
2.  **Navigate to the Registration Page**: (e.g., `/register` or `/signup`).
3.  **Fill in Registration Form**: Enter a unique email, strong password, and optional name.
4.  **Submit the Form**:
5.  **Verify Success**:
    *   Observe redirection to the dashboard or a success page.
    *   Check for confirmation messages in the UI.
    *   (Optional) Verify user entry in the database.

## 4. User Login Verification (User Story 2 - P1)

**Goal**: Verify that registered users can successfully log in and maintain a session.

**Pre-requisites**: A registered user exists, backend server is running, frontend is running.

**Steps**:
1.  **Navigate to the Login Page**: (e.g., `/login`).
2.  **Fill in Login Form**: Enter the email and password of a registered user.
3.  **Submit the Form**:
4.  **Verify Success**:
    *   Observe redirection to the dashboard or a protected page.
    *   Confirm access to protected content.
    *   (Optional) Check browser cookies or local storage for session tokens.
5.  **Verify Session Maintenance**: Navigate to other protected pages within the application and ensure the user remains logged in.
6.  **Verify Logout**: Navigate to a logout button/link and confirm the user is signed out and redirected to a public page (e.g., login page).

## 5. UI/UX Improvement Verification (User Story 4 - P2)

**Goal**: Visually confirm the improved UI/UX of the authentication pages.

**Steps**:
1.  **Navigate to the Registration Page**.
2.  **Navigate to the Login Page**.
3.  **Visual Inspection**: Confirm that both pages display a modern and responsive design consistent with the project's aesthetic. Check form elements, error messages, and overall layout.
