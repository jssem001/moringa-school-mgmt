import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { server_url } from "../../config"; // Adjust path if needed
import Sidebar from "../components/Sidebar"; // Ensure the path to Sidebar is correct

const statusColors = {
  completed: "bg-green-500",
  inProgress: "bg-orange-500",
  stuck: "bg-red-300",
  planning: "bg-gray-400"
};

const AddTeam = () => {
  const [projects, setProjects] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [numMembers, setNumMembers] = useState(1);
  const [members, setMembers] = useState([{ email: "", role: "" }]);
  const [status, setStatus] = useState("planning");
  const navigate = useNavigate();
  const auth_token = localStorage.getItem("auth_token"); // Assuming auth_token is stored in localStorage

  // Fetch projects on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${server_url}/projects`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth_token}`
          }
        });
        if (!response.ok) throw new Error("Failed to fetch projects");
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        toast.error(error.message || "Failed to fetch projects");
      }
    };

    fetchProjects();
  }, [auth_token]);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const teamData = {
      name: teamName,
      project: selectedProject,
      members,
      status
    };

    try {
      const response = await fetch(`${server_url}/teams`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth_token}`
        },
        body: JSON.stringify(teamData)
      });
      if (!response.ok) throw new Error("Failed to add team");
      toast.success("Team added successfully!");
      navigate("/teams"); // Redirect to teams page
    } catch (error) {
      toast.error(error.message || "Failed to add team");
    }
  };

  // Handle member fields based on number of members
  useEffect(() => {
    const newMembers = Array.from({ length: numMembers }, (_, index) => ({
      email: members[index]?.email || "",
      role: members[index]?.role || ""
    }));
    setMembers(newMembers);
  }, [numMembers]);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6 md:ml-64 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">Add New Team</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Team Name */}
          <div>
            <label htmlFor="teamName" className="block text-sm font-medium mb-1">Team Name</label>
            <input
              type="text"
              id="teamName"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Select Project */}
          <div>
            <label htmlFor="project" className="block text-sm font-medium mb-1">Select Project</label>
            <select
              id="project"
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Select a project</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          {/* Number of Members */}
          <div>
            <label htmlFor="numMembers" className="block text-sm font-medium mb-1">Number of Members</label>
            <input
              type="number"
              id="numMembers"
              value={numMembers}
              onChange={(e) => setNumMembers(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
              min="1"
              required
            />
          </div>

          {/* Member Details */}
          <div className="space-y-4">
            {members.map((member, index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-lg font-semibold">Member {index + 1}</h3>
                <div>
                  <label htmlFor={`email${index}`} className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    id={`email${index}`}
                    value={member.email}
                    onChange={(e) => {
                      const newMembers = [...members];
                      newMembers[index].email = e.target.value;
                      setMembers(newMembers);
                    }}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div>
                  <label htmlFor={`role${index}`} className="block text-sm font-medium mb-1">Role</label>
                  <input
                    type="text"
                    id={`role${index}`}
                    value={member.role}
                    onChange={(e) => {
                      const newMembers = [...members];
                      newMembers[index].role = e.target.value;
                      setMembers(newMembers);
                    }}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Project Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium mb-1">Project Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              {Object.keys(statusColors).map((statusKey) => (
                <option key={statusKey} value={statusKey}>
                  {statusKey.charAt(0).toUpperCase() + statusKey.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Team
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTeam;
