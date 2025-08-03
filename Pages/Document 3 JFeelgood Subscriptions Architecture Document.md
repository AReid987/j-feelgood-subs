---
type: Page
title: 'Document 3: JFeelgood Subscriptions Architecture Document'
description: null
icon: null
createdAt: '2025-07-30T19:18:43.253Z'
creationDate: 2025-07-30 14:18
modificationDate: 2025-07-30 14:19
tags: []
coverImage: null
---

# Document 3: JFeelgood Subscriptions Architecture Document

```text
# JFeelgood Subscriptions Architecture Document
## Introduction / Preamble
This document outlines the overall project architecture for JFeelgood Subscriptions, including backend systems, frontend structure, shared services, and non-UI specific concerns. Its primary goal is to serve as the guiding architectural blueprint for AI-driven development, ensuring consistency and adherence to chosen patterns and technologies.
**Relationship to Frontend Architecture:**
This document details the core technology stack and foundational backend architecture. A detailed Frontend Architecture Document (`front-end-architecture.md`) will elaborate on the frontend-specific design, to be used in conjunction with this document.
## Table of Contents
* [Technical Summary](#technical-summary)
* [High-Level Overview](#high-level-overview)
* [Architectural / Design Patterns Adopted](#architectural--design-patterns-adopted)
* [Component View](#component-view)
* [Project Structure](#project-structure)
    * [Key Directory Descriptions](#key-directory-descriptions)
    * [Notes](#notes)
* [API Reference](#api-reference)
    * [Internal APIs Provided](#internal-apis-provided-if-applicable)
* [Data Models](#data-models)
    * [Core Application Entities / Domain Objects](#core-application-entities--domain-objects)
    * [Database Schemas](#database-schemas-if-applicable)
* [Core Workflow / Sequence Diagrams](#core-workflow--sequence-diagrams)
* [Definitive Tech Stack Selections](#definitive-tech-stack-selections)
* [Infrastructure and Deployment Overview](#infrastructure-and-deployment-overview)
* [Error Handling Strategy](#error-handling-strategy)
* [Coding Standards](#coding-standards)
    * [Detailed Language & Framework Conventions](#detailed-language--framework-conventions)
* [Overall Testing Strategy](#overall-testing-strategy)
* [Security Best Practices](#security-best-practices)
* [Key Reference Documents](#key-reference-documents)
* [Change Log](#change-log)
## Technical Summary
The JFeelgood Subscriptions system will be built as a monorepo, housing both a Next.js (React/TypeScript) frontend for the responsive landing page and subscription management, and a Python FastAPI backend for handling API requests, authentication, and secure payment processing via Stripe. PostgreSQL will serve as the primary database. The system will leverage Vercel for frontend deployment and AWS Lambda/ECS for the backend, focusing on scalability and ease of deployment.
## High-Level Overview
The system adopts a **Monorepo** architectural style, containing distinct `frontend` and `backend` services. User interaction initiates with the Next.js frontend, which then communicates with the FastAPI backend via a RESTful API for authentication, subscription management, and payment processing. Data is persisted in a PostgreSQL database.
```mermaid
graph TD
    A[User] -->|Browser| B(Next.js Frontend);
    B -->|API Calls (HTTPS)| C(FastAPI Backend);
    C -->|Database Operations| D[PostgreSQL Database];
    C -->|Payment Processing| E[Stripe API];
