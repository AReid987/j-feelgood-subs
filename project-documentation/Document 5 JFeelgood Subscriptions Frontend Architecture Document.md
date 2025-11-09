---
type: Page
title: 'Document 5: JFeelgood Subscriptions Frontend Architecture Document'
description: null
icon: null
createdAt: '2025-07-30T19:25:05.260Z'
creationDate: 2025-07-30 14:25
modificationDate: 2025-07-30 14:36
tags: []
coverImage: null
---

Document 5: JFeelgood Subscriptions Frontend Architecture Document

```text
# JFeelgood Subscriptions Frontend Architecture Document
## Introduction
This document details the technical architecture specifically for the frontend of JFeelgood Subscriptions. It complements the main JFeelgood Subscriptions Architecture Document and the UI/UX Specification. This document details the frontend architecture and **builds upon the foundational decisions** (e.g., overall tech stack, CI/CD, primary testing tools) defined in the main JFeelgood Subscriptions Architecture Document (`docs/architecture.md`). **Frontend-specific elaborations or deviations from general patterns must be explicitly noted here.** The goal is to provide a clear blueprint for frontend development, ensuring consistency, maintainability, and alignment with the overall system design and user experience goals.
* **Link to Main Architecture Document (REQUIRED):** `docs/architecture.md`
* **Link to UI/UX Specification (REQUIRED if exists):** `docs/front-end-spec.md`
* **Link to Primary Design Files (Figma, Sketch, etc.) (REQUIRED if exists):** To be created.
* **Link to Deployed Storybook / Component Showcase (if applicable):** Not applicable at this stage.
## Overall Frontend Philosophy & Patterns
The frontend will be built using **React 18.x with Next.js 14.x**, following a component-driven architecture. State management will primarily utilize **Zustand or React Context API** for lighter-weight global state, with local component state handled by React's `useState` and `useReducer` hooks. Data flow will adhere to a unidirectional pattern. Styling will be implemented using **Tailwind CSS** for a utility-first approach, complemented by a headless UI library like Radix UI or shadcn/ui for accessible, unstyled components. Key design patterns such as the Provider pattern and React Hooks will be consistently applied. This aligns with the "Definitive Tech Stack Selections" in the main Architecture Document.
* **Framework & Core Libraries:** React 18.x with Next.js 14.x.
* **Component Architecture:** Atomic Design principles, Presentational vs. Container components, use of headless component libraries (Radix UI / shadcn/ui).
* **State Management Strategy:** Zustand or React Context API.
* **Data Flow:** Unidirectional data flow (Flux/Redux pattern).
* **Styling Approach:** Tailwind CSS. Configuration File(s): `tailwind.config.js`, `postcss.config.js`. Key conventions: Utility-first approach for Tailwind. Custom components defined in `src/styles/components.css`. Theme extensions in `tailwind.config.js` under `theme.extend`. For CSS Modules, files are co-located with components, e.g., `MyComponent.module.css`.
* **Key Design Patterns Used:** Provider pattern, Hooks, Higher-Order Components, Service patterns for API calls, Container/Presentational.
## Detailed Frontend Directory Structure
The frontend application will follow a modular and scalable directory structure within the `frontend/` root, optimized for Next.js App Router conventions and clear separation of concerns.
```plaintext
src/
├── app/                        # Next.js App Router: Pages/Layouts/Routes. MUST contain route segments, layouts, and page components.
│   ├── (features)/             # Feature-based routing groups. MUST group related routes for a specific feature.
│   │   └── dashboard/
│   │       ├── layout.tsx      # Layout specific to the dashboard feature routes.
│   │       └── page.tsx        # Entry page component for a dashboard route.
│   ├── api/                    # API Routes (if using Next.js backend features). MUST contain backend handlers for client-side calls.
│   ├── globals.css             # Global styles. MUST contain base styles, CSS variable definitions, Tailwind base/components/utilities.
│   └── layout.tsx              # Root layout for the entire application.
├── components/                 # Shared/Reusable UI Components.
│   ├── ui/                     # Base UI elements (Button, Input, Card). MUST contain only generic, reusable, presentational UI elements, often mapped from a design system. MUST NOT contain business logic.
│   │   ├── Button.tsx
│   │   └── ...
│   ├── layout/                 # Layout components (Header, Footer, Sidebar). MUST contain components structuring page layouts, not specific page content.
│   │   ├── Header.tsx
│   │   └── ...
│   └── (feature-specific)/     # Components specific to a feature but potentially reusable within it. This is an alternative to co-locating within features/ directory.
│       └── user-profile/
│           └── ProfileCard.tsx
├── features/                   # Feature-specific logic, hooks, non-global state, services, and components solely used by that feature.
│   └── auth/
│       ├── components/         # Components used exclusively by the auth feature. MUST NOT be imported by other features.
│       ├── hooks/              # Custom React Hooks specific to the 'auth' feature. Hooks reusable across features belong in `src/hooks/`.
│       ├── services/           # Feature-specific API interactions or orchestrations for the 'auth' feature.
│       └── store.ts            # Feature-specific state slice (e.g., Redux slice) if not part of a global store or if local state is complex.
├── hooks/                      # Global/sharable custom React Hooks. MUST be generic and usable by multiple features/components.
│   └── useAuth.ts
├── lib/ / utils/             # Utility functions, helpers, constants. MUST contain pure functions and constants, no side effects or framework-specific code unless clearly named (e.g., `react-helpers.ts`).
│   └── utils.ts
├── services/                   # Global API service clients or SDK configurations. MUST define base API client instances and core data fetching/mutation services.
│   └── apiClient.ts
├── store/                      # Global state management setup (e.g., Redux store, Zustand store).
│   ├── index.ts                # Main store configuration and export.
│   ├── rootReducer.ts          # Root reducer if using Redux.
│   └── (slices)/               # Directory for global state slices (if not co-located in features).
├── styles/                     # Global styles, theme configurations (if not using `globals.css` or similar, or for specific styling systems like SCSS partials).
└── types/                      # Global TypeScript type definitions/interfaces. MUST contain types shared across multiple features/modules.
    └── index.ts
