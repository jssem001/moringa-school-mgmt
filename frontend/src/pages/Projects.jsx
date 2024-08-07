import React, { useState, useEffect } from "react";
import { useProjects } from '../context/ProjectContext';
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Projects = () => {
  const { projects, fetchProjects, deleteProject } = useProjects(); // Use context methods
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteProjectId, setDeleteProjectId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Fetch projects on component mount
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Filter projects based on the search term
  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Show the delete confirmation dialog
  const handleDeleteClick = (projectId) => {
    setDeleteProjectId(projectId);
    setShowDeleteConfirm(true);
  };

  // Confirm deletion of the project
  const confirmDelete = () => {
    deleteProject(deleteProjectId); // Use context method
    setShowDeleteConfirm(false);
    setDeleteProjectId(null);
  };

  // Cancel deletion of the project
  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setDeleteProjectId(null);
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="p-4 sm:ml-64 flex-1">
        {/* Search Section */}
        <section className="mb-4">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </section>

        {/* Buttons Section */}
        <section className="mb-4 flex space-x-4">
          <Link
            to="/add-project"
            className="inline-block px-4 py-2 bg-orange-300 text-white rounded hover:bg-orange-400"
          >
            Add New Project
          </Link>
          <Link
            to="/templates"
            className="inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Templates
          </Link>
        </section>

        {/* Main content area */}
        <main className="p-4">
          <h2 className="text-2xl font-bold mb-4">Projects</h2>

          <div className="space-y-4">
            {filteredProjects.map((project) => (
              <div key={project.id} className="flex items-start p-4 border rounded shadow-lg">
                {/* Project Image */}
                <div className="w-1/4 mr-4 flex-shrink-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-32 object-cover mb-2 rounded"
                  />
                </div>

                {/* Project Details */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="mb-2">{project.description}</p>
                  <p className="text-sm text-gray-600">Start Date: {project.startdate}</p>
                  <p className="text-sm text-gray-600">Due Date: {project.duedate}</p>
                  <p className="text-sm text-gray-600">Status: {project.status}</p>

                  {/* Attached Files Section */}
                  {project.attachedFiles && project.attachedFiles.length > 0 && (
                    <div className="mt-2">
                      <h4 className="font-semibold">Attached Files:</h4>
                      <ul className="list-disc ml-4">
                        {project.attachedFiles.map((file, index) => (
                          <li key={index}>
                            <a
                              href={file.url}
                              className="text-blue-500 hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {file.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Action Links */}
                  <div className="mt-2 flex space-x-2">
                    <a
                      href={project.githubLink}
                      className="text-blue-500 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on GitHub
                    </a>
                    <Link to={`/edit-project/${project.id}`} className="text-yellow-500 hover:underline">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(project.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                    <Link to={`/projects/${project.id}`} className="text-green-500 hover:underline">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Are you sure you want to delete this project?</h2>
            <div className="flex justify-end space-x-4">
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
