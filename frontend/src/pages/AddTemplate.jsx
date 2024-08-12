// src/pages/AddTemplate.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { TemplateContext } from '../context/TemplateContext';

const AddTemplate = () => {
  const [formData, setFormData] = useState({ name: "", link: "" });
  const { addTemplate } = useContext(TemplateContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateFormData = new FormData();
    templateFormData.append('name', formData.name);
    templateFormData.append('link', formData.link);

    addTemplate(templateFormData);
    navigate("/templates");
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-4 sm:ml-64 flex-1">
        <h1 className="text-2xl font-bold mb-4">Add Template</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 font-semibold">
              Template Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
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
              value={formData.link}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-orange-300 text-white rounded hover:bg-orange-400"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTemplate;