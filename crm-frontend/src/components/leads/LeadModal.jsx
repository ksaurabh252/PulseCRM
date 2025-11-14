import React, { useState } from "react";
import { GoX } from "react-icons/go";
import { useDispatch } from "react-redux";
import { createLead } from "../../features/leads/leadsSlice";

// LeadModal component for creating a new lead
const LeadModal = ({ isOpen, onClose }) => {
  // State variables for form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("NEW");

  // Redux dispatch function
  const dispatch = useDispatch();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission (page reload)

    // Create a new lead object from form state
    const newLead = {
      name,
      email,
      company,
      status,
    };

    // Dispatch the createLead action to Redux
    dispatch(createLead(newLead));

    // Reset form fields after submission
    setName("");
    setEmail("");
    setCompany("");
    setStatus("NEW");

    // Close the modal
    onClose();
  };

  // If modal is not open, render nothing
  if (!isOpen) return null;

  return (
    // Modal overlay (background)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Modal content box */}
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
        {/* Modal Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Create New Lead</h2>
          {/* Close button (X icon) */}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <GoX className="h-6 w-6" />
          </button>
        </div>

        {/* Form for lead creation */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Name input field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            {/* Email input field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            {/* Company input field */}
            <div>
              <label
                htmlFor="company"
                className="block text-sm font-medium text-gray-700"
              >
                Company
              </label>
              <input
                type="text"
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            {/* Status dropdown */}
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                <option value="NEW">New</option>
                <option value="CONTACTED">Contacted</option>
                <option value="QUALIFIED">Qualified</option>
                <option value="PROPOSAL">Proposal</option>
                <option value="WON">Won</option>
                <option value="LOST">Lost</option>
              </select>
            </div>
          </div>

          {/* Modal Footer with Cancel and Create buttons */}
          <div className="mt-6 flex justify-end space-x-3">
            {/* Cancel button closes the modal */}
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            {/* Submit button to create the lead */}
            <button
              type="submit"
              className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Create Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeadModal;
