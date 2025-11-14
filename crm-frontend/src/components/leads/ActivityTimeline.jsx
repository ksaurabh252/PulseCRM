import { useSelector } from "react-redux";
import {
  selectAllActivities,
  selectActivityStatus,
} from "../../features/activity/activitySlice.js";
import { GoNote, GoDeviceMobile, GoCalendar } from "react-icons/go"; // Icons

/**
 * Returns the appropriate icon component based on the activity type.
 * @param {string} type - The type of activity ('NOTE', 'CALL', 'MEETING').
 * @returns {JSX.Element} The corresponding icon.
 */
const getActivityIcon = (type) => {
  switch (type) {
    case "NOTE":
      return <GoNote className="h-5 w-5 text-gray-500" />;
    case "CALL":
      return <GoDeviceMobile className="h-5 w-5 text-gray-500" />;
    case "MEETING":
      return <GoCalendar className="h-5 w-5 text-gray-500" />;
    default:
      return <GoNote className="h-5 w-5 text-gray-500" />;
  }
};

/**
 * ActivityTimeline component displays a list of activities for a lead in a timeline format.
 */
const ActivityTimeline = () => {
  // Get all activities and their loading status from Redux store
  const activities = useSelector(selectAllActivities);
  const status = useSelector(selectActivityStatus);

  // Show loading message while activities are being fetched
  if (status === "loading") {
    return <p>Loading activities...</p>;
  }

  // Show message if there are no activities
  if (activities.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No activities found for this lead.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {/* Render each activity in the timeline */}
      {activities.map((activity) => (
        <div key={activity.id} className="relative flex gap-x-3">
          {/* Activity Icon */}
          <div className="relative flex h-10 w-10 flex-none items-center justify-center rounded-full bg-gray-100 ring-8 ring-white">
            {getActivityIcon(activity.type)}
          </div>
          {/* Activity Content */}
          <div className="flex-auto rounded-md bg-white p-4 shadow-sm ring-1 ring-inset ring-gray-100">
            <div className="flex justify-between gap-x-4">
              {/* User and activity type */}
              <div className="py-0.5 text-sm leading-5 text-gray-600">
                <span className="font-medium text-gray-900">
                  {activity.user.name}
                </span>{" "}
                added a {activity.type.toLowerCase()}
              </div>
              {/* Activity date */}
              <time
                dateTime={activity.createdAt}
                className="flex-none py-0.5 text-xs leading-5 text-gray-500"
              >
                {new Date(activity.createdAt).toLocaleDateString()}
              </time>
            </div>
            {/* Activity content/description */}
            <p className="mt-2 text-sm leading-6 text-gray-700">
              {activity.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityTimeline;
