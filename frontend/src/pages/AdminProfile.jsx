import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import Sidebar from "../components/Sidebar";
import { UserContext } from "../context/UserContext";

const AdminProfile = () => {
    const { currentUser, loading } = useContext(UserContext);

    if (loading) return <div>Loading...</div>;
    if (!currentUser) return <div>No user data available.</div>;

    const role = currentUser.is_admin ? "Admin" : currentUser.is_instructor ? "Instructor" : "Student";

    return (
        <>
            <Sidebar />
            <div className="p-4 sm:ml-64">
                <div className="p-4 rounded-lg">
                    <h1 className="text-3xl font-semibold text-center">Profile</h1>
                    <ul className="border-b-2 border-gray-700 mb-3">
                        <li><span className="font-semibold">Name:</span> {currentUser.name} </li>
                        <li><span className="font-semibold">Email:</span> {currentUser.email} </li>
                        {/* <li><span className="font-semibold">Phone:</span> {currentUser.phone || "N/A"} </li> */}
                        <li><span className="font-semibold">Role:</span> {role} </li>
                    </ul>
                    <div className="grid grid-cols-3 gap-4 mb-4 border">
                        <div className="flex items-center justify-center h-24 rounded bg-gray-700 ">
                            <p className="text-2xl text-white">Courses</p>
                        </div>
                        <div className="flex items-center justify-center h-24 rounded bg-gray-700 ">
                            <p className="text-2xl text-white">Student Information</p>
                        </div>
                        <div className="flex items-center justify-center h-24 rounded bg-gray-700 ">
                            <p className="text-2xl text-white">Calendar</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <Link to="/usermgmt"><div className="flex items-center justify-center rounded bg-gray-700 h-28 ">
                            <p className="text-2xl text-white">Assign Roles</p>
                        </div></Link>
                        <div className="flex items-center justify-center rounded bg-gray-700 h-28 ">
                            <p className="text-2xl text-white">Settings</p>
                        </div>
                        <div className="flex items-center justify-center rounded bg-gray-700 h-28 ">
                            <p className="text-2xl text-white">Reports</p>
                        </div>
                        <Link to="/update-profile">
                          <div className="flex items-center justify-center rounded bg-gray-700 h-28 cursor-pointer">
                            <p className="text-2xl text-white">Update Profile</p>
                          </div>
                        </Link>
                    </div>
                    <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-700 ">
                        <p className="text-2xl text-white">Analytics</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminProfile;


// small small change