```

### Notes on Frontend Structure:

Components are co-located with their feature if not globally reusable to improve modularity. AI Agent MUST adhere to this defined structure strictly. New files MUST be placed in the appropriate directory based on these descriptions.

## Component Breakdown & Implementation Details

This section outlines the conventions and templates for defining UI components. Detailed specification for most feature-specific components will emerge as user stories are implemented. The AI agent MUST follow the "Template for Component Specification" below whenever a new component is identified for development.

### Component Naming & Organization

- **Component Naming Convention:** `PascalCase` for files and component names: `UserProfileCard.tsx`. All component files MUST follow this convention.

- **Organization:** Globally reusable components in `src/components/ui/` or `src/components/layout/`. Feature-specific components co-located within their feature directory, e.g., `src/features/feature-name/components/`.

### Template for Component Specification

#### Component: `{ComponentName}` (e.g., `UserProfileCard`, `ProductDetailsView`)

- **Purpose:** {Briefly describe what this component does and its role in the UI. MUST be clear and concise.}

- **Source File(s):** {e.g., `src/components/user-profile/UserProfileCard.tsx`. MUST be the exact path.}

- **Visual Reference:** {Link to specific Figma frame/component, or Storybook page. REQUIRED.}

- Props (Properties):

    > Prop Name | Type | Required? | Default Value | Description |

    > :-------------- | :---------------------------------------- | :-------- | :------------ | :--------------------------------------------------------------------------------------------------------- |

    > userId | string | Yes | N/A | The ID of the user to display. MUST be a valid UUID. |

    > avatarUrl | string \| null | No | null | URL for the user's avatar image. MUST be a valid HTTPS URL if provided. |

    > onEdit | () => void | No | N/A | Callback function when an edit action is triggered. |

    > variant | \'compact\' \| \'full\' | No | \'full\' | Controls the display mode of the card. |

    > {anotherProp} | {Specific primitive, imported type, or inline interface/type definition} | {Yes/No} | {If any} | {MUST clearly state the prop's purpose and any constraints, e.g., 'Must be a positive integer.'} |

- Internal State (if any):

    > State Variable | Type | Initial Value | Description |

    > :-------------- | :-------- | :------------ | :----------------------------------------------------------------------------- |

    > isLoading | boolean | false | Tracks if data for the component is loading. |

    > {anotherState} | {type} | {value} | {Description of state variable and its purpose.} |

- **Key UI Elements / Structure:**

    HTML

    ```text
    <div> <img src="{avatarUrl || defaultAvatar}" alt="User Avatar" class="{styles.avatar}" />
      <h2>{userName}</h2>
      <p class="{variant === 'full' ? styles.emailFull : styles.emailCompact}">{userEmail}</p>
      {variant === 'full' && onEdit && <button onClick={onEdit} class="{styles.editButton}">Edit</button>}
    </div>
    ```

- **Events Handled / Emitted:**

    - **Handles:** {e.g., `onClick` on the edit button (triggers `onEdit` prop).}

    - **Emits:** {If the component emits custom events/callbacks not covered by props, describe them with their exact signature. e.g., `onFollow: (payload: { userId: string; followed: boolean }) => void`}

- **Actions Triggered (Side Effects):**

    - **State Management:** {e.g., "Dispatches `userSlice.actions.setUserName(newName)` from `src/store/slices/userSlice.ts`. Action payload MUST match the defined action creator." OR "Calls `updateUserProfileOptimistic(newData)` from a local `useReducer` hook."}

    - **API Calls:** {Specify which service/function from the "API Interaction Layer" is called. e.g., "Calls `userService.fetchUser(userId)` from `src/services/userService.ts` on mount. Request payload: `{ userId }`. Success response populates internal state `userData`. Error response dispatches `uiSlice.actions.showErrorToast({ message: 'Failed to load user details' })`.}

- **Styling Notes:**

    - {MUST reference specific Design System component names (e.g., "Uses `<Button variant='primary'>` from UI library") OR specify Tailwind CSS classes / CSS module class names to be applied (e.g., "Container uses `p-4 bg-white rounded-lg shadow-md`. Title uses `text-xl font-semibold`.") OR specify SCSS custom component classes to be applied (e.g., "Container uses `@apply p-4 bg-white rounded-lg shadow-md`. Title uses `@apply text-xl font-semibold`."). Any dynamic styling logic based on props or state MUST be described. If Tailwind CSS is used, list primary utility classes or `@apply` directives for custom component classes. AI Agent should prioritize direct utility class usage for simple cases and propose reusable component classes/React components for complex styling patterns.}

- **Accessibility Notes:**

    - {MUST list specific ARIA attributes and their values (e.g., `aria-label="User profile card"`, `role="article"`), required keyboard navigation behavior (e.g., "Tab navigates to avatar, name, email, then edit button. Edit button is focusable and activated by Enter/Space."), and any focus management requirements (e.g., "If this component opens a modal, focus MUST be trapped inside. On modal close, focus returns to the trigger element.").}

## State Management In-Depth

The frontend will use **Zustand or React Context API** for managing global state. Local component state will be handled by React's `useState` and `useReducer` hooks.

- **Chosen Solution:** Zustand / React Context (lightweight state management).

- **Decision Guide for State Location:**

    - **Global State (e.g., Zustand):** Data shared across many unrelated components; data persisting across routes; complex state logic managed via reducers/thunks. **MUST be used for session data, user preferences, application-wide notifications.**

    - **React Context API:** State primarily passed down a specific component subtree (e.g., theme, form context). Simpler state, fewer updates compared to global state. **MUST be used for localized state not suitable for prop drilling but not needed globally.**

    - **Local Component State (**`useState`**,** `useReducer`**):** UI-specific state, not needed outside the component or its direct children (e.g., form input values, dropdown open/close status). **MUST be the default choice unless criteria for Context or Global State are met.**

### Store Structure / Slices

- **Core Slice Example (e.g.,** `sessionStore` **in** `src/store/sessionStore.ts` **for Zustand):**

    - **Purpose:** Manages user session, authentication status, and basic user profile info accessible globally.

    - **State Shape (Interface/Type):**

        TypeScript

        ```text
        interface SessionState {
          currentUser: { id: string; name: string; email: string; roles: string[]; } | null;
          isAuthenticated: boolean;
          token: string | null;
          status: "idle" | "loading" | "succeeded" | "failed";
          error: string | null;
          login: (credentials: AuthCredentials) => Promise<void>; // Example action
          logout: () => void;
        }
        ```

    - **Key Actions (within** `create` **for Zustand):** `login`, `logout`, `setCurrentUser`, `clearSession`.

    - **Key Selectors (for Zustand, directly from store):** `useSessionStore(state => state.currentUser)`, `useSessionStore(state => state.isAuthenticated)`.

### Key Selectors

- `selectCurrentUser` **(from** `sessionStore`**):** Returns the `currentUser` object.

- `selectIsAuthenticated` **(from** `sessionStore`**):** Returns `isAuthenticated` boolean.

- `selectAuthToken` **(from** `sessionStore`**):** Returns the `token` from `sessionStore`.

### Key Actions / Reducers / Thunks

- **Core Action Example:** `sessionStore.login(credentials)` **(in** `src/store/sessionStore.ts`**):**

    - **Purpose:** Handles user login by calling the auth API and updating the `sessionStore`.

    - **Parameters:** `credentials: { email: string; password: string }`

    - **Flow:**

        1. Sets status to 'loading'.

        2. Calls `authService.login(credentials)` (from `src/services/authService.ts`).

        3. On `success`: Updates `currentUser`, `token`, sets status to 'succeeded'.

        4. On `error`: Sets `error` message, sets status to 'failed'.

## API Interaction Layer

Frontend will communicate with the backend APIs (FastAPI) defined in the main Architecture Document.

### Client/Service Structure

- **HTTP Client Setup:** Axios instance in `src/services/apiClient.ts`. **MUST** include: Base URL (from environment variable `NEXT_PUBLIC_API_URL`), default headers (e.g., `Content-Type: 'application/json'`), interceptors for automatic auth token injection (from state management, e.g., `sessionStore.token`) and standardized error handling/normalization.

- **Service Definitions (Example):**

    - `authService.ts` **(in** `src/services/authService.ts`**):**

        - **Purpose:** Handles all API interactions related to authentication.

        - **Functions:** `login(credentials: LoginDto): Promise<AuthResponse>`, `signup(data: SignupDto): Promise<SignupResponse>`.

    - `subscriptionService.ts` **(in** `src/services/subscriptionService.ts`**):**

        - **Purpose:** Handles all API interactions related to subscriptions.

        - **Functions:** `subscribe(paymentMethodId: string): Promise<SubscriptionResponse>`, `cancelSubscription(): Promise<CancelSubscriptionResponse>`.

### Error Handling & Retries (Frontend)

- **Global Error Handling:** Via Axios response interceptor in `apiClient.ts`. Dispatches UI actions (e.g., `uiStore.actions.showGlobalErrorToast({ message: error.message })`), logs detailed error.

- **Specific Error Handling:** Components may handle specific API errors locally for more contextual feedback (e.g., displaying inline messages on forms).

- **Retry Logic:** Client-side retry logic (e.g., using `axios-retry`) **MUST apply only to idempotent requests (GET, PUT, DELETE)**. Configure max retries (e.g., 3), retry conditions (network errors, 5xx server errors), and exponential backoff.

## Routing Strategy

Frontend routing will be handled by the **Next.js App Router**.

### Route Definitions

| Path Pattern          | Component/Page (`src/app/...`)    | Protection                  | Notes                                               |
| :-------------------- | :-------------------------------- | :-------------------------- | :-------------------------------------------------- |
| `/`                   | `app/page.tsx`                    | `Public`                    | Main landing page.                                  |
| `/login`              | `app/login/page.tsx`              | `Public` (redirect if auth) | Redirects to `/dashboard` if already authenticated. |
| `/signup`             | `app/signup/page.tsx`             | `Public` (redirect if auth) |                                                     |
| `/dashboard`          | `app/dashboard/page.tsx`          | `Authenticated`             | User's subscription management dashboard.           |
| `/dashboard/settings` | `app/dashboard/settings/page.tsx` | `Authenticated`             | For profile and payment updates.                    |

### Route Guards / Protection

- **Authentication Guard:** Routes will be protected using Next.js Middleware (`middleware.ts`) or a higher-order component/layout wrapper. Logic MUST use authentication state from the `sessionStore`. Unauthenticated users attempting to access protected routes MUST be redirected to `/login`.

## Build, Bundling, and Deployment

Details specific to the frontend build and deployment process, complementing the "Infrastructure and Deployment Overview" in the main architecture document.

### Build Process & Scripts

- **Key Build Scripts (from** `package.json`**):** `"build": "next build"`, `"dev": "next dev"`, `"start": "next start"`. AI Agent MUST NOT generate code that hardcodes environment-specific values. All such values MUST be accessed via the defined environment configuration mechanism (e.g., `process.env.NEXT_PUBLIC_API_URL`).

- **Environment Configuration Management:** `.env`, `.env.development`, `.env.production` files for Next.js. Values are build-time injected via CI variables.

### Key Bundling Optimizations

- **Code Splitting:** Next.js handles route-based code splitting automatically. Dynamic imports (`React.lazy(() => import('./MyComponent'))`) MUST be used for non-critical large components/libraries.

- **Tree Shaking:** Ensured by modern build tools (Webpack/Rollup used by Next.js).

- **Lazy Loading (Components, Images, etc.):** Components: `React.lazy` with `Suspense`. Images: Use `next/image` component.

- **Minification & Compression:** Handled by Next.js build process.

### Deployment to CDN/Hosting

- **Target Platform:** Vercel.

- **Deployment Trigger:** Git push to `main` branch via GitHub Actions.

- **Asset Caching Strategy:** Immutable assets (JS/CSS bundles with content hashes) have `Cache-Control: public, max-age=31536000, immutable`. HTML files have `Cache-Control: no-cache` or short max-age. Configured via Vercel settings/Next.js headers.

## Frontend Testing Strategy

This section elaborates on the "Testing Strategy" from the main architecture document, focusing on frontend-specific aspects.

- **Link to Main Overall Testing Strategy:** `docs/architecture.md#overall-testing-strategy`

