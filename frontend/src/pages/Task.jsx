import React, { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import Sidebar from "../components/Sidebar";


const Task = () => {
  
  const { tasks, doneTasks, addTask, updateTaskStatus, clearDoneTasks } = useContext(TaskContext);

  // const [tasks, setTasks] = useState([]);
  // const [doneTasks, setDoneTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskStatus, setTaskStatus] = useState("to-do");
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState("");
  // const [notes, setNotes] = useState("");
  const [assignedProject, setAssignedProject] = useState("");
  // const [files, setFiles] = useState(null); //include later

  // const addTask = () => {
  //   if (taskName.trim() === "") return;

  //   const newTask = {
  //     id: Date.now(),
  //     name: taskName,
  //     status: taskStatus,
  //     assignedTo,
  //     dueDate,
  //     notes,
  //   };
  // const handleFileChange = (e) => {
  //   setFiles(e.target.files);
  // };

  const handleAddTask = () => {
    if (taskName.trim() === "") return;

    const dateParts = dueDate.split("-");
    const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;


    const newTask = {
      task_name: taskName,
      status: taskStatus,
      project_id: assignedProject,
      user_id: assignedTo,
      deadline: formattedDate,
      // notes,
      // file_attachments: files,
    };

    addTask(newTask);

    // if (taskStatus === "done") {
    //   setDoneTasks([...doneTasks, newTask]);
    // } else {
    //   setTasks([...tasks, newTask]);
    // }

    // Reset fields
    setTaskName("");
    setTaskStatus("to-do");
    setAssignedTo("");
    setAssignedProject("");
    setDueDate("");
    // setNotes("");
    // setFiles(null);
  };

  const formatDate = (dateString) => {
    if (dateString !== null) {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns month from 0-11
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }
    
  };
  // const updateTaskStatus = (taskId, newStatus) => {
  //   // Update the status of the task
  //   setTasks(tasks.map(task => 
  //     task.id === taskId ? { ...task, status: newStatus } : task
  //   ));

  //   // If the new status is "done", move the task to the done list
  //   if (newStatus === "done") {
  //     const taskToMove = tasks.find(task => task.id === taskId);
  //     setDoneTasks([...doneTasks, taskToMove]);
  //     setTasks(tasks.filter(task => task.id !== taskId));
  //   }
  // };

  // const clearDoneTasks = () => {
  //   setDoneTasks([]);
  // };

  return (
    <div className="flex flex-col min-h-screen">
      
      <Sidebar />
      
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
            {/* <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notes"
              rows="4"
              className="mt-2 w-full p-2 border border-gray-300 rounded"
            /> */}
            {/* <input
              type="file"
              name="files"
              multiple
              onChange={handleFileChange}
              className="w-full  mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            /> */}
            <button
              onClick={handleAddTask}
              className="mt-2 px-4 py-2 bg-orange-200 text-black rounded hover:text-white hover:bg-orange-300"
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
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">Task Name</th>
                  {/* <th className="border border-gray-300 p-2">Assigned User</th> */}
                  <th className="border border-gray-300 p-2">Assigned User</th>
                  <th className="border border-gray-300 p-2">Assigned Project</th>
                  <th className="border border-gray-300 p-2">Due Date</th>
                  {/* <th className="border border-gray-300 p-2">Notes</th> */}
                  <th className="border border-gray-300 p-2">Status</th>
                  {/* <th className="border border-gray-300 p-2">Files</th> */}
                </tr>
              </thead>
              <tbody>
                {tasks.filter(task => task.status !== "done").map(task => (
                  <tr key={task.id}>
                    <td className="border border-gray-300 p-2">{task.task_name}</td>
                    {/* <td className="border border-gray-300 p-2">{task.user_id}</td> */}
                    <td className="border border-gray-300 p-2">{task.user_name}</td>
                    <td className="border border-gray-300 p-2">{task.project_id}</td>
                    <td className="border border-gray-300 p-2">{formatDate(task.deadline)}</td>
                    {/* <td className="border border-gray-300 p-2">{task.notes}</td> */}
                    <td className="border border-gray-300 p-2">
                      <select
                        value={task.status}
                        onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                        className="p-1 border border-gray-300 rounded"
                      >
                        <option value="to-do" className="text-gray-600">To Do</option>
                        <option value="in-progress" className="text-yellow-500">In Progress</option>
                        <option value="stuck" className="text-red-700">Stuck</option>
                        <option value="done" className="text-green-700">Done</option>
                      </select>
                    </td>
                    {/* <td className="border border-gray-300 p-2">{task.file_attachments}</td> */}
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
                  {/* <th className="border border-gray-300 p-2">Assigned User</th> */}
                  <th className="border border-gray-300 p-2">Assigned User</th>
                  <th className="border border-gray-300 p-2">Assigned Project</th>
                  <th className="border border-gray-300 p-2">Due Date</th>
                  {/* <th className="border border-gray-300 p-2">Notes</th> */}
                  <th className="border border-gray-300 p-2">Status</th>
                  {/* <th className="border border-gray-300 p-2">Files</th> */}
                </tr>
              </thead>
              <tbody>
                {doneTasks.filter(task => task.status === "done").map(task => (
                  <tr key={task.id}>
                    <td className="border border-gray-300 p-2">{task.task_name}</td>
                    {/* <td className="border border-gray-300 p-2">{task.user_id}</td> */}
                    <td className="border border-gray-300 p-2">{task.user_name}</td>
                    <td className="border border-gray-300 p-2">{task.project_id}</td>
                    <td className="border border-gray-300 p-2">{task.deadline}</td>
                    {/* <td className="border border-gray-300 p-2">{task.notes}</td> */}
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
                    {/* <td className="border border-gray-300 p-2">{task.file_attachments}</td> */}
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
