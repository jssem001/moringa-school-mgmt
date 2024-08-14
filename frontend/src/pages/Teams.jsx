import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar"; // Ensure the path to Sidebar is correct
import { TeamContext } from "../context/TeamContext";
import { UserContext } from "../context/UserContext";
import { ProjectContext } from "../context/ProjectContext";


const Teams = () => {
  const { teams, members, fetchTeams, fetchMembers, deleteTeam } = useContext(TeamContext);
  const {allUsers, fetchUsers} = useContext(UserContext);
  const {projects, fetchProjects} = useContext(ProjectContext);
  const [searchTerm, setSearchTerm] = useState("");

  
  useEffect(() => {
    const initializeData = async () => {
      await fetchTeams();
      await fetchMembers();
      await fetchUsers();
      await fetchProjects();
    };
    initializeData();
  }, []);

  // Helper functions to get user name and project name by ID
  const getUserName = (userId) => {
    const user = allUsers.find((user) => user.id === userId);
    return user ? user.name : "Unknown User";
  };

  const getProjectName = (projectId) => {
    const project = projects.find((project) => project.id === projectId);
    return project ? project.name : "Unknown Project";
  };

  const handleDeleteClick = async (teamId) => {
    if (window.confirm("Are you sure you want to delete this team?")) {
      try {
        await deleteTeam(teamId);
        // Optionally, refresh the teams list
        await fetchTeams();
      } catch (error) {
        console.error("Error deleting team:", error);
      }
    }
  };

  // Placeholder for filteredTeams
  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6 md:ml-64">
        {/* Search Section */}
        <section className="mb-4">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </section>

        {/* Buttons Section */}
        <section className="mb-4 flex space-x-4">
          <Link
            to="/add-team"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add New Team
          </Link>
          <Link
            to="/projects"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Projects
          </Link>
        </section>

        {/* Main content area */}
        <main className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Teams</h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTeams.map((team) => (
              <div
                key={team.id}
                className="p-4 border rounded shadow-md flex flex-col bg-gray-200"
              >
                <h3 className="text-xl font-semibold mb-2">{team.name}</h3>
                <p className="mb-2 text-gray-700">{getProjectName(team.project_id)}</p>

                <ul className=" mb-4">
                  {team.members.map((member, index) => (
                    <li key={index} className="mb-1">
                      <strong>Name:</strong> {getUserName(member.user_id)} <strong>Role:</strong> {member.role}
                    </li>
                  ))}
                </ul>

                <div className="mt-2 flex space-x-2">
                  <Link
                    to={`/edit-team/${team.id}`}
                    className="text-yellow-500 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(team.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Teams;
