import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
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
import AddTemplate from "./pages/AddTemplate"; // Import the AddTemplate component
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
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
          <Route path="/add-template" element={<AddTemplate />} /> {/* Add this line */}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
