import React from "react";
import Navbar from "../components/Navbar";

function Home(){
    return(
        <div className="h-screen bg-blue-100">
          <Navbar/>
          <div className="flex justify-center items-center h-full">
          <p className="text-3xl font-bold">Home</p>
          </div>  
        </div>
        
    )
}
export default Home