import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { server_url } from "../../config";

// Create a UserContext
const UserContext = createContext();

// Define permissions based on user roles
const permissionsConfig = {
  admin: {
    createProject: true,
    editProject: true,
    deleteProject: true,
    assignTask: true,
    viewOwnReports: true,
    viewInstructorsReports: true,
    viewStudentReports: true,
    viewStudents: true,
    viewInstructors: true,
    addInstructors: true,
    addStudents: true,
  },
  instructor: {
    createProject: true,
    editProject: true,
    assignTask: true,
    viewReports: true,
    viewStudents: true,
    addStudents: true,
    viewOwnReports: true,
    viewStudentReports: true,
  },
  student: {
    createProject: true,
    viewProject: true,
    updateTaskStatus: true,
    commentOnTask: true,
    createOwnProject: true,
    editOwnProject: true,
    viewOwnReports: true,
  },
};

// Define the UserProvider component
const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [authToken, setAuthToken] = useState(() => localStorage.getItem("access_token") || null);
  const [permissions, setPermissions] = useState({});
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  // Fetch current user data and handle authentication
  useEffect(() => {
    if (authToken) {
      setLoading(true);
      fetch(`${server_url}/current_user`, {
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.email) {
            setCurrentUser(data);
            setPermissions(permissionsConfig[data.role] || {});
          } else {
            handleLogout();
          }
        })
        .catch((error) => {
          toast.error(`Failed to fetch user data: ${error.message}`);
          handleLogout();
        })
        .finally(() => setLoading(false));
    }
  }, [authToken]);

  // Fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${server_url}/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setAllUsers(data);
    } catch (error) {
      toast.error(`Failed to fetch users: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Register a new user
  const registerUser = async (name, email, phoneNumber, role, is_student, is_instructor, is_admin, password) => {
    setLoading(true);
    try {
      const response = await fetch(`${server_url}/user`, {
        method: 'POST',
        body: JSON.stringify({ name, email, password, phoneNumber, role, is_student, is_instructor, is_admin }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Registered successfully!");
        navigate("/login");
        return data;
      } else {
        throw new Error(data.error || "Registration failed");
      }
    } catch (error) {
      toast.error(`Failed to register user: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Log in a user
  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch(`${server_url}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.access_token) {
        setAuthToken(data.access_token);
        localStorage.setItem('access_token', data.access_token);
        setCurrentUser(data.user);
        setPermissions(permissionsConfig[data.is_admin ? 'admin' : (data.is_student ? 'student' : 'instructor')] || {});
        toast.success('Logged in Successfully!');
        navigate('/dashboard');
      } else {
        toast.error(data.error || 'Login failed');
      }
    } catch (error) {
      toast.error(`Failed to log in: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Reset password
  const resetPassword = async (email, newPassword) => {
    setLoading(true);
    try {
      const response = await fetch(`${server_url}/forgot_password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, new_password: newPassword }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success('Password reset email sent!');
      } else {
        throw new Error(data.error || 'Failed to send password reset email');
      }
    } catch (error) {
      toast.error(`Failed to send password reset email. Please try again. ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Log out a user
  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${server_url}/logout`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });
      const result = await response.json();
      if (result.success) {
        localStorage.removeItem("access_token");
        setCurrentUser(null);
        setAuthToken(null);
        toast.success(result.success);
        navigate("/login");
      } else {
        toast.error(result.error || "Logout failed");
      }
    } catch (error) {
      toast.error(`Failed to log out: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateUser = async (name, phoneNumber, profileImage, password) => {
    setLoading(true);
    try {
      const response = await fetch(`${server_url}/user`, {
        method: 'PUT',
        body: JSON.stringify({ name, phoneNumber, profileImage, password }),
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });
      const result = await response.json();
      if (result.success) {
        toast.success(result.success);
        setCurrentUser({ ...currentUser, name, phoneNumber, profileImage });
      } else {
        throw new Error(result.error || "Update failed");
      }
    } catch (error) {
      toast.error(`Failed to update user: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Update user role
  const updateRole = async (userId, newRole) => {
    try {
      const response = await fetch(`${server_url}/user/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ role: newRole }),
      });
      if (!response.ok) throw new Error('Failed to update user role');
      const updatedUser = await response.json();
      setAllUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === userId ? { ...user, role: newRole } : user))
      );
    } catch (error) {
      toast.error(`Error updating user role: ${error.message}`);
    }
  };

  // Delete a user
  const deleteUser = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${server_url}/user/${currentUser.id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });
      const result = await response.json();
      if (result.success) {
        localStorage.removeItem("access_token");
        setCurrentUser(null);
        setAuthToken(null);
        toast.success(result.success);
      } else {
        toast.error(result.error || "Deletion failed");
      }
    } catch (error) {
      toast.error(`Failed to delete user: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Provide context values
  const contextData = {
    authToken,
    currentUser,
    permissions,
    loading,
    allUsers,
    fetchUsers,
    registerUser,
    loginUser,
    resetPassword,
    handleLogout,
    updateUser,
    updateRole,
    deleteUser,
  };

  return <UserContext.Provider value={contextData}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