```

## Architectural / Design Patterns Adopted

- **Microservice-like (within Monolith context):** Although a single backend application for MVP, clear modular boundaries will be enforced for authentication, payment, and core subscription logic to facilitate future decoupling if needed.

- **API Gateway (Implicit):** The FastAPI backend acts as the gateway for all frontend API requests.

- **Repository Pattern:** For database interactions, abstracting data access logic from business logic.

- **Service Layer:** Business logic will reside in a service layer, orchestrating operations and interacting with repositories.

- **Client-Side State Management:** Using lightweight libraries (e.g., Zustand/React Context) for managing UI state on the frontend.

## Component View

The system is logically divided into three major components: Frontend, Backend, and Data Store.

- **Frontend (Next.js Application):** Responsible for rendering the user interface, handling client-side routing, managing local UI state, and making API calls to the backend.

    - Key sub-components: Landing Page UI, Authentication Forms (Sign Up/Login), Subscription Management Dashboard, CTA elements.

- **Backend (FastAPI Application):** Responsible for exposing RESTful API endpoints, handling user authentication and authorization, processing business logic related to subscriptions, and integrating with external payment gateways.

    - Key sub-components: Authentication Module, Subscription Module, Payment Module (Stripe Integration), API Endpoints, Database ORM/Repository Layer.

- **Data Store (PostgreSQL):** Persistent storage for user accounts, subscription details, and art print metadata.

Code snippet

```text
graph TD
    subgraph Frontend [Next.js Application]
        F1[Landing Page] --> F2[Auth Forms];
        F2 --> F3[Subscription Mgmt Dashboard];
    end
    subgraph Backend [FastAPI Application]
        B1[API Endpoints] --> B2[Auth Module];
        B1 --> B3[Subscription Module];
        B1 --> B4[Payment Module];
        B2 --> B5[ORM/Repo Layer];
        B3 --> B5;
        B4 --> B5;
        B4 --> B6[Stripe API];
    end
    B1 -- API Calls --> F1;
    B1 -- API Calls --> F2;
    B1 -- API Calls --> F3;
    B5 --> D[PostgreSQL Database];
