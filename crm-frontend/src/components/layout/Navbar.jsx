import React from "react";
import { GoSearch, GoBell } from "react-icons/go";
import { HiMenuAlt2 } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logOut } from "../../features/auth/authSlice.js";
/**
 * Navbar component for the top navigation bar.
 * Displays a hamburger menu, search bar, notification bell, and user profile.
 *
 * @param {Object} props
 * @param {Function} props.toggleSidebar - Function to toggle the sidebar open/close state.
 */
const Navbar = ({ toggleSidebar }) => {
  // 3. Hooks ko initialize karein
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 4. Logout function banayein
  const handleLogout = () => {
    dispatch(logOut()); // Redux state aur localStorage ko clear karega
    navigate("/login"); // Login page par waapas bhej dega
  };
  return (
    <header className="flex h-20 w-full items-center justify-between border-b border-gray-200 bg-white px-6">
      {/* Left section: Hamburger menu and search bar */}
      <div className="flex items-center">
        {/* Hamburger Button to toggle sidebar */}
        <button
          onClick={toggleSidebar}
          className="mr-4 text-gray-600 hover:text-gray-900"
        >
          <HiMenuAlt2 className="h-6 w-6 cursor-pointer" />
        </button>

        {/* Search Bar */}
        <div className="relative">
          {/* Search Icon inside input */}
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <GoSearch className="h-5 w-5 text-gray-400" />
          </span>
          <input
            type="text"
            className="w-96 rounded-md border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="Search for leads, contacts..."
          />
        </div>
      </div>

      {/* Right section: Notification bell and user profile */}
      <div className="flex items-center space-x-6">
        {/* Notification Bell with animated dot */}
        <button className="relative text-gray-500 hover:text-gray-700">
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
            src="https://ui-avatars.com/api/?name=Admin+User&background=indigo&color=fff"
            alt="User Avatar"
          />
          <div>
            <div className="text-sm font-medium text-gray-900">Admin User</div>
            <div className="text-xs text-gray-500">Admin</div>
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
