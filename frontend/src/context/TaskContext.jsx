import React,{createContext, useState, useEffect} from "react";
import { server_url } from "../../config";

export const TaskContext = createContext()

export const TaskProvider = ({children}) => {
    
    const [task, setTask] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
}