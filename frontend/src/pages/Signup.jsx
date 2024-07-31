import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function Register() {
  const { register_user } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [name, setName] = useState("");
  const [profile_image, setProfileImage] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [role, setRole] = useState("student");

  function handleSubmit(e) {
    e.preventDefault();

    if (password !== repeatPassword) {
      toast.error("Passwords do not match");
      return;
    }

    register_user(name, email, profile_image, phone_number, role, password);
    setEmail("");
    setPassword("");
    setRepeatPassword("");
    setProfileImage("");
    setName("");
    setPhone_number("");
    setRole("student");
  }

  return (
    <div className="h-screen flex">
      <div className="lg:w-1/2 items-center justify-center">
        <img 
          src="../assets/images/abstract.jpeg" 
          alt="Signup Image" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          <div className="text-center mb-4">
            <img 
              src="../assets/images/logo.jpeg" 
              alt="Logo" 
              className="mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold mb-2">Project Management System</h1>
            <h2 className="text-xl font-medium">Sign Up</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input 
                type="text" 
                value={name || ""} 
                onChange={(e) => setName(e.target.value)} 
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                placeholder="John Doe" 
                required 
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input 
                type="email" 
                value={email || ""} 
                onChange={(e) => setEmail(e.target.value)} 
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                placeholder="name@example.com" 
                required 
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input 
                type="password" 
                value={password || ""} 
                onChange={(e) => setPassword(e.target.value)} 
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                required 
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Repeat Password</label>
              <input 
                type="password" 
                value={repeatPassword || ""} 
                onChange={(e) => setRepeatPassword(e.target.value)} 
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                required 
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Profile Image URL</label>
              <input 
                type="text" 
                value={profile_image || ""} 
                onChange={(e) => setProfileImage(e.target.value)} 
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                placeholder="http://www.example.com" 
                required 
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input 
                type="text" 
                value={phone_number || ""} 
                onChange={(e) => setPhone_number(e.target.value)} 
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                placeholder="07123456789" 
                required 
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Register as</label>
              <select 
                value={role} 
                onChange={(e) => setRole(e.target.value)} 
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button 
              type="submit" 
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </form>
          <p className="text-center mt-4">
            Already have an account? <Link to="/login" className="text-indigo-600 hover:text-indigo-500">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
