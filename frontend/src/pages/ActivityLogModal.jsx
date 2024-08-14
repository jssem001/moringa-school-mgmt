import React, { useState, useContext, useEffect } from 'react';
import { ProjectContext } from '../context/ProjectContext';

const ActivityLogModal = ({ onClose }) => {
  const { activities, fetchActivities } = useContext(ProjectContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState({
    // project: '',
    user: '',
    dateRange: '',
    actionType: ''
  });

  useEffect(()=> {
    fetchActivities();
  }, [])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // Implement the search logic here
  };

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
    // Implement the filter logic here
  };

  const filteredActivities = activities.filter(activity => {
    // Implement filtering logic based on searchTerm and filter state
    return (
      
      (filter.user ? activity.user_id.includes(filter.user) : true) &&
      (filter.actionType ? activity.activity.includes(filter.actionType) : true) &&
      (searchTerm ? activity.activity.includes(searchTerm) : true)
    );
  });

  const uniqueUsers = [...new Set(activities.map(activity => activity.user_id))];

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
          {/* <select
            name="project"
            value={filter.project}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">Filter by project</option>
            {/* Populate with projects */}
            {/* <option value="Project 1">Project 1</option>
            <option value="Project 2">Project 2</option>
          </select> */} 

          <select
            name="user"
            value={filter.user}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">Filter by user</option>
            {uniqueUsers.map((user, index) => (
              <option key={index} value={user}>{user}</option>
            ))}
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
            {filteredActivities.map((activity, index) => (
              <li key={index} className="p-2 border-b">
                <strong>{activity.userName}:</strong> {activity.description} on {new Date(activity.timestamp).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ActivityLogModal;
