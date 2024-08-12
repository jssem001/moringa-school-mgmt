// src/context/TemplateContext.js
import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { server_url } from "../../config";

export const TemplateContext = createContext();

export const TemplateProvider = ({ children }) => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [authToken, setAuthToken] = useState(() => localStorage.getItem("access_token") || null);
  const [singleTemplate, setSingleTemplate] = useState(null);

  // Fetch Templates
  const fetchTemplates = () => {
    setLoading(true);
    fetch(`${server_url}/templates`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch templates');
      }
      return response.json();
    })
    .then((data) => {
      setTemplates(data);
      toast.success('Templates loaded successfully!');
      setLoading(false);
    })
    .catch((error) => {
      console.error('Error fetching templates:', error);
      toast.error('Error fetching templates');
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  // Fetch Single Template
  const fetchTemplate = (id) => {
    fetch(`${server_url}/templates/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch template');
      }
      return response.json();
    })
    .then((data) => {
      setSingleTemplate(data);
      toast.success('Template loaded successfully!');
    })
    .catch((error) => {
      console.error('Error fetching template:', error);
      toast.error('Error fetching template');
    });
  };

  // Add Template
  const addTemplate = (template) => {
    fetch(`${server_url}/templates`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
      body: template,
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to add template');
      }
      return response.json();
    })
    .then((data) => {
      setTemplates([...templates, data]);
      toast.success('Template added successfully!');
    })
    .catch((error) => {
      console.error('Error adding template:', error);
      toast.error('Error adding template');
    });
  };

  // Update Template
  const updateTemplate = (id, template) => {
    fetch(`${server_url}/templates/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
      body: template,
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to edit template');
      }
      return response.json();
    })
    .then((data) => {
      setTemplates(templates.map((template) => (template.id === id ? data : template)));
      toast.success('Template edited successfully!');
    })
    .catch((error) => {
      console.error('Error editing template:', error);
      toast.error('Error editing template');
    });
  };

  // Delete Template

  const deleteTemplate = (id) => {
    fetch(`${server_url}/templates/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to delete template');
      }
      return response.json();
    })
    .then(() => {
      setTemplates(templates.filter((template) => template.id !== id));
      toast.success('Template deleted successfully!');
    })
    .catch((error) => {
      console.error('Error deleting template:', error);
      toast.error('Error deleting template');
    });
  };

  return (
    <TemplateContext.Provider value={{ templates, singleTemplate, loading, addTemplate, updateTemplate, deleteTemplate, fetchTemplates, fetchTemplate }}>
      {children}
    </TemplateContext.Provider>
  );
};
