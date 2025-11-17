# 🚀 PulseCRM (Full Stack Project)

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15.x-336791?logo=postgresql)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.x-2D3748?logo=prisma)](https://www.prisma.io/)
[![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC?logo=redux)](https://redux-toolkit.js.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-4.x-010101?logo=socket.io)](https://socket.io/)

---

Welcome to **Next-Gen CRM**, a complete full‑stack CRM platform engineered for modern sales teams.  
This monorepo contains the **React frontend** and the **Node.js/Express backend**, built to deliver real‑time insights, collaborative workflows, and role‑based user management.

---

## 🔗 Live Demo  
👉 **https://pulse-crm-tau.vercel.app/**  
*(You may create a test account — the demo database resets periodically.)*

---

# ✨ Core Features

- 🔐 **Full-Stack Authentication** — JWT-based secure login & registration  
- 🧑‍🤝‍🧑 **Role-Based Access Control** (Admin, Manager, Sales Executive)  
- 📊 **Analytics Dashboard** — Charts and insights using Recharts  
- 🗂️ **Lead Management** — Full CRUD for leads  
- 🕒 **Activity Timeline** — Notes, calls, meetings with timestamps  
- 🔔 **Real-time Notifications** — Powered by Socket.io  
- 📱 **Responsive Design** — Tailwind-powered UI  

---

# 🧱 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, Redux Toolkit, React Router v6, Tailwind CSS, Axios, Recharts, Socket.io-client |
| **Backend** | Node.js, Express.js, Prisma, PostgreSQL, Socket.io, JWT, bcryptjs |
| **Database** | Supabase (PostgreSQL) |

---

# 📂 Project Structure

```
/
├── 📄 README.md        (➡️ Main documentation)
│
├── 📁 backend/          (Node.js API Server)
│   ├── prisma/          (Schema & migrations)
│   ├── src/             (Controllers, routes, middleware)
│   └── README.md        (Backend docs)
│
└── 📁 frontend/         (React client)
    ├── src/             (Components, pages, Redux state)
    └── README.md        (Frontend docs)
```

---

# 🛠️ Getting Started

To run the entire CRM locally, start with:

---

## 1️⃣ Backend Setup (Run First)

Backend powers authentication, database, and socket events.  
📘 **Backend Guide:**  
👉 `./backend/README.md`

---

## 2️⃣ Frontend Setup

Start frontend after backend is running on `http://localhost:5001`.  
📘 **Frontend Guide:**  
👉 `./frontend/README.md`

---

# 🏁 Final Notes

This project was built as part of the **Masters' Union Assessment**, following all required specifications.

Enjoy building with PulseCRM! 🚀
