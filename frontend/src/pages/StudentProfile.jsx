import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Sidebar from "../components/Sidebar";
import { UserContext } from "../context/UserContext";

const StudentProfile = () => {
  // Fetch current user
  const { currentUser, loading } = useContext(UserContext);
  const navigate = useNavigate(); // Initialize navigate

  console.log('Current User:', currentUser);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <div>No user data available.</div>;
  }

  const role = currentUser.is_admin ? "Admin" : currentUser.is_instructor ? "Instructor" : "Student";

  const handleUpdateProfileClick = () => {
    navigate("/update-profile"); // Navigate to UpdateProfile page
  };

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
            <div 
              className="flex items-center justify-center rounded bg-red-900 h-28 cursor-pointer"
              onClick={handleUpdateProfileClick} // Add click handler
            >
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
