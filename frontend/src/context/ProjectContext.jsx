import React, { createContext, useState } from 'react';

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);

  const addProject = (name, description, deadline) => {
    fetch('http://localhost:5000/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, deadline })
    })
      .then(response => response.json())
      .then(data => setProjects([...projects, data]))
      .catch(err => console.error(err));
  };

  const updateProject = (id, name, description, deadline) => {
    fetch(`http://localhost:5000/projects/${id}`, {
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

  const deleteProject = (id) => {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: 'DELETE'
    })
      .then(() => setProjects(projects.filter(project => project.id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <ProjectContext.Provider value={{ projects, addProject, updateProject, deleteProject }}>
      {children}
    </ProjectContext.Provider>
  );
};
