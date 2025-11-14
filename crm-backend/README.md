# Next-Gen CRM - Backend

This is the backend API server for the Next-Gen CRM platform, built with Node.js, Express, and Prisma. It provides authenticated and role‑based access to users, leads, and activities.

## Features

- **Authentication**: `/register` and `/login` with bcryptjs and JWT.
- **Authorization**: Middleware‑based route protection.
- **Role‑Based Access Control**: ADMIN, MANAGER, SALES_EXECUTIVE.
- **Lead Management (CRUD)**: Create, fetch, update leads.
- **Activity Timeline**: Lead activities (notes, calls, etc.).
- **Database**: PostgreSQL with Prisma ORM.

## Tech Stack

Node.js, Express, PostgreSQL, Prisma, JWT, bcryptjs, CORS, Dotenv.

## Setup

1. Clone repo

   ```
   git clone https://github.com/your-username/your-repo.git
   cd your-repo/backend
   ```

2. Install dependencies

   ```
   npm install
   ```

3. Create PostgreSQL database (e.g., `crm_db`).

4. Configure environment

   ```
   cp .env.example .env
   ```

   Fill: `DATABASE_URL`, `JWT_SECRET`, `PORT`.

5. Run migrations

   ```
   npx prisma migrate dev
   ```

6. Start server
   ```
   npm run dev
   ```

Server runs on `http://localhost:5001`.

## API Endpoints

### Auth

- POST `/api/auth/register`
- POST `/api/auth/login`

### Leads (Protected)

- GET `/api/leads`
- POST `/api/leads`
- GET `/api/leads/:id`
- PUT `/api/leads/:id`

### Activities (Protected)

- GET `/api/activities/:leadId`
- POST `/api/activities`

## Prisma Schema (Summary)

- `User` with roles and relations
- `Lead` with status enums
- `Activity` with activity types

# Environment Setup (.env Example)

This file demonstrates how to configure your environment variables for the **Next-Gen CRM Backend**.  
Create a `.env` file in the `/backend` root and add the following values.

---

## 1. PostgreSQL Database Connection URL

**Format:**

```
postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME
```

**Example:**

```
DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/crm_db"
```

> Note: If your password contains special characters (`@ # % ^ &` etc.), make sure it is **URL‑encoded**.

---

## 2. Server Port

The port your backend server should run on:

```
PORT=5001
```

---

## 3. JSON Web Token (JWT) Secret

Use a long, random, and hard‑to‑guess string:

```
JWT_SECRET="your-very-strong-secret-key-that-is-hard-to-guess-123!@#"
```

---

## Final Notes

- Ensure your PostgreSQL server is running before starting the backend.
- Never commit your real `.env` file to Git.
- Rotate your JWT secret if compromised.
