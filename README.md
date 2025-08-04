# J Feelgood Subscriptions

![Alt](https://repobeats.axiom.co/api/embed/c778984a3d8850076e7ec378e1e651dd82deaa75.svg "Repobeats analytics image")

## Project Overview

This project is the Minimum Viable Product (MVP) for J Feelgood Subscriptions, a monthly art print trading card subscription service. The MVP includes a landing page, user authentication, subscription management, and recurring payment processing via Stripe.

The project is structured as a monorepo containing a Next.js frontend, a FastAPI backend, and a `docs` directory for project documentation.

## Features

*   **Landing Page:** Informative page introducing the service.
*   **User Authentication:** Secure registration and login for users.
*   **Subscription Management Dashboard:** Allows subscribers to view their details and manage their subscription.
*   **Subscription (Stripe Integration):** Secure payment information submission and handling of recurring payments via Stripe.
*   **Exclusive Bonus Content:** Access to subscriber-only content.
*   **High-Resolution Digital Art Prints:** Downloadable digital copies of monthly art prints for subscribers.
*   **Learn More / FAQ Page:** Provides detailed information and answers to frequently asked questions.

## Getting Started

### Prerequisites

*   Node.js and npm/yarn/pnpm (for the frontend)
*   Python 3.11+ and PDM (for the backend)
*   PostgreSQL database
*   Stripe account (for testing payments and webhooks)
*   Cloud object storage (e.g., AWS S3) for digital prints (for production)

### Installation

Detailed setup instructions for both the frontend and backend can be found in the documentation.

1.  Clone the repository: `git clone [repository URL]`
2.  Navigate to the project directory: `cd jfeelgood-subscriptions`
3.  Refer to the documentation in the `docs/` folder for specific setup steps for the frontend and backend, including dependencies, environment variables, and database configuration.

### Running the Project

Detailed instructions for running both the frontend and backend are available in the documentation. Typically, you will run the frontend and backend development servers in separate terminals.

## Project Structure

This project follows a monorepo structure with the following main directories:

*   `frontend/`: Contains the Next.js application.
*   `backend/`: Contains the FastAPI application.
*   `docs/`: Contains all project documentation.

## Technologies Used

*   **Frontend:** Next.js, React, TypeScript, Tailwind CSS, Zustand, Axios
*   **Backend:** FastAPI, Python, SQLModel, PostgreSQL, PDM, Uvicorn, Bcrypt, Python-Jose, Passlib, Stripe Python SDK
*   **Database:** PostgreSQL
*   **Payment Processing:** Stripe

## Contributing

Contribution guidelines will be added here.

## License

License information will be added here.
# JFeelgood Subscriptions

## Project Overview

This project is the Minimum Viable Product (MVP) for JFeelgood Subscriptions, a monthly art print trading card subscription service. The MVP includes a landing page, user authentication, subscription management, and recurring payment processing via Stripe.

The project is structured as a monorepo containing a Next.js frontend, a FastAPI backend, and a `docs` directory for project documentation.

## Setup Instructions

Detailed setup instructions for both the frontend and backend can be found in the documentation.

1.  Clone the repository: `git clone [repository URL]`
2.  Navigate to the project directory: `cd jfeelgood-subscriptions`
3.  Refer to the documentation in the `docs/` folder for specific setup steps for the frontend and backend, including dependencies, environment variables, and database configuration.

## Documentation

All key project documentation is located within the `docs/` folder:

*   **Project Architecture:** [docs/architecture.md](docs/architecture.md)
*   **Frontend Architecture:** [docs/frontend-architecture.md](docs/frontend-architecture.md)
*   **Frontend Specification (UI/UX, Accessibility, Responsiveness):** [docs/front-end-spec.md](docs/front-end-spec.md)
*   **Mini Product Requirements Document (Mini PRD):** [docs/mini-prd.md](docs/mini-prd.md)
*   **Product Requirements Document (PRD):** [docs/prd.md](docs/prd.md)
*   **UI/UX Specification:** [docs/ui-ux-specification.md](docs/ui-ux-specification.md)
*   **User Stories:**
    *   Story 1.1: Design and Content for JFeelgood Subscriptions Landing Page: [docs/story-1-1.md](docs/story-1-1.md)
    *   Story 1.2: Initial Project Scaffolding and Infrastructure Setup: [docs/story-1-2.md](docs/story-1-2.md)
    *   Story 2.1: Secure User Registration: [docs/story-2-1.md](docs/story-2-1.md)
    *   Story 2.2: Secure User Login: [docs/story-2-2.md](docs/story-2-2.md)
    *   Story 2.3: Subscriber Management Dashboard: [docs/story-2-3.md](docs/story-2-3.md)
    *   Story 3.1: Secure Payment Information Submission: [docs/story-3-1.md](docs/story-3-1.md)
    *   Story 3.2: Automated Recurring Payment Processing: [docs/story-3-2.md](docs/story-3-2.md)
    *   Story 4.1: Exclusive Bonus Content Access: [docs/story-4-1.md](docs/story-4-1.md)
    *   Story 4.2: High-Resolution Digital Art Print Access: [docs/story-4-2.md](docs/story-4-2.md)
    *   Story X.X: Learn More / FAQ Page: [docs/story-xx-faq.md](docs/story-xx-faq.md)