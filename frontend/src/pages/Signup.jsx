import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate }  from 'react-router-dom';
import signupimage from '../images/abstract-wavy.jpeg';
import logo from '../images/MoringaLogo.png';
import Footer from '../Layout/Footer';
import LandingNavbar from '../components/LandingNavbar';
import { UserContext } from '../context/UserContext';

export default function Signup() {
  const { register_user } = useContext(UserContext);
  const navigate = useNavigate(); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [name, setName] = useState("");
  // const [profile_image, setProfileImage] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [role, setRole] = useState("student");

  function handleSubmit(e) {
    e.preventDefault();

    if (password !== repeatPassword) {
      toast.error("Passwords do not match");
      console.log("Passwords do not match");
      return;
    }

    register_user(name, email, phone_number, role, password)
      .then(() => {
        toast.success("Registered successfully!");
        console.log("Registered successfully!");
        navigate("/login"); // Navigate after successful registration
      })
      .catch((error) => {
        toast.error("Registration failed");
        console.log("Registration failed:", error);
      });

    setEmail("");
    setPassword("");
    setRepeatPassword("");
    // setProfileImage("");
    setName("");
    setPhone_number("");
    setRole("student");
  }

  return (
    <>
      <LandingNavbar/>
      <div className="h-full flex">
        <div className="lg:w-1/2 items-center justify-center">
          <img 
            src={signupimage}
            alt="Signup Image" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-blue-100">
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-col items-center mb-6">
              <img 
                src={logo}
                alt="Logo" 
                className="w-24 h-24 mb-4"
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
                  placeholder="••••••••"
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
                  placeholder="••••••••"
                  required 
                />
              </div>
              {/* <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Profile Image URL</label>
                <input 
                  type="url" 
                  value={profile_image || ""} 
                  onChange={(e) => setProfileImage(e.target.value)} 
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                  placeholder="https://example.com/image.jpg" 
                  // required 
                />
              </div> */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input 
                  type="tel" 
                  value={phone_number || ""} 
                  onChange={(e) => setPhone_number(e.target.value)} 
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                  placeholder="+1234567890" 
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <select 
                  value={role}
                  onChange={(e) => setRole(e.target.value)} 
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                  required
                >
                  <option value="student">student</option>
                  <option value="teacher">teacher</option>
                </select>
              </div>
              <button 
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                
              >
                Sign Up
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-indigo-600 hover:text-indigo-500">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