```

## Project Structure

The project will adhere to a **Monorepo** structure, containing `frontend` and `backend` directories at the root, along with shared configurations and documentation.

Plaintext

```text
{project-root}/
├── .github/                    # CI/CD workflows (e.g., GitHub Actions)
│   └── workflows/
│       └── main.yml            # Frontend and Backend CI/CD
├── docs/                       # Project documentation (PRD, Arch, etc.)
│   ├── index.md                # Central index for all docs
│   ├── prd.md                  # Product Requirements Document
│   ├── architecture.md         # Main System Architecture Document (this file)
│   ├── front-end-spec.md       # UI/UX Specification
│   ├── data-models.md          # Detailed data models
│   └── ... (other .md files)
├── frontend/                   # Next.js application for landing page and user interface
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── app/                # Next.js App Router: Pages/Layouts/Routes
│   │   ├── components/         # Reusable UI components (ui/, layout/, feature-specific)
│   │   ├── services/           # Frontend API interaction layer
│   │   ├── store/              # Global state management (e.g., Zustand)
│   │   ├── styles/             # Tailwind CSS configuration and global styles
│   │   └── types/              # Frontend-specific TypeScript type definitions
│   ├── .env.example
│   ├── package.json
│   ├── next.config.js
│   └── tsconfig.json
├── backend/                    # FastAPI application for API, authentication, and payment processing
│   ├── src/
│   │   ├── api/                # API routes/controllers
│   │   ├── auth/               # Authentication logic and services
│   │   ├── payments/           # Payment processing integration (Stripe)
│   │   ├── models/             # Database models/schemas (e.g., using SQLAlchemy models)
│   │   ├── core/               # Core business logic, domain models
│   │   └── main.py             # Backend application entry point
│   ├── tests/                  # Backend unit and integration tests
│   ├── .env.example
│   ├── requirements.txt
│   └── pyproject.toml / setup.py
├── scripts/                    # Utility scripts (e.g., local dev setup, db migration)
├── tests/                      # Top-level integration/E2E tests if separate from unit tests
├── .env.example                # Global example environment variables
├── .gitignore                  # Git ignore rules
├── package.json                # Monorepo-level scripts, if using Yarn Workspaces/Nx
└── README.md                   # Project overview and setup instructions
```

### Key Directory Descriptions

- `docs/`: Contains all project planning and reference documentation.

- `frontend/`: Contains the Next.js application source code, components, and configuration.

- `backend/`: Contains the FastAPI application source code, API logic, and services.

- `src/backend/core/`: Core business logic, domain models, independent of framework/external services.

- `src/backend/models/`: Database schema definitions and ORM models.

- `src/backend/api/`: API endpoint handlers and routing.

- `tests/`: Contains all automated tests, with subdirectories for unit, integration, and e2e tests.

- `.github/workflows/`: Holds CI/CD workflow definitions.

### Notes

The structure allows for clear separation of concerns while benefiting from monorepo management. `package.json` at the root might include monorepo tooling like Nx or Yarn Workspaces if chosen.

## API Reference

### Internal APIs Provided

#### Backend API (FastAPI)

- **Purpose:** Provides core services for user authentication, subscription management, and payment processing.

- **Base URL(s):** `/api/v1/`

- **Authentication/Authorization:** JWT-based authentication for protected endpoints. Token derived from login. Role-based authorization will be implemented for administrative actions, if any, in later phases.

- **Endpoints:**

    - `POST /api/v1/auth/signup`**:**

        - Description: Registers a new user account.

        - Request Body Schema: `{ "email": "string", "password": "string" }`

        - Success Response Schema (Code: `201 Created`): `{ "message": "User registered successfully", "user_id": "string" }`

        - Error Response Schema(s): `400 Bad Request`, `409 Conflict` (if email already exists).

    - `POST /api/v1/auth/login`**:**

        - Description: Authenticates a user and returns JWT token.

        - Request Body Schema: `{ "email": "string", "password": "string" }`

        - Success Response Schema (Code: `200 OK`): `{ "access_token": "string", "token_type": "bearer" }`

        - Error Response Schema(s): `401 Unauthorized`.

    - `GET /api/v1/users/me` **(Protected):**

        - Description: Retrieves current authenticated user's profile.

        - Success Response Schema (Code: `200 OK`): `{ "id": "string", "email": "string", "subscription_status": "string" }`

    - `POST /api/v1/subscriptions/subscribe` **(Protected):**

        - Description: Initiates a new monthly subscription.

        - Request Body Schema: `{ "payment_method_id": "string" }` (Stripe Payment Method ID)

        - Success Response Schema (Code: `201 Created`): `{ "subscription_id": "string", "status": "active" }`

        - Error Response Schema(s): `400 Bad Request`, `402 Payment Required`, `500 Internal Server Error`.

    - `POST /api/v1/subscriptions/cancel` **(Protected):**

        - Description: Cancels an active subscription.

        - Success Response Schema (Code: `200 OK`): `{ "message": "Subscription cancelled", "subscription_id": "string", "status": "cancelled" }`

### External APIs Consumed

#### Stripe API

- **Purpose:** Used for secure recurring payment processing and subscription management.

- **Base URL(s):** `https://api.stripe.com/v1/`

- **Authentication:** API Key in Header (Header Name: `Authorization`, Value: `Bearer <YOUR_SECRET_KEY>`).

- **Key Endpoints Used:**

    - `POST /v1/customers`**:**

        - Description: Creates a new customer in Stripe.

    - `POST /v1/payment_methods`**:**

        - Description: Attaches a payment method to a customer. (Note: Frontend typically handles `stripe.js` for tokenizing card details securely on client-side, sending `payment_method_id` to backend).

    - `POST /v1/subscriptions`**:**

        - Description: Creates a new recurring subscription for a customer with a specified price.

    - `GET /v1/subscriptions/{id}`**:**

        - Description: Retrieves details of a specific subscription.

    - `POST /v1/subscriptions/{id}`**:**

        - Description: Updates or cancels a subscription.

- **Link to Official Docs:** `https://stripe.com/docs/api`

## Data Models

### Core Application Entities / Domain Objects

#### User

- **Description:** Represents a user account in the system.

