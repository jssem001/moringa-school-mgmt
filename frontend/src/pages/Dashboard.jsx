import React from "react";
import logo from '../images/MoringaLogo.png'
import { Link } from 'react-router-dom'
// import { ProjectContext } from "../context/ProjectContext";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {

    
    //fetch projects
    
    
    return (
        <>
            <Sidebar />

            <div class="p-4 sm:ml-64">
            <div class="p-4 rounded-lg">
                <h1 class="text-3xl mb-4 font-semibold text-center">Dashboard</h1>
                
                <div class="grid grid-cols-5 gap-4 mb-4 border">
                    <div class="flex items-center justify-center h-24 rounded bg-gray-400 ">
                        <p class="text-2xl text-white ">
                        To Do
                        </p>
                    </div>
                    <div class="flex items-center justify-center h-24 rounded bg-gray-400 ">
                        <p class="text-2xl text-white ">
                        In Progress
                        </p>
                    </div>
                    <div class="flex items-center justify-center h-24 rounded bg-gray-400 ">
                        <p class="text-2xl text-white ">
                        Completed
                        </p>
                    </div>
                    <div class="flex items-center justify-center h-24 rounded bg-gray-400 ">
                        <p class="text-2xl text-white ">
                        Overview
                        </p>
                    </div>
                    <div class="flex items-center justify-center h-24 rounded bg-orange-200 ">
                        <Link to="/tasks"><p class="text-2xl text-black font-semibold">
                        Add Task
                        </p></Link>
                    </div>
                </div>
                <div class="grid grid-cols-3 gap-4 mb-4 border">
                    <div class="flex items-center justify-center h-24 rounded bg-gray-400 ">
                        <p class="text-2xl text-white">Projects</p>
                    </div>
                    <div class="flex items-center justify-center h-24 rounded bg-gray-400 ">
                        <p class="text-2xl text-white ">
                        Labs
                        </p>
                    </div>
                    <div class="flex items-center justify-center h-24 rounded bg-gray-400 ">
                        <p class="text-2xl text-white ">
                        Recent Activity
                        </p>
                    </div>
                </div>
                <div class="flex items-start justify-center h-48 mb-4 rounded bg-gray-400 ">
                    <Link to="/analytics"><p class="text-2xl text-white ">
                    Recent Project Analysis    
                    </p></Link>
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

export default Dashboard