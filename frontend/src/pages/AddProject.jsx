import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { server_url } from '../../config';
import Sidebar from '../components/Sidebar';

const AddProject = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    deadline: '',
    file: null
  });
  const navigate = useNavigate();
  const auth_token = localStorage.getItem('auth_token');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await fetch(`${server_url}/project`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${auth_token}`,
          // The 'Content-Type' should not be set when sending FormData,
          // it automatically sets the correct headers.
        },
        body: formDataToSend,
        
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Unauthorized - please check your token");
        }
        throw new Error("Failed to submit project");
      }

      const result = await response.json();
      toast.success("Project added successfully!");
      navigate('/projects'); // Redirect to projects page
    } catch (error) {
      toast.error(error.message || "Failed to add project");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-4 sm:ml-64 flex-1">
        <h2 className="text-2xl font-bold mb-4">Add New Project</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              rows="4"
              required
            />
          </div>

          {/* Deadline */}
          <div>
            <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">Deadline</label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* File Attachment */}
          <div>
            <label htmlFor="file" className="block text-sm font-medium text-gray-700">Attachment</label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