- **Schema / Interface Definition:**

    TypeScript

    ```text
    // TypeScript Interface (for shared types if monorepo with TS frontend)
    export interface User {
      id: string; // Unique identifier (UUID)
      email: string; // User's email, unique and used for login
      password_hash: string; // Hashed password
      created_at: Date; // Timestamp of account creation
      updated_at: Date; // Last update timestamp
      stripe_customer_id: string | null; // Stripe customer ID if associated
      current_subscription_id: string | null; // Current active subscription ID
      subscription_status: "active" | "cancelled" | "past_due" | "unsubscribed" | "trialing"; // Current status
    }
    ```

- **Validation Rules:** Email must be valid format, unique. Password must meet minimum complexity (e.g., 8 chars, mixed case, number, symbol).

#### Subscription

- **Description:** Represents a user's subscription to the art print service.

- **Schema / Interface Definition:**

    TypeScript

    ```text
    export interface Subscription {
      id: string; // Unique identifier (UUID)
      user_id: string; // Foreign key to User
      stripe_subscription_id: string; // Stripe's ID for this subscription
      status: "active" | "cancelled" | "past_due" | "trialing"; // Current status from Stripe
      start_date: Date; // When the subscription started
      end_date: Date | null; // When the subscription ended (if cancelled)
      current_period_end: Date; // Next billing date
      price_id: string; // Stripe Price ID for the $12/month product
      created_at: Date;
      updated_at: Date;
    }
    ```

- **Validation Rules:** `user_id` must reference an existing user. `status` must be one of the defined enumerations.

#### ArtPrint (Metadata for reference, not directly stored as subscription item)

- **Description:** Metadata about each unique art print. Not directly linked to a user's subscription history in this MVP, but important for content management.

- **Schema / Interface Definition:**

    TypeScript

    ```text
    export interface ArtPrint {
      id: string; // Unique identifier
      title: string;
      artist: string;
      description: string;
      image_url: string; // URL to the high-quality image of the print
      release_month: string; // e.g., "July 2025"
      theme: "feelgood";
    }
    ```

### Database Schemas (If applicable)

#### `users` Table

- **Purpose:** Stores user authentication and basic profile information.

- **Schema Definition:**

    SQL

    ```text
    CREATE TABLE users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      stripe_customer_id VARCHAR(255) UNIQUE,
      current_subscription_id UUID UNIQUE REFERENCES subscriptions(id) ON DELETE SET NULL,
      subscription_status VARCHAR(50) NOT NULL DEFAULT 'unsubscribed'
    );
    ```

#### `subscriptions` Table

- **Purpose:** Stores details about each user's active or past subscriptions.

- **Schema Definition:**

    SQL

    ```text
    CREATE TABLE subscriptions (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      stripe_subscription_id VARCHAR(255) UNIQUE NOT NULL,
      status VARCHAR(50) NOT NULL, -- e.g., 'active', 'cancelled', 'past_due', 'trialing'
      start_date TIMESTAMPTZ NOT NULL,
      end_date TIMESTAMPTZ,
      current_period_end TIMESTAMPTZ NOT NULL,
      price_id VARCHAR(255) NOT NULL, -- Stripe price ID
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );
    ```

## Core Workflow / Sequence Diagrams

### User Sign-Up and Subscribe Flow

Code snippet

```text
sequenceDiagram
    participant F as Frontend (Next.js)
    participant B as Backend (FastAPI)
    participant D as Database (PostgreSQL)
    participant S as Stripe API
    F->>B: POST /auth/signup (email, password)
    B->>D: Check if user exists
    D-->>B: User not found
    B->>B: Hash password, Create user record
    B->>S: Create Customer
    S-->>B: Customer ID
    B->>D: Save User with Customer ID
    D-->>B: User Saved
    B-->>F: 201 Created (User ID)
    F->>F: User enters payment details (via Stripe Elements)
    F->>S: Tokenize Card (Stripe.js)
    S-->>F: Payment Method ID
    F->>B: POST /subscriptions/subscribe (payment_method_id, user_id from session)
    B->>S: Create Subscription (customer_id, payment_method_id, price_id)
    S-->>B: Subscription Object
    B->>D: Save Subscription record
    D-->>B: Subscription Saved
    B->>D: Update User's subscription_status
    D-->>B: User Updated
    B-->>F: 201 Created (Subscription ID, Status)
```

## Definitive Tech Stack Selections

This table outlines the definitive technology choices for the JFeelgood Subscriptions project. These selections are based on requirements from the PRD and UI/UX Specification, emphasizing rapid development, scalability, and maintainability.

| Category             | Technology              | Version / Details | Description / Purpose                           | Justification (Optional)                                                                                                                      |
| :------------------- | :---------------------- | :---------------- | :---------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| **Languages**        | TypeScript              | 5.x               | Primary language for frontend development       | Provides type safety, better tooling, and scales well for maintainability.                                                                    |
|                      | Python                  | 3.11              | Primary language for backend development        | Known for rapid development, rich ecosystem, and suitability for API development (FastAPI).                                                   |
| **Runtime**          | Node.js                 | 22.x              | Server-side execution for Next.js               | Required runtime for Next.js framework.                                                                                                       |
| **Frameworks**       | Next.js                 | 14.x              | Frontend UI framework                           | Excellent for SEO, performance (SSR/SSG), and developer experience, ideal for a "bomb ass landing page".                                      |
|                      | FastAPI                 | 0.111.x           | Backend API framework                           | High performance, automatic API documentation (Swagger UI), and modern Python async features for rapid API development.                       |
| **Databases**        | PostgreSQL              | 16.x              | Primary relational data store                   | Robust, scalable, open-source relational database, suitable for user and subscription data.                                                   |
|                      | Redis                   | 7.x               | Caching, session storage                        | (From template, not specifically justified in prompt or prior docs, but a common architectural choice for performance)                        |
| **Cloud Platform**   | AWS                     | N/A               | Primary cloud provider                          | Comprehensive suite of services for scalable and reliable deployments.                                                                        |
| **Cloud Services**   | AWS Lambda              | N/A               | Serverless compute for Backend                  | Cost-effective, scales automatically with demand, suitable for API endpoints.                                                                 |
|                      | AWS S3                  | N/A               | Object storage for assets                       | Highly scalable and durable storage for static assets like art print images.                                                                  |
|                      | AWS RDS (PostgreSQL)    | N/A               | Managed PostgreSQL database service             | Simplifies database setup, scaling, and maintenance.                                                                                          |
| **Infrastructure**   | AWS CDK                 | Latest            | Infrastructure as Code tool                     | Allows defining cloud infrastructure in code (TypeScript/Python), enabling version control and repeatable deployments.                        |
|                      | Docker                  | Latest            | Containerization (for local dev/ECS deployment) | Provides consistent environments across development and deployment, simplifying setup and dependency management.                              |
| **UI Libraries**     | Tailwind CSS            | 3.x               | Utility-first CSS framework for styling         | Speeds up UI development and ensures consistent styling.                                                                                      |
|                      | Radix UI / shadcn/ui    | Latest            | Headless UI component library for React         | Provides accessible, unstyled components that integrate well with Tailwind CSS, ensuring high quality and flexibility.                        |
| **State Management** | Zustand / React Context | Latest            | Frontend state management                       | Lightweight and efficient for managing UI-specific state and global application state, less boilerplate than Redux for this scale of project. |
| **Testing**          | Jest                    | Latest            | Unit/Integration testing framework (JS/TS)      | Widely adopted, fast, and feature-rich for testing React components and JavaScript/TypeScript logic.                                          |
|                      | Pytest                  | Latest            | Unit/Integration testing framework (Python)     | Simple, yet powerful testing framework for Python backend.                                                                                    |
|                      | Playwright              | Latest            | End-to-end testing framework (for UI)           | Supports cross-browser testing and robust test automation for user flows.                                                                     |
| **CI/CD**            | GitHub Actions          | N/A               | Continuous Integration/Deployment               | Integrates seamlessly with GitHub repositories for automated build, test, and deployment workflows.                                           |
| **Other Tools**      | Stripe SDKs             | Latest            | Payment processing integration                  | Official libraries to interact with Stripe API securely and efficiently.                                                                      |
|                      | SQLAlchemy              | Latest            | Python ORM for PostgreSQL                       | Provides a robust and flexible object-relational mapper for database interactions.                                                            |
|                      | `passlib`               | Latest            | Password hashing library (Python)               | Securely handles password hashing for user authentication.                                                                                    |
|                      | `python-jose`           | Latest            | JWT library (Python)                            | For secure creation and verification of JSON Web Tokens.                                                                                      |

## Infrastructure and Deployment Overview

- **Cloud Provider(s):** AWS

- **Core Services Used:** AWS Lambda (for backend functions), AWS RDS (PostgreSQL for database), AWS S3 (for static assets), AWS CloudFront (for CDN caching and distribution of frontend).

- **Infrastructure as Code (IaC):** AWS CDK (TypeScript/Python).

    - Location: `infra/` directory in the monorepo.

- **Deployment Strategy:** CI/CD pipeline with automated promotions.

    - Frontend: Next.js application deployed to Vercel via GitHub Actions for automated build and deployment on push to `main`. Vercel handles serving via CDN.

    - Backend: FastAPI application containerized with Docker and deployed to AWS Lambda (via Serverless Framework or AWS CDK) or AWS ECS (Fargate) via GitHub Actions.

    - Tools: GitHub Actions.

- **Environments:** Development (local), Staging (dedicated AWS/Vercel resources), Production (dedicated AWS/Vercel resources).

- **Environment Promotion:** `dev` -> `staging` (manual approval / automated tests pass) -> `production` (automated after tests pass and optional manual approval).

- **Rollback Strategy:** Automated rollback on health check failure post-deployment (for ECS/Lambda), or version rollback via Vercel/CDK for previous stable deployments.

## Error Handling Strategy

- **General Approach:** Use exceptions as the primary mechanism for errors in the backend. Define custom error types for specific business logic failures. Frontend will gracefully handle API errors and provide user-friendly feedback.

- **Logging:**

    - Library/Method: Python `logging` module configured for structured JSON output in the backend. For frontend, `console.log/error` for development, with a plan for integrating with a monitoring service (e.g., Sentry) for production.

    - Format: JSON for backend logs to facilitate centralized logging and analysis.

    - Levels: DEBUG, INFO, WARN, ERROR, CRITICAL (backend); console.log, console.warn, console.error (frontend).

    - Context: Backend logs must include request ID (correlation ID), user ID (if authenticated and safe), service name, operation name, and relevant sanitized parameters. Frontend logs will capture UI-specific errors and component context.

- **Specific Handling Patterns:**

    - **External API Calls (Stripe):** Implement retry mechanisms (e.g., exponential backoff) for transient errors, and specific error mapping to internal application errors. Timeouts will be configured for all external calls.

    - **Internal Errors / Business Logic Exceptions:** Backend will translate internal exceptions into standardized API error responses (e.g., 4xx for client errors, 5xx for server errors) with generic messages for end-users and detailed logging internally.

    - **Frontend Error Display:** Global error boundaries/toasts for unexpected errors. Inline validation messages for user input errors.

## Coding Standards

These standards are mandatory for all code generation by AI agents and human developers. Deviations are not permitted unless explicitly approved and documented as an exception.

- **Primary Runtime(s):** Node.js 22.x (Frontend), Python 3.11 (Backend).

- **Style Guide & Linter:**

    - **TypeScript/Next.js (Frontend):** ESLint with Airbnb config + Prettier. Configuration files: `.eslintrc.js`, `.prettierrc.js`.

    - **Python/FastAPI (Backend):** Black for formatting, Flake8 for linting, MyPy for type checking. Configuration files: `pyproject.toml` (or `setup.cfg`).

    - Linter rules are mandatory and must not be disabled without cause.

