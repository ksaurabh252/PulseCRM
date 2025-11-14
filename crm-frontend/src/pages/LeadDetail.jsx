import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLeadById,
  selectSelectedLead,
  selectLeadsStatus,
  clearSelectedLead,
} from "../features/leads/leadsSlice";
import { GoArrowLeft } from "react-icons/go";
import EditLeadForm from "../components/leads/EditLeadForm";

const LeadDetail = () => {
  // Get the lead ID from the URL parameters
  const { id } = useParams();
  const dispatch = useDispatch();
  // Get the selected lead and status from Redux store
  const lead = useSelector(selectSelectedLead);
  const status = useSelector(selectLeadsStatus);

  // Fetch the lead data when the component mounts or the ID changes
  useEffect(() => {
    dispatch(fetchLeadById(id));
    // Clear the selected lead when the component unmounts
    return () => {
      dispatch(clearSelectedLead());
    };
  }, [id, dispatch]);

  // Show loading state if data is being fetched
  if (status === "loading" && !lead) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-lg text-gray-600">Loading lead data...</p>
      </div>
    );
  }

  // Show error state if fetching failed and no lead is loaded
  if (status === "failed" && !lead) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-red-600">
          Error: Lead not found.
        </h1>
        {/* Back to all leads link */}
        <Link
          to="/leads"
          className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <GoArrowLeft className="mr-2" />
          Back to all leads
        </Link>
      </div>
    );
  }

  // If no lead is loaded, render nothing
  if (!lead) {
    return null;
  }

  // 2. Render the lead data and edit form
  return (
    <div className="space-y-8">
      {/* Back button to go to all leads */}
      <Link
        to="/leads"
        className="mb-4 inline-flex items-center text-indigo-600 hover:text-indigo-800"
      >
        <GoArrowLeft className="mr-2" />
        Back to all leads
      </Link>

      {/* 3. Render the new edit form here, passing the lead as a prop */}
      <EditLeadForm lead={lead} />

      {/* Activity Timeline section (placeholder for future feature) */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold">Activity Timeline</h2>
        <p className="mt-4 rounded-lg bg-white p-6 shadow-md">
          (Activity timeline will go here...)
          {/* This is a placeholder for the activity timeline component */}
        </p>
      </div>
    </div>
  );
};

export default LeadDetail;
