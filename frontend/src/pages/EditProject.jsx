import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import abstractImage from '../images/abstract-wavy.jpeg'; // Path to the abstract image
import projectData from '../data/projects'; // Adjust this path as necessary

const EditProject = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchedProject = projectData.find((p) => p.id === parseInt(projectId));
    setProject(fetchedProject);
  }, [projectId]);

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setAttachedFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', project.title);
    formData.append('description', project.description);
    formData.append('githubLink', project.githubLink);
    formData.append('image', project.image);
    formData.append('date', project.date);
    formData.append('duedate', project.duedate);
    formData.append('status', project.status);
    for (let i = 0; i < attachedFiles.length; i++) {
      formData.append('files', attachedFiles[i]);
    }

    try {
      const response = await fetch(`http://localhost:5000/api/projects/${projectId}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        navigate('/projects');
      } else {
        console.error('Failed to update project');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!project) return <div className="text-center text-xl">Loading...</div>;

  return (
    <div className="relative overflow-hidden p-6 max-w-3xl mx-auto">
      <button
        onClick={() => navigate('/projects')}
        className="absolute top-6 left-6 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 z-20"
      >
        Back to Projects
      </button>

      <div className="absolute inset-0 z-10">
        <img
          src={abstractImage}
          alt="Abstract"
          className="w-full h-full object-cover blur-lg"
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      <div className="relative flex flex-col items-center bg-white p-6 rounded shadow-lg z-20 mt-24">
        <h2 className="text-3xl font-bold mb-4">Edit Project</h2>
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Project Title</label>
            <input
              type="text"
              name="title"
              placeholder="Project Title"
              value={project.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Project Description</label>
            <textarea
              name="description"
              placeholder="Project Description"
              value={project.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">GitHub Link</label>
            <input
              type="url"
              name="githubLink"
              placeholder="GitHub Link"
              value={project.githubLink}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="url"
              name="image"
              placeholder="Image URL"
              value={project.image}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Project Date</label>
            <input
              type="date"
              name="date"
              value={project.date}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Due Date</label>
            <input
              type="date"
              name="duedate"
              value={project.duedate}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Project Status</label>
            <select
              name="status"
              value={project.status}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Attach Files</label>
            <input
              type="file"
              name="files"
              multiple
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Update Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProject;