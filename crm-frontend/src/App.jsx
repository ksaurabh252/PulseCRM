import { BrowserRouter, Routes, Route } from "react-router-dom";

// Main layout for the app
import AppLayout from "./components/layout/AppLayout.jsx";

// Page components
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Leads from "./pages/Leads.jsx";
import LeadDetail from "./pages/LeadDetail.jsx"; // Import the lead detail page

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route 1: Login Page */}
        {/* This route is outside the main layout */}
        <Route path="/login" element={<Login />} />

        {/* Route 2: Main App (inside AppLayout) */}
        {/* This is the "parent" route using AppLayout */}
        <Route path="/" element={<AppLayout />}>
          {/* Nested routes will render inside <Outlet /> in AppLayout */}

          {/* index means this is the default page for "/" */}
          <Route index element={<Dashboard />} />
          {/* Route for the leads list page */}
          <Route path="leads" element={<Leads />} />

          {/* Dynamic route for lead details (e.g., /leads/123) */}
          <Route path="leads/:id" element={<LeadDetail />} />

          {/* You can add more pages here as needed */}
          {/* <Route path="users" element={<Users />} /> */}
          {/* <Route path="settings" element={<Settings />} /> */}
        </Route>

        {/* 404 Not Found page for unmatched routes */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
