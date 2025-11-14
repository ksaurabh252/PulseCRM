// Import configureStore from Redux Toolkit to create the Redux store
import { configureStore } from "@reduxjs/toolkit";

// Import individual reducers for different slices of state
import authReducer from "../features/auth/authSlice";
import leadsReducer from "../features/leads/leadsSlice";
import activityReducer from "../features/activity/activitySlice";

// Configure and create the Redux store
// Combine all reducers into a single root reducer
export const store = configureStore({
  reducer: {
    // Auth slice manages authentication state
    auth: authReducer,
    // Leads slice manages leads data
    leads: leadsReducer,
    // Activity slice manages activities related to leads
    activity: activityReducer,
  },
});
