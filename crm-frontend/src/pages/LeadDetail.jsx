import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLeadById,
  selectSelectedLead,
  selectLeadsStatus,
  clearSelectedLead,
  deleteLead,
} from "../features/leads/leadsSlice";
import { GoArrowLeft } from "react-icons/go";
import EditLeadForm from "../components/leads/EditLeadForm";
import ActivityTimeline from "../components/leads/ActivityTimeline";
import AddActivityForm from "../components/leads/AddActivityForm";
import { fetchActivitiesForLead } from "../features/activity/activitySlice";
import { clearActivities } from "../features/activity/activitySlice";

const LeadDetail = () => {
  // Get the lead ID from the URL parameters
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Get the selected lead and status from Redux store
  const lead = useSelector(selectSelectedLead);
  const status = useSelector(selectLeadsStatus);

  // Fetch the lead data when the component mounts or the ID changes
  useEffect(() => {
    dispatch(fetchLeadById(id));
    dispatch(fetchActivitiesForLead(id));
    // Clear the selected lead when the component unmounts
    return () => {
      dispatch(clearSelectedLead());
      dispatch(clearActivities());
    };
  }, [id, dispatch]);

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this lead? This action cannot be undone."
      )
    ) {
      try {
        await dispatch(deleteLead(id)).unwrap(); // .unwrap() will throw an error if rejected
        // After successful deletion, navigate back to the leads list
        navigate("/leads");
      } catch (err) {
        console.error("Failed to delete the lead:", err);
        alert(`Error: ${err.message || "Failed to delete lead."}`);
      }
    }
  };
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
      {/* --- MODIFIED SECTION --- */}
      {/* Container for Back link and Delete button */}
      <div className="flex justify-between items-center mb-4">
        <Link
          to="/leads"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <GoArrowLeft className="mr-2" />
          Back to all leads
        </Link>

        <button
          onClick={handleDelete}
          className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Delete Lead
        </button>
      </div>

      <EditLeadForm lead={lead} />

      {/* Activity Timeline section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold">Activity Timeline</h2>
        <div className="mt-4 rounded-lg bg-white p-6 shadow-md">
          <AddActivityForm leadId={id} />
          <ActivityTimeline />
        </div>
      </div>
    </div>
  );
};

export default LeadDetail;
