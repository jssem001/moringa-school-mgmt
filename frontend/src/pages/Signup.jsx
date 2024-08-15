import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import signupimage from '../images/abstract-wavy.jpeg';
import logo from '../images/MoringaLogo.png';
import Footer from '../Layout/Footer';
import LandingNavbar from '../components/LandingNavbar';
import { UserContext } from '../context/UserContext';

export default function Signup() {
  const { register_user } = useContext(UserContext);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
    phone_number: '',
    role: 'student',
  });

  const { name, email, password, repeatPassword, phone_number, role } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      toast.error('Passwords do not match');
      return;
    }

    register_user(name, email, phone_number, role, role === 'student', role === 'instructor', role === 'admin', password);

    setFormData({
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
      phone_number: '',
      role: 'student',
    });
  };

  return (
    <>
      <LandingNavbar />
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Image Section */}
        <div className="relative lg:w-1/2 flex items-center justify-center overflow-hidden">
          <img
            src={signupimage}
            alt="Signup"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-[#1b3461] bg-opacity-30 mix-blend-overlay"></div>
          <div className="relative text-center text-white p-10">
            <h1 className="text-4xl font-extrabold mb-4 text-white">
              Welcome to Our Platform
            </h1>
            <p className="text-lg mb-6 text-white">Join us and start managing your projects effectively.</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="flex items-center justify-center lg:w-1/2 bg-white p-8">
          <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-10 border border-gray-200">
            <div className="flex flex-col items-center mb-8">
              <img
                src={logo}
                alt="Logo"
                className="w-24 h-24 mb-4"
              />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Project Management System</h1>
              <h2 className="text-xl font-medium text-gray-600">Sign Up</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                  placeholder="name@example.com"
                  required
                />
              </div>
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700">Repeat Password</label>
                <input
                  type="password"
                  name="repeatPassword"
                  value={repeatPassword}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <select
                  name="role"
                  value={role}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                  required
                >
                  <option value="student">Student</option>
                  <option value="instructor">Instructor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg transition duration-150 ease-in-out"
              >
                Sign Up
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 font-medium hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
