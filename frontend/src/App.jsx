import React from 'react'; import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; import 'react-toastify/dist/ReactToastify.css';
import Projects from './pages/Projects'; import Home from './pages/Home';
import Task from './pages/Task'; import Reports from './pages/Reports';

function App() {
  return (
    <BrowserRouter>
      {/* <AuthProvider> */}
        <Routes>
          
          <Route path="/" element={<Home />} />
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