import React from "react";
import Navbar from "../components/Navbar";

function Home(){
    return(
        <div className="h-screen bg-blue-100">
          <Navbar/>
          <p className="text-3xl text-gray-900 dark:text-white">Home</p>
            
        </div>
        
    )
}
export default Home