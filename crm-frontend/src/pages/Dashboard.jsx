import StatCard from "../components/dashboard/StatCard";
import LeadsByStatusChart from "../components/dashboard/LeadsByStatusChart";
import { GoDatabase, GoPersonAdd, GoCheck, GoGraph } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLeads,
  selectAllLeads,
  selectLeadsStatus,
} from "../features/leads/leadsSlice";
import { useEffect } from "react";

// Dashboard component displays the main CRM dashboard
const Dashboard = () => {
  const leads = useSelector(selectAllLeads);
  const leadsStatus = useSelector(selectLeadsStatus);
  const dispatch = useDispatch();

  // Fetch leads on component mount if not already loaded
  useEffect(() => {
    if (leadsStatus === "idle") {
      dispatch(fetchLeads());
    }
  }, [leadsStatus, dispatch]);

  // Calculate dashboard statistics
  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.status === "NEW").length,
    won: leads.filter((l) => l.status === "WON").length,
    conversionRate:
      leads.length > 0
        ? (
            (leads.filter((l) => l.status === "WON").length / leads.length) *
            100
          ).toFixed(1)
        : 0,
  };

  //  Loading state
  if (leadsStatus === "loading") {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-lg text-gray-600">Loading dashboard...</p>
      </div>
    );
  }
  return (
    <div>
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      <p className="mb-6 mt-2 text-gray-600">Welcome to your CRM dashboard.</p>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* StatCard for total leads */}
        <StatCard
          title="Total Leads"
          value={stats.total}
          icon={<GoDatabase className="h-6 w-6 text-white" />}
          bgColor="bg-indigo-600"
        />
        {/* StatCard for new leads this month */}
        <StatCard
          title="New Leads (Month)"
          value={stats.new}
          icon={<GoPersonAdd className="h-6 w-6 text-white" />}
          bgColor="bg-blue-500"
        />
        {/* StatCard for deals won */}
        <StatCard
          title="Deals Won"
          value={stats.won}
          icon={<GoCheck className="h-6 w-6 text-white" />}
          bgColor="bg-green-500"
        />
        {/* StatCard for conversion rate */}
        <StatCard
          title="Conversion Rate"
          value={`${stats.conversionRate}%`}
          icon={<GoGraph className="h-6 w-6 text-white" />}
          bgColor="bg-orange-500"
        />
      </div>

      {/* Charts Section */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Bar chart showing leads by status */}
        <LeadsByStatusChart />

        {/* Placeholder for another chart or dashboard widget */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h3 className="mb-4 text-lg font-semibold text-gray-800">
            Activity Timeline
          </h3>
          <p className="text-gray-500">
            Upcoming feature: Real-time activity feed...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