### Component Testing

- **Scope:** Testing individual UI components in isolation.

- **Tools:** React Testing Library with Jest/Vitest.

- **Focus:** Rendering with various props, user interactions (`fireEvent` or `userEvent`), event emission, basic internal state changes. Snapshot testing to be used sparingly.

- **Location:** `*.test.tsx` or `*.spec.tsx` co-located alongside components, or in a `__tests__` subdirectory.

### Feature/Flow Testing (UI Integration)

- **Scope:** Testing how multiple components interact to fulfill a small user flow within a page, potentially mocking API calls or global state management.

- **Tools:** React Testing Library with Jest/Vitest.

- **Focus:** Data flow between components, conditional rendering, navigation within a feature, integration with mocked services/state.

### End-to-End UI Testing Tools & Scope

- **Tools:** Playwright.

- **Scope (Frontend Focus):**

    1. User registration and login flow.

    2. Successful subscription process from landing page to confirmation.

    3. Updating user profile information in the dashboard.

    4. Canceling a subscription from the dashboard.

- **Test Data Management for UI:** API mocking layer (e.g., MSW - Mock Service Worker) for UI E2E tests.

## Accessibility (AX) Implementation Details

Based on the AX requirements in the UI/UX Specification, these details define how they will be technically implemented.

- **Semantic HTML:** AI Agent MUST prioritize semantic elements (e.g., `<nav>`, `<button>`, `<article>`) over generic `<div>`/`<span>` with ARIA roles where a native element with the correct semantics exists.

