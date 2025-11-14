import { useSelector } from "react-redux";
import { selectAllLeads } from "../../features/leads/leadsSlice";
import { Link } from "react-router-dom";

// Function to return Tailwind CSS classes for different status values
const getStatusBadge = (status) => {
  switch (status) {
    case "NEW":
      return "bg-blue-100 text-blue-800";
    case "CONTACTED":
      return "bg-yellow-100 text-yellow-800";
    case "QUALIFIED":
      return "bg-purple-100 text-purple-800";
    case "PROPOSAL":
      return "bg-orange-100 text-orange-800";
    case "WON":
      return "bg-green-100 text-green-800";
    case "LOST":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// LeadsTable component displays a table of all leads
const LeadsTable = () => {
  // Get all leads from Redux store
  const leadsData = useSelector(selectAllLeads);

  return (
    // Table container with horizontal scroll and shadow
    <div className="overflow-x-auto rounded-lg bg-white shadow-md">
      <table className="min-w-full divide-y divide-gray-200">
        {/* Table header */}
        <thead className="bg-gray-50">
          <tr>
            {/* Column headers */}
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Company
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Owner
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody className="divide-y divide-gray-200 bg-white">
          {/* Check if leadsData is an array before mapping */}
          {Array.isArray(leadsData) &&
            leadsData.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50">
                {/* Name and email cell */}
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {lead.name}
                  </div>
                  <div className="text-sm text-gray-500">{lead.email}</div>
                </td>
                {/* Company cell */}
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-gray-900">{lead.company}</div>
                </td>
                {/* Status cell with colored badge */}
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusBadge(
                      lead.status
                    )}`}
                  >
                    {lead.status}
                  </span>
                </td>
                {/* Owner cell (show "N/A" if owner is missing) */}
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {lead.owner ? lead.owner.name : "N/A"}
                </td>
                {/* Actions cell with a link to view/edit the lead */}
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                  <Link
                    to={`/leads/${lead.id}`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    View / Edit
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadsTable;
