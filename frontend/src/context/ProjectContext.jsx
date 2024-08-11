import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { server_url } from "../../config";
// import { useNavigate } from 'react-router-dom';

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
//   const navigate = useNavigate();  
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [authToken, setAuthToken] = useState(() => localStorage.getItem("access_token") || null);
  const [singleProject, setSingleProject] = useState(null);  

//   Fetch Projects list
  const fetchProjects = () => {
    setLoading(true);
    fetch(`${server_url}/project`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`, // Include the JWT token here
      },
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      return response.json();
    })
    .then((data) => {
      setProjects(data);
      toast.success('Projects loaded successfully!');
      setLoading(false);
    })
    .catch((error) => {
      console.error('Error fetching projects:', error);
      toast.error('Error fetching projects');
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  //Fetch single project
  const fetchProject = (id) => {
      fetch(`${server_url}/project/${id}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`, // Include the JWT token here
          },
      })
      .then((response) => {
          if (!response.ok) {
              throw new Error('Failed to fetch project');
          }
          return response.json();
      })
      .then((data) => {
          setSingleProject(data);
          toast.success('Project loaded successfully!');
      })
      .catch((error) => {
          console.error('Error fetching project:', error);
          toast.error('Error fetching project');
      });
  }



//   Add A Project
  const addProject = (project) => {
    fetch(`${server_url}/project`, {
      method: 'POST',
      headers: {
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`, // Include the JWT token here
      },
      body: project,
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to add project');
      }
      return response.json();
    })
    .then((data) => {
      setProjects([...projects, data]);
      toast.success('Project added successfully!');
    //   navigate('/projects');
    })
    .catch((error) => {
      console.error('Error adding project:', error);
      toast.error('Error adding project');
    });
  };

//   Edit Project
  const updateProject = (id, project) => {
    fetch(`${server_url}/project/${id}`, {
      method: 'PUT',
      headers: {
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`, // Include the JWT token here
      },
      body: project,
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to edit project');
      }
      return response.json();
    })
    .then((data) => {
      setProjects(projects.map((project) => (project.id === id ? data : project)));
      toast.success('Project edited successfully!');
    })
    .catch((error) => {
      console.error('Error editing project:', error);
      toast.error('Error editing project');
    });
  };    


  return (
    <ProjectContext.Provider value={{ projects, singleProject, loading, addProject, updateProject, fetchProjects, fetchProject  }}>
      {children}
    </ProjectContext.Provider>
  );
};

















































// // src/context/ProjectContext.jsx
// import { createContext, useContext, useEffect, useState } from "react";
// import { UserContext } from "./UserContext";
// import { toast } from 'react-toastify';
// import { useNavigate } from "react-router-dom";
// import { server_url } from '../../config';

// // Create a context for projects and templates
// const ProjectContext = createContext();

// // export const ProjectContext = createContext();

// export const ProjectProvider = ({ children }) => {
//   const nav = useNavigate();
//   const { auth_token } = useContext(UserContext);

//   const [projects, setProjects] = useState([]);
//   const [project, setProject] = useState(null);

//   // Fetch all projects
//   useEffect(() => {
//     fetch(`${server_url}/project`, {
//       headers: {
//         'Content-type': 'application/json',
//         "Authorization": `Bearer ${auth_token}`
//       },
//     })
//       .then(response => response.json())
//       .then(res => {
//         setProjects(res);
//       })
//       .catch(error => {
//         toast.error("Failed to fetch projects");
//       });
//   }, [auth_token]);

//   // Fetch single project by ID
//   const fetchProject = (projectId) => {
//     fetch(`${server_url}/project/${projectId}`, {
//       headers: {
//         'Content-type': 'application/json',
//         "Authorization": `Bearer ${auth_token}`
//       },
//     })
//       .then(response => response.json())
//       .then(res => {
//         setProject(res);
//       })
//       .catch(error => {
//         toast.error("Failed to fetch project");
//       });
//   };

//   // Add a new project
//   const addProject = (title, description, startDate, dueDate, status) => {
//     fetch(`${server_url}/project`, {
//       method: 'POST',
//       body: JSON.stringify({
//         title,
//         description,
//         deadline,
//         status
//       }),
//       headers: {
//         'Content-type': 'application/json',
//         "Authorization": `Bearer ${auth_token}`
//       },
//     })
//       .then(response => response.json())
//       .then(res => {
//         if (res.success) {
//           toast.success("Project added successfully!");
//           nav("/projects");
//           setProjects([...projects, res.project]);
//         } else {
//           toast.error(res.error || "An error occurred");
//         }
//       })
//       .catch(error => {
//         toast.error("Failed to add project");
//       });
//   };

//   // Update an existing project

//   const updateProject = (projectId, updatedData) => {
//     fetch(`${server_url}/project/${projectId}`, {
//       method: 'PUT',
//       body: JSON.stringify(updatedData),
//       headers: {
//         'Content-type': 'application/json',
//         "Authorization": `Bearer ${auth_token}`
//       },
//     })
//       .then(response => response.json())
//       .then(res => {
//         if (res.success) {
//           toast.success("Project updated successfully!");
//           nav("/projects");
//           setProjects(projects.map(p => p.id === projectId ? res.project : p));
//         } else {
//           toast.error(res.error || "An error occurred");
//         }
//       })
//       .catch(error => {
//         toast.error("Failed to update project");
//       });
//   };

//   // Delete a project

//   const deleteProject = (projectId) => {
//     fetch(`${server_url}/project/${projectId}`, {
//       method: 'DELETE',
//       headers: {
//         'Content-type': 'application/json',
//         "Authorization": `Bearer ${auth_token}`
//       },
//     })
//       .then(response => response.json())
//       .then(res => {
//         if (res.success) {
//           toast.success("Project deleted successfully!");
//           nav("/projects");
//           setProjects(projects.filter(p => p.id !== projectId));
//         } else {
//           toast.error(res.error || "An error occurred");
//         }
//       })
//       .catch(error => {
//         toast.error("Failed to delete project");
//       });
//   };

//   // Provide context data
//   const contextData = {
//     projects,
//     project,
//     fetchProject,
//     addProject,
//     updateProject,
//     deleteProject
//   };

//   useEffect(() => {
//     getProjects();
//   }, []);

//   return (

//     <ProjectContext.Provider value={contextData}>
//       {children}
//     </ProjectContext.Provider>
//   );
// };


// // Custom hook for using the project context
// export const useProjects = () => {
//   return useContext(ProjectContext);
// };

