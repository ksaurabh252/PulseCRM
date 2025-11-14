import React, { useEffect, useState } from 'react';
import LeadsTable from '../components/leads/LeadsTable';
import { GoPlus } from 'react-icons/go';
import LeadModal from '../components/leads/LeadModal';
import { fetchLeads, selectLeadsStatus } from '../features/leads/leadsSlice';
import { useDispatch, useSelector } from 'react-redux';

const Leads = () => {
  // State to control the visibility of the "Create Lead" modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Connect to Redux dispatch function
  const dispatch = useDispatch();

  // Get the current leads fetch status from Redux store
  const leadsStatus = useSelector(selectLeadsStatus);

  // Fetch leads from the server when the page loads (or when status is 'idle')
  useEffect(() => {
    // Only fetch if status is 'idle' (not already fetched)
    if (leadsStatus === 'idle') {
      dispatch(fetchLeads());
    }
  }, [leadsStatus, dispatch]); // Dependency array ensures effect runs when these change

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
      <p className="mt-2 text-gray-600">Manage all your leads here.</p>
      
      {/* Button to open the "Create Lead" modal */}
      <div>
        <button
          onClick={openModal}
          className="flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <GoPlus className="-ml-1 mr-2 h-5 w-5" />
          Create Lead
        </button>
      </div>

      {/* Optional: Show loading indicator while leads are being fetched */}
      {leadsStatus === 'loading' && <p>Loading leads...</p>}

      {/* Show the leads table only when leads have been successfully fetched */}
      {leadsStatus === 'succeeded' && <LeadsTable />}

      {/* Modal for creating a new lead */}
      <LeadModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Leads;