- **ARIA Implementation:** Custom components will follow ARIA Authoring Practices Guide (APG) patterns.

- **Keyboard Navigation:** All interactive elements must be focusable and operable via keyboard. Focus order MUST be logical.

- **Focus Management:** Modals MUST trap focus. On modal open, focus moves to the first focusable element. On close, focus returns to the trigger element. Route changes SHOULD move focus to the main content area or H1 of the new page.

- **Testing Tools for AX:** Axe DevTools browser extension, Lighthouse accessibility audit. Automated Axe scans (e.g., using `jest-axe` for component tests, or Playwright Axe integration for E2E tests) MUST be integrated into the CI pipeline and fail the build on new violations of WCAG AA. Manual testing procedures: keyboard-only navigation, screen reader testing.

## Performance Considerations

Frontend-specific performance optimization strategies:

- **Image Optimization:** All images MUST use `<Image>` component from Next.js. SVGs for icons. WebP format preferred.

- **Code Splitting & Lazy Loading:** Next.js handles route-based code splitting automatically. Dynamic imports `import()` MUST be used for component-level lazy loading.

- **Minimizing Re-renders:** `React.memo` MUST be used for frequently rendering components with same props. Selectors for global state MUST be memoized. Avoid passing new object/array literals or inline functions as props directly in render methods.

