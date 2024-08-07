import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserContext } from './UserContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { server_url } from '../../config';

// Create a context for projects and templates
const ProjectContext = createContext();

// Create a provider component
export const ProjectProvider = ({ children }) => {
  const navigate = useNavigate();
  const { auth_token } = useContext(UserContext);

  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState(null);
  const [templates, setTemplates] = useState([]); // State for templates
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all projects
  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${server_url}/projects`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth_token}`
        },
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      setError("Failed to fetch projects");
      toast.error("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single project by ID
  const fetchProject = async (projectId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${server_url}/projects/${projectId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth_token}`
        },
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setProject(data);
    } catch (error) {
      setError("Failed to fetch project");
      toast.error("Failed to fetch project");
    } finally {
      setLoading(false);
    }
  };

  // Add a new project
  const addProject = async (title, description, startDate, dueDate, status) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${server_url}/projects`, {
        method: 'POST',
        body: JSON.stringify({
          title,
          description,
          startDate,
          dueDate,
          status
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth_token}`
        },
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      if (data.success) {
        toast.success("Project added successfully!");
        navigate("/projects");
        setProjects(prevProjects => [...prevProjects, data.project]);
      } else {
        toast.error(data.error || "An error occurred");
      }
    } catch (error) {
      setError("Failed to add project");
      toast.error("Failed to add project");
    } finally {
      setLoading(false);
    }
  };

  // Update an existing project
  const updateProject = async (projectId, updatedData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${server_url}/projects/${projectId}`, {
        method: 'PUT',
        body: JSON.stringify(updatedData),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth_token}`
        },
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      if (data.success) {
        toast.success("Project updated successfully!");
        navigate("/projects");
        setProjects(prevProjects => prevProjects.map(p => p.id === projectId ? data.project : p));
      } else {
        toast.error(data.error || "An error occurred");
      }
    } catch (error) {
      setError("Failed to update project");
      toast.error("Failed to update project");
    } finally {
      setLoading(false);
    }
  };

  // Delete a project
  const deleteProject = async (projectId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${server_url}/projects/${projectId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth_token}`
        },
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      if (data.success) {
        toast.success("Project deleted successfully!");
        navigate("/projects");
        setProjects(prevProjects => prevProjects.filter(p => p.id !== projectId));
      } else {
        toast.error(data.error || "An error occurred");
      }
    } catch (error) {
      setError("Failed to delete project");
      toast.error("Failed to delete project");
    } finally {
      setLoading(false);
    }
  };

  // Fetch templates related to projects
  const fetchTemplates = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${server_url}/templates`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth_token}`
        },
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setTemplates(data);
    } catch (error) {
      setError("Failed to fetch templates");
      toast.error("Failed to fetch templates");
    } finally {
      setLoading(false);
    }
  };

  // Fetch projects and templates on component mount
  useEffect(() => {
    fetchProjects();
    fetchTemplates();
  }, [auth_token]);

  // Provide context data
  const contextData = {
    projects,
    project,
    templates,
    fetchProject,
    addProject,
    updateProject,
    deleteProject,
    loading,
    error,
  };

  return (
    <ProjectContext.Provider value={contextData}>
      {children}
    </ProjectContext.Provider>
  );
};

// Custom hook for using the project context
export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};
