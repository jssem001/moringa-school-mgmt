import React, { useState } from "react";
import logo from '../images/MoringaLogo.png';
import Sidebar from "../components/Sidebar";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskStatus, setTaskStatus] = useState("to-do");
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");

  const addTask = () => {
    if (taskName.trim() === "") return;

    const newTask = {
      id: Date.now(),
      name: taskName,
      status: taskStatus,
      assignedTo,
      dueDate,
      notes,
    };

    if (taskStatus === "done") {
      setDoneTasks([...doneTasks, newTask]);
    } else {
      setTasks([...tasks, newTask]);
    }

    // Reset fields
    setTaskName("");
    setTaskStatus("to-do");
    setAssignedTo("");
    setDueDate("");
    setNotes("");
  };

  const updateTaskStatus = (taskId, newStatus) => {
    // Update the status of the task
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));

    // If the new status is "done", move the task to the done list
    if (newStatus === "done") {
      const taskToMove = tasks.find(task => task.id === taskId);
      setDoneTasks([...doneTasks, taskToMove]);
      setTasks(tasks.filter(task => task.id !== taskId));
    }
  };

  const clearDoneTasks = () => {
    setDoneTasks([]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Sidebar />
      {/* <header className="bg-white text-black p-4 shadow-md">
        <nav className="flex justify-between items-center">
          <div className="flex items-center">
            <img src={logo} alt="Moringa Logo" className="h-12 w-12" />
          </div>
          <div className="space-x-4">
            <a href="/studentprofile" className="hover:underline">
              Profile
            </a>
            <a href="/projects" className="hover:underline">
              Projects
            </a>
            <a href="/tasks" className="hover:underline">
              Tasks
            </a>
            <a href="/calendar" className="hover:underline">
              Calendar
            </a>
            <a href="/teams" className="hover:underline">
              Teams
            </a>
            <a href="/dashboard" className="hover:underline">
              Dashboard
            </a>
            <a href="/logout" className="hover:underline">
              Sign Out
            </a>
          </div>
        </nav>
      </header> */}

      <div class="p-4 sm:ml-64">
      <div className="flex flex-1">
        {/* Main content area */}
        <div className="flex-1 p-4 overflow-auto">
        <h2 className="text-xl font-bold mb-2">New Task</h2>
          {/* Task Input */}
          <section className="mb-4">
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Enter task name"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <select
              value={taskStatus}
              onChange={(e) => setTaskStatus(e.target.value)}
              className="mt-2 w-full p-2 border border-gray-300 rounded"
            >
              <option value="to-do">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="stuck">Stuck</option>
              <option value="done">Done</option>
            </select>
            <input
              type="text"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              placeholder="Assigned To"
              className="mt-2 w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="mt-2 w-full p-2 border border-gray-300 rounded"
            />
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notes"
              rows="4"
              className="mt-2 w-full p-2 border border-gray-300 rounded"
            />
            <button
              onClick={addTask}
              className="mt-2 px-4 py-2 bg-orange-200 text-white rounded hover:bg-orange-300"
            >
              Add Task
            </button>
          </section>

          {/* Task Count */}
          <section className="mb-4 flex justify-around">
            <div className="flex flex-col items-center">
              <span className="text-lg font-bold">{tasks.filter(task => task.status === "to-do").length}</span>
              <span className="text-gray-600">To Do</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-lg font-bold">{tasks.filter(task => task.status === "in-progress").length}</span>
              <span className="text-gray-600">In Progress</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-lg font-bold">{tasks.filter(task => task.status === "stuck").length}</span>
              <span className="text-gray-600">Stuck</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-lg font-bold">{doneTasks.length}</span>
              <span className="text-gray-600">Done</span>
            </div>
          </section>

          {/* Task Tables */}
          <section className="mb-4">
            <h2 className="text-xl font-bold mb-2">To Do Tasks</h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">Task Name</th>
                  <th className="border border-gray-300 p-2">Assigned To</th>
                  <th className="border border-gray-300 p-2">Due Date</th>
                  <th className="border border-gray-300 p-2">Notes</th>
                  <th className="border border-gray-300 p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {tasks.filter(task => task.status !== "done").map(task => (
                  <tr key={task.id}>
                    <td className="border border-gray-300 p-2">{task.name}</td>
                    <td className="border border-gray-300 p-2">{task.assignedTo}</td>
                    <td className="border border-gray-300 p-2">{task.dueDate}</td>
                    <td className="border border-gray-300 p-2">{task.notes}</td>
                    <td className="border border-gray-300 p-2">
                      <select
                        value={task.status}
                        onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                        className="p-1 border border-gray-300 rounded"
                      >
                        <option value="to-do">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="stuck">Stuck</option>
                        <option value="done">Done</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="mb-4">
            <h2 className="text-xl font-bold mb-2">Done Tasks</h2>
            <button
              onClick={clearDoneTasks}
              className="mb-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Clear Done Tasks
            </button>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">Task Name</th>
                  <th className="border border-gray-300 p-2">Assigned To</th>
                  <th className="border border-gray-300 p-2">Due Date</th>
                  <th className="border border-gray-300 p-2">Notes</th>
                  <th className="border border-gray-300 p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {doneTasks.map(task => (
                  <tr key={task.id}>
                    <td className="border border-gray-300 p-2">{task.name}</td>
                    <td className="border border-gray-300 p-2">{task.assignedTo}</td>
                    <td className="border border-gray-300 p-2">{task.dueDate}</td>
                    <td className="border border-gray-300 p-2">{task.notes}</td>
                    <td className="border border-gray-300 p-2">{task.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Task;
