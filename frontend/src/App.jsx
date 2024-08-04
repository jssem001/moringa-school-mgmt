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
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
