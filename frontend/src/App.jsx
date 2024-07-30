import React from 'react'; import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; import 'react-toastify/dist/ReactToastify.css';
import Projects from './pages/Projects'; import LandingPage from './pages/LandingPage';
import Task from './pages/Task'; import Reports from './pages/Reports';

function App() {
  return (
    <BrowserRouter>
      {/* <AuthProvider> */}
        <Routes>
          
          <Route path="/" element={<LandingPage />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/task" element={<Task />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
        <ToastContainer />
      {/* </AuthProvider> */}
    </BrowserRouter>
  );
}

export default App;