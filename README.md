# CommApp

A small full-stack communication app: chat rooms/messages, user management, and
document upload & sharing. Built as a learning/casual project.

- **Frontend** — React (Vite SPA), state-driven navigation (no router)
- **Backend** — NestJS REST API
- **Database** — PostgreSQL (TypeORM migrations + seed data)
- **Orchestration** — Docker Compose (db + backend + frontend)

---

## TL;DR — Quick start

### Run the project on a new device (Docker)

From the `comm-app/` directory:

```bash
docker compose up --build -d  # build & start entire project
```

Then open **http://localhost:8080** in your browser.

To stop:

```bash
docker compose down           # add -v to also wipe the database volume
```

### Start development (local, without Docker)

Install dependencies in both apps:

```bash
cd comm-app-backend && npm i
cd ../comm-app-frontend && npm i
```

Then run each app (in separate terminals):

```bash
# terminal 1 — backend (needs Postgres running; e.g. `docker compose up db`)
cd comm-app-backend && npm run start:dev      # http://localhost:3000/api

# terminal 2 — frontend
cd comm-app-frontend && npm run dev           # http://localhost:5173
```

> More detail in [Quick start — Docker Compose](#quick-start--docker-compose-recommended)
> and [Local development](#local-development-without-docker) below.

---

## Tech stack & versions

| Layer            | Technology      | Version                         |
| ---------------- | --------------- | ------------------------------- |
| Runtime          | Node.js         | **20 LTS** (Docker uses `node:20-alpine`) |
| Package manager  | npm             | 10+ (ships with Node 20)        |
| Backend framework| NestJS          | **11** (`@nestjs/*` ^11.0.1)    |
| ORM              | TypeORM         | via `@nestjs/typeorm` ^11.0.2   |
| Language (BE)    | TypeScript      | **5.7.3**                       |
| Database         | PostgreSQL      | **16** (`postgres:16-alpine`)   |
| DB driver        | pg              | ^8.21.0                         |
| Frontend lib     | React           | **19.2**                        |
| Build tool       | Vite            | **8**                           |
| Web server (prod FE) | nginx       | `nginx:alpine`                  |
| Containers       | Docker Engine   | **24+** with Compose **v2**     |

> The Dockerfiles pin Node 20. If running locally without Docker, use **Node 20 LTS**
> to match (Node 22 LTS also works).

---

## Project structure

```
comm-app/
├── docker-compose.yml          # db + backend + frontend
├── .env                        # shared env (DB creds + service ports)
├── .env.example
├── comm-app-backend/           # NestJS API
│   ├── src/
│   │   ├── auth/  users/  chat/  documents/
│   │   ├── migrations/         # InitSchema + SeedInitialData
│   │   ├── data-source.ts      # TypeORM CLI datasource
│   │   └── main.ts             # global prefix /api, CORS, validation
│   └── Dockerfile
└── comm-app-frontend/          # React + Vite SPA
    ├── src/
    ├── nginx.conf              # SPA fallback + /api proxy to backend
    ├── vite.config.js          # dev proxy /api -> localhost:3000
    └── Dockerfile
```

---

## Prerequisites

- **Docker** 24+ and **Docker Compose v2** — for the containerized run (recommended)

For local (non-Docker) development you additionally need:

- **Node.js 20 LTS** + npm
- **PostgreSQL 16** running locally (or use the `db` container only)

---

## Environment variables

Defined in [`.env`](.env) at the project root (copy from [`.env.example`](.env.example)):

```env
# Postgres
DB_USER=commapp
DB_PASSWORD=commapp
DB_NAME=commapp
DB_PORT=5432

# Service ports
BACKEND_PORT=3000
FRONTEND_PORT=8080
```

The backend also reads `DB_HOST` (set to `db` inside Docker, defaults to `localhost`
locally) and `PORT` (defaults to `3000`).

---

## Quick start — Docker Compose (recommended)

From the `comm-app/` directory:

```bash
# 1. create the env file
cp .env.example .env

# 2. build & start everything (db, backend, frontend)
docker compose up --build
```

Then open:

- **Frontend:** http://localhost:8080
- **Backend API:** http://localhost:3000/api
- **Postgres:** localhost:5432 (user/pass/db = `commapp`)

The backend runs **migrations automatically on startup** (`migrationsRun: true`),
which creates the schema **and seeds initial data** — no manual DB setup needed.

Stop and remove containers:

```bash
docker compose down          # keep data
docker compose down -v       # also wipe the Postgres volume
```

### Demo login

The seed data includes a sample user (the login form is pre-filled):

```
email:    anne.hunter@mail.com
password: password
```

---

## Local development (without Docker)

### 1. Start PostgreSQL

Either run the DB container alone:

```bash
docker compose up db
```

...or point the backend at your own local PostgreSQL 16 instance with the same
credentials as `.env`.

### 2. Backend (NestJS)

```bash
cd comm-app-backend
npm install
npm run start:dev        # watch mode on http://localhost:3000/api
```

Migrations run automatically on boot. To manage them manually:

```bash
npm run migration:run        # apply migrations
npm run migration:revert     # roll back the last migration
```

### 3. Frontend (React + Vite)

```bash
cd comm-app-frontend
npm install
npm run dev              # http://localhost:5173
```

In dev, Vite proxies `/api` → `http://localhost:3000` (see `vite.config.js`), so
no extra config is needed when the backend is on port 3000.

---

## API overview

All routes are prefixed with **`/api`** (set via `app.setGlobalPrefix('api')`).
**27 endpoints** total:

| Group     | Endpoints |
| --------- | --------- |
| Auth      | `POST /auth/login`, `POST /auth/register` |
| Users     | `POST /users`, `GET /users`, `GET /users/:id`, `PATCH /users/:id`, `DELETE /users/:id` |
| Documents | `POST /documents`, `GET /documents`, `GET /documents/shared-with/:userId`, `GET /documents/:id`, `PATCH /documents/:id`, `DELETE /documents/:id`, `GET /documents/:id/shares`, `POST /documents/:id/shares`, `DELETE /documents/:id/shares/:userId` |
| Chat      | `POST /chat/rooms`, `GET /chat/rooms`, `GET /chat/rooms/:id`, `PATCH /chat/rooms/:id`, `DELETE /chat/rooms/:id`, `POST /chat/rooms/:roomId/messages`, `GET /chat/rooms/:roomId/messages`, `GET /chat/messages/:id`, `PATCH /chat/messages/:id`, `DELETE /chat/messages/:id` |
| Health    | `GET /` |

---

## Inspecting the database

Exec into the Postgres container and open `psql`:

```bash
docker exec -it commapp-db psql -U commapp -d commapp
```

Useful psql commands:

```
\dt          list tables
\d users     describe a table
\l           list databases
\q           quit
```

Or run a one-off query without an interactive shell:

```bash
docker exec commapp-db psql -U commapp -d commapp -c "SELECT * FROM users;"
```

---

## Useful scripts

### Backend (`comm-app-backend`)

| Command                  | Description                       |
| ------------------------ | --------------------------------- |
| `npm run start:dev`      | Dev server with watch             |
| `npm run build`          | Compile to `dist/`                |
| `npm run start:prod`     | Run compiled build                |
| `npm run lint`           | ESLint (with `--fix`)             |
| `npm test`               | Jest unit tests                   |
| `npm run migration:run`  | Apply DB migrations               |

### Frontend (`comm-app-frontend`)

| Command            | Description                  |
| ------------------ | ---------------------------- |
| `npm run dev`      | Vite dev server              |
| `npm run build`    | Production build to `dist/`  |
| `npm run preview`  | Preview the production build |
| `npm run lint`     | ESLint                       |

---

## Notes

- This is a casual project. Auth is **not token-based** — login returns a user
  object and the frontend persists it in `localStorage` (`commapp.currentUser`) so
  a page refresh doesn't log you out. This is a UI-only workaround; API requests
  are not authenticated.
- Document "uploads" use a placeholder storage key — there is no real file storage
  backend yet.
