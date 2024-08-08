// SPARE CODE 
import React, { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import Sidebar from "../components/Sidebar";

const Task = () => {
  const { tasks, doneTasks, addTask, updateTaskStatus, clearDoneTasks } = useContext(TaskContext);

  const [taskName, setTaskName] = useState("");
  const [taskStatus, setTaskStatus] = useState("to-do");
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignedProject, setAssignedProject] = useState("");

  // State for editing
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskName, setEditTaskName] = useState("");
  const [editTaskStatus, setEditTaskStatus] = useState("");
  const [editAssignedTo, setEditAssignedTo] = useState("");
  const [editDueDate, setEditDueDate] = useState("");
  const [editAssignedProject, setEditAssignedProject] = useState("");

  const handleAddTask = () => {
    if (taskName.trim() === "") return;

    const newTask = {
      task_name: taskName,
      status: taskStatus,
      project_id: assignedProject,
      user_id: assignedTo,
      deadline: dueDate,
    };

    addTask(newTask);

    setTaskName("");
    setTaskStatus("to-do");
    setAssignedTo("");
    setAssignedProject("");
    setDueDate("");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns month from 0-11
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleEditClick = (task) => {
    setEditTaskId(task.id);
    setEditTaskName(task.task_name);
    setEditTaskStatus(task.status);
    setEditAssignedTo(task.user_id);
    setEditDueDate(task.deadline);
    setEditAssignedProject(task.project_id);
  };

  const handleSaveEdit = () => {
    if (editTaskId === null) return;
  
    const updatedTask = {
      id: editTaskId,
      task_name: editTaskName,
      status: editTaskStatus,
      project_id: editAssignedProject,
      user_id: editAssignedTo,
      deadline: editDueDate,
    };
  
    // Call the function to update the task
    updateTask(updatedTask);
  
    // Reset edit state
    setEditTaskId(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="flex flex-1">
          <div className="flex-1 p-4 overflow-auto">
            <h2 className="text-xl font-bold mb-2">New Task</h2>
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
                <option value="to-do" className="text-gray-600">To Do</option>
                <option value="in-progress" className="text-yellow-500">In Progress</option>
                <option value="stuck" className="text-red-700">Stuck</option>
                <option value="done" className="text-green-700">Done</option>
              </select>
              <input
                type="text"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                placeholder="Assigned User id"
                className="mt-2 w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                value={assignedProject}
                onChange={(e) => setAssignedProject(e.target.value)}
                placeholder="Assigned Project id"
                className="mt-2 w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="mt-2 w-full p-2 border border-gray-300 rounded"
              />
              <button
                onClick={handleAddTask}
                className="mt-2 px-4 py-2 bg-orange-200 text-black rounded hover:text-white hover:bg-orange-300"
              >
                Add Task
              </button>
            </section>
            <section className="mb-4 flex justify-around">
              <div className="flex flex-col items-center">
                <span className="text-lg text-gray-600 font-bold">{tasks.filter(task => task.status === "to-do").length}</span>
                <span className="text-gray-600 font-bold">To Do</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-lg text-yellow-500 font-bold">{tasks.filter(task => task.status === "in-progress").length}</span>
                <span className="text-yellow-500 font-bold">In Progress</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-lg text-red-700 font-bold">{tasks.filter(task => task.status === "stuck").length}</span>
                <span className="text-red-700 font-bold">Stuck</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-lg text-green-700 font-bold">{doneTasks.length}</span>
                <span className="text-green-700 font-bold">Done</span>
              </div>
            </section>
            <section className="mb-4">
              <h2 className="text-xl font-bold mb-2">To Do Tasks</h2>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2">Task Name</th>
                    <th className="border border-gray-300 p-2">Assigned User</th>
                    <th className="border border-gray-300 p-2">Assigned Project</th>
                    <th className="border border-gray-300 p-2">Due Date</th>
                    <th className="border border-gray-300 p-2">Status</th>
                    <th className="border border-gray-300 p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.filter(task => task.status !== "done").map(task => (
                    <tr key={task.id}>
                      <td className="border border-gray-300 p-2">
                        {editTaskId === task.id ? (
                          <input
                            type="text"
                            value={editTaskName}
                            onChange={(e) => setEditTaskName(e.target.value)}
                            className="w-full p-1 border border-gray-300 rounded"
                          />
                        ) : (
                          task.task_name
                        )}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {editTaskId === task.id ? (
                          <input
                            type="text"
                            value={editAssignedTo}
                            onChange={(e) => setEditAssignedTo(e.target.value)}
                            className="w-full p-1 border border-gray-300 rounded"
                          />
                        ) : (
                          task.user_name
                        )}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {editTaskId === task.id ? (
                          <input
                            type="text"
                            value={editAssignedProject}
                            onChange={(e) => setEditAssignedProject(e.target.value)}
                            className="w-full p-1 border border-gray-300 rounded"
                          />
                        ) : (
                          task.project_id
                        )}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {editTaskId === task.id ? (
                          <input
                            type="date"
                            value={editDueDate}
                            onChange={(e) => setEditDueDate(e.target.value)}
                            className="w-full p-1 border border-gray-300 rounded"
                          />
                        ) : (
                          formatDate(task.deadline)
                        )}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {editTaskId === task.id ? (
                          <select
                            value={editTaskStatus}
                            onChange={(e) => setEditTaskStatus(e.target.value)}
                            className="p-1 border border-gray-300 rounded"
                          >
                            <option value="to-do">To Do</option>
                            <option value="in-progress">In Progress</option>
                            <option value="stuck">Stuck</option>
                            <option value="done">Done</option>
                          </select>
                        ) : (
                          task.status
                        )}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {editTaskId === task.id ? (
                          <button
                            onClick={handleSaveEdit}
                            className="px-2 py-1 bg-green-500 text-white rounded"
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            onClick={() => handleEditClick(task)}
                            className="px-2 py-1 bg-blue-500 text-white rounded"
                          >
                            Edit
                          </button>
                        )}
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
                    <th className="border border-gray-300 p-2">Assigned User</th>
                    <th className="border border-gray-300 p-2">Assigned Project</th>
                    <th className="border border-gray-300 p-2">Due Date</th>
                    <th className="border border-gray-300 p-2">Status</th>
                    <th className="border border-gray-300 p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {doneTasks.filter(task => task.status === "done").map(task => (
                    <tr key={task.id}>
                      <td className="border border-gray-300 p-2">{task.task_name}</td>
                      <td className="border border-gray-300 p-2">{task.user_name}</td>
                      <td className="border border-gray-300 p-2">{task.project_id}</td>
                      <td className="border border-gray-300 p-2">{formatDate(task.deadline)}</td>
                      <td className="border border-gray-300 p-2">{task.status}</td>
                      <td className="border border-gray-300 p-2">
                        {/* No edit functionality for done tasks */}
                      </td>
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






// ORIGINAL

