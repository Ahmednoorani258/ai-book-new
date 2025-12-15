# Research: Neon Auth UI Integration

**Feature Branch**: `001-neon-auth-ui`  
**Date**: 2025-12-14  

## Research Task 1: Understand how to configure Better Auth to use Neon Serverless Postgres.

## Research Task 2: Identify any specific considerations or best practices for connecting Node.js/Better Auth to Neon Serverless Postgres.

---

## Consolidated Findings

**Decision**: The "Neon Serverless Postgres" database will be integrated as the backend storage for the "Better Auth" library.
**Rationale**: Explicit user request. Neon offers a scalable, cloud-native PostgreSQL solution which aligns with modern application requirements. This integration primarily involves configuring the existing `DATABASE_URL` to point to the Neon instance.
**Alternatives considered**: Other PostgreSQL providers (e.g., ElephantSQL, AWS RDS, local PostgreSQL), but Neon was specified. Previous research mistakenly focused on Python/AWS RDS Data API, which is not applicable to our TypeScript `better-auth` library.

### Core Concepts & Integration Steps for Neon with Better Auth

1.  **Neon Connection String**: Obtain the full connection string (including `user`, `password`, `host`, `port`, `database`, and often `sslmode`) directly from your Neon dashboard.
2.  **Environment Variable (`DATABASE_URL`)**: The existing `better-auth` library setup in the backend (`backend/src/auth.ts` and `backend/src/db.ts`) is configured to read the database connection string from the `DATABASE_URL` environment variable. This variable will be updated to hold the Neon connection string.
3.  **`pg` client library**: Node.js applications typically use the `pg` client library to connect to PostgreSQL databases. The `better-auth` library (or its underlying database abstraction layer) will implicitly leverage this or a compatible client.
4.  **SSL/TLS Configuration**: Neon connections often require SSL. When using `pg` directly, ensure proper SSL configuration. A common configuration is `ssl: { rejectUnauthorized: false }` for development (though `true` with proper certificates is required for production to prevent security risks). Neon connection strings typically handle this directly (e.g., `?sslmode=require`).
5.  **Schema Management**: The `npx @better-auth/cli migrate` tool, which is already integrated into the `backend/package.json` (`db:migrate-auth` script), will be used to create and manage the necessary database schema for Better Auth directly on the Neon instance.

### Neon-Specific Considerations for Node.js/Better Auth

-   **Connection Pooling**: Ensure that the application's database connection pooling is configured appropriately for a serverless environment like Neon, which might have connection limits. The `pg` library's `Pool` class handles this by default.
-   **Cold Starts**: Be aware that serverless databases like Neon can experience cold starts, which might introduce slight latency for the very first connection after a period of inactivity. This is a general characteristic of serverless offerings.
-   **Security**: Always use environment variables for sensitive connection strings. Configure proper SSL/TLS. Restrict database user permissions to only what's necessary.