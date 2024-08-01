import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home"; // Ensure this file exists
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LandingPage from "./pages/LandingPage";
import { UserProvider } from "./context/UserContext"; // Import UserProvider

function App() {
  return (
    <Router> {/* Wrap Router with UserProvider */}
      <UserProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<div>Page Not Found</div>} /> {/* Basic fallback for unknown routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
