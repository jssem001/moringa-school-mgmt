import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import { ProjectContext } from '../context/ProjectContext';
import Sidebar from '../components/Sidebar';

const EditProject = () => {
  const { updateProject, fetchProject, singleProject, deleteProject } = useContext(ProjectContext);
  const { id } = useParams(); // Get project ID from URL
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [files, setFiles] = useState(null);

  useEffect(() => {
    fetchProject(id);
  }, [id]);

  useEffect(() => {
    if (singleProject) {
      setName(singleProject.name);
      setDescription(singleProject.description);
      setDeadline(singleProject.deadline);
      // Handle files if necessary
    }
  }, [singleProject]);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('deadline', deadline);
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }
    }

    try {
      await updateProject(id, formData);
      navigate('/projects');
    } catch (error) {
      console.error('Failed to update project:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProject(id);
      navigate('/projects'); // Redirect to projects list after deletion
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };
  

  return (
    <div className="p-4 sm:ml-64 flex-1">
      <Sidebar/>
      <h2 className="text-2xl font-bold mb-4">Edit Project</h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Name</label>
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
          <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">Due Date</label>
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
          <label htmlFor="files" className="block text-sm font-medium text-gray-700">Files</label>
          <input
            type="file"
            id="files"
            name="files"
            onChange={handleFileChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            multiple
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center">
          
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Update Project
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete Project
          </button>

        </div>
      </form>
    </div>
  );
};

export default EditProject;
