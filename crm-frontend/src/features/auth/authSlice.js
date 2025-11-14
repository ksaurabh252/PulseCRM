import { createSlice } from "@reduxjs/toolkit";

// Helper function to safely parse user JSON from localStorage
const getInitialUser = () => {
  try {
    const userJSON = localStorage.getItem("user");
    // Check if data exists, is not the string "undefined", and is not "null"
    if (userJSON && userJSON !== "undefined" && userJSON !== "null") {
      return JSON.parse(userJSON); // Parse and return the user object
    }
  } catch (e) {
    // If parsing fails, log the error and remove the corrupted data
    console.error("Failed to parse user from localStorage", e);
    localStorage.removeItem("user");
  }
  return null; // Return null if anything goes wrong
};

// Helper function to safely get token from localStorage
const getInitialToken = () => {
  const token = localStorage.getItem("token");
  // Check if token exists and is not the string "null" or "undefined"
  if (token && token !== "null" && token !== "undefined") {
    return token;
  }
  return null;
};

// Get initial user and token values from localStorage
const user = getInitialUser();
const token = getInitialToken();

// Set the initial state using data from localStorage (if available)
const initialState = {
  user: user,
  token: token ? token : null,
};

// Create the auth slice using Redux Toolkit
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action: When the user logs in, set credentials
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;

      // Save user and token to localStorage for persistence
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    },
    // Action: When the user logs out, clear credentials
    logOut: (state) => {
      state.user = null;
      state.token = null;

      // Remove user and token from localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

// Export the actions for use in components
export const { setCredentials, logOut } = authSlice.actions;

// Export the reducer to be used in the Redux store
export default authSlice.reducer;

// Selector to get the current user from the state
export const selectCurrentUser = (state) => state.auth.user;
// Selector to get the current token from the state
export const selectCurrentToken = (state) => state.auth.token;
