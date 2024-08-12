import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { ProjectContext } from '../context/ProjectContext';

const Projects = () => {
  const { projects, loading, fetchProjects } = useContext(ProjectContext);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex">
      <Sidebar />

      <div className="p-4 sm:ml-64 flex-1">
        <section className="mb-4">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </section>

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

        <main className="p-4">
          <h2 className="text-2xl font-bold mb-4">Projects</h2>

          {loading ? (
            <p>Loading projects...</p>
          ) : filteredProjects.length === 0 ? (
            <p>No projects yet. Add your first project above...</p>
          ) : (
            <div className="space-y-4">
              {filteredProjects.map((project) => (
                <div key={project.id} className="flex items-start p-4 border rounded shadow-lg">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                    <p className="mb-2">{project.description}</p>
                    
                    <p className="text-sm text-gray-600">Due Date: {project.deadline}</p>
                    

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
                      <Link to={`/projects/${project.id}`} className="text-green-500 hover:underline">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Projects;

