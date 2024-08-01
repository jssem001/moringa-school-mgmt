import React, { useContext, useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import loginimage from '../images/abstract-wavy.jpeg'
import logo from '../images/MoringaLogo.png'
import Footer from '../Layout/Footer'; import LandingNavbar from '../components/LandingNavbar';
import { UserContext } from '../context/UserContext';

export default function Login() {
  const {loginUser}  = useContext(UserContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  

  async function handleSubmit (e) {
    e.preventDefault();

    if (!email || !password) {
      console.log('Please enter both email and password.');
      return;
    }

    try {
      await loginUser(email, password); // Assuming login returns a promise for async handling
      console.log('Login successful'); // Notify success
      setTimeout(() => {
        navigate('/studentprofile'); // Navigate to homepage on successful login after a delay
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      //setError('Login failed. Please check your credentials.');
      // toast.error('Login failed'); // Notify login failure
      console.error('Login error:', error);

    }


    setEmail("");
    setPassword("");
    setRole("student");
  };

  return (
    <>
    <LandingNavbar />
    <div className="h-screen flex bg-blue-100">
      
      <div className="lg:w-1/2 items-center justify-center">
        <img 
          src= {loginimage}
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
                  // className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" 
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
                className="w-full text-black bg-orange-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:text-white hover:bg-orange-600 dark:bg-orange-200 dark:hover:bg-orange-600 dark:focus:ring-blue-800"
              >
                Sign in
              </button>
              <p className="text-center mt-4">
                Don’t have an account yet? <Link to="/signup" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Sign up</Link>
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
