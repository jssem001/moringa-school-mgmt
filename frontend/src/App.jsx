import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AnalyticsPage from "./pages/AnalyticsPage"; import UserMgmt from "./pages/UserMgmt";
import Login from "./pages/Login"; import Signup from "./pages/Signup";
import LandingPage from "./pages/LandingPage"; import StudentProfile from "./pages/StudentProfile";
import InstructorProfile from "./pages/InstructorProfile"; import AdminProfile from "./pages/AdminProfile";
import { UserProvider } from "./context/UserContext"; import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<div>Page Not Found</div>} /> {/* Basic fallback for unknown routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/studentprofile" element={<StudentProfile />} />
          <Route path="/instructorprofile" element={<InstructorProfile />} />
          <Route path="/adminprofile" element={<AdminProfile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/usermgmt" element={<UserMgmt />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
