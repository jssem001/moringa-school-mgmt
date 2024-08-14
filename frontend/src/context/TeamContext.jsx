import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { server_url } from "../../config";

export const TeamContext = createContext();

export const TeamContextProvider = ({ children }) => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(false);
    const [authToken, setAuthToken] = useState(() => localStorage.getItem("access_token") || null);
    const [singleTeam, setSingleTeam] = useState(null);

    const fetchTeams = async () => {
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
            });
        };
    }

    useEffect(() => {
        fetchTeams();
    }, [authToken]);