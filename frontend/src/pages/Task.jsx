import React, { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import Sidebar from "../components/Sidebar";


const Task = () => {
  const { tasks, doneTasks, 
    addTask, updateTask, 
    updateTaskStatus, clearDoneTasks, 
    fetchUserByName, fetchProjectByName
    } = useContext(TaskContext);

  const [taskName, setTaskName] = useState("");
  const [taskStatus, setTaskStatus] = useState("to-do");
  const [assignedTo, setAssignedTo] = useState("");
  const [assignedProject, setAssignedProject] = useState("");
  const [editableTaskId, setEditableTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState({ task_name: '', status: '', user_id: '', project_id: '' });

  
  const handleAddTask = () => {

    if (taskName.trim() === "") return;
  
    // Fetch the project ID based on the assigned project's name
    fetchProjectByName(assignedProject)
      .then(project => {
        if (project) {
          // Fetch the user ID based on the assigned user's name
          fetchUserByName(assignedTo)
            .then(user => {
              if (user) {
                const newTask = {
                  task_name: taskName,
                  status: taskStatus,
                  project_id: project.id,
                  user_id: user.id,
                };
  
                // Call addTask with the new task
                addTask(newTask);
  
                // Reset the form fields
                setTaskName("");
                setTaskStatus("to-do");
                setAssignedTo("");
                setAssignedProject("");
              } else {
                console.error('User not found for the assigned name');
              }
            })
            .catch(error => console.error('Failed to fetch user by name:', error));
        } else {
          console.error('Project not found for the assigned name');
        }
      })
      .catch(error => console.error('Failed to fetch project by name:', error));
  };
  

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedTask(prevState => ({ ...prevState, [name]: value }));
  };

  const handleEditClick = (task) => {
    setEditableTaskId(task.id);
    setEditedTask({
      task_name: task.task_name,
      status: task.status,
      user_id: task.user_id,
      project_id: task.project_id
    });
  };

  const handleSaveClick = (taskId) => {
    updateTask(taskId, editedTask);
    setEditableTaskId(null); // Exit editing mode
  };

  const handleCancelClick = () => {
    setEditableTaskId(null); // Exit editing mode
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Sidebar />

      <div className="p-4 sm:ml-64">
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
                <option value="to-do" className="text-gray-600">To Do</option>
                <option value="in-progress" className="text-yellow-500">In Progress</option>
                <option value="stuck" className="text-red-700">Stuck</option>
                <option value="done" className="text-green-700">Done</option>
              </select>
              <input
                type="text"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                placeholder="Assigned User"
                className="mt-2 w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                value={assignedProject}
                onChange={(e) => setAssignedProject(e.target.value)}
                placeholder="Assigned Project"
                className="mt-2 w-full p-2 border border-gray-300 rounded"
              />
              {/* <select
              id="project options"
              value={projectsDropdown}
              onChange={(e) => setAssignedProject(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Select a project</option>
              {projectsOptions.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select> */}
              <button
                onClick={handleAddTask}
                className="mt-2 px-4 py-2 bg-orange-200 text-black font-semibold rounded hover:text-white hover:bg-orange-300"
              >
                Add Task
              </button>
            </section>

            {/* Task Count */}
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
                <span className="text-lg  text-red-700 font-bold">{tasks.filter(task => task.status === "stuck").length}</span>
                <span className="text-red-700 font-bold">Stuck</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-lg text-green-700 font-bold">{doneTasks.length}</span>
                <span className="text-green-700 font-bold">Done</span>
              </div>
            </section>

            {/* Task Tables */}
            <section className="mb-4">
              <h2 className="text-xl font-bold mb-2">To Do Tasks</h2>
              <table className="w-full border-collapse  border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2">Task Name</th>
                    <th className="border border-gray-300 p-2">Assigned User</th>
                    <th className="border border-gray-300 p-2">Assigned Project</th>
                    <th className="border border-gray-300 p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.filter(task => task.status !== "done").map(task => (
                    <tr key={task.id}>
                      <td className="border border-gray-300 p-2">
                        {editableTaskId === task.id ? (
                          <input
                            type="text"
                            name="task_name"
                            value={editedTask.task_name}
                            onChange={handleEditChange}
                            className="p-1 border border-gray-300 rounded"
                          />
                        ) : (
                          task.task_name
                        )}
                      </td>

                      <td className="border border-gray-300 p-2">
                        {editableTaskId === task.id ? (
                          <input
                            type="text"
                            name="user_id"
                            value={editedTask.user_id}
                            onChange={handleEditChange}
                            className="p-1 border border-gray-300 rounded"
                          />
                        ) : (
                          task.user_name
                        )}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {editableTaskId === task.id ? (
                          <input
                            type="text"
                            name="project_id"
                            value={editedTask.project_id}
                            onChange={handleEditChange}
                            className="p-1 border border-gray-300 rounded"
                          />
                        ) : (
                          task.project_name
                        )}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {editableTaskId === task.id ? (
                          <select
                            name="status"
                            value={editedTask.status}
                            onChange={handleEditChange}
                            className="p-1 border border-gray-300 rounded"
                          >
                            <option value="to-do">To Do</option>
                            <option value="in-progress">In Progress</option>
                            <option value="stuck">Stuck</option>
                            <option value="done">Done</option>
                          </select>
                        ) : (
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
                        )}
                      </td>

                      <td className="border border-gray-300 p-2">
                        {editableTaskId === task.id ? (
                          <>
                            <button
                              onClick={() => handleSaveClick(task.id)}
                              className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancelClick}
                              className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleEditClick(task)}
                            className="px-2 py-1 bg-orange-200 text-black text-black rounded hover:bg-orange-300 hover:text-white"
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
                    <th className="border border-gray-300 p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {doneTasks.filter(task => task.status === "done").map(task => (
                    <tr key={task.id}>
                      <td className="border border-gray-300 p-2">
                        {task.task_name}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {task.user_name}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {task.project_name}
                      </td>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;