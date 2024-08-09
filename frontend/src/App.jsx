import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ResetPassword from "./pages/ResetPassword";
// import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LandingPage from "./pages/LandingPage";
import StudentProfile from "./pages/StudentProfile";
import InstructorProfile from "./pages/InstructorProfile";
import AdminProfile from "./pages/AdminProfile";
import Projects from "./pages/Projects";
import Task from "./pages/Task";
import AddProject from "./pages/AddProject";
import AnalyticsPage from "./pages/AnalyticsPage";
import UserMgmt from "./pages/UserMgmt";
import Dashboard from "./pages/Dashboard";
import SingleProject from "./pages/SingleProject";
import EditProject from "./pages/EditProject";
import Templates from "./pages/Templates";
import AddTemplate from "./pages/AddTemplate";
import EditTemplate from "./pages/EditTemplate";
import SingleTemplate from "./pages/SingleTemplate";
import { UserProvider } from "./context/UserContext";
<<<<<<< HEAD
// import { ProjectProvider } from "./context/ProjectContext"; // Import ProjectProvider
=======
// import { ProjectProvider } from "./context/ProjectContext";
>>>>>>> ae26bf6d7cc7b3c0a407f07ff1c18c5bed300002
import { TaskProvider } from "./context/TaskContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    // <ProjectProvider>
    <TaskProvider>
    <Router>
      <UserProvider>
        {/* <ProjectProvider>  */}
          <Routes>
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/studentprofile" element={<StudentProfile />} />
            <Route path="/instructorprofile" element={<InstructorProfile />} />
            <Route path="/adminprofile" element={<AdminProfile />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/tasks" element={<Task />} />
            <Route path="/add-project" element={<AddProject />} />
            <Route path="/projects/:projectId" element={<SingleProject />} />
            <Route path="/edit-project/:projectId" element={<EditProject />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/usermgmt" element={<UserMgmt />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/add-template" element={<AddTemplate />} />
            <Route path="/templates/:templateId" element={<SingleTemplate />} />
            <Route path="/edit-template/:templateId" element={<EditTemplate />} />
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        {/* </ProjectProvider> */}
       <ToastContainer />                        
      </UserProvider>
    </Router>
    </TaskProvider>
    // </ProjectProvider>
    
  );
}

export default App;