- **Naming Conventions:**

    - Variables: `camelCase` (JS/TS), `snake_case` (Python).

    - Functions/Methods: `camelCase` (JS/TS), `snake_case` (Python).

    - Classes/Types/Interfaces: `PascalCase`.

    - Constants: `UPPER_SNAKE_CASE`.

    - Files: `kebab-case.ts` (TS component/utility files), `snake_case.py` (Python modules), `PascalCase.tsx` (React components).

    - Modules/Packages: `kebab-case` (JS/TS), `snake_case` (Python).

- **Unit Test File Organization:**

    - **Frontend:** `*.test.ts` or `*.spec.ts` files co-located with the component, or in a `__tests__` subdirectory.

    - **Backend:** `test_*.py` files in a parallel `tests/` directory (e.g., `backend/tests/unit/`).

- **Asynchronous Operations:**

    - **TypeScript/Next.js:** Always use `async`/`await` for promise-based operations.

    - **Python/FastAPI:** Leverage `async`/`await` for asynchronous I/O operations.

- **Type Safety:**

    - **TypeScript:** Strict mode must be enabled (all flags). Avoid `!` non-null assertion operator.

    - **Python:** All new functions and methods must have full type hints. MyPy will be used for type checking.

- **Comments & Documentation:**

    - Code Comments: Explain *why*, not *what*, for complex logic. Use JSDoc (TS/JS) or Python docstrings.

    - READMEs: Each module/package/service should have a README explaining its purpose, setup, and usage.

- **Dependency Management:**

    - **Frontend:** npm/Yarn. Prefer pinned versions.

    - **Backend:** pip/Poetry. Prefer pinned versions.

### Detailed Language & Framework Conventions

#### TypeScript/Node.js Specifics (Frontend)

- **Immutability:** Prefer immutable data structures. Use `Readonly<T>`, `ReadonlyArray<T>`, `as const`. Avoid direct mutation of objects/arrays passed as props or state.

- **Functional vs. OOP:** Favor functional programming constructs (map, filter, reduce, pure functions) for data transformation.

- **Error Handling Specifics:** Always use `Error` objects or extensions. Ensure `Promise` rejections are `Error` objects. Use custom error classes.

- **Null/Undefined Handling:** Strict null checks (`strictNullChecks`) must be enabled. Prefer explicit checks, optional chaining (`?.`), or nullish coalescing (`??`).

- **Module System:** Use ESModules (`import`/`export`) exclusively.

- **Logging Specifics:** Use structured logging library. Messages must include a correlation ID. Do not log sensitive PII.

- **Framework Idioms (Next.js/React):** Adhere to Next.js App Router conventions. Use React Hooks for state and side effects.

- **Key Library Usage Conventions:** For date/time, use a dedicated library like `date-fns` or `Luxon`.

- **Code Generation Anti-Patterns to Avoid:** Avoid overly nested conditional logic (max 2-3 levels). Avoid single-letter variable names. Do not write code that bypasses framework security features.

#### Python Specifics (Backend)

- **Immutability:** Use tuples for immutable sequences. Consider `@dataclass(frozen=True)`.

- **Functional vs. OOP:** Employ classes for representing entities and services. Use functions for stateless operations.

- **Error Handling Specifics:** Always raise specific, custom exceptions inheriting from a base `AppException`. Use `try-except-else-finally` blocks appropriately.

- **Resource Management:** Always use `with` statements for resources like files or DB connections.

- **Type Hinting:** All new functions and methods must have full type hints. Run MyPy in CI.

- **Logging Specifics:** Use the `logging` module configured for structured output. Include correlation IDs.

- **Framework Idioms (FastAPI):** Utilize Pydantic for request/response models and dependency injection for services.

- **Key Library Usage Conventions:** For HTTP requests, use `httpx` or `requests` with explicit timeout settings.

## Overall Testing Strategy

- **Tools:** Jest (Frontend), Pytest (Backend), Playwright (E2E).

- **Unit Tests:**

    - Scope: Test individual functions, methods, classes.

    - Location: Co-located with source files or in parallel `__tests__`/`tests` directories.

    - Mocking/Stubbing: Jest mocks (frontend), `unittest.mock` (Python backend). Mock all external dependencies.

    - AI Agent Responsibility: AI Agent must generate unit tests covering all public methods, logic paths, edge cases, and error conditions.

- **Integration Tests:**

    - Scope: Test interactions between components/services (e.g., API endpoint to service layer to database).

    - Location: `tests/integration` or similar.

    - Environment: Testcontainers for databases/external services or in-memory databases.

    - AI Agent Responsibility: AI Agent may be tasked with generating integration tests for key service interactions or API endpoints.

- **End-to-End (E2E) Tests:**

    - Scope: Validate complete user flows from the user's perspective (e.g., UI interaction).

    - Tools: Playwright.

    - AI Agent Responsibility: AI Agent may be tasked with generating E2E test stubs for critical happy paths and key error scenarios.

- **Test Coverage:** Target 80% line/branch coverage for unit tests.

- **Mocking/Stubbing Strategy (General):** Prefer fakes/test doubles over extensive mocking when clarity/maintainability are improved.

- **Test Data Management:** Factories, fixtures, setup/teardown scripts.

## Security Best Practices

- **Input Sanitization/Validation:**

    - **Frontend:** Client-side validation for UX. All critical validation **must** occur server-side.

    - **Backend:** Use FastAPI's Pydantic models for request validation.

- **Output Encoding:**

    - **Frontend:** React's JSX auto-escaping for dynamic content.

- **Secrets Management:** Access secrets *only* through a designated configuration module/service. Never hardcode secrets. Use `.env` files for local dev (not committed).

- **Dependency Security:** Run automated vulnerability scans (e.g., `npm audit`, `pip-audit`) as part of CI.

- **Authentication/Authorization:** All API endpoints (except public ones) must enforce authentication using the central auth module/middleware.

- **Principle of Least Privilege (Implementation):** Database users and IAM roles must have only necessary permissions.

- **API Security (General):** Enforce HTTPS. Implement rate limiting and throttling. Use standard HTTP security headers (CSP, HSTS).

- **Error Handling & Information Disclosure:** Error messages must not leak sensitive information to end-users. Log detailed errors server-side.

- **Cross-Site Scripting (XSS) Prevention:** Rely on framework auto-escaping. Avoid `v-html` (Vue.js example) or direct DOM manipulation without sanitization.

- **Secure Token Storage & Handling:** In-memory via state management (e.g., Zustand), cleared on tab close. `localStorage` is **strongly discouraged** for token storage.

- **Client-Side Data Validation:** For UX improvement only; all critical validation must be server-side.

- **Secure Communication (HTTPS):** All communication with backend APIs **must** use HTTPS.

## Key Reference Documents

- `docs/prd.md` - Product Requirements Document

- `docs/front-end-spec.md` - UI/UX Specification

- `docs/data-models.md` - Detailed Data Models

- `docs/api-reference.md` - Backend API Reference

- `docs/project-structure.md` - Project Directory Structure

- `docs/tech-stack.md` - Definitive Technology Stack Selections

- `docs/operational-guidelines.md` - Coding Standards, Testing, Error Handling, Security Practices

- `docs/component-view.md` - Component Overview

- `docs/sequence-diagrams.md` - Core Workflow Diagrams

- `docs/infra-deployment.md` - Infrastructure & Deployment Overview

- `docs/key-references.md` - Key External Reference Documents (if any)

## Change Log

| Change        | Date       | Version | Description                                                | Author            |
| :------------ | :--------- | :------ | :--------------------------------------------------------- | :---------------- |
| Initial Draft | 2025-07-30 | 1.0     | Initial Architecture Document based on PRD and UI/UX Spec. | Ava "Atlas" Patel |
