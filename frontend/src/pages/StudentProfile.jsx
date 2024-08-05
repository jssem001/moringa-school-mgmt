import React from "react";
import logo from '../images/MoringaLogo.png'
import { Link } from 'react-router-dom'
import Sidebar from "../components/Sidebar";

const StudentProfile = () => {
  return (

// Fetch function

    <>
   


      <Sidebar />
      
      <div className="p-4 sm:ml-64">
        <div className="p-4 rounded-lg">
          <h1 className="text-3xl font-semibold text-center">Profile</h1>
          <ul className="border-b-2 border-gray-700 mb-3">
            <li><span className="font-semibold">Name:</span> John Snow </li>
            <li><span className="font-semibold">Email:</span> John@winterfell.com </li>
            <li><span className="font-semibold">Phone:</span> 0712345678 </li>
            <li><span className="font-semibold">Role:</span> Student</li>
          </ul>
          <div className="grid grid-cols-3 gap-4 mb-4 border">
            <div className="flex items-center justify-center h-24 rounded bg-red-900 ">
              <p className="text-2xl text-white">
                Courses
              </p>
            </div>
            <div className="flex items-center justify-center h-24 rounded bg-red-900 ">
              <p className="text-2xl text-white">
                Grades
              </p>
            </div>
            <div className="flex items-center justify-center h-24 rounded bg-red-900 ">
              <p className="text-2xl text-white">
                Schedule
              </p>
            </div>
          </div>


          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center justify-center rounded bg-red-900 h-28 ">
              <p className="text-2xl text-white">
                My Account
              </p>
            </div>
            <div className="flex items-center justify-center rounded bg-red-900 h-28 ">
              <p className="text-2xl text-white">
                Academic Advising
              </p>
            </div>
            <div className="flex items-center justify-center rounded bg-red-900 h-28 ">
              <p className="text-2xl text-white">
                Settings
              </p>
            </div>
            <div className="flex items-center justify-center rounded bg-red-900 h-28 ">
              <p className="text-2xl text-white">
                Update Profile
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* add more widgets if needed */}
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentProfile;
