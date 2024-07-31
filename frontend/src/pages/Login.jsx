import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    setRole("student");
  };

  return (
    <div className="h-screen flex bg-blue-100">
      <div className="lg:w-1/2 items-center justify-center">
        <img 
          src="../assets/images/abstract.jpeg" 
          alt="Login Image" 
          className="w-full h-full object-cover"
        />
      </div>
      <section className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6">
            <div className="flex flex-col items-center mb-6">
              <img src="../assets/images/logo.jpeg" alt="Moringa School Logo" className="w-24 h-24 mb-4" />
              <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
                Project Management System
              </h1>
            </div>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  name="email" 
                  id="email" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  placeholder="name@example.com" 
                  required 
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  name="password" 
                  id="password" 
                  placeholder="••••••••" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  required 
                />
              </div>
              <div>
                <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Role
                </label>
                <select 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)} 
                  id="role" 
                  name="role" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  required
                >
                  <option value="student">Student</option>
                  <option value="instructor">Instructor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button 
                type="submit" 
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet? <Link to="/signup" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Sign up</Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
