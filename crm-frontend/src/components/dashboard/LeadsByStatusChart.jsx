import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { selectAllLeads } from "../../features/leads/leadsSlice";
import { useSelector } from "react-redux";

// Functional component to display leads by status in a bar chart
const LeadsByStatusChart = () => {
  // Get all leads from Redux store
  const leads = useSelector(selectAllLeads);

  // Prepare chart data by counting leads for each status
  const data = [
    { name: "New", count: leads.filter((l) => l.status === "NEW").length },
    {
      name: "Contacted",
      count: leads.filter((l) => l.status === "CONTACTED").length,
    },
    {
      name: "Qualified",
      count: leads.filter((l) => l.status === "QUALIFIED").length,
    },
    {
      name: "Proposal",
      count: leads.filter((l) => l.status === "PROPOSAL").length,
    },
    { name: "Won", count: leads.filter((l) => l.status === "WON").length },
  ];
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      {/* Chart title */}
      <h3 className="mb-4 text-lg font-semibold text-gray-800">
        Leads by Status
      </h3>

      {/* ResponsiveContainer makes the chart responsive to screen size */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data} // Data to be displayed in the chart
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {/* Adds a grid with dashed lines */}
          <CartesianGrid strokeDasharray="3 3" />
          {/* X-axis shows the 'name' property from data */}
          <XAxis dataKey="name" />
          {/* Y-axis for the count values */}
          <YAxis />
          {/* Tooltip shows data details on hover */}
          <Tooltip />
          {/* Legend displays the meaning of each bar */}
          <Legend />
          {/* Bar represents the 'count' value for each status */}
          <Bar dataKey="count" fill="#4f46e5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LeadsByStatusChart;
