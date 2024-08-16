import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProjectContext } from '../context/ProjectContext';
import Sidebar from '../components/Sidebar';

const SingleProject = () => {
  const { id } = useParams();
  const { fetchProject, singleProject } = useContext(ProjectContext);

  const [files, setFiles] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: '', comment: '' });
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    fetchProject(id);
  }, [id]);

  useEffect(() => {
    if (singleProject && singleProject.files) {
      setFiles(singleProject.files);
    }
  }, [singleProject]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComment((prevComment) => ({
      ...prevComment,
      [name]: value,
    }));
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    setComments((prevComments) => [...prevComments, newComment]);
    setNewComment({ name: '', comment: '' });
  };

  const handleFileClick = (file) => {
    const confirmDownload = window.confirm(`Do you want to download the file "${file}"?`);
    if (confirmDownload) {
      window.location.href = `/uploads/${file}`;
    }
  };

  const toggleComments = () => {
    setShowComments((prevShowComments) => !prevShowComments);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-4 sm:ml-64 flex-1">
        {singleProject ? (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">{singleProject.name}</h1>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Description</h2>
              <p className="text-gray-700">{singleProject.description}</p>
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Deadline</h2>
              <p className="text-gray-700">{singleProject.deadline}</p>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Attached Files</h2>
              <p className="text-gray-700">{singleProject.file_attachments}</p>
              {/* {files.length > 0 ? (
                <ul className="list-disc pl-5">
                  {files.map((file, index) => (
                    <li key={index} className="mb-2">
                      <button
                        onClick={() => handleFileClick(file)}
                        className="px-4 py-2 bg-orange-200 text-black rounded hover:bg-orange-300"
                      >
                        {file}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700">No files attached</p>
              )} */}
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold">Comments</h2>
              <button
                onClick={toggleComments}
                className="mb-4 px-4 py-2 bg-orange-200 text-black rounded hover:bg-orange-300"
              >
                {showComments ? 'Hide Comments' : 'Show Comments'}
              </button>
              {showComments && (
                <div className="border rounded-lg p-4 bg-gray-100">
                  {comments.length > 0 ? (
                    <ul className="list-disc pl-5">
                      {comments.map((comment, index) => (
                        <li key={index} className="mb-2">
                          <strong>{comment.name}:</strong> {comment.comment}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No comments yet.</p>
                  )}
                </div>
              )}
              <form onSubmit={handleCommentSubmit} className="mt-4">
                <div className="mb-2">
                  <label className="block font-semibold" htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newComment.name}
                    onChange={handleInputChange}
                    className="border rounded p-2 w-full"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block font-semibold" htmlFor="comment">Comment</label>
                  <textarea
                    id="comment"
                    name="comment"
                    value={newComment.comment}
                    onChange={handleInputChange}
                    className="border rounded p-2 w-full"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-200 text-black rounded hover:bg-orange-300"
                >
                  Add Comment
                </button>
              </form>
            </div>

            <Link
              to="/projects"
              className="px-4 py-2 bg-orange-200 text-black rounded hover:bg-orange-300"
            >
              Back to Projects
            </Link>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default SingleProject;
