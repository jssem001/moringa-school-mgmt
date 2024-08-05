import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import abstractImage from '../images/abstract-wavy.jpeg'; // Path to the abstract image

const AddProject = () => {
  const [project, setProject] = useState({
    title: '',
    description: '',
    githubLink: '',
    image: '',
    templateLink: '',
    additionalDetails: '',
    startDate: '',
    dueDate: '',
    isTeam: false,
    teamMembers: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
      });

      if (response.ok) {
        navigate('/projects');
      } else {
        console.error('Failed to add project');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="relative overflow-hidden p-6 max-w-3xl mx-auto">
      {/* Back to Projects Button */}
      <button
        onClick={() => navigate('/projects')}
        className="absolute top-6 left-6 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 z-20"
      >
        Back to Projects
      </button>

      {/* Background Image */}
      <div className="absolute inset-0 z-10">
        <img
          src={abstractImage}
          alt="Abstract"
          className="w-full h-full object-cover blur-lg"
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
        <div className="absolute inset-0 bg-black opacity-40"></div> {/* Optional overlay for better text visibility */}
      </div>

      {/* Form Container */}
      <div className="relative flex flex-col items-center bg-white p-6 rounded shadow-lg z-20 mt-24">
        <h2 className="text-3xl font-bold mb-4">Add New Project</h2>
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={project.title}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            name="description"
            placeholder="Project Description"
            value={project.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="url"
            name="githubLink"
            placeholder="GitHub Link"
            value={project.githubLink}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="url"
            name="image"
            placeholder="Image URL"
            value={project.image}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="url"
            name="templateLink"
            placeholder="Template Link (Figma/PDF)"
            value={project.templateLink}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="additionalDetails"
            placeholder="Additional Details (if any)"
            value={project.additionalDetails}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          {/* Start Date and Due Date Section */}
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <label className="block text-lg font-semibold">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={project.startDate}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-lg font-semibold">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={project.dueDate}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <label className="flex items-center space-x-2 mt-4">
            <input
              type="checkbox"
              name="isTeam"
              checked={project.isTeam}
              onChange={(e) => setProject({ ...project, isTeam: e.target.checked })}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="text-lg">Team Project</span>
          </label>
          {project.isTeam && (
            <input
              type="text"
              name="teamMembers"
              placeholder="Team Members' Emails (comma separated)"
              value={project.teamMembers}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Add Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
