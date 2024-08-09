// src/pages/Templates.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

// Sample data (replace this with actual data fetching)
const initialTemplates = [
  { id: 1, name: "Template 1", link: "http://example.com/template1" },
  { id: 2, name: "Template 2", link: "http://example.com/template2" },
];

const Templates = () => {
  const [templates, setTemplates] = useState(initialTemplates);
  const [deleteTemplateId, setDeleteTemplateId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteClick = (templateId) => {
    setDeleteTemplateId(templateId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (deleteTemplateId) {
      setTemplates((prev) => prev.filter((t) => t.id !== deleteTemplateId));
    }
    setShowDeleteConfirm(false);
    setDeleteTemplateId(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setDeleteTemplateId(null);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-4 sm:ml-64 flex-1">
        <section className="mb-4">
          <h1 className="text-2xl font-bold mb-4">Templates</h1>
          <Link to="/add-template" className="inline-block px-4 py-2 bg-orange-300 text-white rounded hover:bg-orange-400 mb-4">
            Add New Template
          </Link>
          <div className="space-y-4">
            {templates.length > 0 ? (
              templates.map((template) => (
                <div key={template.id} className="flex items-start p-4 border rounded shadow-lg">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
                    <a href={template.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      View Link
                    </a>
                    <div className="mt-2 flex space-x-2">
                      <Link to={`/edit-template/${template.id}`} className="text-yellow-500 hover:underline">
                        Edit
                      </Link>
                      <button onClick={() => handleDeleteClick(template.id)} className="text-red-500 hover:underline">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No templates available.</p>
            )}
          </div>
        </section>
      </div>
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Are you sure you want to delete this template?</h2>
            <div className="flex justify-end space-x-4">
              <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                Delete
              </button>
              <button onClick={cancelDelete} className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Templates;
