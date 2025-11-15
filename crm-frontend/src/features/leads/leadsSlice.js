import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
// ==========================
// Async Thunks for API Calls
// ==========================

/**
 * Fetch all leads from the server.
 * Uses the auth token from state for authorization.
 */
export const fetchLeads = createAsyncThunk(
  "leads/fetchLeads",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.get(
        "https://pulsecrm.onrender.com/api/leads",
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/**
 * Create a new lead on the server.
 * @param {Object} leadData - The data for the new lead.
 */
export const createLead = createAsyncThunk(
  "leads/createLead",
  async (leadData, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.post(
        "https://pulsecrm.onrender.com/api/leads",
        leadData,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/**
 * Fetch a single lead by its ID.
 * @param {string} leadId - The ID of the lead to fetch.
 */
export const fetchLeadById = createAsyncThunk(
  "leads/fetchLeadById",
  async (leadId, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.get(
        `https://pulsecrm.onrender.com/api/leads/${leadId}`,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/**
 * Update an existing lead by its ID.
 * @param {Object} param0 - Contains id and leadData.
 */
export const updateLead = createAsyncThunk(
  "leads/updateLead",
  async ({ id, leadData }, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.put(
        `https://pulsecrm.onrender.com/api/leads/${id}`,
        leadData,
        config
      );
      return response.data; // Returns the updated lead
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ==========================
// Initial State
// ==========================
const initialState = {
  leadsList: [], // Array of all leads
  selectedLead: null, // Currently selected lead (for detail view/edit)
  status: "idle", // Status of async operations: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null, // Error message, if any
};

// ==========================
// Leads Slice
// ==========================
const leadsSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {
    /**
     * Clear the selected lead and reset status.
     */
    clearSelectedLead: (state) => {
      state.selectedLead = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchLeads lifecycle
      .addCase(fetchLeads.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.leadsList = action.payload;
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload
          ? action.payload.message
          : action.error.message;
      })

      // Handle createLead lifecycle
      .addCase(createLead.fulfilled, (state, action) => {
        state.leadsList.unshift(action.payload); // Add new lead to the top
      })
      .addCase(createLead.rejected, (state, action) => {
        state.error = action.payload
          ? action.payload.message
          : action.error.message;
      })

      // Handle fetchLeadById lifecycle
      .addCase(fetchLeadById.pending, (state) => {
        state.status = "loading";
        state.selectedLead = null;
      })
      .addCase(fetchLeadById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedLead = action.payload;
      })
      .addCase(fetchLeadById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload
          ? action.payload.message
          : action.error.message;
      })

      // Handle updateLead lifecycle
      .addCase(updateLead.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Update selectedLead with the updated data
        state.selectedLead = action.payload;

        // Also update the lead in leadsList
        const index = state.leadsList.findIndex(
          (lead) => lead.id === action.payload.id
        );
        if (index !== -1) {
          state.leadsList[index] = action.payload;
        }
      })
      .addCase(updateLead.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload
          ? action.payload.message
          : action.error.message;
      });
  },
});

// ==========================
// Exports
// ==========================

// Action to clear selected lead
export const { clearSelectedLead } = leadsSlice.actions;

// Leads reducer for the store
export default leadsSlice.reducer;

// ==========================
// Selectors
// ==========================

/**
 * Selector to get all leads from the state.
 */
export const selectAllLeads = (state) => state.leads.leadsList;

/**
 * Selector to get the status of leads operations.
 */
export const selectLeadsStatus = (state) => state.leads.status;

/**
 * Selector to get the currently selected lead.
 */
export const selectSelectedLead = (state) => state.leads.selectedLead;
