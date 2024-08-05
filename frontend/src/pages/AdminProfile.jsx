import React from "react";
import logo from '../images/MoringaLogo.png'
import { Link } from 'react-router-dom'
import Sidebar from "../components/Sidebar";

const AdminProfile = () => {

    
    return (
        <>
            <Sidebar />


            <div class="p-4 sm:ml-64">
            <div class="p-4 rounded-lg">
                <h1 class="text-3xl  font-semibold text-center">Profile</h1>
                <ul class="border-b-2 border-gray-700 mb-3">
                    <li><span class="font-semibold">Name:</span> Cersei Lannister </li>
                    <li><span class="font-semibold">Email:</span> cersei@westeros.com </li>
                    <li><span class="font-semibold">Phone:</span> 0712345678 </li>
                    <li><span class="font-semibold">Role:</span> Administrator</li>
                </ul>
                <div class="grid grid-cols-3 gap-4 mb-4 border">
                    <div class="flex items-center justify-center h-24 rounded bg-gray-700 ">
                        <p class="text-2xl text-white ">
                        Courses
                        </p>
                    </div>
                    <div class="flex items-center justify-center h-24 rounded bg-gray-700 ">
                        <p class="text-2xl text-white ">
                        Student Information
                        </p>
                    </div>
                    <div class="flex items-center justify-center h-24 rounded bg-gray-700 ">
                        <p class="text-2xl text-white ">
                        Calendar
                        </p>
                    </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div class="flex items-center justify-center rounded bg-gray-700 h-28 ">
                        <p class="text-2xl text-white ">
                        My Company Account
                        </p>
                    </div>
                    <div class="flex items-center justify-center rounded bg-gray-700 h-28 ">
                        <Link to="/usermgmt"><p class="text-2xl text-white ">
                        Employee/User Information
                        </p></Link>
                    </div>
                    <div class="flex items-center justify-center rounded bg-gray-700 h-28 ">
                        <p class="text-2xl text-white ">
                        Settings
                        </p>
                    </div>
                    <div class="flex items-center justify-center rounded bg-gray-700 h-28 ">
                        <p class="text-2xl text-white ">
                        Update Profile
                        </p>
                    </div>
                </div>
                <div class="flex items-center justify-center h-48 mb-4 rounded bg-gray-700 ">
                    <p class="text-2xl text-white ">
                        Assign Roles    
                    </p>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    {/* Add more widgets if needed */}
                </div>
            </div>
            </div>

        </>
    );
};

export default AdminProfile