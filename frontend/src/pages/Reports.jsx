import React from "react";
import Navbar from "../components/Navbar";

function Reports(){
    return(
        <div className="h-screen bg-blue-100">
          <Navbar/>
          <div className="flex justify-center items-center h-full">
          <h1 className="text-3xl font-bold">Reports</h1>
          </div>  
        </div>
        
    )
}
export default Reports