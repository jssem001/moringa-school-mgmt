import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { server_url } from '../../config';

const EditProject = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    status: ''
  });
  const navigate = useNavigate();
  const { id } = useParams(); // Get project ID from URL
  const auth_token = localStorage.getItem('auth_token');

  useEffect(() => {
    // Fetch project details to prepopulate form
    const fetchProject = async () => {
      try {
        const response = await fetch(`${server_url}/project/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${auth_token}`
          }
        });
        if (!response.ok) throw new Error("Failed to fetch project");
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        toast.error(error.message || "Failed to fetch project details");
      }
    };

    fetchProject();
  }, [id, auth_token]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${server_url}/project/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${auth_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Unauthorized - please check your token");
        }
        throw new Error("Failed to update project");
      }

      const result = await response.json();
      toast.success("Project updated successfully!");
      navigate('/projects'); // Redirect to projects page
    } catch (error) {
      toast.error(error.message || "Failed to update project");
    }
  };

  return (
    <div className="p-4 sm:ml-64 flex-1">
      <h2 className="text-2xl font-bold mb-4">Edit Project</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
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
          <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">Due Date</label>
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

        {/* Status */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
          <input
            type="text"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Update Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProject;
