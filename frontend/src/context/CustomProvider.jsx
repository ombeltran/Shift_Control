import React, { createContext, useState } from 'react';

export const CustomContext = createContext();

export const CustomProvider = ({ children }) => {
    const [customer, setCustomer] = useState([]);

    return (
        <CustomContext.Provider
            value={{
                customer,
                setCustomer
            }}
        >
            {children}
        </CustomContext.Provider>
    );
};

export default CustomProvider; 
