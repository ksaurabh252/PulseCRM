import { createSlice } from "@reduxjs/toolkit";

let user = null;
const userJSON = localStorage.getItem("user");

// Check if data exists and is not the string "undefined"
if (userJSON && userJSON !== "undefined") {
  try {
    user = JSON.parse(userJSON); // Parse the user JSON string
  } catch (e) {
    // If parsing fails, log the error and remove the corrupted data
    console.error("Failed to parse user from localStorage", e);
    localStorage.removeItem("user");
  }
}
const token = localStorage.getItem("token");

// 2. Set the initial state using data from localStorage (if available)
const initialState = {
  user: user,
  token: token ? token : null,
};

// 3. Create the auth slice using Redux Toolkit
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action 1: When the user logs in, set credentials
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;

      // 4. Save user and token to localStorage for persistence
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    },
    // Action 2: When the user logs out, clear credentials
    logOut: (state) => {
      state.user = null;
      state.token = null;

      // 5. Remove user and token from localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

// Export the actions for use in components
export const { setCredentials, logOut } = authSlice.actions;

// Export the reducer to be used in the store
export default authSlice.reducer;

// Selector to get the current user from the state
export const selectCurrentUser = (state) => state.auth.user;
// Selector to get the current token from the state
export const selectCurrentToken = (state) => state.auth.token;
