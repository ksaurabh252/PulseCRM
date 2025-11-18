import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";

const Settings = () => {
  // Get current logged-in user data from Redux store
  const user = useSelector(selectCurrentUser);

  return (
    <div>
      {/* Page Header Section */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-gray-600">My Profile & Preferences</p>
      </div>

      {/* Main Settings Card */}
      <div className="rounded-lg bg-white p-8 shadow-md">
        {/* User Profile Header with Avatar and Basic Info */}
        <div className="flex items-center space-x-6">
          {/* User Avatar Circle - Shows first letter of name */}
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 text-2xl font-bold text-indigo-600">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>

          {/* User Details - Name, Email, Role Badge */}
          <div>
            {/* Display user's full name or fallback to "Guest User" */}
            <h2 className="text-2xl font-bold text-gray-900">
              {user?.name || "Guest User"}
            </h2>

            {/* Display user's email address */}
            <p className="text-gray-500">{user?.email}</p>

            {/* Role Badge - Shows user's role (ADMIN/MANAGER/SALES_EXECUTIVE) */}
            <span className="mt-2 inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold leading-5 text-green-800">
              {user?.role || "N/A"}
            </span>
          </div>
        </div>

        {/* Horizontal Divider */}
        <hr className="my-8 border-gray-200" />

        {/* Account Information Grid - Displays user details in read-only fields */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Full Name Field (Read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-500 shadow-sm">
              {user?.name}
            </div>
          </div>

          {/* Email Address Field (Read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-500 shadow-sm">
              {user?.email}
            </div>
          </div>

          {/* User ID Field (Read-only) - Shows database ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              User ID
            </label>
            <div className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-500 shadow-sm">
              {user?.id}
            </div>
          </div>

          {/* Account Type Field (Read-only) - Shows user role */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Account Type
            </label>
            <div className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-500 shadow-sm">
              {user?.role}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
