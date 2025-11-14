import React from "react";

// StatCard component displays a statistic with an icon, title, and value
const StatCard = ({ title, value, icon, bgColor = "bg-blue-500" }) => {
  return (
    // Card container with flex layout, rounded corners, padding, and shadow
    <div className="flex items-center rounded-lg bg-white p-5 shadow-md">
      {/* Icon container: circular background with customizable color */}
      <div
        className={`mr-4 flex h-12 w-12 items-center justify-center rounded-full ${bgColor}`}
      >
        {/* The icon is passed as a prop and rendered here */}
        {icon}
      </div>
      {/* Text section: displays the title and value */}
      <div>
        {/* Title of the statistic (e.g., "Total Leads") */}
        <p className="text-sm font-medium text-gray-500">{title}</p>
        {/* Value of the statistic (e.g., 120) */}
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
