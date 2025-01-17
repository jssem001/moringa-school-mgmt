// export default AnalyticsPage;
import React , { useState, useContext } from "react";
import Sidebar from "../components/Sidebar";
import { ProjectContext } from "../context/ProjectContext";
import { TaskContext } from "../context/TaskContext";
import TasksPie from "../Charts/TasksPie";
import UserBarChart from "../Charts/UserBarChart";

const AnalyticsPage = () => {

    const { tasks, doneTasks } = useContext(TaskContext);
    const { projects } = useContext(ProjectContext);
    const [selectedProjectId, setSelectedProjectId] = useState("");

    const user = JSON.parse(localStorage.getItem('user'));
    let isInstructor = false
    if (user && user.is_instructor === true) {
        isInstructor = true;
    }    

    const filteredTasks = selectedProjectId
        ? tasks.filter((task) => task.project_id.toString() === selectedProjectId.toString())
        : tasks;

    const filteredDoneTasks = selectedProjectId
        ? doneTasks.filter((task) => task.project_id.toString() === selectedProjectId.toString())
        : doneTasks;


    
    const totalTasks = filteredTasks.length + filteredDoneTasks.length;

    const toDoCount = filteredTasks.filter(task => task.status === "to-do").length;
    const inProgressCount = filteredTasks.filter(task => task.status === "in-progress").length;
    const stuckCount = filteredTasks.filter(task => task.status === "stuck").length;
    const doneCount = filteredDoneTasks.length;

    const pieData = [
        { name: 'To Do(%)', value: parseFloat(((toDoCount / totalTasks) * 100).toFixed(1)) },
        { name: 'In Progress(%)', value: parseFloat(((inProgressCount / totalTasks) * 100).toFixed(1)) },
        { name: 'Stuck(%)', value: parseFloat(((stuckCount / totalTasks) * 100).toFixed(1)) },
        { name: 'Done(%)', value: parseFloat(((doneCount / totalTasks) * 100).toFixed(1)) }
      ];

    return (
        <>
            <Sidebar />

            <div class="p-4 sm:ml-64">
            <div class="p-4 rounded-lg">
                <h1 class="text-3xl mb-4 font-semibold text-center">Reports & Analytics</h1>
                
                <div class="grid grid-cols-1 gap-4 mb-4 border">
                    <div class="flex items-center justify-center h-24 rounded bg-sky-950 ">
                        <select
                            className="text-xl text-white bg-sky-950 font-semibold"
                            value={selectedProjectId}
                            onChange={(e) => setSelectedProjectId(e.target.value)}
                        >
                            {isInstructor && (
                                    <option value="">All Projects</option>
                            )}
                            {projects.map((project) => (
                            <option key={project.id} value={project.id}>
                                {project.name}
                            </option>
                            ))}
                        </select>
                    </div>
                    {/* <div class="flex items-center justify-center h-24 rounded bg-gray-400 ">
                        <p class="text-2xl text-white ">
                        Search
                        </p>
                    </div> */}
                    
                </div>
                <div class="grid grid-cols-4 gap-4 mb-4 border">
                    <div class="flex items-center justify-center h-24 rounded border-2 border-black bg-gray-100 ">
                        <p class="text-2xl text-black font-semibold">
                        Total Tasks: <span>{totalTasks}</span>
                        </p>
                    </div>
                    <div class="flex items-center justify-center h-24 rounded border-2 border-black bg-gray-100 ">
                        <p class="text-2xl text-black font-semibold">
                        {/* In Progress: <span>{tasks.filter(task => task.status === "in-progress").length}</span> */}
                        In Progress: <span>{inProgressCount}</span>
                        </p>
                    </div>
                    <div class="flex items-center justify-center h-24 rounded border-2 border-black bg-gray-100 ">
                        <p class="text-2xl text-black font-semibold">
                        {/* Stuck: <span>{tasks.filter(task => task.status === "stuck").length}</span> */}
                        Stuck: <span>{stuckCount}</span>
                        </p>
                    </div>
                    <div class="flex items-center justify-center h-24 rounded border-2 border-black bg-gray-100 ">
                        <p class="text-2xl text-black font-semibold">
                        {/* Done: <span>{doneTasks.length}</span> */}
                        Done: <span>{doneCount}</span>
                        </p>
                    </div>
                    
                </div>
                
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div class="items-start justify-center h-[480px] mb-4 rounded bg-gray-100 border-2 border-black ">
                        <div class="text-2xl text-center text-black font-semibold mb-4">Tasks By Status</div>
                        <div class="mt-10 ml-10 py-5"><TasksPie data={pieData} /></div>        
                    </div>
                    <div class="items-start justify-center h-[480px] mb-4 rounded bg-gray-100 border-2 border-black">
                        <div class="text-2xl text-center text-black font-semibold mb-4">Open Tasks By User</div>
                        <div class="mt-10  py-3"><UserBarChart /></div>           
                    </div>
                </div>
                {/* <div class="grid grid-cols-2 gap-4 mb-4">
                    <div class="flex items-center justify-center rounded bg-gray-400 h-28 ">
                        <p class="text-2xl text-white ">
                        Deadlines
                        </p>
                    </div>
                    <div class="flex items-center justify-center rounded bg-gray-400 h-28 ">
                        <p class="text-2xl text-white ">
                        +
                        </p>
                    </div>
                    <div class="flex items-center justify-center rounded bg-gray-400 h-28 ">
                        <p class="text-2xl text-white ">
                        +
                        </p>
                    </div>
                    <div class="flex items-center justify-center rounded bg-gray-400 h-28 ">
                        <p class="text-2xl text-white ">
                        +
                        </p>
                    </div>
                </div> */}
                
                <div class="grid grid-cols-2 gap-4">
                    {/* Add more widgets if needed */}
                </div>
            </div>
            </div>

        </>
    );
};

export default AnalyticsPage
