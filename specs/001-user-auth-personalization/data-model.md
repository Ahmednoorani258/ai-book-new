# Data Model: User Authentication and Personalization

This document outlines the data entities required for implementing user authentication and personalized content.

## Entities

### User

Represents an individual user within the system, primarily managed by the Better Auth platform.

-   **Attributes**:
    -   `id`: Unique identifier for the user (provided by Better Auth).
    -   `credentials`: Handled and stored securely by Better Auth (e.g., email, hashed password, social login tokens).
    -   `profileId`: Foreign key linking to the `Profile` entity.

-   **Validation Rules**:
    -   `id` must be unique.
    -   Credentials validation (e.g., password strength, email format) is managed by Better Auth.

-   **Relationships**:
    -   One-to-one with `Profile` (a User has one Profile, and a Profile belongs to one User).

### Profile

Stores the user's background information, used for content personalization.

-   **Attributes**:
    -   `id`: Unique identifier for the profile.
    -   `userId`: Unique identifier for the associated user (foreign key to `User.id`).
    -   `experienceLevel`: A single value representing the user's experience level with software development and robotics.
        -   Allowed values: `'beginner'`, `'intermediate'`, `'expert'` (or similar as defined by the questionnaire).

-   **Validation Rules**:
    -   `userId` must be unique (ensuring one profile per user).
    -   `experienceLevel` must be one of the predefined values.

-   **Relationships**:
    -   One-to-one with `User` (a Profile belongs to one User).

## Data Flow Overview

1.  **User Registration**:
    -   Better Auth handles user creation and credential storage.
    -   Upon successful registration, a corresponding `Profile` entry is created with the `userId` and initial `experienceLevel` from the questionnaire.
2.  **User Login**:
    -   Better Auth authenticates the user.
    -   The application retrieves the user's `Profile` information based on `userId` to enable content personalization.
3.  **Profile Update**:
    -   Users may update their `experienceLevel` via an application interface, which updates the `Profile` entity.
