import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProjectContext } from '../context/ProjectContext';
import Sidebar from '../components/Sidebar';

const SingleProject = () => {
  const { id } = useParams();
  const { fetchProject, singleProject } = useContext(ProjectContext);

  useEffect(() => {
    fetchProject(id);
  }, [id]);

  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (singleProject && singleProject.files) {
      setFiles(singleProject.files);
    }
  }, [singleProject]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-4 sm:ml-64 flex-1">
        {singleProject ? (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">{singleProject.name}</h1>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Description</h2>
              <p className="text-gray-700">{singleProject.description}</p>
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Deadline</h2>
              <p className="text-gray-700">{singleProject.deadline}</p>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Attached Files</h2>
              <p className="text-gray-700">{singleProject.file_attachment}</p>
              {files.length > 0 ? (
                <ul className="list-disc pl-5">
                  {files.map((file, index) => (
                    <li key={index} className="text-gray-700">
                      <a href={file} target="_blank" rel="noopener noreferrer">
                        {file}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700">No files attached</p>
              )}
            </div>
            <Link
              to="/projects"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Back to Projects
            </Link>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default SingleProject;
