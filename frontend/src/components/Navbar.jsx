import React from "react";
import logo from '../logo192.png'
import {Link} from 'react-router-dom'

function Navbar(){
return(
    <div>
      <nav className="bg-blue-900 dark:bg-blue-900 fixed w-full z-20 top-0 start-0">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <h1 className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} className="h-4" alt="League Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Moringa Management System
            </span>
          </h1>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-green-900 md:dark:bg-blue-900 dark:border-gray-700">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-3 text-orange bg-blue-900 rounded md:bg-blue-900 md:p-0 md:dark:text-orange-400"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/reports"
                  className="block py-2 px-3 text-orange bg-blue-900 rounded md:bg-blue-900 md:p-0 md:dark:text-orange-400"
                >
                  Reports
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="block py-2 px-3 text-orange bg-blue-900 rounded md:bg-blue-900 md:p-0 md:dark:text-orange-400"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/task"
                  className="block py-2 px-3 text-orange bg-blue-900 rounded md:bg-blue-900 md:p-0 md:dark:text-orange-400"
                >
                  Tasks
                </Link>
              </li>
              <li>
                {/* <button
                  onClick={handleLogout}
                  className="block py-3 px-4 text-black bg-green-900 rounded md:bg-yellow-400 md:p-1 md:dark:text-black"
                >
                  Log out
                </button> */}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
)
}

export default Navbar