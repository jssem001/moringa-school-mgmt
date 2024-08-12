import React, { createContext, useState, useEffect } from 'react';
import { server_url } from "../../config";
import { toast } from 'react-toastify';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {

  const [tasks, setTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [authToken, setAuthToken] = useState(() => localStorage.getItem("access_token") || null);

  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch Tasks
  const fetchTasks = () => {
    fetch(`${server_url}/tasks`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        const tasksWithDetails = data.map(task =>
          Promise.all([
            fetchUserById(task.user_id),
            fetchProjectById(task.project_id)
          ])
          .then(([user, project]) => ({
            ...task,
            user_name: user?.name || 'Unknown',
            project_name: project?.name || 'Unknown'
          }))
        );
  
        Promise.all(tasksWithDetails)
          .then(updatedTasks => {
            const done = updatedTasks.filter(task => task.status === 'done');
            const pending = updatedTasks.filter(task => task.status !== 'done');
            setTasks(pending);
            setDoneTasks(done);
          })
          .catch(error => console.error('Failed to fetch tasks with details:', error));
      })
      .catch(error => console.error('Failed to fetch tasks:', error));
  };




  // Add Task
  const addTask = (task) => {
    fetch(`${server_url}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify(task),
    })
      .then(response => response.json())
      .then(data => {
        fetchUserById(data.user_id)
          .then(user => {
            return fetchProjectById(data.project_id)
              .then(project => {
                if (user && project) {
                  data.user_name = user.name; 
                  data.project_name = project.name;
                }
                if (data.status === 'done') {
                  setDoneTasks([...doneTasks, data]);
                } else {
                  setTasks([...tasks, data]);
                  toast.success('Task added');
                }
              });
          });
      })
      .catch(error => console.error('Failed to add task:', error));
  };



  // Update Task
  const updateTask = (taskId, updatedTask) => {
    fetch(`${server_url}/tasks/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(updatedTask),
    })
      .then(response => response.json())
      .then(data => {
        setTasks(tasks.map(task => 
          task.id === taskId ? { ...task, ...updatedTask } : task
        ));
      })
      .catch(error => console.error('Failed to update task:', error));
  };

  // Update Task Status

  const updateTaskStatus = (taskId, newStatus) => {
    fetch(`${server_url}/tasks/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({ status: newStatus }),    
    })
      .then(response => response.json())
      .then(data => {
        console.log('Updated task status:', data);
        setTasks(tasks.map(task => 
          task.id === taskId ? { ...task, status: newStatus } : task
        ));
        if (newStatus === 'done') {
          const taskToMove = tasks.find(task => task.id === taskId);
          setDoneTasks([...doneTasks, taskToMove]);
          setTasks(tasks.filter(task => task.id !== taskId));
        }
      })
      .catch(error => console.error('Failed to update task status:', error));
  };

  //Clear Done Tasks
  const clearDoneTasks = () => {
    const deletePromises = doneTasks.map(task =>
      fetch(`${server_url}/tasks/${task.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to delete task with ID: ${task.id}`);
          }
          return response.json();
        })
        .catch(error => console.error('Failed to delete task:', error))
    );
  
    Promise.all(deletePromises)
      .then(() => {
        setDoneTasks([]);
        toast.success('All done tasks have been cleared');
      })
      .catch(error => console.error('Failed to clear all done tasks:', error));
  };


  // Fetch User Name
  const fetchUserName = (userId) => {
    return fetch(`${server_url}/users/${userId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('User not found');
        }
        return response.json();
      })
      .then(user => user.name)
      .catch(error => {
        console.error('Failed to fetch user name:', error);
        return 'Unknown';
      });
  };
  
  // Fetch User BY Name
  const fetchUserByName = (userName) => {
    return fetch(`${server_url}/users`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch users or unauthorized');
        }
        return response.json();
      })
      .then(users => {
        const user = users.find(user => user.name === userName);
        if (!user) {
          toast.error('User not found');
          throw new Error('User not found');
        }
        return user;
      })
      .catch(error => {
        console.error('Failed to fetch user:', error);
        return null;
      });
  };

  const fetchUserById = (userId) => {
    return fetch(`${server_url}/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${authToken}`, // Include the Bearer token
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('User not found or unauthorized');
        }
        return response.json();
      })
      .then(user => user) 
      .catch(error => {
        console.error('Failed to fetch user:', error);
        return null;
      });
  };

  // Fetch Project by Name
  const fetchProjectByName = (projectName) => {
    return fetch(`${server_url}/projects`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Project not found or unauthorized');
        }
        return response.json();
      })
      .then(projects => {
        const project = projects.find(project => project.name === projectName);
        if (!project) {
          toast.error('Project not found');
          throw new Error('Project not found');
        }
        return project;
      })
      .catch(error => {
        console.error('Failed to fetch project:', error);
        return null;
      });
  };
  
  // Fetch Project by Id
  const fetchProjectById = (projectId) => {
    return fetch(`${server_url}/project/${projectId}`, {
      headers: {
        'Authorization': `Bearer ${authToken}`, // Include the Bearer token
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Project not found or unauthorized');
        }
        return response.json();
      })
      .then(project => project) 
      .catch(error => {
        console.error('Failed to fetch project:', error);
        return null;
      });
  };


  const contextData = { 
    tasks, 
    doneTasks, 
    addTask, 
    updateTask, 
    updateTaskStatus, 
    clearDoneTasks, 
    fetchUserByName, 
    fetchUserById,
    fetchProjectByName,
    fetchProjectById
   }


  return (
    <TaskContext.Provider value={contextData}>
      {children}
    </TaskContext.Provider>
  );

};

