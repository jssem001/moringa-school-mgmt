import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { server_url } from "../../config"; // Adjust path if needed
import Sidebar from "../components/Sidebar"; // Ensure the path to Sidebar is correct

const statusColors = {
  completed: "bg-green-500",
  inProgress: "bg-orange-500",
  stuck: "bg-red-300",
  planning: "bg-gray-400"
};

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const auth_token = localStorage.getItem("auth_token"); // Assuming auth_token is stored in localStorage

  // Fetch teams on component mount
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(`${server_url}/teams`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth_token}`
          }
        });
        if (!response.ok) throw new Error("Failed to fetch teams");
        const data = await response.json();
        setTeams(data);
      } catch (error) {
        toast.error(error.message || "Failed to fetch teams");
      }
    };

    fetchTeams();
  }, [auth_token]);

  // Filter teams based on the search term
  const filteredTeams = teams.filter((team) =>
    team.project.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Determine card color based on project status
  const getCardColor = (status) => statusColors[status] || "bg-gray-200";

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6 md:ml-64 bg-gray-100">
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
                className={`p-4 border rounded shadow-md flex flex-col ${getCardColor(team.status)}`}
              >
                {/* Team Details */}
                <h3 className="text-xl font-semibold mb-2">{team.project}</h3>
                <p className="mb-2 text-gray-700">
                  Status: {team.status.charAt(0).toUpperCase() + team.status.slice(1)}
                </p>

                {/* Team Member List */}
                <ul className="list-disc pl-5 mb-4">
                  {team.members.map((member, index) => (
                    <li key={index} className="mb-1">
                      <strong>Email:</strong> {member.email} - <strong>Role:</strong> {member.role}
                    </li>
                  ))}
                </ul>

                {/* Action Links */}
                <div className="mt-2 flex space-x-2">
                  <Link
                    to={`/edit-team/${team.id}`}
                    className="text-yellow-500 hover:underline"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/teams/${team.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    View Details
                  </Link>
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
