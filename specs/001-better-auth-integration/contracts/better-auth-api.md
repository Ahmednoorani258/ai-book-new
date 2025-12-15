# API Contracts: Better Auth

**Feature Branch**: `001-better-auth-integration`  
**Date**: 2025-12-14  

This document outlines the API contracts provided by the "Better Auth" library for both server-side and client-side interactions. These are derived directly from the Better Auth documentation and represent the interfaces for authentication, user management, and session handling.

## Backend Endpoints (via `auth.api`)

These are the functions exposed by the `auth.api` object on the server-side, typically used within a Node.js backend to handle authentication logic.

### User Management

-   **`auth.api.signUpEmail`**
    -   **Method**: `POST`
    -   **Description**: Registers a new user with email and password.
    -   **Body Parameters**:
        -   `email`: string (User's email address)
        -   `password`: string (User's password)
        -   `name`: string (Optional, user's display name)
        -   `image`: string (Optional, URL to user's profile image)
        -   `callbackURL`: string (Optional, URL to redirect after email verification)
    -   **Example Usage**:
        ```typescript
        const response = await auth.api.signUpEmail({
            body: { email, password, name, image, callbackURL },
            asResponse: true // returns a response object
        });
        ```

-   **`auth.api.signInEmail`**
    -   **Method**: `POST`
    -   **Description**: Authenticates a user with email and password.
    -   **Body Parameters**:
        -   `email`: string (User's email address)
        -   `password`: string (User's password)
        -   `rememberMe`: boolean (Optional, defaults to `true`. Persists session after browser close)
        -   `callbackURL`: string (Optional, URL to redirect after successful sign-in)
    -   **Headers**: Requires session cookies; pass request headers (e.g., `headers: await headers()`).
    -   **Example Usage**:
        ```typescript
        const response = await auth.api.signInEmail({
            body: { email, password, rememberMe, callbackURL },
            headers: await headers()
        });
        ```

-   **`auth.api.signOut`**
    -   **Method**: `POST`
    -   **Description**: Signs out the current user.
    -   **Headers**: Requires session cookies; pass request headers (e.g., `headers: await headers()`).
    -   **Example Usage**:
        ```typescript
        await auth.api.signOut({ headers: await headers() });
        ```

### Session Management

-   **`auth.api.getSession`**
    -   **Method**: `GET` (conceptually, typically fetches from cookies/headers)
    -   **Description**: Retrieves the current user's session data.
    -   **Headers**: Requires session cookies; pass request headers (e.g., `headers: await headers()`).
    -   **Returns**: Session object containing user data if authenticated.
    -   **Example Usage**:
        ```typescript
        const session = await auth.api.getSession({ headers: await headers() });
        ```

### Password Management

-   **`auth.api.requestPasswordReset`**
    -   **Method**: `POST`
    -   **Description**: Initiates a password reset process by sending a reset link to the user's email.
    -   **Body Parameters**:
        -   `email`: string (User's email address)
        -   `redirectTo`: string (Optional, URL to redirect user after sending email)
    -   **Example Usage**:
        ```typescript
        await auth.api.requestPasswordReset({ body: { email, redirectTo } });
        ```

-   **`auth.api.resetPassword`**
    -   **Method**: `POST`
    -   **Description**: Resets a user's password using a valid reset token.
    -   **Body Parameters**:
        -   `newPassword`: string (New password for the user)
        -   `token`: string (Valid password reset token received via email link)
    -   **Example Usage**:
        ```typescript
        await auth.api.resetPassword({ body: { newPassword, token } });
        ```

-   **`auth.api.changePassword`**
    -   **Method**: `POST`
    -   **Description**: Allows an authenticated user to change their password.
    -   **Body Parameters**:
        -   `newPassword`: string (New password for the user)
        -   `currentPassword`: string (Current password for verification)
        -   `revokeOtherSessions`: boolean (Optional, defaults to `true`. Invalidates other active sessions)
    -   **Headers**: Requires session cookies; pass request headers.
    -   **Example Usage**:
        ```typescript
        await auth.api.changePassword({ body: { newPassword, currentPassword, revokeOtherSessions }, headers: await headers() });
        ```

## Frontend Methods (via `authClient`)

These are the functions exposed by the `authClient` instance on the client-side, typically used within a React (or other frontend framework) application to manage user authentication flows.

### User Management

-   **`authClient.signUp.email`**
    -   **Description**: Registers a new user.
    -   **Parameters**: `{ email, password, name?, image?, callbackURL? }`
    -   **Example Usage**:
        ```typescript
        await authClient.signUp.email({ email, password, name });
        ```

-   **`authClient.signIn.email`**
    -   **Description**: Signs in a user.
    -   **Parameters**: `{ email, password, rememberMe?, callbackURL? }`
    -   **Example Usage**:
        ```typescript
        await authClient.signIn.email({ email, password });
        ```

-   **`authClient.signIn.social`**
    -   **Description**: Initiates sign-in with a social provider (e.g., Google, GitHub).
    -   **Parameters**: `{ provider, callbackURL?, errorCallbackURL?, newUserCallbackURL?, disableRedirect? }`
    -   **Example Usage**:
        ```typescript
        await authClient.signIn.social({ provider: "github", callbackURL: "/dashboard" });
        ```

-   **`authClient.signOut`**
    -   **Description**: Signs out the current user.
    -   **Parameters**: `fetchOptions?` (e.g., to redirect on success)
    -   **Example Usage**:
        ```typescript
        await authClient.signOut();
        ```

### Session Management

-   **`authClient.useSession()`**
    -   **Description**: React hook to access session data, provides reactivity (updates on session changes).
    -   **Returns**: `{ data: session, isPending, error, refetch }`.
    -   **Example Usage (React)**:
        ```typescript
        const { data: session } = authClient.useSession();
        ```

-   **`authClient.getSession()`**
    -   **Description**: Retrieves session data once.
    -   **Returns**: Promise resolving to `{ data: session, error }`.
    -   **Example Usage**:
        ```typescript
        const { data: session } = await authClient.getSession();
        ```

### Password Management

-   **`authClient.requestPasswordReset`**
    -   **Description**: Requests a password reset email.
    -   **Parameters**: `{ email, redirectTo? }`
    -   **Example Usage**:
        ```typescript
        await authClient.requestPasswordReset({ email: "user@example.com" });
        ```

-   **`authClient.resetPassword`**
    -   **Description**: Resets password using a token.
    -   **Parameters**: `{ newPassword, token }`
    -   **Example Usage**:
        ```typescript
        await authClient.resetPassword({ newPassword: "newPass", token: "reset_token_here" });
        ```

-   **`authClient.changePassword`**
    -   **Description**: Allows an authenticated user to change their password.
    -   **Parameters**: `{ newPassword, currentPassword, revokeOtherSessions? }`
    -   **Example Usage**:
        ```typescript
        await authClient.changePassword({ newPassword: "newPass", currentPassword: "oldPass" });
        ```

### Email Verification

-   **`authClient.sendVerificationEmail`**
    -   **Description**: Manually triggers sending a verification email to the user.
    -   **Parameters**: `{ email, callbackURL? }`
    -   **Example Usage**:
        ```typescript
        await authClient.sendVerificationEmail({ email: "user@example.com", callbackURL: "/" });
        ```
