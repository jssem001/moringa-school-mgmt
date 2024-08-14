import React, { useState, useContext, useEffect } from 'react';
import { ProjectContext } from '../context/ProjectContext';
import { UserContext } from '../context/UserContext';

const ActivityLogModal = ({ onClose }) => {
  const { activities, fetchActivities } = useContext(ProjectContext);
  const {allUsers, fetchUsers} = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState({
    user: '',
    dateRange: '',
    actionType: ''
  });

  useEffect(()=> {
    fetchActivities();
    fetchUsers();
  }, [])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    
  };

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
    
  };

  const applyDateRangeFilter = (activityDate) => {
    if (!filter.dateRange) return true;
    const date = new Date(activityDate);
    const now = new Date();
    if (filter.dateRange === 'Last 24 hours') {
      return date >= new Date(now.setDate(now.getDate() - 1));
    }
    if (filter.dateRange === 'Last 7 days') {
      return date >= new Date(now.setDate(now.getDate() - 7));
    }
    if (filter.dateRange === 'Last 30 days') {
      return date >= new Date(now.setDate(now.getDate() - 30));
    }
    return true;
  };


  const filteredActivities = activities.filter(activity => {
    const userId = filter.user;
  
    return (
      (userId ? String(activity.user_id) === String(userId) : true) && 
      (filter.actionType ? activity.activity.includes(filter.actionType) : true) &&
      (searchTerm ? activity.activity.toLowerCase().includes(searchTerm.toLowerCase()) : true) &&
      applyDateRangeFilter(activity.timestamp)
    );
  })
  .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

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
          <select
            name="user"
            value={filter.user}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">All Users</option>
            {uniqueUsers.map((user, index) => (
              <option key={index} value={user}>
                {allUsers.find(u => u.id === user)?.name || user}
              </option>
            ))}
          </select>

          <select
            name="dateRange"
            value={filter.dateRange}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">All Time</option>
            <option value="Last 24 hours">Last 24 hours</option>
            <option value="Last 7 days">Last 7 days</option>
            <option value="Last 30 days">Last 30 days</option>
          </select>

          <select
            name="actionType"
            value={filter.actionType}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">All Actions</option>
            <option value="Created">Created</option>
            <option value="Updated">Updated</option>
            <option value="Deleted">Deleted</option>
          </select>
        </div>

        <div className="overflow-y-auto max-h-64">
          <ul className="space-y-2">
            {filteredActivities.map((activity, index) => (
              <li key={index} className="p-2 border-b">
                <strong>{allUsers.find(u => u.id === activity.user_id)?.name || activity.user_id}: </strong> 
                {activity.activity} on {new Date(activity.timestamp).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ActivityLogModal;
