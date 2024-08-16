// src/pages/EditTemplate.jsx
import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from "../components/Sidebar";
import { TemplateContext } from '../context/TemplateContext';

const EditTemplate = () => {
  const { singleTemplate, updateTemplate, fetchTemplate, deleteTemplate } = useContext(TemplateContext);
  const { id } = useParams(); 
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTemplate(id);
  }, [id]);

  useEffect(() => {
    if (singleTemplate) {
      setName(singleTemplate.name);
      setLink(singleTemplate.link);
    }
  }, [singleTemplate]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('link', link);

    try {
      await updateTemplate(id, formData);
      navigate('/templates');
    } catch (error) {
      console.error('Failed to update template:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTemplate(id);
      navigate('/templates'); 
    } catch (error) {
      console.error('Failed to delete template:', error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-4 sm:ml-64 flex-1">
        <h1 className="text-2xl font-bold mb-4">Edit Template</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 font-semibold">
              Template Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="link" className="block mb-2 font-semibold">
              Template Link:
            </label>
            <input
              type="text"
              id="link"
              name="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div class="flex justify-between items-center">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-orange-400"
            >
              Save Changes
            </button>
            <button
              type="submit"
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-orange-400"
            >
              Delete Template
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTemplate;
