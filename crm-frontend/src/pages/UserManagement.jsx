import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  resetUserPassword,
  selectAllUsers,
  selectUserStatus,
} from "../features/user/userSlice";
import { selectCurrentUser } from "../features/auth/authSlice";
import { GoKey } from "react-icons/go";

const UserManagement = () => {
  const dispatch = useDispatch();
  // Get the list of all users from Redux state
  const users = useSelector(selectAllUsers);
  // Get the current status of user-related async actions
  const status = useSelector(selectUserStatus);
  // Get the currently logged-in user
  const currentUser = useSelector(selectCurrentUser);

  // Fetch users when the page loads (only for Admin/Manager)
  useEffect(() => {
    // This is a client-side check; real security should be enforced on the backend
    if (
      currentUser &&
      (currentUser.role === "ADMIN" || currentUser.role === "MANAGER")
    ) {
      dispatch(fetchUsers());
    }
  }, [dispatch, currentUser]);

  // Handle the password reset button click
  const handleResetPassword = async (userId) => {
    // Double-check with the user before resetting the password
    if (
      window.confirm(
        "Are you sure you want to reset this user's password? A new temporary password will be generated."
      )
    ) {
      try {
        // Dispatch the thunk to reset the user's password via API
        const result = await dispatch(resetUserPassword(userId)).unwrap();
        // On success, show the new temporary password in an alert
        alert(
          `Password Reset!\n\nThe new temporary password is: ${result.temporaryPassword}\n\nPlease share this with the user.`
        );
      } catch (err) {
        // Show error message if password reset fails
        alert(`Error: ${err.message || "Failed to reset password."}`);
      }
    }
  };

  // If the user is a SALES_EXECUTIVE, deny access to this page
  if (currentUser && currentUser.role === "SALES_EXECUTIVE") {
    return (
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
        <p className="mt-2 text-gray-600">
          You do not have permission to view this page.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="mt-2 text-gray-600">
            Manage all users in the system and reset their passwords.
          </p>
        </div>
      </div>

      {/* Show loading message while users are being fetched */}
      {status === "loading" && <p>Loading users...</p>}

      {/* Show users table when users are successfully fetched */}
      {status === "succeeded" && (
        <div className="overflow-x-auto rounded-lg bg-white shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Role
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Joined On
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {user.name}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {/* Show different badge colors for different roles */}
                    <span
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        user.role === "ADMIN"
                          ? "bg-red-100 text-red-800"
                          : user.role === "MANAGER"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {/* Format the join date */}
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                    <button
                      onClick={() => handleResetPassword(user.id)}
                      className="flex items-center rounded-md bg-red-600 px-3 py-1 text-sm cursor-pointer text-white shadow-sm hover:bg-red-700"
                      // Disable the button if the user tries to reset their own password
                      disabled={user.id === currentUser.id}
                    >
                      <GoKey className="mr-1 h-4 w-4" />
                      Reset Password
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
