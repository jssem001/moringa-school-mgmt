import React, { useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { TemplateContext } from "../context/TemplateContext";

const SingleTemplate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchTemplate, singleTemplate } = useContext(TemplateContext);

  useEffect(() => {
    if (id) {
      fetchTemplate(id);
    }
  }, [id]);

  if (!singleTemplate) return <div>Loading...</div>;

  return (
    <div className="flex">
      <Sidebar />

      <div className="p-4 sm:ml-64 flex-1">
        <section className="mb-4">
          <h1 className="text-2xl font-bold mb-4">{singleTemplate.title}</h1>
          <div className="flex items-start">
            <img
              src={singleTemplate.imagePreviewUrl}
              alt="Template Preview"
              className="w-48 h-48 object-cover mr-4"
            />
            <div className="flex-1">
              <p className="text-lg mb-2">{singleTemplate.description}</p>
              <p className="mb-2">
                <strong>Figma Design:</strong>{" "}
                <a
                  href={singleTemplate.figmaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {singleTemplate.figmaLink}
                </a>
              </p>
              <p className="mb-2">
                <strong>SQL Diagram:</strong>{" "}
                <a
                  href={singleTemplate.sqlDiagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {singleTemplate.sqlDiagram}
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
