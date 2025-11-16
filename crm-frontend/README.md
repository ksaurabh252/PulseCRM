# PulseCRM - Frontend

This is the client-side application for the Next-Gen CRM platform. It is built using React, Redux Toolkit, and Tailwind CSS.

[![React Version](https://img.shields.io/badge/react-18.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/vite-^5.0.0-646CFF?logo=vite)](https://vitejs.dev/)
[![Redux Toolkit](https://img.shields.io/badge/redux-toolkit-764ABC?logo=redux)](https://redux-toolkit.js.org/)
[![Tailwind CSS](https://img.shields.io/badge/tailwind-3.4.1-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

This is the official frontend for the **Next-Gen CRM**, a powerful, real-time sales management tool built with React, Redux Toolkit, and Tailwind CSS.

This application is designed to work with the **Next-Gen CRM Backend**.

## ✨ Features

- **🔐 Authentication:** Secure JWT (Access Token) based login and registration.
- **🔄 Persistent Login:** User sessions are persisted using `localStorage`.
- **🛡️ Protected Routes:** Client-side routing that protects app-only pages from unauthenticated users.
- **📊 Real-time Dashboard:** Key statistics with Recharts.
- **👥 Lead Management:** Full CRUD functionality.
- **⏱️ Activity Timeline:** Notes, calls, meetings.
- **🔔 Real-time Notifications:** Socket.io based.
- **📱 Responsive UI:** Tailwind CSS.

## 🚀 Tech Stack

- **Core:** React 18, React Router v6
- **Build Tool:** Vite
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS
- **Data Fetching:** Axios
- **Charts:** Recharts
- **Real-time:** Socket.io-client

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn
- Backend running

### Installation

```bash
git clone https://github.com/ksaurabh252/PulseCRM/tree/main/crm-frontend

cd crm-frontend
npm install
```

### Environment

Create `.env`:

```env
VITE_API_URL=http://localhost:5001/api
```

### Run Dev Server

```bash
npm run dev
```

App runs at: `http://localhost:5173`
