import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

// Thunk: Fetch all users from the API
export const fetchUsers = createAsyncThunk(
  "users/fetchAll",
  async (_, { getState, rejectWithValue }) => {
    try {
      // Get the authentication token from the Redux state
      const { token } = getState().auth;
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      // Make a GET request to fetch users
      const response = await axios.get(`${API_URL}/users`, config);
      return response.data;
    } catch (error) {
      // If there's an error, return the error message
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk: Reset a user's password
export const resetUserPassword = createAsyncThunk(
  "users/resetPassword",
  async (userId, { getState, rejectWithValue }) => {
    try {
      // Get the authentication token from the Redux state
      const { token } = getState().auth;
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      // Make a POST request to reset the user's password (no body needed)
      const response = await axios.post(
        `${API_URL}/users/${userId}/reset-password`,
        {}, // Empty body
        config
      );
      // The response will contain { message, temporaryPassword }
      return response.data;
    } catch (error) {
      // If there's an error, return the error message
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial state for the user slice
const initialState = {
  users: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Create the user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchUsers actions
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      })
      // Handle resetUserPassword actions (no need to update users list)
      .addCase(resetUserPassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetUserPassword.fulfilled, (state) => {
        state.status = "succeeded";
        // No need to update users list after password reset
      })
      .addCase(resetUserPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      });
  },
});

export default userSlice.reducer;

// Selectors to get users and status from the state
export const selectAllUsers = (state) => state.user.users;
export const selectUserStatus = (state) => state.user.status;
