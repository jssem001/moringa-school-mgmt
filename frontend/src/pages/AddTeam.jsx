import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TeamContext } from "../context/TeamContext";
import { ProjectContext } from "../context/ProjectContext";
import { UserContext } from "../context/UserContext";
import Sidebar from "../components/Sidebar";

const AddTeam = () => {
  const { addTeam } = useContext(TeamContext);
  const { projects, fetchProjects } = useContext(ProjectContext);
  const { allUsers, fetchUsers } = useContext(UserContext);
  const [teamName, setTeamName] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [numMembers, setNumMembers] = useState(1);
  const [members, setMembers] = useState([{ name: "", role: "" }]);
  const navigate = useNavigate();
  // const auth_token = localStorage.getItem("auth_token"); // Assuming auth_token is stored in localStorage

  // Placeholder for fetching projects
  useEffect(() => {
    fetchProjects();
    fetchUsers();
  }, []);

  // Placeholder for form submission
  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   const formData = {
  //     name: teamName,
  //     project: selectedProject,
  //     members,
  //   };

  //   try {
  //     await addTeam(formData);
  //     navigate("/teams"); // Redirect to teams page
  //   } catch (error) {
  //     toast.error(error.message || "Failed to add team");
  //   }
  // };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const project_id = selectedProject
    // const project = projects.find((p) => p.name === selectedProject);
    // const project_id = project ? project.id : null;

    const membersWithIds = members.map((member) => {
      const user = allUsers.find((u) => u.name === member.name);
      return {
        user_id: user ? user.id : null,
        role: member.role,
      };
    });
    // const membersWithIds = members.map((member) => {
    //   const user = users.find((u) => u.name === member.name);
    //   return {
    //     user_id: user ? user.id : null,
    //     role: member.role,
    //   };
    // });

    const formData = {
      name: teamName,
      project_id: project_id,
      members: membersWithIds,
    };

    try {
      await addTeam(formData);
      navigate("/teams"); // Redirect to teams page
    } catch (error) {
      toast.error(error.message || "Failed to add team");
    }
  };

  // Handle member fields based on number of members
  useEffect(() => {
    const newMembers = Array.from({ length: numMembers }, (_, index) => ({
      name: members[index]?.name || "",
      role: members[index]?.role || "",
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
              <option value="">Select A Project</option>
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
                  <label htmlFor={`name${index}`} className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    id={`name${index}`}
                    value={member.name}
                    onChange={(e) => {
                      const newMembers = [...members];
                      newMembers[index].name = e.target.value;
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
