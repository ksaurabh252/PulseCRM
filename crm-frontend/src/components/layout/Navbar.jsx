import { GoSearch, GoBell } from "react-icons/go";
import { HiMenuAlt2 } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut, selectCurrentUser } from "../../features/auth/authSlice.js";
/**
 * Navbar component for the top navigation bar.
 * Displays a hamburger menu, search bar, notification bell, and user profile.
 *
 * @param {Object} props
 * @param {Function} props.toggleSidebar - Function to toggle the sidebar open/close state.
 */
const Navbar = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  // 4. Logout function
  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  const getInitials = (name) => {
    if (!name || name === "User") return "U";
    const names = name.split(" ");
    if (names.length === 1) return names[0].substring(0, 2).toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  const userName = user ? user.name : "User";
  const userRole = user ? user.role : "Role";

  const initials = getInitials(userName);

  return (
    <header className="flex h-20 w-full items-center justify-between border-b border-gray-200 bg-white px-4">
      {/* Left section: Hamburger menu and search bar */}
      <div className="flex items-center min-w-0">
        {/* Hamburger Button to toggle sidebar */}
        <button
          onClick={toggleSidebar}
          className="mr-4 text-gray-600 hover:text-gray-900"
        >
          <HiMenuAlt2 className="h-6 w-6 cursor-pointer" />
        </button>

        {/* Search Bar */}
        <div className="relative hidden w-full md:block md:max-w-sm lg:max-w-md">
          {/* Search Icon inside input */}
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <GoSearch className="h-5 w-5 text-gray-400" />
          </span>
          <input
            type="text"
            className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="Search for leads, contacts..."
          />
        </div>
      </div>

      {/* Right section: Notification bell and user profile */}
      <div className="flex flex-shrink-0 items-center space-x-3 sm:space-x-6">
        {/* Notification Bell with animated dot */}
        <button className="relative text-gray-500 p-1 hover:text-gray-700">
          <GoBell className="h-6 w-6" />
          {/* Notification Dot (shows unread notifications) */}
          <span className="absolute top-0 right-0 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
          </span>
        </button>

        {/* User Profile: Avatar and user info */}
        <div className="flex items-center space-x-2">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              userName
            )}&background=indigo&color=fff&=${initials}`}
            alt="User Avatar"
          />
          <div className="hidden sm:block">
            <div className="text-sm font-medium text-gray-900">{userName}</div>

            <div className="text-xs text-gray-500">{userRole}</div>

            <button
              onClick={handleLogout}
              className="text-xs text-indigo-600 hover:text-indigo-800 focus:outline-none"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
