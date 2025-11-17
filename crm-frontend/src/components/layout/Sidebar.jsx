import { NavLink } from "react-router-dom";
import { GoHome, GoDatabase, GoGear, GoOrganization } from "react-icons/go";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice";
/**
 * Sidebar component for navigation.
 * Displays navigation links and adapts its width and content based on the sidebar's open/closed state.
 *
 * @param {Object} props
 * @param {boolean} props.isSidebarOpen - Determines if the sidebar is expanded or collapsed.
 */
const Sidebar = ({ isSidebarOpen }) => {
  const currentUser = useSelector(selectCurrentUser);
  // Common classes for all navigation links
  const commonClasses =
    "flex items-center w-full px-4 py-3 text-gray-300 transition-colors duration-200 transform rounded-md";
  // Classes for active and inactive navigation links
  const activeClasses = "bg-gray-700 text-white";
  const inactiveClasses = "hover:bg-gray-700 hover:text-white";
  // Classes for link text, controlling visibility based on sidebar state
  const textClasses = `ml-3 transition-opacity duration-200 ${
    isSidebarOpen ? "opacity-100" : "opacity-0 h-0 w-0 overflow-hidden"
  }`;

  return (
    <div
      className={`flex h-screen flex-col bg-gray-900 text-white transition-all duration-300 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Sidebar header with logo or app name */}
      <div className="flex h-20 items-center justify-center border-b border-gray-700">
        {/* Uncomment and use your logo if needed */}
        {/* <img src={Logo} alt="Logo" className="h-10 w-auto" /> */}
        {/* Show full app name if sidebar is open, else show short version */}
        <span
          className={`text-2xl font-bold ${
            isSidebarOpen ? "opacity-100" : "opacity-0 w-0 h-0 overflow-hidden"
          }`}
        >
          NextGen CRM
        </span>
        {!isSidebarOpen && <span className="text-2xl font-bold">N.</span>}
      </div>

      {/* Navigation links */}
      <nav className="flex-1 space-y-2 px-4 py-6">
        {/* Dashboard link */}
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${commonClasses} ${isActive ? activeClasses : inactiveClasses}`
          }
        >
          <GoHome className="h-6 w-6 flex-shrink-0 cursor-pointer" />
          <span className={textClasses}>Dashboard</span>
        </NavLink>

        {/* Leads link */}
        <NavLink
          to="/leads"
          className={({ isActive }) =>
            `${commonClasses} ${isActive ? activeClasses : inactiveClasses}`
          }
        >
          <GoDatabase className="h-6 w-6 flex-shrink-0" />
          <span className={textClasses}>Leads</span>
        </NavLink>

        {/*
            User Management link 
            Only visible to users with the ADMIN or MANAGER role.
        */}
        {currentUser &&
          (currentUser.role === "ADMIN" || currentUser.role === "MANAGER") && (
            <NavLink
              to="/users"
              className={({ isActive }) =>
                `${commonClasses} ${isActive ? activeClasses : inactiveClasses}`
              }
            >
              <GoOrganization className="h-6 w-6 flex-shrink-0" />
              <span className={textClasses}>User Management</span>
            </NavLink>
          )}

        {/* Settings link */}
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `${commonClasses} ${isActive ? activeClasses : inactiveClasses}`
          }
        >
          <GoGear className="h-6 w-6 flex-shrink-0" />
          <span className={textClasses}>Settings</span>
        </NavLink>
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-700 p-4">
        <p className="text-sm text-gray-400">© 2025 Masters' Union</p>
      </div>
    </div>
  );
};

export default Sidebar;
