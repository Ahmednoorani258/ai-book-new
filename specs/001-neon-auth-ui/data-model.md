# Data Model: Neon Auth UI Integration

**Feature Branch**: `001-neon-auth-ui`  
**Date**: 2025-12-14  

This data model is based on the inferred schema requirements from the "Better Auth" library. The key change for this feature is that all authentication-related data for these entities will now be stored in **Neon Serverless Postgres**. The structure of the entities themselves remains as defined by Better Auth.

## Entities (Stored in Neon Serverless Postgres)

### User

Represents an authenticated individual.

-   **id**: Unique identifier (Primary Key).
-   **email**: User's email address (Unique).
-   **name**: User's display name (Optional).
-   **image**: URL to user's profile image (Optional).
-   **createdAt**: Timestamp of user creation.
-   **updatedAt**: Timestamp of last update.

### Account

Stores authentication-related information, linked to users.

-   **id**: Unique identifier (Primary Key).
-   **userId**: Foreign Key referencing the `User` entity.
-   **providerId**: Identifier for the authentication provider (e.g., "credential" for email/password, or social provider ID like "github", "google").
-   **passwordHash**: Hashed password (for `providerId: "credential"`).
-   **emailVerified**: Boolean indicating if the email address has been verified.
-   **emailVerificationToken**: Token used for email verification (Optional, temporary).
-   **passwordResetToken**: Token used for password reset (Optional, temporary).
-   **createdAt**: Timestamp of account creation.
-   **updatedAt**: Timestamp of last update.

### Session

Represents an active user session.

-   **id**: Unique identifier (Primary Key).
-   **userId**: Foreign Key referencing the `User` entity.
-   **token**: Unique token representing the session.
-   **expiresAt**: Timestamp when the session expires.
-   **createdAt**: Timestamp of session creation.

### Token

Represents various tokens used for authentication processes (e.g., email verification, password reset).

-   **id**: Unique identifier (Primary Key).
-   **userId**: Foreign Key referencing the `User` entity.
-   **type**: Type of token (e.g., "emailVerification", "passwordReset").
-   **token**: The unique token string.
-   **expiresAt**: Timestamp when the token expires.
-   **createdAt**: Timestamp of token creation.

## Relationships

-   **User has many Accounts**: One User can have multiple authentication accounts.
-   **User has many Sessions**: One User can have multiple active sessions.
-   **User has many Tokens**: One User can have multiple active tokens for various purposes.

## Validation Rules (Inferred from Better Auth)

-   **Email**: Must be a valid email format.
-   **Password**: Minimum length of 8 characters, maximum 128 characters by default.
-   **Tokens**: Time-limited validity.

## State Transitions (Key flows)

-   **User Registration**: User -> Account -> (Optional) Email Verification Token -> (If verified) Email Verified status true.
-   **User Login**: Account credentials match -> Session created.
-   **Password Reset**: User requests -> Password Reset Token created -> User resets password -> Account `passwordHash` updated.
-   **Email Verification**: User signs up -> Email Verification Token created -> User clicks link -> Account `emailVerified` status true.
