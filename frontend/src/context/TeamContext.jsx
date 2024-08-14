import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { server_url } from "../../config";

export const TeamContext = createContext();

export const TeamContextProvider = ({ children }) => {
    const [teams, setTeams] = useState([]);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [authToken, setAuthToken] = useState(() => localStorage.getItem("access_token") || null);
    const [singleTeam, setSingleTeam] = useState(null);

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


    return (
        <TeamContext.Provider value={{ teams, members, loading, fetchTeams, fetchMembers }} >
            {children}
        </TeamContext.Provider>
    )
}