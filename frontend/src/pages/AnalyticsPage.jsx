import React from "react";
import logo from '../images/MoringaLogo.png'
import { Link } from 'react-router-dom'
import Sidebar from "../components/Sidebar";

const AnalyticsPage = () => {

    
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
                        All Tasks
                        </p>
                    </div>
                    <div class="flex items-center justify-center h-24 rounded bg-gray-400 ">
                        <p class="text-2xl text-white ">
                        In Progress
                        </p>
                    </div>
                    <div class="flex items-center justify-center h-24 rounded bg-gray-400 ">
                        <p class="text-2xl text-white ">
                        Stuck
                        </p>
                    </div>
                    <div class="flex items-center justify-center h-24 rounded bg-gray-400 ">
                        <p class="text-2xl text-white ">
                        Done
                        </p>
                    </div>
                    {/* <div class="flex items-center justify-center h-24 rounded bg-gray-400 ">
                        <p class="text-2xl text-white ">
                        Add Widget
                        </p>
                    </div> */}
                </div>
                {/* <div class="grid grid-cols-3 gap-4 mb-4 border">
                    <div class="flex items-center justify-center h-24 rounded bg-gray-400 ">
                        <p class="text-2xl text-white ">
                        Tasks By Status
                        </p>
                    </div>
                    <div class="flex items-center justify-center h-24 rounded bg-gray-400 ">
                        <p class="text-2xl text-white ">
                        Tasks By Owner
                        </p>
                    </div>
                    <div class="flex items-center justify-center h-24 rounded bg-gray-400 ">
                        <p class="text-2xl text-white ">
                        Recent Activity
                        </p>
                    </div>
                </div> */}
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div class="flex items-start justify-center h-48 mb-4 rounded bg-gray-400 ">
                        <p class="text-2xl text-white ">
                            Tasks By Status    
                        </p>    
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