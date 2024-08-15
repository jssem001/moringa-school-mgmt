import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import loginimage from '../images/abstract-wavy.jpeg';
import logo from '../images/MoringaLogo.png';
import Footer from '../Layout/Footer';
import LandingNavbar from '../components/LandingNavbar';
import { UserContext } from '../context/UserContext';

export default function Login() {
  const { loginUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await loginUser(email, password);
    } catch (error) {
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LandingNavbar />
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Image Section */}
        <div className="relative lg:w-1/2 flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${loginimage})` }}>
          <div className="absolute inset-0 bg-[#1b3461] bg-opacity-30"></div>
          <div className="relative text-center text-white p-10">
            <h1 className="text-5xl font-extrabold mb-4">Welcome Back</h1>
            <p className="text-lg mb-6">Sign in to manage your projects and stay updated.</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="lg:w-1/2 flex items-center justify-center p-6 bg-white">
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg border border-gray-200 p-8">
            <div className="flex flex-col items-center mb-6">
              <img src={logo} alt="Moringa School Logo" className="w-24 h-24 mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Project Management System</h1>
              <h2 className="text-xl font-medium text-gray-600">Sign In</h2>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  name="email" 
                  id="email" 
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="name@example.com" 
                  required 
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Password</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  name="password" 
                  id="password" 
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="••••••••" 
                  required 
                />
              </div>
              <p className="text-sm text-gray-600">
                <Link to="/reset-password" className="font-medium text-blue-600 hover:underline">Forgot Password?</Link>
              </p>
              <button 
                type="submit" 
                className={`w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
              <p className="text-center text-sm text-gray-600 mt-4">
                Don't have an account yet?{' '}
                <Link to="/signup" className="font-medium text-blue-600 hover:underline">Sign Up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
