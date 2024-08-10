import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext'; // Adjust import if needed
import { toast } from 'react-toastify';
import Sidebar from '../components/Sidebar'; // Adjust import if needed

const UpdateProfile = () => {
  const { currentUser, updateUser } = useContext(UserContext);
  const [username, setUsername] = useState(currentUser.name || '');
  const [email, setEmail] = useState(currentUser.email || '');
  // const [password, setPassword] = useState(''); // Optional, based on whether you want to update the password
  const [loading, setLoading] = useState(false);

  

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    updateUser(username, email);
  };

  return (
    <>
      <Sidebar />

      <div className="p-4 sm:ml-64">
        <div className="p-4 rounded-lg">
          <h1 className="text-3xl font-semibold text-center">Update Profile</h1>
          <form onSubmit={handleUpdateProfile} className="w-full max-w-lg mx-auto mt-8 bg-white rounded-lg shadow-lg p-8">
            <fieldset className="border-4 border-dotted border-orange-300 p-6 rounded-lg">
              <legend className="px-2 italic text-orange-500">Update Your Profile</legend>

              <div className="relative mb-4">
                <label htmlFor="username" className="text-sm font-bold text-gray-600">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full p-3 mt-1 mb-2 border border-gray-300 rounded-md outline-none ring-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="relative mb-4">
                <label htmlFor="profile_picture_url" className="text-sm font-bold text-gray-600">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-3 mt-1 mb-2 border border-gray-300 rounded-md outline-none ring-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* <div className="relative mb-4">
                <label htmlFor="profile_picture_url" className="text-sm font-bold text-gray-600">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  id="profile_picture_url"
                  type="text"
                  value={profilePictureUrl}
                  onChange={(e) => setProfilePictureUrl(e.target.value)}
                  required
                  className="w-full p-3 mt-1 mb-2 border border-gray-300 rounded-md outline-none ring-none focus:ring-2 focus:ring-orange-500"
                />
              </div> */}

              <button
                type="submit"
                className="relative w-32 h-12 bg-orange-400 text-white border-none rounded-md text-sm font-bold cursor-pointer overflow-hidden group"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
