import React from "react";
import logo from '../images/MoringaLogo.png'
import {Link} from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';

function LandingNavbar(){
return(
    <div>
      <nav className="bg-white dark:bg-white w-full z-20 top-0 start-0">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <h1 className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} className="h-16" alt="Moringa Logo" />
            
          </h1>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-green-900 md:dark:bg-white dark:border-gray-700">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-3 text-black bg-white rounded md:bg-white md:p-0 md:dark:text-black-400"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <HashLink
                  smooth to="/#features"
                  className="block py-2 px-3 text-black bg-white rounded md:bg-white md:p-0 md:dark:text-black-400"
                >
                  Features
                </HashLink>
              </li>
              <li>
                <HashLink
                  to="/#pages"
                  className="block py-2 px-3 text-black bg-white rounded md:bg-white md:p-0 md:dark:text-black-400"
                >
                  Pages
                </HashLink>
              </li>
              <li>
                <HashLink
                  to="/#about"
                  className="block py-2 px-3 text-black bg-white rounded md:bg-white md:p-0 md:dark:text-black-400"
                >
                  About Us
                </HashLink>
              </li>
              <li>
                <HashLink
                  to="/#contacts"
                  className="block py-2 px-3 text-black bg-white rounded md:bg-white md:p-0 md:dark:text-black-400"
                >
                  Contacts  
                </HashLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
)
}

export default LandingNavbar