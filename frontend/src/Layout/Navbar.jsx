import React, { useContext } from 'react';
import logo from '../assets/Images/logo.jpeg';
import { Link } from 'react-router-dom';
// import { UserContext } from '../context/UserContext';

function Navbar() {
  // const { currentUser, logout } = useContext(UserContext);

  return (
    <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <h1 className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-8" alt="Logo" /> {/* Adjust height if needed */}
          <span className="text-2xl font-semibold whitespace-nowrap text-gray-900">
            Moringa Management System
          </span>
        </h1>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-white md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-gray-900 bg-white rounded md:bg-white md:p-0 md:text-gray-900"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/features"
                className="block py-2 px-3 text-gray-900 bg-white rounded md:bg-white md:p-0 md:text-gray-900"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                to="/pages"
                className="block py-2 px-3 text-gray-900 bg-white rounded md:bg-white md:p-0 md:text-gray-900"
              >
                Pages
              </Link>
            </li>
            <li>
              <Link
                to="/aboutus"
                className="block py-2 px-3 text-gray-900 bg-white rounded md:bg-white md:p-0 md:text-gray-900"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block py-2 px-3 text-gray-900 bg-white rounded md:bg-white md:p-0 md:text-gray-900"
              >
                Contact Us
              </Link>
            </li>
            {/* {!currentUser ? ( */}
              <>
                <li>
                  <Link to="/signup" className="block py-2 px-3 text-white bg-blue-600 rounded hover:bg-blue-700">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="block py-2 px-3 text-white bg-blue-600 rounded hover:bg-blue-700">
                    Login
                  </Link>
                </li>
              </>
            {/* ) : ( */}
              <li>
                <button

                  // onClick={logout}
                  className="block py-2 px-3 text-white bg-red-600 rounded hover:bg-red-700"
                

                >
                  Logout
                </button>
              </li>
            {/* )} */}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
