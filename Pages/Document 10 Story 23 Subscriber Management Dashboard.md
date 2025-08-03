---
type: Page
title: 'Document 10: Story 2.3: Subscriber Management Dashboard'
description: null
icon: null
createdAt: '2025-07-30T19:49:36.536Z'
creationDate: 2025-07-30 14:49
modificationDate: 2025-07-30 14:50
tags: []
coverImage: null
---

## Document 10: Story 2.3: Subscriber Management Dashboard

```text
# Story 2.3: Subscriber Management Dashboard
## Status: Draft
## Story
* As a subscriber,
* I want to manage my subscription details,
* so that I can update my information or cancel my subscription.
## Acceptance Criteria (ACs)
* A dashboard or section is available where users can view their current subscription status.
* Users can update their personal information (e.g., email, shipping address) through the dashboard.
* Users can initiate cancellation of their subscription through a clear and accessible option.
* The dashboard displays the user's current art print (if applicable from other features not yet defined) or next expected print.
* The frontend uses authenticated API endpoints (`GET /api/v1/users/me`, `POST /api/v1/subscriptions/cancel`) to fetch and update subscription details.
* Any changes to personal information or subscription status are reflected in the backend database.
* Appropriate confirmation messages are displayed for successful updates or cancellations.
* Error messages are displayed for failed update or cancellation attempts.
## Tasks / Subtasks
* [ ] Task 2.3.1: Create the Subscription Management Dashboard page/component (`frontend/src/app/dashboard/page.tsx`). (AC: 1)
* [ ] Task 2.3.2: Implement logic to fetch the current user's subscription status and profile information on dashboard load. (AC: 1, 5)
    * [ ] Subtask 2.3.2.1: Implement frontend service function to call `GET /api/v1/users/me`.
    * [ ] Subtask 2.3.2.2: Implement the `GET /api/v1/users/me` endpoint in the backend (`backend/src/api/users.py`).
* [ ] Task 2.3.3: Design and implement the UI for updating user personal information (e.g., email, shipping address). (AC: 2)
    * [ ] Subtask 2.3.3.1: Implement frontend form for profile updates.
    * [ ] Subtask 2.3.3.2: Implement API endpoint for updating user profile (e.g., `PUT /api/v1/users/me`).
* [ ] Task 2.3.4: Implement the subscription cancellation UI and logic. (AC: 3)
    * [ ] Subtask 2.3.4.1: Create a confirmation dialog for cancellation.
    * [ ] Subtask 2.3.4.2: Implement frontend service function to call `POST /api/v1/subscriptions/cancel`.
    * [ ] Subtask 2.3.4.3: Implement the `POST /api/v1/subscriptions/cancel` endpoint in the backend (`backend/src/api/subscriptions.py`).
        * [ ] Subtask 2.3.4.3.1: Update `Subscription` status in the database.
        * [ ] Subtask 2.3.4.3.2: Potentially call Stripe API to cancel the subscription on their end (though this might be a separate background task or webhook listener, for MVP we can simulate synchronous).
* [ ] Task 2.3.5: Display confirmation messages for successful actions. (AC: 7)
* [ ] Task 2.3.6: Implement error handling for update/cancellation failures. (AC: 8)
## Dev Technical Guidance
* **Frontend UI:** Utilize Next.js App Router for the dashboard page. Components within the dashboard should follow the guidelines in `docs/front-end-architecture.md#component-breakdown--implementation-details`.
* **API Interaction:** Ensure all dashboard API calls are authenticated using the JWT token stored from Story 2.2. Implement error handling for API responses as per `docs/front-end-architecture.md#api-interaction-layer`.
* **State Management:** The dashboard will likely require fetching user-specific data. Use `Zustand` store for global user/subscription state that needs to be accessed across the dashboard components, and `useState` for local form state. Refer to `docs/front-end-architecture.md#state-management-in-depth`.
* **Database Operations:** Ensure the backend effectively updates user and subscription records in PostgreSQL as defined in `docs/architecture.md#data-models`.
* **Cancellation Logic:** For MVP, the cancellation might directly update the database and potentially make a call to Stripe. Consider future enhancement for Stripe webhooks to handle asynchronous status updates.
* **Security:** Adhere to all security best practices outlined in `docs/architecture.md#security-best-practices` for handling user data and secure API communication.
## Story Progress Notes
### Agent Model Used: Benjamin "Beacon" Hayes (Product Owner)
### Completion Notes List
* This story introduces the core user dashboard, enabling self-service subscription management.
* It directly leverages the authentication implemented in prior stories.
* Focuses on displaying user-specific data and allowing updates/cancellations.
### Change Log
| Change | Date | Version | Description |
| :----- | :--- | :------ | :---------- |
| Initial Draft | 2025-07-30 | 1.0 | Story for the Subscriber Management Dashboard, including viewing status, updating info, and cancellation. |
```

