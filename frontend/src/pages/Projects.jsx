import React from "react";
import Navbar from "../components/Navbar";

function Projects(){
    return(
        <div className="h-screen bg-blue-100">
          <Navbar/>
          <div className="flex justify-center items-center h-full">
          <h1 className="text-3xl font-bold">Projects</h1>
          </div>  
        </div>
        
    )
}
export default Projects