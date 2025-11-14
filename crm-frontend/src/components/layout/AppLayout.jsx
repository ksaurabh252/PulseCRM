import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useState } from "react";

/**
 * AppLayout component defines the main structure of the application.
 * It includes the sidebar, navbar, and a main content area where child routes are rendered.
 */
const AppLayout = () => {
  // State to control whether the sidebar is open or collapsed
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  /**
   * Toggles the sidebar open/collapsed state.
   */
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar (Left side, fixed) */}
      <Sidebar isSidebarOpen={isSidebarOpen} />

      {/* Main Content Area (Right side, scrolls) */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Navbar (Top bar) */}
        <Navbar toggleSidebar={toggleSidebar} />

        {/* Page Content (Scrollable area) */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
          {/* <Outlet /> renders the matched child route component */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
