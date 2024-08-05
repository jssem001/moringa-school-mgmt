import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import projectData from "../data/projects";
import Sidebar from "../components/Sidebar";

const SingleProject = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchedProject = projectData.find((p) => p.id === parseInt(projectId));
    setProject(fetchedProject);

    // Simulate fetching comments
    // setComments([...]);
  }, [projectId]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !newComment) {
      alert("Please fill out all fields.");
      return;
    }

    // Add logic to submit new comment
    setComments([...comments, { name, email, text: newComment }]);
    setNewComment("");
    setName("");
    setEmail("");
  };

  if (!project) return <div className="text-center text-xl">Loading...</div>;

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-4 sm:ml-64">
        <div className="container mx-auto p-6">
          <div className="flex flex-col md:flex-row md:space-x-6">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-4xl font-bold mb-4">{project.title}</h2>
              <p className="text-lg mb-4 text-gray-800">{project.description}</p>
              <div className="text-sm text-gray-600 mb-4">
                <p><strong>Date:</strong> {project.date}</p>
                <p><strong>Due Date:</strong> {project.duedate}</p>
                <p><strong>Status:</strong> {project.status}</p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                View Reports & Analytics
              </button>
            </div>
          </div>

          <section className="mt-12">
            <h3 className="text-3xl font-semibold mb-6">Comments</h3>
            <div className="space-y-4 mb-8">
              {comments.map((comment, index) => (
                <div key={index} className="p-4 border border-gray-300 rounded-lg shadow-sm">
                  <p className="font-semibold text-gray-900">{comment.name}</p>
                  <p className="text-gray-600">{comment.email}</p>
                  <p className="mt-2 text-gray-800">{comment.text}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleCommentSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
              >
                Add Comment
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SingleProject;
