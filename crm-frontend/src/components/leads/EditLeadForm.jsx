import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateLead } from '../../features/leads/leadsSlice.js';
import { useNavigate } from 'react-router-dom';

/**
 * EditLeadForm component allows editing of an existing lead's details.
 * @param {Object} lead - The lead object to edit.
 */
const EditLeadForm = ({ lead }) => {
  // Local state for form fields, initialized with lead's current data
  const [name, setName] = useState(lead.name);
  const [email, setEmail] = useState(lead.email || '');
  const [company, setCompany] = useState(lead.company || '');
  const [status, setStatus] = useState(lead.status);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Update form fields if the lead prop changes
  useEffect(() => {
    setName(lead.name);
    setEmail(lead.email || '');
    setCompany(lead.company || '');
    setStatus(lead.status);
  }, [lead]);

  /**
   * Handles form submission to update the lead.
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare updated lead data
    const leadData = { name, email, company, status };

    try {
      // Dispatch updateLead action and wait for completion
      await dispatch(updateLead({ id: lead.id, leadData })).unwrap();

      // Navigate back to leads list on success
      navigate('/leads');
    } catch (err) {
      // Log any errors during update
      console.error('Failed to update lead:', err);
    }
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Edit Lead Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Name Field */}
          <div>
            <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {/* Email Field */}
          <div>
            <label htmlFor="edit-email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="edit-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {/* Company Field */}
          <div>
            <label htmlFor="edit-company" className="block text-sm font-medium text-gray-700">
              Company
            </label>
            <input
              type="text"
              id="edit-company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {/* Status Field */}
          <div>
            <label htmlFor="edit-status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="edit-status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 sm:text-sm"
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
        {/* Submit Button */}
        <div className="mt-6 text-right">
          <button
            type="submit"
            className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditLeadForm;