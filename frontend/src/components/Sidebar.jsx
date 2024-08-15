import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import { UserContext } from "../context/UserContext";
import logo from '../images/MoringaLogo.png';
import backgroundImage from '../images/abstract-wavy.jpeg'; // Ensure correct import if inside src

const Sidebar = () => {
    const { currentUser, logout } = useContext(UserContext);

    let profileLink = "/studentprofile";
    if (currentUser) {
        if (currentUser.is_admin) {
            profileLink = "/adminprofile";
        } else if (currentUser.is_instructor) {
            profileLink = "/instructorprofile";
        }
    }

    return (
        <>
            <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            
                <div 
                    className="h-screen px-3 py-4 overflow-y-auto border-r-2 border-black"
                    style={{ 
                        backgroundImage: `url(${backgroundImage})`, 
                        // backgroundSize: 'cover', // Ensure the image covers the whole area
                        // backgroundRepeat: 'no-repeat', 
                        // backgroundPosition: 'center' // Center the background image
                    }}
                >
                    <div className="flex items-center ml-4 mb-5">
                        <img src={logo} className="h-20 w-20 rounded" alt="Moringa Logo" />
                    </div>
                    <ul className="space-y-2 font-semibold">
                        <li>
                            <Link to='/landing'>
                                <div className="flex items-center p-2 text-black rounded-lg dark:text-black hover:shadow hover:bg-orange-100 group">
                                    <span className="ms-3">Moringa Extra</span>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/projects">
                                <div className="flex items-center p-2 text-black rounded-lg dark:text-black hover:shadow hover:bg-orange-100 group">
                                    <span className="flex-1 ms-3 whitespace-nowrap">Projects</span>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/tasks">
                                <div className="flex items-center p-2 text-black rounded-lg dark:text-black hover:shadow hover:bg-orange-100 group">
                                    <span className="flex-1 ms-3 whitespace-nowrap">Tasks</span>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/teams">
                                <div className="flex items-center p-2 text-black rounded-lg dark:text-black hover:shadow hover:bg-orange-100 group">
                                    <span className="flex-1 ms-3 whitespace-nowrap">Teams</span>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/analytics">
                                <div className="flex items-center p-2 text-black rounded-lg dark:text-black hover:shadow hover:bg-orange-100 group">
                                    <span className="flex-1 ms-3 whitespace-nowrap">Analytics</span>
                                </div>
                            </Link>
                        </li>
                    </ul>
                    <ul className="mt-[185px] space-y-2 font-semibold">
                        <li>
                            <Link to={profileLink}>
                                <div className="flex items-center p-2 text-black rounded-lg dark:text-black hover:shadow hover:bg-orange-100 group">
                                    <span className="flex-1 ms-3 whitespace-nowrap">Dashboard</span>
                                </div>
                            </Link> 
                            <div onClick={logout} className="flex items-center p-2 text-black rounded-lg hover:text-white hover:bg-red-700 group cursor-pointer">
                                <span className="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
