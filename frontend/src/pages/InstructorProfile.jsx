import React from "react";
import logo from '../images/MoringaLogo.png'
import { Link } from 'react-router-dom'
import Sidebar from "../components/Sidebar";

const InstructorProfile = () => {

    
    return (
        <>
            <Sidebar />

            {/* <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            
            <div class="h-screen px-3 py-4 overflow-y-auto border-r-2 border-black"
                style={{ backgroundImage: `url('https://s3-alpha-sig.figma.com/img/cafa/5e8f/b86bafc3853580461c326f24743c095f?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KaugZBvGBxCcbk75-tCVsg8~kC52sRyusJTyiCWdHyuVFwedfeRUdkUHb9Iad0EN8FT1FbQAuHiGqSmvv1RH-mjKkjcoKpgDlFDVtMfj4GFmHxyoPz7a77RiWQF-gyMctxCoMV8PG4zVW3UXTIKmAW-EPCbhEJcL4aA6fvUFjL~l4xKAMb3Qr2SIg2aS2fRQn~Y6ZCYuaKIlx35adx-bxNsm33toSpGsoMNDGE5pNbyAfXAyBeUDU6pSlUeoyyjURqTihFOXMvia~E~N-G-wGlosH8UTEm5zSrwtRYOfxRT7x1bvq2e6YHe2VrLRy4l3GmjbwxqrFKhrCp64NmdP2w__')` }}>
                
                <div class="flex items-center ml-4 mb-5">
                    <img src={logo} class="h-20 w-20 rounded" alt="Moringa Logo" />
                </div>
                <ul class="space-y-2 font-semibold">
                    <li>
                        <div class="flex items-center p-2 text-black rounded-lg dark:text-black hover:shadow hover:bg-orange-100 group">
                            <Link to='/'><span class="ms-3">Home</span></Link>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-center p-2 text-black rounded-lg dark:text-black hover:shadow hover:bg-orange-100 group">
                            <span class="flex-1 ms-3 whitespace-nowrap">Projects</span>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-center p-2 text-black rounded-lg dark:text-black hover:shadow hover:bg-orange-100 group">
                            <span class="flex-1 ms-3 whitespace-nowrap">Tasks</span>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-center p-2 text-black rounded-lg dark:text-black hover:shadow hover:bg-orange-100 group">
                            <span class="flex-1 ms-3 whitespace-nowrap">Calendar</span>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-center p-2 text-black rounded-lg dark:text-black hover:shadow hover:bg-orange-100 group">
                            <span class="flex-1 ms-3 whitespace-nowrap">Teams</span>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-center p-2 text-black rounded-lg dark:text-black hover:shadow hover:bg-orange-100 group">
                            <span class="flex-1 ms-3 whitespace-nowrap">Dashboard</span>
                        </div>
                    </li>
                    <li>
                        <div class="flex items-center p-2 text-black rounded-lg hover:text-white hover:bg-red-700 group">
                            <span class="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
                        </div>
                    </li>
                </ul>
            </div>
            </aside> */}

            <div class="p-4 sm:ml-64">
            <div class="p-4 rounded-lg">
                <h1 class="text-3xl  font-semibold text-center">Profile</h1>
                <ul class="border-b-2 border-gray-700 mb-3">
                    <li><span class="font-semibold">Name:</span> Rob Stark </li>
                    <li><span class="font-semibold">Email:</span> Rob@winterfell.com </li>
                    <li><span class="font-semibold">Phone:</span> 0712345678 </li>
                    <li><span class="font-semibold">Role:</span> Instructor</li>
                </ul>
                <div class="grid grid-cols-3 gap-4 mb-4 border">
                    <div class="flex items-center justify-center h-24 rounded bg-cyan-800 ">
                        <p class="text-2xl text-white ">
                        Courses
                        </p>
                    </div>
                    <div class="flex items-center justify-center h-24 rounded bg-cyan-800 ">
                        <p class="text-2xl text-white ">
                        Update Grades
                        </p>
                    </div>
                    <div class="flex items-center justify-center h-24 rounded bg-cyan-800 ">
                        <p class="text-2xl text-white ">
                        Schedule
                        </p>
                    </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div class="flex items-center justify-center rounded bg-cyan-800 h-28 ">
                        <p class="text-2xl text-white ">
                        My Company Account
                        </p>
                    </div>
                    <div class="flex items-center justify-center rounded bg-cyan-800 h-28 ">
                        <p class="text-2xl text-white ">
                        Academic Advising
                        </p>
                    </div>
                    <div class="flex items-center justify-center rounded bg-cyan-800 h-28 ">
                        <p class="text-2xl text-white ">
                        Settings
                        </p>
                    </div>
                    <div class="flex items-center justify-center rounded bg-cyan-800 h-28 ">
                        <p class="text-2xl text-white ">
                        Update Profile
                        </p>
                    </div>
                </div>
                <div class="flex items-center justify-center h-48 mb-4 rounded bg-cyan-800 ">
                    <p class="text-2xl text-white ">
                        Student Information    
                    </p>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    {/* Add more widgets if needed */}
                </div>
            </div>
            </div>

        </>
    );
};

export default InstructorProfile