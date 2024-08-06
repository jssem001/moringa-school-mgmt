import React, { useContext, useEffect } from "react";
import { Link } from 'react-router-dom'
import Sidebar from "../components/Sidebar";
import { UserContext } from "../context/UserContext";

const UserMgmt = () => {
    //Fetch all users
    const {allUsers,fetchUsers, loading} = useContext(UserContext);

    useEffect(() => {
       fetchUsers();  
    }, [fetchUsers]);
     
    // const role = currentUser.is_admin ? "Admin" : currentUser.is_instructor ? "Instructor" : "Student";
    const getUserRole = (user) => {
        if (user.is_admin) return "Admin";
        if (user.is_instructor) return "Instructor";
        if (user.is_student) return "Student";
        return "Unknown";
    }; 

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
                                {/* <th scope="col" className="px-6 py-3">
                                    Status
                                </th> */}
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
                                    </td>
                                    {/* <td className="px-6 py-4">
                                        {user.status || '-'}
                                    </td> */}
                                    <td className="px-6 py-4 text-right">
                                        <Link to={`/edit-user/${user.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
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