import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { createActivity } from '../../features/activity/activitySlice.js';

/**
 * AddActivityForm component allows users to add a new activity (note) for a specific lead.
 * @param {string} leadId - The ID of the lead to associate the activity with.
 */
const AddActivityForm = ({ leadId }) => {
  // Local state to store the note input
  const [note, setNote] = useState('');
  const dispatch = useDispatch();

  /**
   * Handles form submission to create a new activity.
   * Prevents submission if the note is empty.
   * Dispatches the createActivity action and resets the note field.
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!note.trim()) return; // Prevent empty submissions

    // Prepare activity data
    const activityData = {
      content: note,
      type: 'NOTE', // Activity type is hardcoded as 'NOTE'
      leadId: leadId,
    };

    // Dispatch the action to create a new activity
    dispatch(createActivity(activityData));
    setNote(''); // Clear the textarea after submission
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="rounded-lg bg-white shadow-md">
        {/* Textarea for entering the activity note */}
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows="3"
          className="block w-full rounded-t-lg border-0 p-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
          placeholder="Add a note, log a call, or schedule a meeting..."
        ></textarea>
        {/* Submit button */}
        <div className="flex items-center justify-end rounded-b-lg border-t border-gray-200 bg-gray-50 p-4">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none"
          >
            Add Activity
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddActivityForm;