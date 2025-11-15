import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ==========================
// Async Thunks for Activities
// ==========================

/**
 * Fetch all activities for a specific lead.
 * @param {string} leadId - The ID of the lead whose activities are to be fetched.
 */
export const fetchActivitiesForLead = createAsyncThunk(
  "activity/fetchActivities",
  async (leadId, { getState, rejectWithValue }) => {
    try {
      // Get the auth token from state for authorization
      const { token } = getState().auth;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      // Make GET request to fetch activities for the given lead
      const response = await axios.get(
        `https://pulsecrm.onrender.com/api/activities/${leadId}`,
        config
      );
      return response.data;
    } catch (error) {
      // Return error payload if request fails
      return rejectWithValue(error.response.data);
    }
  }
);

/**
 * Create a new activity (note, call, meeting) for a lead.
 * @param {Object} activityData - The data for the new activity (content, type, leadId).
 */
export const createActivity = createAsyncThunk(
  "activity/createActivity",
  async (activityData, { getState, rejectWithValue }) => {
    try {
      // Get the auth token from state for authorization
      const { token } = getState().auth;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      // Make POST request to create a new activity
      const response = await axios.post(
        "https://pulsecrm.onrender.com/api/activities",
        activityData,
        config
      );
      return response.data; // Returns the new activity with user info
    } catch (error) {
      // Return error payload if request fails
      return rejectWithValue(error.response.data);
    }
  }
);

// ==========================
// Initial State
// ==========================
const initialState = {
  activities: [], // List of activities for the selected lead
  status: "idle", // Status of async operations: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null, // Error message, if any
};

// ==========================
// Activity Slice
// ==========================
const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    /**
     * Clear all activities and reset status.
     */
    clearActivities: (state) => {
      state.activities = [];
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchActivitiesForLead lifecycle
      .addCase(fetchActivitiesForLead.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchActivitiesForLead.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.activities = action.payload;
      })
      .addCase(fetchActivitiesForLead.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      })

      // Handle createActivity lifecycle
      .addCase(createActivity.fulfilled, (state, action) => {
        // Add the new activity to the top of the list
        state.activities.unshift(action.payload);
      })
      .addCase(createActivity.rejected, (state, action) => {
        // Handle error when creating activity
        state.error = action.payload.message;
      });
  },
});

// ==========================
// Exports
// ==========================

// Action to clear all activities
export const { clearActivities } = activitySlice.actions;

// Activity reducer for the store
export default activitySlice.reducer;

// ==========================
// Selectors
// ==========================

/**
 * Selector to get all activities from the state.
 */
export const selectAllActivities = (state) => state.activity.activities;

/**
 * Selector to get the status of activity operations.
 */
export const selectActivityStatus = (state) => state.activity.status;
