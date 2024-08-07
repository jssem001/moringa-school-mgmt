import React, { useContext } from "react";
import logo from '../images/MoringaLogo.png'
import { Link } from 'react-router-dom'
import Sidebar from "../components/Sidebar";
import { UserContext } from "../context/UserContext";

const AdminProfile = () => {
    //Fetch current user
    const { currentUser, loading } = useContext(UserContext);
    console.log('Current User:', currentUser)

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!currentUser) {
        return <div>No user data available.</div>;
    }
    
    const role = currentUser.is_admin ? "Admin" : currentUser.is_instructor ? "Instructor" : "Student";
    
    return (
        <>
            <Sidebar />

            <div class="p-4 sm:ml-64">
            <div class="p-4 rounded-lg">
                <h1 class="text-3xl  font-semibold text-center">Profile</h1>
                <ul class="border-b-2 border-gray-700 mb-3">
                    <li><span className="font-semibold">Name:</span> {currentUser.name} </li>
                    <li><span className="font-semibold">Email:</span> {currentUser.email} </li>
                    <li><span className="font-semibold">Phone:</span> {currentUser.phone || "N/A"} </li>
                    <li><span className="font-semibold">Role:</span> {role} </li>
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
                        <p class="text-2xl text-white ">
                        Employee/User Information
                        </p>
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
                    <Link to="/usermgmt"><p class="text-2xl text-white ">
                        Assign Roles    
                    </p></Link>
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