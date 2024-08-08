import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const SingleTemplate = () => {
  const { id } = useParams();
  const [template, setTemplate] = useState(null);
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
    };
    fetchTemplate();
  }, [id]);

  if (!template) return <div>Loading...</div>;

  return (
    <div className="flex">
      <Sidebar />

      <div className="p-4 sm:ml-64 flex-1">
        <section className="mb-4">
          <h1 className="text-2xl font-bold mb-4">{template.title}</h1>
          <div className="flex items-start">
            <img
              src={template.imagePreviewUrl}
              alt="Template Preview"
              className="w-48 h-48 object-cover mr-4"
            />
            <div className="flex-1">
              <p className="text-lg mb-2">{template.description}</p>
              <p className="mb-2">
                <strong>Figma Design:</strong>{" "}
                <a
                  href={template.figmaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {template.figmaLink}
                </a>
              </p>
              <p className="mb-2">
                <strong>SQL Diagram:</strong>{" "}
                <a
                  href={template.sqlDiagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {template.sqlDiagram}
                </a>
              </p>
            </div>
          </div>
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

export default SingleTemplate;
