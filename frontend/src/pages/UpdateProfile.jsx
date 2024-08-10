import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext'; // Adjust import if needed
import { toast } from 'react-toastify';
import Sidebar from '../components/Sidebar'; // Adjust import if needed

const UpdateProfile = () => {
  const { currentUser, authToken, setCurrentUser } = useContext(UserContext);
  const [username, setUsername] = useState(currentUser?.username || '');
  const [profilePictureUrl, setProfilePictureUrl] = useState(currentUser?.profile_picture_url || '');
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.username);
      setProfilePictureUrl(currentUser.profile_picture_url);
    }
  }, [currentUser]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://127.0.0.1:5000/update_profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ username, profile_picture_url: profilePictureUrl }),
      });

      if (!res.ok) {
        throw new Error('Failed to update profile');
      }

      // Update currentUser in context directly
      setCurrentUser(prevUser => ({
        ...prevUser,
        username,
        profile_picture_url: profilePictureUrl,
      }));

      toast.success('Profile updated successfully!');
      navigate('/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again later.');
    }
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
                  Username <span className="text-red-500">*</span>
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
                  Profile Picture URL <span className="text-red-500">*</span>
                </label>
                <input
                  id="profile_picture_url"
                  type="text"
                  value={profilePictureUrl}
                  onChange={(e) => setProfilePictureUrl(e.target.value)}
                  required
                  className="w-full p-3 mt-1 mb-2 border border-gray-300 rounded-md outline-none ring-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <button
                type="submit"
                className="relative w-32 h-12 bg-orange-400 text-white border-none rounded-md text-sm font-bold cursor-pointer overflow-hidden group"
              >
                Update Profile
                <span className="absolute w-36 h-32 -top-8 -left-2 bg-orange-200 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-right"></span>
                <span className="absolute w-36 h-32 -top-8 -left-2 bg-orange-300 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-right"></span>
                <span className="absolute w-36 h-32 -top-8 -left-2 bg-orange-500 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-right"></span>
                <span className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-6 z-10">
                  Updating!
                </span>
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
