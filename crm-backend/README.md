# PulseCRM - Backend

This is the backend API server for the Next-Gen CRM platform, built with Node.js, Express, PostgreSQL and Prisma.
Includes secure auth, lead management, and real-time notifications.

---

## ✨ Features

- 🔐 **Authentication** with bcryptjs + JWT
- 🛡️ **Authorization** using middleware
- 🏷️ **Role-Based Access Control** (`ADMIN`, `MANAGER`, `SALES_EXECUTIVE`)
- 📋 **Lead Management (CRUD)**
- 🕒 **Activity Timeline** (notes, calls, meetings)
- 🔔 **Real-time Notifications** via Socket.io
- 🗄️ **Database:** PostgreSQL + Prisma ORM

---

## 🚀 Tech Stack

| Category  | Technology             |
| --------- | ---------------------- |
| Core      | Node.js, Express.js    |
| Database  | PostgreSQL, Prisma ORM |
| Auth      | JWT, bcryptjs          |
| Real-time | Socket.io              |
| Utilities | CORS, Dotenv           |

---

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm
- PostgreSQL instance

---

## 📦 Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/ksaurabh252/PulseCRM/tree/main/crm-backend

cd crm-backend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Environment Variables

Create `.env` file:

```env
DATABASE_URL="postgresql://postgres:password@db.example.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:password@db.example.com:5432/postgres?sslmode=require"
PORT=5001
JWT_SECRET="your-very-strong-secret-key"
```

### 4️⃣ Run Prisma Migrations

```bash
npx prisma migrate dev
```

### 5️⃣ Generate Prisma Client

```bash
npx prisma generate
```

### 6️⃣ Start Server

**Development**

```bash
npm run dev
```

**Production**

```bash
npm start
```

Server runs at: **http://localhost:5001**

---

## 📂 API Endpoints

### 🔑 Auth

| Method | Endpoint             | Description   |
| ------ | -------------------- | ------------- |
| POST   | `/api/auth/register` | Register user |
| POST   | `/api/auth/login`    | Login + JWT   |

---

### 🧩 Leads (Protected)

| Method | Endpoint         | Description                  |
| ------ | ---------------- | ---------------------------- |
| GET    | `/api/leads`     | Get all leads                |
| POST   | `/api/leads`     | Create lead                  |
| GET    | `/api/leads/:id` | Get lead by ID               |
| PUT    | `/api/leads/:id` | Update lead                  |
| DELETE | `/api/leads/:id` | Delete lead + its activities |

---

### 🕒 Activities (Protected)

| Method | Endpoint                  | Description               |
| ------ | ------------------------- | ------------------------- |
| GET    | `/api/activities/:leadId` | Get activities for a lead |
| POST   | `/api/activities`         | Create activity           |

---

## 🗃️ Database Schema (ERD)

Defined in `prisma/schema.prisma`:

- **User** → role-based system
- **Lead** → stores customer & status info
- **Activity** → logs all events related to leads

### View in Prisma Studio

```bash
npx prisma studio
```

---
