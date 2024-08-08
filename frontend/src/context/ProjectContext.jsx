
// src/context/ProjectContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { server_url } from '../../config';


export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const nav = useNavigate();
  const { auth_token } = useContext(UserContext);

  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState(null);

  // Fetch all projects
  useEffect(() => {
    fetch(`${server_url}/project`, {
      headers: {
        'Content-type': 'application/json',
        "Authorization": `Bearer ${auth_token}`
      },
    })
      .then(response => response.json())
      .then(res => {
        setProjects(res);
      })
      .catch(error => {
        toast.error("Failed to fetch projects");
      });
  }, [auth_token]);

  // Fetch single project by ID
  const fetchProject = (projectId) => {
    fetch(`${server_url}/project/${projectId}`, {
      headers: {
        'Content-type': 'application/json',
        "Authorization": `Bearer ${auth_token}`
      },
    })
      .then(response => response.json())
      .then(res => {
        setProject(res);
      })
      .catch(error => {
        toast.error("Failed to fetch project");
      });
  };

  // Add a new project
  const addProject = (title, description, startDate, dueDate, status) => {
    fetch(`${server_url}/project`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        description,
        deadline,
        status
      }),
      headers: {
        'Content-type': 'application/json',
        "Authorization": `Bearer ${auth_token}`
      },
    })
      .then(response => response.json())
      .then(res => {
        if (res.success) {
          toast.success("Project added successfully!");
          nav("/projects");
          setProjects([...projects, res.project]);
        } else {
          toast.error(res.error || "An error occurred");
        }
      })
      .catch(error => {
        toast.error("Failed to add project");
      });
  };

  // Update an existing project

  const updateProject = (projectId, updatedData) => {
    fetch(`${server_url}/project/${projectId}`, {
      method: 'PUT',
      body: JSON.stringify(updatedData),
      headers: {
        'Content-type': 'application/json',
        "Authorization": `Bearer ${auth_token}`
      },
    })
      .then(response => response.json())
      .then(res => {
        if (res.success) {
          toast.success("Project updated successfully!");
          nav("/projects");
          setProjects(projects.map(p => p.id === projectId ? res.project : p));
        } else {
          toast.error(res.error || "An error occurred");
        }
      })
      .catch(error => {
        toast.error("Failed to update project");
      });
  };

  // Delete a project

  const deleteProject = (projectId) => {
    fetch(`${server_url}/project/${projectId}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        "Authorization": `Bearer ${auth_token}`
      },
    })
      .then(response => response.json())
      .then(res => {
        if (res.success) {
          toast.success("Project deleted successfully!");
          nav("/projects");
          setProjects(projects.filter(p => p.id !== projectId));
        } else {
          toast.error(res.error || "An error occurred");
        }
      })
      .catch(error => {
        toast.error("Failed to delete project");
      });
  };

  // Provide context data
  const contextData = {
    projects,
    project,
    fetchProject,
    addProject,
    updateProject,
    deleteProject
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (

    <ProjectContext.Provider value={contextData}>
      {children}
    </ProjectContext.Provider>
  );
};


// Custom hook for using the project context
export const useProjects = () => {
  return useContext(ProjectContext);
};

