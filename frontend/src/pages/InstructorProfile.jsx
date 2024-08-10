import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import Sidebar from "../components/Sidebar";
import { UserContext } from "../context/UserContext";

const InstructorProfile = () => {
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
                        <div className="flex items-center justify-center h-24 rounded bg-cyan-800 ">
                            <p className="text-2xl text-white">Courses</p>
                        </div>
                        <div className="flex items-center justify-center h-24 rounded bg-cyan-800 ">
                            <p className="text-2xl text-white">Update Grades</p>
                        </div>
                        <div className="flex items-center justify-center h-24 rounded bg-cyan-800 ">
                            <p className="text-2xl text-white">Schedule</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center justify-center rounded bg-cyan-800 h-28 ">
                            <p className="text-2xl text-white">My Company Account</p>
                        </div>
                        <div className="flex items-center justify-center rounded bg-cyan-800 h-28 ">
                            <p className="text-2xl text-white">Academic Advising</p>
                        </div>
                        <div className="flex items-center justify-center rounded bg-cyan-800 h-28 ">
                            <p className="text-2xl text-white">Settings</p>
                        </div>
                        <Link to="/update-profile">
                          <div className="flex items-center justify-center rounded bg-cyan-800 h-28 cursor-pointer">
                            <p className="text-2xl text-white">Update Profile</p>
                          </div>
                        </Link>
                    </div>
                    <div className="flex items-center justify-center h-48 mb-4 rounded bg-cyan-800 ">
                        <p className="text-2xl text-white">Student Information</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {/* Add more widgets if needed */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default InstructorProfile;
