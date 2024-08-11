import React, { useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProjectContext } from '../context/ProjectContext';

const SingleProject = () => {
  const { id } = useParams(); // Get the project ID from the URL
  const navigate = useNavigate();
  const { fetchProject, singleProject } = useContext(ProjectContext);

  useEffect(() => {
    if (id) {
      fetchProject(id);
    }
  }, [id]);

  if (!singleProject) {
    return <p>Loading project...</p>;
  }

  return (
    <div className="relative overflow-hidden p-6 max-w-3xl mx-auto">
      <button onClick={() => navigate('/projects')} className="absolute top-6 left-6 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 z-20">
        Back to Projects
      </button>
      <div className="absolute inset-0 z-10">
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>
      <div className="relative flex flex-col items-center bg-white p-6 rounded shadow-lg z-20 mt-24">
        <h2 className="text-3xl font-bold mb-4">{singleProject.name}</h2>
        <p className="text-gray-700 mb-2">{singleProject.description}</p>
        <p className="text-gray-700 mb-2">Due Date: {singleProject.deadline}</p>
        {/* Add more project details as needed */}
      </div>
    </div>
  );
};

export default SingleProject;





// import React, { useState, useEffect } from 'react';
// // import { useParams, Link } from 'react-router-dom';
// // import abstractImage from '../images/abstract-wavy.jpeg';
// // import projectData from '../data/projects';

// const SingleProject = () => {
  
//   return (
//     <div className="relative overflow-hidden p-6 max-w-3xl mx-auto">
//       <button onClick={() => navigate('/projects')} className="absolute top-6 left-6 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 z-20">
//         Back to Projects
//       </button>
//       <div className="absolute inset-0 z-10">
//         {/* <img src={abstractImage} alt="Abstract" className="w-full h-full object-cover blur-lg" style={{ position: 'absolute', top: 0, left: 0 }} /> */}
//         <div className="absolute inset-0 bg-black opacity-40"></div>
//       </div>
//       <div className="relative flex flex-col items-center bg-white p-6 rounded shadow-lg z-20 mt-24">
//         <h2 className="text-3xl font-bold mb-4">{project.name}</h2>
//         <p className="text-gray-700 mb-2">{project.description}</p>
//         {/* <p className="text-gray-700 mb-2">GitHub Link: <a href={project.githubLink} className="text-blue-500" target="_blank" rel="noopener noreferrer">{project.githubLink}</a></p> */}
//         {/* <p className="text-gray-700 mb-2">Status: {project.status}</p> */}
//         <p className="text-gray-700 mb-2">Due Date: {project.deadline}</p>
//         <div className="w-full mt-4">
//           {/* <form onSubmit={handleCommentSubmit} className="w-full space-y-4">
//             <textarea value={comment} onChange={handleCommentChange} placeholder="Add a comment..." className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
//             <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">Add Comment</button>
//           </form> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SingleProject;
