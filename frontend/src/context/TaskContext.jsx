import React, { createContext, useState, useEffect } from 'react';
import { server_url } from "../../config";


export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {

  const [tasks, setTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);


    // Fetch Tasks
  const fetchTasks = async () => {
    fetch(`${server_url}/tasks`)
      .then(response => response.json())
      .then(data => {
        const tasksWithUserNames = data.map(task => 
          fetchUserName(task.user_id).then(userName => ({ ...task, user_name: userName }))
        );

        Promise.all(tasksWithUserNames).then(updatedTasks => {
          const done = updatedTasks.filter(task => task.status === 'done');
          const pending = updatedTasks.filter(task => task.status !== 'done');
          setTasks(pending);
          setDoneTasks(done);
        });
      })
      .catch(error => console.error('Failed to fetch tasks:', error));
  };

  // Add Task
  const addTask = (task) => {
    fetch(`${server_url}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
      .then(response => response.json())
      .then(data => {
        fetchUserName(data.user_id)
          .then(userName => {
            data.user_name = userName;
            if (data.status === 'done') {
              setDoneTasks([...doneTasks, data]);
            } else {
              setTasks([...tasks, data]);
            }
          });
      })
      .catch(error => console.error('Failed to add task:', error));
  };    

  // Update Task Status

  const updateTaskStatus = (taskId, newStatus) => {
    fetch(`${server_url}/tasks/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),    
    })
      .then(response => response.json())
      .then(data => {
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


 // Get Name from the user table and assign it to a task. Use the user ID(task.user_id) to fetch the name from the user table


    const fetchUserName = (id) => {
        return fetch(`${server_url}/users/${id}`)
          .then(response => response.json())
          .then(user => user.name)
          .catch(error => {
            console.error('Failed to fetch user name:', error);
            return 'Unknown';
          });
      };




  return (
    <TaskContext.Provider value={{ tasks, doneTasks, addTask, updateTaskStatus, clearDoneTasks }}>
      {children}
    </TaskContext.Provider>
  );
};
