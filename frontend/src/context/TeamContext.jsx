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


    return (
        <TeamContext.Provider value={{ teams, members, loading, addTeam, fetchTeams, fetchMembers }} >
            {children}
        </TeamContext.Provider>
    )
}