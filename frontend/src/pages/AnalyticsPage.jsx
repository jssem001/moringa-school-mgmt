import React , { useContext } from "react";
import logo from '../images/MoringaLogo.png'
import { Link } from 'react-router-dom'
import Sidebar from "../components/Sidebar";
import { TaskContext } from "../context/TaskContext";
import TasksPie from "../Charts/TasksPie";

const AnalyticsPage = () => {

    const { tasks, doneTasks } = useContext(TaskContext);
    
    // Prepare data for the pie chart
    const statusCounts = tasks.reduce((acc, task) => {
     acc[task.status] = (acc[task.status] || 0) + 1;
     return acc;
    }, {});

    const pieData = [
        { name: 'To Do', value: statusCounts['to-do'] || 0 },
        { name: 'In Progress', value: statusCounts['in-progress'] || 0 },
        { name: 'Stuck', value: statusCounts['stuck'] || 0 },
        { name: 'Done', value: statusCounts['done'] || 0 }
    ];

    return (
        <>
            <Sidebar />

            <div class="p-4 sm:ml-64">
            <div class="p-4 rounded-lg">
                <h1 class="text-3xl mb-4 font-semibold text-center">Analytics</h1>
                
                <div class="grid grid-cols-5 gap-4 mb-4 border">
                    <div class="flex items-center justify-center h-24 rounded bg-gray-400 ">
                        <p class="text-xl text-white ">
                        Connected Boards
                        </p>
                    </div>
                    <div class="flex items-center justify-center h-24 rounded bg-gray-400 ">
                        <p class="text-2xl text-white ">
                        People
                        </p>
                    </div>
                    <div class="flex items-center justify-center h-24 rounded bg-gray-400 ">
                        <p class="text-2xl text-white ">
                        Filter
                        </p>
                    </div>
                    <div class="flex items-center justify-center h-24 rounded bg-gray-400 ">
                        <p class="text-2xl text-white ">
                        Search
                        </p>
                    </div>
                    <div class="flex items-center justify-center h-24 rounded bg-orange-200 ">
                        <p class="text-2xl font-semibold text-black ">
                        Add Widget
                        </p>
                    </div>
                </div>
                <div class="grid grid-cols-4 gap-4 mb-4 border">
                    <div class="flex items-center justify-center h-24 rounded bg-gray-400 ">
                        <p class="text-2xl text-white ">
                        Total Tasks: <span>{tasks.length}</span>
                        </p>
                    </div>
                    <div class="flex items-center justify-center h-24 rounded bg-gray-400 ">
                        <p class="text-2xl text-white ">
                        In Progress: <span>{tasks.filter(task => task.status === "in-progress").length}</span>
                        </p>
                    </div>
                    <div class="flex items-center justify-center h-24 rounded bg-gray-400 ">
                        <p class="text-2xl text-white ">
                        Stuck: <span>{tasks.filter(task => task.status === "stuck").length}</span>
                        </p>
                    </div>
                    <div class="flex items-center justify-center h-24 rounded bg-gray-400 ">
                        <p class="text-2xl text-white ">
                        Done: <span>{doneTasks.length}</span>
                        </p>
                    </div>
                    {/* <div class="flex items-center justify-center h-24 rounded bg-gray-400 ">
                        <p class="text-2xl text-white ">
                        Add Widget
                        </p>
                    </div> */}
                </div>
                
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div class="flex items-start justify-center h-[480px] mb-4 rounded bg-gray-400 ">
                        <div class="text-2xl text-white mb-4">Tasks By Status</div>
                        <TasksPie data={pieData} />        
                    </div>
                    <div class="flex items-start justify-center h-48 mb-4 rounded bg-gray-400 ">
                        <p class="text-2xl text-white ">
                            Tasks By Owner    
                        </p>    
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4 mb-4">
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
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                    {/* Add more widgets if needed */}
                </div>
            </div>
            </div>

        </>
    );
};

export default AnalyticsPage