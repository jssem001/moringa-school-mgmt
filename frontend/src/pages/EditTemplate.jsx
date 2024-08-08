import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const EditTemplate = () => {
  const { id } = useParams();
  const [template, setTemplate] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [figmaLink, setFigmaLink] = useState("");
  const [sqlDiagram, setSqlDiagram] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the template data by id
    const fetchTemplate = async () => {
      // Replace with your API call or data fetching logic
      const fetchedTemplate = {
        id,
        title: "Sample Title",
        description: "Sample Description",
        figmaLink: "https://www.figma.com/file/sample",
        sqlDiagram: "https://www.sqldiagram.com/sample",
        imagePreviewUrl: "https://via.placeholder.com/150"
      };
      setTemplate(fetchedTemplate);
      setTitle(fetchedTemplate.title);
      setDescription(fetchedTemplate.description);
      setFigmaLink(fetchedTemplate.figmaLink);
      setSqlDiagram(fetchedTemplate.sqlDiagram);
      setImagePreviewUrl(fetchedTemplate.imagePreviewUrl);
    };
    fetchTemplate();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ title, description, figmaLink, sqlDiagram, imagePreviewUrl });
    navigate("/templates");
  };

  if (!template) return <div>Loading...</div>;

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
              className="px-4 py-2 bg-orange-300 text-white rounded hover:bg-orange-400"
            >
              Save Changes
            </button>
          </form>
          <button
            onClick={() => navigate("/templates")}
            className="mt-4 px-4 py-2 bg-blue-300 text-white rounded hover:bg-blue-400"
          >
            Back to Templates
          </button>
        </section>
      </div>
    </div>
  );
};

export default EditTemplate;
