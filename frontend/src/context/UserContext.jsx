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

// Fetch data with retry logic
const fetchWithRetry = async (url, options, retries = 3, delay = 1000) => {
  try {
    const response = await fetch(url, { ...options });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'An error occurred');
    }
    return await response.json();
  } catch (error) {
    if (retries > 0) {
      return fetchWithRetry(url, options, retries - 1,delay);
    }
    throw error;
  }
};

// Define the UserProvider component
const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [authToken, setAuthToken] = useState(() => localStorage.getItem("access_token") || null);
  const [permissions, setPermissions] = useState({});
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  // const [userRole, setUserRole] = useState('');
  
  // Fetch current user data and handle authentication
  useEffect(() => {
    if (authToken) {
      setLoading(true);
      fetchWithRetry(`${server_url}/current_user`, {
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      })
        .then((data) => {
          if (data.email) {
            setCurrentUser(data);
            //setPermissions(permissionsConfig[data.role] || {});
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

  //All Users
  // const fetchUsers = async () => {
  //   setLoading(true);
  //   try {
  //     const result = await fetchWithRetry(`${server_url}/users`, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${authToken}`,
  //       },
  //     });
  //     setAllUsers(result);  // fetched users
  //   } catch (error) {
  //     toast.error(`Failed to fetch users: ${error.message}`);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  //All Users
  const fetchUsers= async () => {
    setLoading(false);
    fetch(`${server_url}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    })
    .then((response) => response.json())
    .then((data) => {
      setAllUsers(data);  // fetched users
    })
    .catch((error) => {
      toast.error(`Failed to fetch users: ${error.message}`);
    })
    .finally(() => setLoading(false));
  };


  // Register a new user
  const register_user =  (name, email, phoneNumber, role, is_student, is_instructor, is_admin, password) => {
    setLoading(true);
    console.log(name,email,password,phoneNumber,role)
    fetch(`${server_url}/user`, {
      method: 'POST',
      body: JSON.stringify({ name, email, password, phoneNumber, role, is_student, is_instructor, is_admin }),
      headers: {
        'Content-Type': 'application/json',
      },

    })
    .then((response) => response.json())
    .then((data) => {
      console.log("test")
      console.log(data)
      if (data.success) {
        toast.success("Registered successfully!");
        console.log("Registered successfully!");
        navigate("/login"); // Navigate after successful registration
        // console.log("User registered successfully");
        return data
      } else {
        console.error(data.error || "Registration failed");
        throw new Error(data.error || "Registration failed");
      }
    })
    .catch((error) => {
      console.error(`Failed to register user: ${error.message}`);
      throw error;
    })
    .finally(() => {
      setLoading(false);
    })
 
  };

 
//login User
const loginUser = async (email, password, role) => {
  setLoading(true);
  fetch(`${server_url}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, role }),
  })
  .then((response) => response.json())
  .then((data) => {
    if (data.access_token) {
      setAuthToken(data.access_token);
      localStorage.setItem('access_token', data.access_token);
      setCurrentUser(data.user);
      //setPermissions(permissionsConfig[data.user.role] || {});
      setPermissions(permissionsConfig[data.is_admin ? 'admin' : (data.is_student ? 'student' : 'instructor')] || {});
      toast.success('Logged in Successfully!');
      console.log('Logged in Successfully!');
      navigate('/dashboard');
    } else {
      toast.error(data.error || 'Login failed');
    }
  })


};


  // Log out a user
  const handleLogout = async () => {
    setLoading(true);
    try {
      const result = await fetchWithRetry(`${server_url}/logout`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });
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
      const result = await fetchWithRetry(`${server_url}/user`, {
        method: 'PUT',
        body: JSON.stringify({ name, phoneNumber, profileImage, password }),
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });
      if (result.success) {
        toast.success(result.success);
        setCurrentUser({ ...currentUser, name, phoneNumber, profileImage });
      } else {
        toast.error(result.error || "Update failed");
      }
    } catch (error) {
      toast.error(`Failed to update user: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Update user role
  // const updateRole = async (userId, newRole) => {
  //   setLoading(true);
  //   try {
  //     const response = await fetchWithRetry(`${server_url}/users/${userId}/role`, {
  //       method: 'PUT',
  //       body: JSON.stringify({ role: newRole }),
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${authToken}`,
  //       },
  //     });
  //     const updatedUser = response.data;
  //     setAllUsers((prevUsers) =>
  //       prevUsers.map((user) => (user.id === userId ? updatedUser : user))
  //     );
  //     toast.success("User role updated successfully!");
  //   } catch (error) {
  //     toast.error(`Error updating user role: ${error.message}`);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const updateRole = async (userId, newRole) => {
    try {
      const response = await fetch(`${server_url}/user/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`, // Include the auth token if needed
        },
        body: JSON.stringify({ role: newRole }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update user role');
      }
  
      const updatedUser = await response.json();
      setAllUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === userId ? { ...user, role: newRole } : user))
      );
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };




  // Delete a user
  const deleteUser = async () => {
    setLoading(true);
    try {
      const result = await fetchWithRetry(`${server_url}/user/${currentUser.id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });
      if (result.success) {
        localStorage.removeItem("access_token");
        setCurrentUser(null);
        setAuthToken(null);
        toast.success(result.success);
        // navigate("/login");
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
    // userRole,
    updateRole,
    fetchUsers,
    register_user,
    loginUser,
    updateUser,
    logout: handleLogout,
    deleteUser
  };

  return (
    <UserContext.Provider value={contextData}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
