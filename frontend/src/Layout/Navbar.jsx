import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Images/logo.jpeg';
import { UserContext } from '../context/UserContext';

function Navbar() {
  const { currentUser, logout } = useContext(UserContext);

  return (
    <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <h1 className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-8" alt="Logo" />
          <span className="text-2xl font-semibold whitespace-nowrap text-gray-900">
            Moringa Management System
          </span>
        </h1>
        <div className="hidden md:flex md:w-auto md:order-1">
          <ul className="flex flex-col md:flex-row md:space-x-8">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-gray-900 hover:bg-gray-100 rounded-md"
                aria-label="Home"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/features"
                className="block py-2 px-3 text-gray-900 hover:bg-gray-100 rounded-md"
                aria-label="Features"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                to="/pages"
                className="block py-2 px-3 text-gray-900 hover:bg-gray-100 rounded-md"
                aria-label="Pages"
              >
                Pages
              </Link>
            </li>
            <li>
              <Link
                to="/aboutus"
                className="block py-2 px-3 text-gray-900 hover:bg-gray-100 rounded-md"
                aria-label="About Us"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block py-2 px-3 text-gray-900 hover:bg-gray-100 rounded-md"
                aria-label="Contact Us"
              >
                Contact Us
              </Link>
            </li>
            {!currentUser ? (
              <>
                <li>
                  <Link
                    to="/signup"
                    className="block py-2 px-3 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    aria-label="Sign Up"
                  >
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="block py-2 px-3 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    aria-label="Login"
                  >
                    Login
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <button
                  onClick={logout}
                  className="block py-2 px-3 text-white bg-red-600 rounded-md hover:bg-red-700"
                  aria-label="Logout"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
