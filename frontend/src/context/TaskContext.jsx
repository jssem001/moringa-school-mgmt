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
        console.log('Fetched tasks:', data); 
        const tasksWithUserNames = data.map(task =>
          fetchUserById(task.user_id)
            .then(user => {
              if (user) {
                return { ...task, user_name: user.name };
              } else {
                return task;
              }
            })
        );
  
        Promise.all(tasksWithUserNames)
          .then(updatedTasks => {
            console.log('Updated tasks with user names:', updatedTasks);
            const done = updatedTasks.filter(task => task.status === 'done');
            const pending = updatedTasks.filter(task => task.status !== 'done');
            setTasks(pending);
            setDoneTasks(done);
          })
          .catch(error => console.error('Failed to fetch tasks:', error));
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
            data.user_name = user.name; 
            if (data.status === 'done') {
              setDoneTasks([...doneTasks, data]);
            } else {
              setTasks([...tasks, data]);
              toast.success('Task added');
            }
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

  // Clear Done Tasks

  const clearDoneTasks = () => {
    setDoneTasks([]);
    }

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



  return (
    <TaskContext.Provider value={{ tasks, doneTasks, addTask, updateTask, updateTaskStatus, clearDoneTasks, fetchUserByName, fetchUserById }}>
      {children}
    </TaskContext.Provider>
  );

};

