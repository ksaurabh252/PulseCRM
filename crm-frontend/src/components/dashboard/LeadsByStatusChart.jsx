import React from "react";
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

// Dummy data for the chart (replace with real data as needed)
const data = [
  { name: "New", count: 42 },
  { name: "Contacted", count: 35 },
  { name: "Qualified", count: 28 },
  { name: "Proposal", count: 19 },
  { name: "Won", count: 12 },
];

// Functional component to display leads by status in a bar chart
const LeadsByStatusChart = () => {
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
