import React from "react";
import Navbar from "../components/Navbar";

function LandingPage(){
    return(
      <>
        <div className="h-screen bg-blue-100">
          <Navbar/>
          <div
        className="h-screen bg-cover bg-center relative"
        style={{
          backgroundImage: `url('https://s3-alpha-sig.figma.com/img/cafa/5e8f/b86bafc3853580461c326f24743c095f?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KaugZBvGBxCcbk75-tCVsg8~kC52sRyusJTyiCWdHyuVFwedfeRUdkUHb9Iad0EN8FT1FbQAuHiGqSmvv1RH-mjKkjcoKpgDlFDVtMfj4GFmHxyoPz7a77RiWQF-gyMctxCoMV8PG4zVW3UXTIKmAW-EPCbhEJcL4aA6fvUFjL~l4xKAMb3Qr2SIg2aS2fRQn~Y6ZCYuaKIlx35adx-bxNsm33toSpGsoMNDGE5pNbyAfXAyBeUDU6pSlUeoyyjURqTihFOXMvia~E~N-G-wGlosH8UTEm5zSrwtRYOfxRT7x1bvq2e6YHe2VrLRy4l3GmjbwxqrFKhrCp64NmdP2w__')`,
        }}
        > 
          <div className="flex justify-center items-end h-full py-4">
            <div className="bg-white bg-opacity-40 p-8 rounded-lg shadow-lg">
              <h1 className="text-2xl font-bold text-center break-normal">Increase team productivity with this</h1> 
              <h1 className="text-2xl font-bold text-center break-normal">powerful Project Management  tool.</h1>
              <h1 className="text-xl font-bold mb-4 text-center break-normal">Streamline Workflows, Enhance Collaboration, and Achieve More Together...</h1>
              <form action="#">
                <div class="max-w-sm mx-auto p-1 pr-0 flex items-center">
                    <input type="email" placeholder="yourmail@example.com"
                        class="flex-1 appearance-none rounded shadow p-3 text-grey-dark mr-2 focus:outline-none"/>
                    <button type="submit"
                        class="bg-orange-200 text-black text-base font-semibold rounded-md shadow-md hover:text-white hover:bg-orange-600 p-3">Subscribe</button>
                </div>
              </form>
            </div>
          </div>
        </div>

          
          <p className="flex justify-center text-4xl font-bold m-4">Our Features</p>
          <div className="flex py-4 px-4 grid grid-flow-col justify-stretch items-front">
            <div className="bg-yellow-400 px-8 py-4 rounded-lg shadow-lg m-3">
              <h1 className="text-3xl font-bold text-center break-normal mb-12">Project Management</h1>
              <p className="text-xl mb-2 break-normal">Create, edit and delete projects.</p>
              <p className="text-xl mb-2 break-normal">Assign roles to users within each project.</p>
              <p className="text-xl mb-2 break-normal">Project templates for common project types.</p>
              <button class="bg-black text-white text-base font-semibold rounded-md shadow-md hover:text-white hover:bg-yellow-600 mt-8 p-3">Learn More</button>
            </div>
            <div className="bg-blue-400 px-8 py-4 rounded-lg shadow-lg m-3">
              <h1 className="text-3xl font-bold text-center break-normal mb-12">Task Management</h1>
              <p className="text-xl mb-2 break-normal">Create, assign, and track tasks within projects</p>
              <p className="text-xl mb-2 break-normal">Task status updates (to-do, in progress, done).</p>
              <p className="text-xl mb-2 break-normal">Set task priorities and deadlines.</p>
              <p className="text-xl mb-2 break-normal">Comment on tasks for real-time collaboration.</p>
              <button class="bg-black text-white text-base font-semibold rounded-md shadow-md hover:text-white hover:bg-blue-600 mt-8 p-3">Learn More</button>
            </div>
            <div className="bg-purple-400 px-8 py-4 rounded-lg shadow-lg m-3">
              <h1 className="text-3xl font-bold text-center break-normal mb-12">Collaboration Tools</h1>
              <p className="text-xl mb-2 break-normal">Real-time comments on tasks and projects.</p>
              <p className="text-xl mb-2 break-normal">File attachments to tasks and projects.</p>
              <p className="text-xl mb-2 break-normal">Notifications for task updates and approaching deadlines.</p>
              <button class="bg-black text-white text-base font-semibold rounded-md shadow-md hover:text-white hover:bg-purple-600 mt-8 p-3">Learn More</button>
            </div>
          </div>
          <div className="flex py-4 px-4 grid grid-flow-col justify-stretch items-front">
            <div className="bg-orange-400 px-8 py-4 rounded-lg shadow-lg m-3">
              <h1 className="text-3xl font-bold text-center break-normal mb-12">User Roles</h1>
              <p className="text-xl mb-2 break-normal">Different user roles (e.g., admin, project manager, team member) with specific permissions.</p>
              <p className="text-xl mb-2 break-normal">Manage user roles and permissions through the admin panel.</p>
              <button class="bg-black text-white text-base font-semibold rounded-md shadow-md hover:text-white hover:bg-orange-600 mt-8 p-3">Learn More</button>
            </div>
            <div className="bg-indigo-400 px-8 py-4 rounded-lg shadow-lg m-3">
              <h1 className="text-3xl font-bold text-center break-normal mb-12">Reports & Analytics</h1>
              <p className="text-xl mb-2 break-normal">Generate reports on project and task performance.</p>
              <p className="text-xl mb-2 break-normal">View analytics on team productivity and project progress.</p>
              <button class="bg-black text-white text-base font-semibold rounded-md shadow-md hover:text-white hover:bg-indigo-600 mt-8 p-3">Learn More</button>
            </div>
            <div className="bg-slate-400 px-8 py-4 rounded-lg shadow-lg m-3">
              <h1 className="text-3xl font-bold text-center break-normal mb-12">Search & Filter</h1>
              <p className="text-xl mb-2 break-normal">Search for projects and tasks based on various criteria.</p>
              <p className="text-xl mb-2 break-normal">Filter tasks by status, priority, and deadline.</p>
              <button class="bg-black text-white text-base font-semibold rounded-md shadow-md hover:text-white hover:bg-slate-600 mt-8 p-3">Learn More</button>
            </div>
          </div>
    </div>
    </>    
    )
}
export default LandingPage