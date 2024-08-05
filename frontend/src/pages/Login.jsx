import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import loginimage from '../images/abstract-wavy.jpeg';
import logo from '../images/MoringaLogo.png';
import Footer from '../Layout/Footer'; 
import LandingNavbar from '../components/LandingNavbar';
import { UserContext } from '../context/UserContext';

export default function Login() {
  const { loginUser } = useContext(UserContext);
  // const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    loginUser(email, password, role);
    
  };

  return (
    <>
    <LandingNavbar />
    <div className="h-screen flex bg-blue-100">
      <div className="lg:w-1/2 items-center justify-center">
        <img 
          src={loginimage}
          alt="Login Image" 
          className="w-full h-full object-cover"
        />
      </div>
      <section className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6">
            <div className="flex flex-col items-center mb-6">
              <img src={logo} alt="Moringa School Logo" className="w-24 h-24 mb-4" />
              <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 mb-2">
                Project Management System
              </h1>
              <h1 className="text-xl font-medium">
                Sign In
              </h1>
            </div>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                  Email
                </label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  name="email" 
                  id="email" 
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                  placeholder="name@example.com" 
                  required 
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                  Password
                </label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  name="password" 
                  id="password" 
                  placeholder="••••••••" 
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required 
                />
              </div>
              <div>
                <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900">
                  Role
                </label>
                <select 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)} 
                  id="role" 
                  name="role" 
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                  required
                >
                  <option value="student">Student</option>
                  <option value="instructor">Instructor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button 
                type="submit" 
                className={`w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
              <p className="text-center mt-4">
                Don't have an account yet? <Link to="/signup" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Sign up</Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
}
