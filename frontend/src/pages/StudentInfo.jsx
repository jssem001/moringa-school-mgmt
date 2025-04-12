import React, { useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import Sidebar from "../components/Sidebar";
import { UserContext } from "../context/UserContext";

const StudentInfo = () => {
    const { allUsers, fetchUsers, loading } = useContext(UserContext);
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    const fetchUsersCallback = useCallback(fetchUsers, [fetchUsers]);

    useEffect(() => {
        fetchUsersCallback();
    }, [fetchUsersCallback]);

    useEffect(() => {
        if (allUsers) {
            const filteredStudents = allUsers.filter(user => user.is_student);
            setStudents(filteredStudents);
        }
    }, [allUsers]);

    const handleViewDetails = (studentId) => {
        navigate(`/student-overview/${studentId}`); // Navigate to the student's overview page
    };

    return (
        <>
            <Sidebar />

            <div className="p-4 sm:ml-64">
                <h1 className="text-3xl mb-4 font-semibold text-center">Student Information</h1>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Full Name</th>
                                    <th scope="col" className="px-6 py-3">Email</th>
                                    <th scope="col" className="px-6 py-3">Role</th>
                                    <th scope="col" className="px-6 py-3">Status</th>
                                    <th scope="col" className="px-6 py-3"><span className="sr-only">View Details</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map(student => (
                                    <tr className="bg-white border-b border-gray-700" key={student.id}>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{student.name}</th>
                                        <td className="px-6 py-4">{student.email}</td>
                                        <td className="px-6 py-4">Student</td>
                                        <td className="px-6 py-4">Active</td>
                                        <td className="px-6 py-4 text-right">
                                            {/* <button 
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                onClick={() => handleViewDetails(student.id)}
                                            >
                                                View Details
                                            </button> */}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
};

export default StudentInfo;
