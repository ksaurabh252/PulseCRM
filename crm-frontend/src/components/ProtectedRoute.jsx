import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectCurrentToken } from "../features/auth/authSlice";

// ProtectedRoute component to restrict access to authenticated users only
const ProtectedRoute = ({ children }) => {
  // Get the authentication token from the Redux store
  const token = useSelector(selectCurrentToken);

  // If there is no token, redirect the user to the login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If the token exists, render the requested page (children)
  return children;
};

export default ProtectedRoute;
