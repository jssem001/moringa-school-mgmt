import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { ProjectContext } from '../context/ProjectContext';

const AddProject = () => {
  const { addProject } = useContext(ProjectContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user.id : null;

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission
  const handleAddProject = (e) => {
    e.preventDefault();

    if (user) {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('deadline', deadline);
      formData.append('user_id', userId);
      if (file) {
        formData.append('file_attachments', file);
      }

      addProject(formData);
      navigate('/projects');
      
      setName('');
      setDescription('');
      setDeadline('');
      setFile(null);
    } else {
      console.error('User not found in localStorage.');
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-4 sm:ml-64 flex-1">
        <h2 className="text-2xl font-bold mb-4">Add New Project</h2>

        <form onSubmit={handleAddProject} className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
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
              onChange={handleFileChange}
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



