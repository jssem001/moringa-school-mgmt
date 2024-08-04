// src/components/Projects.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import projectData from "../data/projects";
import logo from '../images/MoringaLogo.png';
import Sidebar from "../components/Sidebar";

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter projects based on the search term
  const filteredProjects = projectData.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex">
      {/* Sidebar for the abstract image
      <aside className="w-1/6 bg-gray-200 p-4">
        <img
          src="https://s3-alpha-sig.figma.com/img/cafa/5e8f/b86bafc3853580461c326f24743c095f?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KaugZBvGBxCcbk75-tCVsg8~kC52sRyusJTyiCWdHyuVFwedfeRUdkUHb9Iad0EN8FT1FbQAuHiGqSmvv1RH-mjKkjcoKpgDlFDVtMfj4GFmHxyoPz7a77RiWQF-gyMctxCoMV8PG4zVW3UXTIKmAW-EPCbhEJcL4aA6fvUFjL~l4xKAMb3Qr2SIg2aS2fRQn~Y6ZCYuaKIlx35adx-bxNsm33toSpGsoMNDGE5pNbyAfXAyBeUDU6pSlUeoyyjURqTihFOXMvia~E~N-G-wGlosH8UTEm5zSrwtRYOfxRT7x1bvq2e6YHe2VrLRy4l3GmjbwxqrFKhrCp64NmdP2w__"
          alt="Abstract"
          className="w-full h-full object-cover"
        />
      </aside> */}
      <Sidebar />

      <div class="p-4 sm:ml-64">
      <div className="flex-1 p-4">
        {/* Navbar */}
        
        {/* <header className="bg-white text-black p-4 shadow-md">
          <nav className="flex justify-between items-center">
            <div className="flex items-center">
              <img src={logo} alt="Moringa Logo" className="h-12 w-12" />
            </div>
            <div className="space-x-4">
              <Link to="/studentprofile" className="hover:underline">
                Profile
              </Link>
              <Link to="/projects" className="hover:underline">
                Projects
              </Link>
              <Link to="/tasks" className="hover:underline">
                Tasks
              </Link>
              <Link to="/calendar" className="hover:underline">
                Calendar
              </Link>
              <Link to="/teams" className="hover:underline">
                Teams
              </Link>
              <Link to="/dashboard" className="hover:underline">
                Dashboard
              </Link>
              <Link to="/logout" className="hover:underline">
                Sign Out
              </Link>
            </div>
          </nav>
        </header> */}

        
        {/* <div className="flex flex-1"></div> */}
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

        {/* Add Project Button */}
        <section className="mb-4">
          <Link
            to="/add-project" // Link to the add project form or page
            className="inline-block px-4 py-2 bg-orange-300 text-white rounded hover:bg-orange-400"
          >
            Add New Project
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
                  <p className="text-sm text-gray-600">Date: {project.date}</p>
                  <p className="text-sm text-gray-600">Due Date: {project.duedate}</p>
                  <p className="text-sm text-gray-600">Status: {project.status}</p>

                  {/* Action Links */}
                  <div className="mt-2 flex space-x-2">
                    <a href={project.githubLink} className="text-blue-500 hover:underline">
                      View on GitHub
                    </a>
                    <Link to={`/edit-project/${project.id}`} className="text-yellow-500 hover:underline">
                      Edit
                    </Link>
                    <Link to={`/delete-project/${project.id}`} className="text-red-500 hover:underline">
                      Delete
                    </Link>
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
      </div>
    </div>
  );
};

export default Projects;
