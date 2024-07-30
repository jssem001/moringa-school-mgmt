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
          {/* <div className="absolute inset-0 bg-orange bg-opacity-5"></div> */}
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

      



          <div className="flex justify-center items-center h-full">
          <p className="text-3xl font-bold">Home</p>
          </div>  
    </div>
    </>    
    )
}
export default LandingPage