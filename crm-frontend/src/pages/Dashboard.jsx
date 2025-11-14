import StatCard from "../components/dashboard/StatCard";
import LeadsByStatusChart from "../components/dashboard/LeadsByStatusChart";
import { GoDatabase, GoPersonAdd, GoCheck, GoGraph } from "react-icons/go";

// Dashboard component displays the main CRM dashboard
const Dashboard = () => {
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
          value="128"
          icon={<GoDatabase className="h-6 w-6 text-white" />}
          bgColor="bg-indigo-600"
        />
        {/* StatCard for new leads this month */}
        <StatCard
          title="New Leads (Month)"
          value="42"
          icon={<GoPersonAdd className="h-6 w-6 text-white" />}
          bgColor="bg-blue-500"
        />
        {/* StatCard for deals won */}
        <StatCard
          title="Deals Won"
          value="12"
          icon={<GoCheck className="h-6 w-6 text-white" />}
          bgColor="bg-green-500"
        />
        {/* StatCard for conversion rate */}
        <StatCard
          title="Conversion Rate"
          value="9.4%"
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
