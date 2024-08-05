import React, { useState } from "react";
import { useParams } from "react-router-dom";
import projectData from "../data/projects";

const SingleProject = () => {
  const { id } = useParams();
  const project = projectData.find((project) => project.id === parseInt(id));
  const [comments, setComments] = useState(project.comments || []);
  const [newComment, setNewComment] = useState("");

  if (!project) {
    return <div>Project not found</div>;
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() !== "") {
      const updatedComments = [...comments, newComment];
      setComments(updatedComments);
      setNewComment("");
      // Save comments to the project's data source if needed
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
      <img src={project.image} alt={project.title} className="w-full h-32 object-cover mb-4" />
      <p className="mb-2">{project.description}</p>
      <p className="text-sm text-gray-600">Date: {project.date}</p>
      <p className="text-sm text-gray-600">Due Date: {project.duedate}</p>
      <p className="text-sm text-gray-600">Status: {project.status}</p>
      <a href={project.githubLink} className="text-blue-500 hover:underline">
        View on GitHub
      </a>

      {/* Comment Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Comments</h3>
        <ul className="space-y-2">
          {comments.map((comment, index) => (
            <li key={index} className="border-b pb-2">{comment}</li>
          ))}
        </ul>
        <form onSubmit={handleCommentSubmit} className="mt-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SingleProject;
