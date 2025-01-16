import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [loginUser, setloginUser] = useState("");

    return (
        <UserContext.Provider
            value={{
                loginUser, 
                setloginUser
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider; 
