import React, { useContext,useState, useEffect, useCallback } from "react";
import { Link } from 'react-router-dom'
import Sidebar from "../components/Sidebar";
import { UserContext } from "../context/UserContext";

const UserMgmt = () => {
    const {allUsers,fetchUsers, updateRole, loading} = useContext(UserContext);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newRole, setNewRole] = useState("");

    const fetchUsersCallback = useCallback(fetchUsers, [fetchUsers]);

    useEffect(() => {
        fetchUsersCallback();  
    }, [fetchUsersCallback]);

    // //Fetch all users
    // useEffect(() => {
    //    fetchUsers();  
    // }, [fetchUsers]);

    const getUserRole = (user) => {
        if (user.is_admin) return "admin";
        if (user.is_instructor) return "instructor";
        if (user.is_student) return "student";
        return "Unknown";
    }; 

    // Update user role
    const handleRoleChange = (userId) => {
        updateRole(userId, newRole);
        setSelectedUser(null);
        setNewRole("");
    };
    // const handleRoleChange = (userId) => {
    //     if (['admin', 'instructor', 'student'].includes(newRole)) {
    //         updateRole(userId, newRole);
    //         setSelectedUser(null);
    //         setNewRole("");
    //     } else {
    //         toast.error("Invalid role selected");
    //     }
    // };




    return (
       <> 
        <Sidebar />

        <div className="p-4 sm:ml-64">
            <h1 className="text-3xl mb-4 font-semibold text-center">User Management</h1>    
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Full Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Role
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {allUsers.map(user => (
                                <tr className="bg-white border-b border-gray-700" key={user.id}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {user.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {getUserRole(user)}
                                        {selectedUser === user.id && (
                                                <select
                                                    value={newRole}
                                                    onChange={(e) => setNewRole(e.target.value)}
                                                    className="ml-2"
                                                >
                                                    <option value="">Select Role</option>
                                                    <option value="admin">admin</option>
                                                    <option value="instructor">instructor</option>
                                                    <option value="student">student</option>
                                                </select>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {/* <Link to={`/edit-user/${user.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link> */}
                                        {selectedUser === user.id ? (
                                                <button
                                                    onClick={() => handleRoleChange(user.id)}
                                                    className="font-medium text-green-600 dark:text-green-500 hover:underline"
                                                >
                                                    Save
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => setSelectedUser(user.id)}
                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                >
                                                    Edit
                                                </button>
                                            )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>


        {/* <div class="p-4 sm:ml-64">
        <h1 class="text-3xl mb-4 font-semibold text-center">User Management</h1>    
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg ">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead class="text-xs text-gray-700 uppercase bg-gray-100 ">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Full Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Role
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <span class="sr-only">Edit</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            Alice
                        </th>
                        <td class="px-6 py-4">
                            alice@example.com
                        </td>
                        <td class="px-6 py-4">
                            Student
                        </td>
                        <td class="px-6 py-4">
                            -
                        </td>
                        <td class="px-6 py-4 text-right">
                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                        </td>
                    </tr>
                    <tr class="bg-white border-b border-gray-700 dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            Bob
                        </th>
                        <td class="px-6 py-4">
                            bob@example.com
                        </td>
                        <td class="px-6 py-4">
                            Student
                        </td>
                        <td class="px-6 py-4">
                            -
                        </td>
                        <td class="px-6 py-4 text-right">
                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                        </td>
                    </tr>
                    <tr class="bg-white">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            Charlie
                        </th>
                        <td class="px-6 py-4">
                            charlie@example
                        </td>
                        <td class="px-6 py-4">
                            Intructor
                        </td>
                        <td class="px-6 py-4">
                            -
                        </td>
                        <td class="px-6 py-4 text-right">
                            <a href="#" class="font-medium text-blue-600 hover:underline">Edit</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        </div> */}

       </> 
    )
}

export default UserMgmt