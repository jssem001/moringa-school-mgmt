import React, { createContext, useState, useEffect } from 'react';
import { server_url } from "../../config";

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  
  const [projects, setProjects] = useState([]);
  
  // Get all projects
  const getProjects = () => {
    fetch(`${server_url}/project`)
      .then(response => response.json())
      .then(data => setProjects(data))
      .catch(err => console.error("Error fetching projects:", err));
 
  };

  // Add a new project
  const addProject = (name, description, deadline) => {
    fetch(`${server_url}/project`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, deadline })
    })
      .then(response => response.json())
      .then(data => setProjects([...projects, data]))
      .catch(err => console.error(err));
  };

  // Update an existing project
  const updateProject = (id, name, description, deadline) => {
    fetch(`${server_url}/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, deadline })
    })
      .then(response => response.json())
      .then(data => {
        setProjects(projects.map(project => (project.id === id ? data : project)));
      })
      .catch(err => console.error(err));
  };

  // Delete a project
  const deleteProject = (id) => {
    fetch(`${server_url}/projects/${id}`, {
      method: 'DELETE'
    })
      .then(() => setProjects(projects.filter(project => project.id !== id)))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <ProjectContext.Provider value={{ projects, getProjects, addProject, updateProject, deleteProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

