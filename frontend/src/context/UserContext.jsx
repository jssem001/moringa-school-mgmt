import React, { createContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [onchange, setOnchange] = useState(false);
  const [authToken, setAuthToken] = useState(() => sessionStorage.getItem('authToken') || null);
  const [currentUser, setCurrentUser] = useState(null);
  
  const navigate = useNavigate();

  // Add user
  function addUser(username, email, phone, password) {
    fetch('https://moringa-overflow.onrender.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, phone, password }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          navigate('/login');
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: response.success,
            showConfirmButton: false,
            timer: 1500,
          });
          setOnchange((prev) => !prev);
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: response.error,
            showConfirmButton: false,
            timer: 1500,
          });
          setOnchange((prev) => !prev);
        }
      });
  }

  // Update user
  function updateUser(username, email, phone) {
    fetch('https://moringa-overflow.onrender.com/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ username, email, phone }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: response.success,
            showConfirmButton: false,
            timer: 1500,
          });
          setOnchange((prev) => !prev);
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: response.error,
            showConfirmButton: false,
            timer: 1500,
          });
          setOnchange((prev) => !prev);
        }
      });
  }

  // Login user
  function login(username, password) {
    fetch('https://moringa-overflow.onrender.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.access_token) {
          sessionStorage.setItem('authToken', response.access_token);
          setAuthToken(response.access_token);
          navigate('/questions');
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Login success',
            showConfirmButton: false,
            timer: 1500,
          });
          setOnchange((prev) => !prev);
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: response.error,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  }

  // Delete user account
  function deleteYourAccount() {
    fetch('https://moringa-overflow.onrender.com/users', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          navigate('/register');
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: response.success,
            showConfirmButton: false,
            timer: 1500,
          });
          setOnchange((prev) => !prev);
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: response.error,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  }

  // Logout user
  function logout() {
    sessionStorage.removeItem('authToken');
    setCurrentUser(null);
    navigate('/login');
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Logout success',
      showConfirmButton: false,
      timer: 1000,
    });
  }

  // Get Authenticated user
  useEffect(() => {
    if (authToken) {
      fetch('https://moringa-overflow.onrender.com/authenticated_user', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.email || response.username) {
            setCurrentUser(response);
          } else {
            setCurrentUser(null);
          }
        });
    }
  }, [authToken, onchange]);

  console.log('current user', currentUser);

  // Context data
  const contextData = {
    addUser,
    login,
    updateUser,
    logout,
    currentUser,
    deleteYourAccount, // Adjusted the function name for consistency
  };

  return (
    <UserContext.Provider value={contextData}>
      {children}
    </UserContext.Provider>
  );
}
