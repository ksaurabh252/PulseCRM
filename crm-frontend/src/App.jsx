import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout.jsx";

import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Leads from "./pages/Leads.jsx";
import LeadDetail from "./pages/LeadDetail.jsx";
import Register from "./pages/Register.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import UserManagement from "./pages/UserManagement.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route 1: Login Page */}

        <Route path="/login" element={<Login />} />

        {/*Register Page Route */}
        <Route path="/register" element={<Register />} />

        {/* Route 2: Main App (inside AppLayout) */}
        {/* This is the "parent" route using AppLayout */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          {/* Nested routes will render inside <Outlet /> in AppLayout */}

          {/* Default dashboard page ("/") */}
          <Route index element={<Dashboard />} />

          {/* Route for the leads list page */}
          <Route path="leads" element={<Leads />} />

          {/* Dynamic route for lead details (e.g., /leads/123) */}
          <Route path="leads/:id" element={<LeadDetail />} />
        </Route>

        <Route path="users" element={<UserManagement />}></Route>
        {/* 404 Not Found page for unmatched routes */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
