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
  
//   Delete Project
  const deleteProject = (id) => {
    fetch(`${server_url}/project/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`, // Include the JWT token here
      },
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to delete project');
      }
      return response.json();
    })
    .then(() => {
      setProjects(projects.filter((project) => project.id !== id));
      toast.success('Project deleted successfully!');
    })
    .catch((error) => {
      console.error('Error deleting project:', error);
      toast.error('Error deleting project');
    });
  }


  return (
    <ProjectContext.Provider value={{ projects, singleProject, loading, addProject, updateProject, deleteProject, fetchProjects, fetchProject  }}>
      {children}
    </ProjectContext.Provider>
  );
};
