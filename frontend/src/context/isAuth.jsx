import React, { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserProvider";

export const IsAuth = () => {
    const { loginUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loginUser) {
            navigate('/login');
        }
    }, [loginUser, navigate]);
    
    return null; 
}
