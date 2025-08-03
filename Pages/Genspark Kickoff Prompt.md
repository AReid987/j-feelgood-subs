---
type: Page
title: Genspark Kickoff Prompt
description: null
icon: null
createdAt: '2025-07-30T20:03:44.322Z'
creationDate: 2025-07-30 15:03
modificationDate: 2025-07-30 15:04
tags: []
coverImage: null
---

```text
**TO: Genspark Super Agent**
**SUBJECT: MVP Build-Out for JFeelgood Subscriptions - Context Engineering Handoff**
**URGENCY: IMMEDIATE - YOLO Mode Project Execution**
Genspark Super Agent, you are being handed the complete context engineering artifacts for the "JFeelgood Subscriptions" MVP. Your mission is to build out the full Minimum Viable Product (MVP) based entirely on the provided documentation. Speed and adherence to these artifacts are paramount.
**Project Overview:**
JFeelgood Subscriptions is a monthly art print subscription service delivering collectible "feelgood" art trading cards for $12/month. The MVP includes a landing page, secure user authentication (sign-up, login), subscription management (update info, cancel), and recurring payment processing via Stripe.
**Your Core Directives:**
1.  **Utilize All Provided Documentation:** You have been provided with a complete set of planning and architectural documents. These documents are your single source of truth and must be leveraged for all design, implementation, and deployment decisions. **DO NOT deviate from the specifications within these documents unless absolutely necessary due to technical impossibility, in which case you must explicitly state the conflict and propose an alternative.**
    * **Prioritize and Reference:** For every major decision or implementation, internally reference and adhere to the relevant sections within the documentation.
    * **Hierarchical Understanding:** Understand that the PRD defines "what," the Architecture Documents define "how" from a technical standpoint, and the Stories break down the "how" into actionable tasks.
2.  **GitHub Repository Creation:**
    * Initialize a new GitHub repository for this project.
    * The repository **MUST** follow the **Monorepo structure** detailed in `docs/architecture.md#project-structure`. This includes dedicated `frontend/`, `backend/`, and `docs/` directories at the root.
    * Ensure proper `.gitignore` files are in place to exclude unnecessary files and sensitive information.
    * Include a comprehensive `README.md` at the project root with setup instructions, project overview, and links to key documentation within the `docs/` folder.
3.  **Frontend Implementation & Deployment (Next.js to Vercel):**
    * The frontend **MUST** be implemented using **Next.js (React/TypeScript)** as specified in `docs/architecture.md#definitive-tech-stack-selections` and `docs/front-end-architecture.md#overall-frontend-philosophy--patterns`.
    * **Deployment:** The Next.js frontend **MUST** be deployed to **Vercel**. Configure Vercel integration with the GitHub repository.
    * **CI/CD:** Set up the necessary GitHub Actions workflows (`.github/workflows/main.yml`) to automate the deployment of the frontend to Vercel on pushes to the `main` branch, as outlined in `docs/architecture.md#infrastructure-and-deployment-overview`.
    * **Styling:** Implement all frontend styling using **Tailwind CSS** as detailed in `docs/front-end-architecture.md#overall-frontend-philosophy--patterns`.
    * **Accessibility & Responsiveness:** Adhere strictly to all Accessibility (AX) Requirements and Responsiveness guidelines specified in `docs/front-end-spec.md`.
4.  **Backend Implementation (FastAPI/Python):**
    * The backend **MUST** be implemented using **FastAPI (Python)** as specified in `docs/architecture.md#definitive-tech-stack-selections`.
    * **Deployment:** The FastAPI backend should be prepared for deployment to **AWS Lambda/ECS (Fargate)**. While direct deployment may not be part of this initial scope for Genspark, ensure the code is containerized (Docker) and structured for easy deployment to AWS, as per `docs/architecture.md#infrastructure-and-deployment-overview`.
    * **Database:** Utilize **PostgreSQL** as the primary database, adhering to the schema definitions in `docs/architecture.md#data-models`.
    * **Stripe Integration:** Implement payment processing and webhook handling via **Stripe SDKs** as detailed in `docs/architecture.md#api-reference` and in the relevant user stories.
5.  **Story-Driven Development:**
    * You have been provided with a series of detailed user stories. You **MUST** implement these stories sequentially, starting with Story 1.2, then 1.1, and so on, as they were provided.
    * For each story, meticulously follow its `Acceptance Criteria (ACs)`, `Tasks / Subtasks`, and `Dev Technical Guidance`. These sections are designed to provide all necessary implementation details.
    * Ensure that all code adheres to the `Coding Standards` and `Overall Testing Strategy` defined in `docs/architecture.md`.
6.  **Security & Error Handling:**
    * Implement all `Security Best Practices` outlined in `docs/architecture.md` on both frontend and backend.
    * Adhere to the `Error Handling Strategy` defined in `docs/architecture.md`.
7.  **Documentation (Internal & Updates):**
    * Maintain internal code documentation (e.g., JSDoc, Python docstrings) as per `docs/architecture.md#coding-standards`.
    * If any minor updates or clarifications become necessary in the `docs/` files during development, you may propose them, but always prioritize completing the MVP.
**Provided Documentation (Full Context):**
(You will provide the Genspark Super Agent with access to these files. For the purpose of this prompt, assume they are accessible in a `docs/` folder relative to the project root, matching the structure outlined in `docs/architecture.md`.)
* `JFeelgood Subscriptions: mini PRD.md`
* `JFeelgood Subscriptions PRD.md`
* `JFeelgood Subscriptions Architecture Document.md`
* `JFeelgood Subscriptions UI/UX Specification.md`
* `JFeelgood Subscriptions Frontend Architecture Document.md`
* `Story 1.2: Initial Project Scaffolding and Infrastructure Setup.md`
* `Story 1.1: Design and Content for JFeelgood Subscriptions Landing Page.md`
* `Story 2.1: Secure User Registration.md`
* `Story 2.2: Secure User Login.md`
* `Story 2.3: Subscriber Management Dashboard.md`
* `Story 3.1: Secure Payment Information Submission.md`
* `Story 3.2: Automated Recurring Payment Processing.md`
* `Story 4.1: Exclusive Bonus Content Access.md`
* `Story 4.2: High-Resolution Digital Art Print Access.md`
* `Story X.X: Learn More / FAQ Page.md`
Begin by acknowledging receipt of this directive and stating your plan to commence MVP development by initializing the GitHub repository and setting up the project structure.
```

