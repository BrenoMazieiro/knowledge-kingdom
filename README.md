# The Knowledge Kingdom

An educational gamification platform where learners conquer knowledge through a medieval kingdom metaphor. Built as a full-stack TypeScript monorepo.

## The Concept

Knowledge is organized as a hierarchy:

```
World (The Knowledge Kingdom)
  └── Kingdoms (broad subjects: Math, Computer Science, History...)
        └── Villages (focused areas: Algebra, Data Structures...)
              └── Houses (specific topics: Quadratic Equations, Binary Trees...)
                    ├── Content (videos, PDFs, articles, books)
                    └── Questions (easy / medium / hard)
```

**Players** conquer Houses by studying content and passing tests, earning **Quills** (in-game currency) and badges. With enough Quills, players can create their own Houses, challenge leaders for titles, and build entire Kingdoms. **Backoffice Managers** oversee the platform, approve content, and moderate the community.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js 22, TypeScript (strict) |
| Backend | Apollo Server 4, Express, GraphQL 16, Drizzle ORM |
| Backoffice | React 19, Vite 6, Tailwind CSS v4, shadcn/ui, React Router 7 |
| Database | PostgreSQL 17, Redis 7 |
| Auth | Server-side sessions (Redis) + HttpOnly cookies |
| Validation | Zod (shared schemas between backoffice and backend) |
| Testing | Vitest, React Testing Library, Playwright |
| DevOps | Docker, Traefik v3, GitHub Actions |
| Monorepo | pnpm workspaces |

## Getting Started

### Prerequisites

- [Node.js 22+](https://nodejs.org/)
- [pnpm 10+](https://pnpm.io/)
- [Docker](https://www.docker.com/)

### Setup

```bash
cp .env.example .env
pnpm install
```

### Development

```bash
docker compose up
```

This starts all services with hot reload:

| Service | URL |
|---------|-----|
| Backoffice | http://app.localhost |
| GraphQL API | http://api.localhost/graphql |
| Traefik Dashboard | http://localhost:8080 |

Once services are healthy, run migrations and seed the database:

```bash
pnpm db:migrate
pnpm db:seed
```

### Production

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

Production images use multi-stage builds, non-root users, health checks, read-only filesystems, and memory limits.

## Scripts

```bash
pnpm dev              # Start all services (Docker)
pnpm test             # Run all unit tests (backend + backoffice)
pnpm test:e2e         # Run Playwright E2E tests
pnpm typecheck        # TypeScript check across all packages
pnpm lint             # ESLint
pnpm format           # Prettier

pnpm db:generate      # Generate Drizzle migrations
pnpm db:migrate       # Run migrations
pnpm db:seed          # Seed BMs, kingdoms, villages, houses, questions
pnpm db:studio        # Open Drizzle Studio (database GUI)
pnpm codegen          # Generate backoffice GraphQL types
```

## Architecture

```
packages/
  shared/     Zod schemas, constants, types (used by both FE & BE)
  backend/    GraphQL API, business logic, database
  backoffice/ React SPA, Apollo Client, shadcn/ui
  e2e/        Playwright end-to-end tests
```

### Backend

Follows a layered architecture with manual dependency injection:

```
Resolver (GraphQL) → Use Case (business logic) → Repository (data access)
```

- **22 Drizzle tables** with soft deletes and optimistic locking
- **18 domain modules** (auth, kingdom, village, house, content, question, user, badge, wallet, leaderboard, conquest, test, houseEntry, houseGroup, leadership, access, moderation, backofficeManager)
- **BM permission guards** (VIEWER / EDITOR / ADMIN) + player auth
- **BullMQ** background tasks (email verification, badge checks)
- **Redis sessions** with HttpOnly cookies (separate for players and BMs)
- **DataLoaders** for batched GraphQL queries

### Frontend

Follows Brad Frost's Atomic Design methodology:

- **Atoms**: shadcn/ui primitives (Button, Input, Dialog, Table, Badge, Select...)
- **Molecules**: PageHeader, StatCard, Breadcrumb, ErrorBoundary, ThemeToggle, EmptyState...
- **Organisms**: Domain-specific tables, dialogs, forms per module
- **Templates**: AuthLayout, MainLayout
- **Pages**: 12 pages (auth, dashboard, CRUD for kingdoms/villages/houses, questions, content, users, BM management, leaderboard, badges)

Forms use react-hook-form + zodResolver with shared Zod schemas. Internationalization via react-i18next (English + Portuguese).

## Testing

```
Backend:   151 tests across 58 files (Vitest)
Frontend:   37 tests across 10 files (Vitest + React Testing Library)
E2E:        37 specs across  4 files (Playwright)
```

Every use case and resolver has unit tests covering happy paths and error propagation.

## User Types & Permissions

### Backoffice Manager (BM)

Invited by existing BMs (first BM created via seed). Three permission levels:

| Level | Capabilities |
|-------|-------------|
| Viewer | Read all data |
| Editor | Read + Create + Update entities |
| Admin | Full access + Delete + Manage BMs |

### Player

Signs up via the frontend app. Can browse content, take tests, earn Quills and badges, create Houses/Villages/Kingdoms, and challenge for leadership titles.

## Progression & Badges

### House Conquest Tiers

| Tier | Score | Quills |
|------|-------|--------|
| Novice | 50%+ | 10 |
| Adept | 75%+ | 25 |
| Maestro | 90%+ | 50 |
| Archon | 100% | 100 |

### Badge Hierarchy

| Scope | Badges | Requirement |
|-------|--------|-------------|
| Village | Pupil → Scribe → Scholar → Sage | Archon in 25% → 50% → 75% → 100% of house slots |
| Kingdom | Pilgrim → Lorekeeper → Provost → Sovereign | Sage in 25% → 50% → 75% → 100% of villages |
| World | Grand Archivist | Sovereign in all kingdoms |

## License

Private project.
