// src/pages/Templates.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Templates = () => {
  // Sample templates data
  const [templates, setTemplates] = useState([
    {
      id: 1,
      title: "Template 1",
      description: "Description of template 1",
      figmaLink: "https://www.figma.com/file/1",
      sqlDiagram: "https://www.sqldiagram.com/1",
      imagePreviewUrl: "https://via.placeholder.com/150"
    },
    {
      id: 2,
      title: "Template 2",
      description: "Description of template 2",
      figmaLink: "https://www.figma.com/file/2",
      sqlDiagram: "https://www.sqldiagram.com/2",
      imagePreviewUrl: "https://via.placeholder.com/150"
    },
  ]);
  const [deleteTemplateId, setDeleteTemplateId] = useState(null); // State for template to be deleted
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // State for showing confirmation dialog

  // Show the delete confirmation dialog
  const handleDeleteClick = (templateId) => {
    setDeleteTemplateId(templateId);
    setShowDeleteConfirm(true);
  };

  // Confirm deletion of the template
  const confirmDelete = () => {
    setTemplates(templates.filter(template => template.id !== deleteTemplateId));
    setShowDeleteConfirm(false);
    setDeleteTemplateId(null);
  };

  // Cancel deletion of the template
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
          <Link
            to="/add-template"
            className="inline-block px-4 py-2 bg-orange-300 text-white rounded hover:bg-orange-400 mb-4"
          >
            Add New Template
          </Link>

          <div className="space-y-4">
            {templates.map((template) => (
              <div key={template.id} className="flex items-start p-4 border rounded shadow-lg">
                <div className="w-32 h-32 mr-4">
                  {template.imagePreviewUrl && (
                    <img src={template.imagePreviewUrl} alt="Preview" className="w-full h-full object-cover rounded" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{template.title}</h3>
                  <p className="mb-2">{template.description}</p>
                  <div className="flex flex-col space-y-1">
                    <a href={template.figmaLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      View Figma Design
                    </a>
                    <a href={template.sqlDiagram} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      View SQL Diagram
                    </a>
                  </div>
                  <div className="mt-2 flex space-x-2">
                    <Link to={`/templates/${template.id}`} className="text-blue-500 hover:underline">
                      View Details
                    </Link>
                    <Link to={`/edit-template/${template.id}`} className="text-yellow-500 hover:underline">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(template.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Are you sure you want to delete this template?</h2>
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

export default Templates;
