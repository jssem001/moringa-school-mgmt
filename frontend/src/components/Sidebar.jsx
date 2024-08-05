import React from "react";
import logo from '../images/MoringaLogo.png'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <>
            <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            
            <div class="h-screen px-3 py-4 overflow-y-auto border-r-2 border-black"
                style={{ backgroundImage: `url('https://s3-alpha-sig.figma.com/img/cafa/5e8f/b86bafc3853580461c326f24743c095f?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KaugZBvGBxCcbk75-tCVsg8~kC52sRyusJTyiCWdHyuVFwedfeRUdkUHb9Iad0EN8FT1FbQAuHiGqSmvv1RH-mjKkjcoKpgDlFDVtMfj4GFmHxyoPz7a77RiWQF-gyMctxCoMV8PG4zVW3UXTIKmAW-EPCbhEJcL4aA6fvUFjL~l4xKAMb3Qr2SIg2aS2fRQn~Y6ZCYuaKIlx35adx-bxNsm33toSpGsoMNDGE5pNbyAfXAyBeUDU6pSlUeoyyjURqTihFOXMvia~E~N-G-wGlosH8UTEm5zSrwtRYOfxRT7x1bvq2e6YHe2VrLRy4l3GmjbwxqrFKhrCp64NmdP2w__')` }}>
                
                <div class="flex items-center ml-4 mb-5">
                    <img src={logo} class="h-20 w-20 rounded" alt="Moringa Logo" />
                </div>
                <ul class="space-y-2 font-semibold">
                    <li>
                        <Link to='/'><div class="flex items-center p-2 text-black rounded-lg dark:text-black hover:shadow hover:bg-orange-100 group">
                            <span class="ms-3">Home</span>
                        </div></Link>
                    </li>
                    <li>
                        <Link to="/projects"><div class="flex items-center p-2 text-black rounded-lg dark:text-black hover:shadow hover:bg-orange-100 group">
                            <span class="flex-1 ms-3 whitespace-nowrap">Projects</span>
                        </div></Link>
                    </li>
                    <li>
                        <Link to="/tasks"><div class="flex items-center p-2 text-black rounded-lg dark:text-black hover:shadow hover:bg-orange-100 group">
                            <span class="flex-1 ms-3 whitespace-nowrap">Tasks</span>
                        </div></Link>
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
                        <Link to="/dashboard"><div class="flex items-center p-2 text-black rounded-lg dark:text-black hover:shadow hover:bg-orange-100 group">
                            <span class="flex-1 ms-3 whitespace-nowrap">Dashboard</span>
                        </div></Link>
                    </li>
                </ul>
                <ul class=" mt-[185px] space-y-2 font-semibold">
                    <li>
                        <Link to="/studentprofile"><div class="flex items-center p-2 text-black rounded-lg dark:text-black hover:shadow hover:bg-orange-100 group">
                            <span class="flex-1 ms-3 whitespace-nowrap">User Profile</span>
                        </div></Link>
                        <Link to="/login"><div class="flex items-center p-2 text-black rounded-lg hover:text-white hover:bg-red-700 group">
                            <span class="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
                        </div></Link>
                    </li>
                </ul>
            </div>
            </aside>
        
        </>
    )
}

export default Sidebar