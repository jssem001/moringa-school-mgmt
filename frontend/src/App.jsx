import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ResetPassword from "./pages/ResetPassword";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LandingPage from "./pages/LandingPage";
import StudentOverview from "./pages/StudentOverview";
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
import UpdateProfile from "./pages/UpdateProfile";
import Teams from "./pages/Teams";
import AddTeam from "./pages/AddTeam";
import ActivityLogModal from "./pages/ActivityLogModal"; 
import StudentInfo from "./pages/StudentInfo"; 
import { TeamContextProvider } from "./context/TeamContext";
import { UserProvider } from "./context/UserContext";
import { ProjectProvider } from "./context/ProjectContext";
import { TaskProvider } from "./context/TaskContext";
import { TemplateProvider } from "./context/TemplateContext";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <TeamContextProvider>
    <ProjectProvider>
      <TemplateProvider>
        <TaskProvider>
          <Router>
            <UserProvider>
                <Routes>
                  <Route path="/landing" element={<LandingPage />} />
                  <Route path="/" element={<Login />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/studentprofile" element={<StudentProfile />} />
                  <Route path="/instructorprofile" element={<InstructorProfile />} />
                  <Route path="/adminprofile" element={<AdminProfile />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/tasks" element={<Task />} />
                  <Route path="/add-project" element={<AddProject />} />
                  <Route path="/projects/:id" element={<SingleProject />} />
                  <Route path="/edit-project/:id" element={<EditProject />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/analytics" element={<AnalyticsPage />} />
                  <Route path="/usermgmt" element={<UserMgmt />} />
                  <Route path="/templates" element={<Templates />} />
                  <Route path="/add-template" element={<AddTemplate />} />
                  <Route path="/templates/:id" element={<SingleTemplate />} />
                  <Route path="/edit-template/:id" element={<EditTemplate />} />
                  <Route path="/update-profile" element={<UpdateProfile />} />
                  <Route path="/teams" element={<Teams />} />
                  <Route path="/add-team" element={<AddTeam />} />
                  <Route path="/student-info" element={<StudentInfo />} /> 
                  <Route path="/student-overview/:id" element={<StudentOverview />} /> 
                  <Route path="*" element={<div>Page Not Found</div>} />
                </Routes>
                <ToastContainer />
            </UserProvider>
          </Router>
        </TaskProvider>
      </TemplateProvider>
    </ProjectProvider>
    </TeamContextProvider>
  );
}

export default App;
