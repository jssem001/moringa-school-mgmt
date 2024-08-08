import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useProjects } from "../context/ProjectContext"; // Updated import

const EditTemplate = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [figmaLink, setFigmaLink] = useState("");
  const [sqlDiagram, setSqlDiagram] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const { fetchTemplates, updateTemplate } = useProjects(); // Updated usage
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAndSetTemplate = async () => {
      try {
        await fetchTemplates(); // Ensure templates are fetched
        const template = templates.find((template) => template.id === parseInt(id)); // Use the fetched templates
        if (template) {
          setTitle(template.title);
          setDescription(template.description);
          setFigmaLink(template.figmaLink);
          setSqlDiagram(template.sqlDiagram);
          setImagePreviewUrl(template.imagePreviewUrl);
        }
      } catch (error) {
        console.error("Failed to fetch template:", error);
      }
    };

    fetchAndSetTemplate();
  }, [id, fetchTemplates, templates]); // Added dependencies

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTemplate({ id: parseInt(id), title, description, figmaLink, sqlDiagram, imagePreviewUrl });
    navigate("/templates");
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="p-4 sm:ml-64 flex-1">
        <section className="mb-4">
          <h1 className="text-2xl font-bold mb-4">Edit Template</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                rows="4"
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Figma Design Link</label>
              <input
                type="url"
                value={figmaLink}
                onChange={(e) => setFigmaLink(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">SQL Diagram Link</label>
              <input
                type="url"
                value={sqlDiagram}
                onChange={(e) => setSqlDiagram(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Image Preview URL</label>
              <input
                type="url"
                value={imagePreviewUrl}
                onChange={(e) => setImagePreviewUrl(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save Changes
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default EditTemplate;
