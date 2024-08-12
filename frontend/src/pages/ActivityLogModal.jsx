import React, { useState } from 'react';

const ActivityLogModal = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState({
    project: '',
    user: '',
    dateRange: '',
    actionType: ''
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // Implement the search logic here
  };

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
    // Implement the filter logic here
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          X
        </button>
        <h2 className="text-2xl font-bold mb-4">Activity Log</h2>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search activity..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <select
            name="project"
            value={filter.project}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">Filter by project</option>
            {/* Populate with projects */}
            <option value="Project 1">Project 1</option>
            <option value="Project 2">Project 2</option>
          </select>

          <select
            name="user"
            value={filter.user}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">Filter by user</option>
            {/* Populate with users */}
            <option value="User 1">User 1</option>
            <option value="User 2">User 2</option>
          </select>

          <select
            name="dateRange"
            value={filter.dateRange}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">Filter by date range</option>
            <option value="Last 7 days">Last 7 days</option>
            <option value="Last 30 days">Last 30 days</option>
          </select>

          <select
            name="actionType"
            value={filter.actionType}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">Filter by action type</option>
            <option value="Created">Created</option>
            <option value="Updated">Updated</option>
            <option value="Deleted">Deleted</option>
          </select>
        </div>

        <div className="overflow-y-auto max-h-64">
          <ul className="space-y-2">
            {/* Replace with actual activity log data */}
            <li className="p-2 border-b">
              <strong>Project 1:</strong> Task "Setup Project" was created by User 1 on 2024-08-10
            </li>
            <li className="p-2 border-b">
              <strong>Project 2:</strong> Task "Design Homepage" was updated by User 2 on 2024-08-11
            </li>
            {/* More activity log items */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ActivityLogModal;