- **Debouncing/Throttling:** Use a utility like `lodash.debounce` or `lodash.throttle` for search input or window resize.

- **Virtualization:** MUST be used for any list rendering more than 100 items if performance degradation is observed.

- **Caching Strategies (Client-Side):** Configure service worker (if PWA) to cache application shell and key static assets. Leverage HTTP caching headers.

- **Performance Monitoring Tools:** Lighthouse, WebPageTest, browser DevTools performance tab.

## Internationalization (i18n) and Localization (l10n) Strategy

Internationalization is not a requirement for this project at this time.

## Feature Flag Management

Feature flags are not a primary architectural concern for this project at this time.

## Frontend Security Considerations

Mandatory frontend-specific security practices, complementing the main Architecture Document.

- **Cross-Site Scripting (XSS) Prevention:** React's JSX auto-escaping MUST be relied upon.

- **Cross-Site Request Forgery (CSRF) Protection:** Backend uses synchronizer token pattern. Frontend ensures tokens are included in state-changing requests if not handled automatically by HTTP client or forms.

- **Secure Token Storage & Handling:** In-memory via state management (e.g., Zustand store, cleared on tab close). `localStorage` is **STRONGLY DISCOURAGED for token storage**.

- **Third-Party Script Security:** All third-party scripts MUST be vetted, loaded asynchronously. Subresource Integrity (SRI) hashes MUST be used.

- **Client-Side Data Validation:** For UX improvement ONLY. **All critical data validation MUST occur server-side.**

- **Preventing Clickjacking:** Primary defense is `X-Frame-Options` or `frame-ancestors` CSP directive, set by backend/CDN.

- **API Key Exposure:** API keys for client-side services (e.g., Google Maps) MUST be restricted. For sensitive keys, a backend proxy endpoint MUST be created.

- **Secure Communication (HTTPS):** All communication with backend APIs MUST use HTTPS.

- **Dependency Vulnerabilities:** Run `npm audit --audit-level=high` in CI. High/critical vulnerabilities MUST be addressed.

## Browser Support and Progressive Enhancement

- **Target Browsers:** Latest 2 stable versions of Chrome, Firefox, Safari, Edge. Internet Explorer (any version) is NOT supported.

- **Polyfill Strategy:** Use `core-js@3` imported at the application entry point. Babel `preset-env` configured with browser targets.

- **JavaScript Requirement & Progressive Enhancement:** Core application functionality REQUIRES JavaScript enabled.

- **CSS Compatibility & Fallbacks:** Use Autoprefixer (via PostCSS) configured with target browser list.

## Change Log

| Change        | Date       | Version | Description                                                                | Author              |
| :------------ | :--------- | :------ | :------------------------------------------------------------------------- | :------------------ |
| Initial Draft | 2025-07-30 | 1.0     | Initial Frontend Architecture Document based on PRD and Main Architecture. | Phoenix "Prism" Kim |
