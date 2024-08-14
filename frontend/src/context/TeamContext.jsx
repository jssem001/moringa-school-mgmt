import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { server_url } from "../../config";

export const TeamContext = createContext();

export const TeamContextProvider = ({ children }) => {
    const [teams, setTeams] = useState([]);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [authToken, setAuthToken] = useState(() => localStorage.getItem("access_token") || null);

    // Fetch Teams
    const fetchTeams = async () => {
        setLoading(true);
        fetch(`${server_url}/teams`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`
                },
            })
            .then((response) => response.json())
            .then((data) => {
                setTeams(data);
            })
            .catch((error) => {
                toast.error(error.message || "Failed to fetch teams");
            })
            .finally(() => {setLoading(false)});
        };
    
    //Fetch Memebers 
    const fetchMembers = async () => {
        setLoading(true);
        fetch(`${server_url}/teams/<int:team_id>/members`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`
                },
            })
            .then((response) => response.json())
            .then((data) => {
                setMembers(data);
            })
            .catch((error) => {
                toast.error(error.message || "Failed to fetch team members");
            })
            .finally(() => {setLoading(false)});
    }    

    useEffect(() => {
        fetchTeams();
        fetchMembers();
    }, [authToken]);

    // Add Team
    const addTeam = (formData) => {
        fetch(`${server_url}/teams`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify(formData)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to add team");
                }
                toast.success("Team added successfully");
            })
            .catch((error) => {
                toast.error(error.message || "Failed to add team");
            })
            .finally(() => {
                fetchTeams();
            });
    };

    //Add a team member
    const addMemberToTeam = async (teamId, userId) => {
        try {
          const response = await fetch(`/teams/${teamId}/members`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: userId }),
          });
    
          if (!response.ok) {
            throw new Error("Failed to add member");
          }
    
          const newMember = await response.json();
          // Update the local state to include the new member
          setTeams((prevTeams) =>
            prevTeams.map((team) =>
              team.id === teamId
                ? { ...team, members: [...team.members, newMember] }
                : team
            )
          );
          toast.success("Member added successfully");
        } catch (error) {
          toast.error(error.message || "Failed to add member");
        }
      }; 

    // Edit Team
    const updateTeam = async (teamId, updatedData) => {
        try {
          const response = await fetch(`/teams/${teamId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}` // Add token if required
            },
            body: JSON.stringify(updatedData),
          });
    
          if (!response.ok) {
            throw new Error('Failed to update team');
          }
    
          const updatedTeam = await response.json();
          // Optionally, update state with the updated team
          setTeams(teams.map(team => team.id === teamId ? updatedTeam : team));
        } catch (error) {
          console.error('Error updating team:', error);
        }
      };  

    // Delete Team
    const deleteTeam = (teamId) => {
        fetch(`${server_url}/teams/${teamId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to delete team");
                }
                toast.success("Team deleted successfully");
            })
            .catch((error) => {
                toast.error(error.message || "Failed to delete team");
            })
            .finally(() => {
                fetchTeams();
            });
    };


    return (
        <TeamContext.Provider value={{ teams, members, loading, addTeam, updateTeam, fetchTeams, fetchMembers, deleteTeam }} >
            {children}
        </TeamContext.Provider>
    )
}