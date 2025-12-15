# API Contracts: Better Auth (Backed by Neon Serverless Postgres)

**Feature Branch**: `001-neon-auth-ui`  
**Date**: 2025-12-14  

This document outlines the API contracts provided by the "Better Auth" library for both server-side and client-side interactions. These contracts remain functionally identical to the standard Better Auth API, with the key difference being that the underlying data persistence layer is now **Neon Serverless Postgres**.

For detailed specifications of each endpoint and method, refer to the original `specs/001-better-auth-integration/contracts/better-auth-api.md` document.

## Backend Endpoints (via `auth.api`)

The following server-side authentication functions are provided by `auth.api`, with all data operations now directed to Neon Serverless Postgres:

-   `auth.api.signUpEmail`
-   `auth.api.signInEmail`
-   `auth.api.signOut`
-   `auth.api.getSession`
-   `auth.api.requestPasswordReset`
-   `auth.api.resetPassword`
-   `auth.api.changePassword`

## Frontend Methods (via `authClient`)

The following client-side authentication methods are provided by `authClient`, interacting with the backend which now uses Neon Serverless Postgres:

-   `authClient.signUp.email`
-   `authClient.signIn.email`
-   `authClient.signIn.social`
-   `authClient.signOut`
-   `authClient.useSession()`
-   `authClient.getSession()`
-   `authClient.requestPasswordReset`
-   `authClient.resetPassword`
-   `authClient.changePassword`
-   `authClient.sendVerificationEmail`

## Database Interaction

All data associated with these API calls (Users, Accounts, Sessions, Tokens) will be managed within the Neon Serverless Postgres database. The schema is defined by Better Auth's internal mechanisms and managed via its CLI tools (e.g., `npx @better-auth/cli migrate`).
