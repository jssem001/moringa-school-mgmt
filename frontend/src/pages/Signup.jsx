import React, { useContext, useState } from 'react';
// import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';

export default function Signup() {
  // const { register } = useContext(UserContext); // Assuming you have a register function in UserContext

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const handleSubmit = (e) => {
    e.preventDefault();
    register(email, password, role); // Call the register function
    setEmail("");
    setPassword("");
    setRole("student");
  };

  return (
    <div className='container row'>
      <div className='col-md-4'></div>

      <div className='col-md-4 mt-5 card pt-3 pb-4 px-3'>
        <h3 className='text-center mt-4'>Sign Up</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              type="email" 
              className="form-control" 
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              className="form-control" 
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Role</label>
            <select 
              value={role} 
              onChange={e => setRole(e.target.value)} 
              className="form-control" 
              required
            >
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button 
            type="submit" 
            className="btn btn-primary w-100"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center mt-3">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>

      <div className='col-md-4'></div>
    </div>
  );
}
