// src/pages/AddTemplate.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const AddTemplate = () => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, link })
      });
      if (response.ok) {
        navigate("/templates");
      } else {
        console.error('Failed to add template');
      }
    } catch (error) {
      console.error('Error adding template:', error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-4 sm:ml-64 flex-1">
        <section className="mb-4">
          <h1 className="text-2xl font-bold mb-4">Add New Template</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Link</label>
              <input
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Add Template
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default AddTemplate;
