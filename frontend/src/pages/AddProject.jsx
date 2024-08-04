import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProjectContext } from '../context/ProjectContext';

export default function AddProject() {
  const { addProject } = useContext(ProjectContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('');
  const [image, setImage] = useState('');
  const [githubLink, setGithubLink] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addProject(title, description, date, dueDate, status, image, githubLink);
    navigate('/projects'); // Redirect to projects list after adding
  };

  return (
    <div className='mt-10'>
      <div className='grid grid-cols-2 h-[80vh] mt-6'>
        <div className='flex justify-center'>
          {image && (
            <img src={image} alt='Project' className='h-[80vh] rounded-lg' />
          )}
        </div>
        <div className='p-6'>
          <h1 className='text-center font-semibold text-2xl'>Add Project</h1>

          <form onSubmit={handleSubmit} className='max-w-md mx-auto'>
            <label className='block mb-2'>
              Title:
              <input
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='border border-gray-300 p-2 w-full'
                required
              />
            </label>
            <label className='block mb-2'>
              Description:
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='border border-gray-300 p-2 w-full'
                required
              />
            </label>
            <label className='block mb-2'>
              Date:
              <input
                type='date'
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className='border border-gray-300 p-2 w-full'
                required
              />
            </label>
            <label className='block mb-2'>
              Due Date:
              <input
                type='date'
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className='border border-gray-300 p-2 w-full'
                required
              />
            </label>
            <label className='block mb-2'>
              Status:
              <input
                type='text'
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className='border border-gray-300 p-2 w-full'
                required
              />
            </label>
            <label className='block mb-2'>
              Image URL:
              <input
                type='text'
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className='border border-gray-300 p-2 w-full'
                required
              />
            </label>
            <label className='block mb-2'>
              GitHub Link:
              <input
                type='text'
                value={githubLink}
                onChange={(e) => setGithubLink(e.target.value)}
                className='border border-gray-300 p-2 w-full'
                required
              />
            </label>
            <button
              type='submit'
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
            >
              Add Project
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
