import React from 'react';

export const Botton = ({ children, className, ...props }) => {
    return (
        <button
            className={`bg-red-700 py-2 px-6 rounded-full font-bold hover:scale-105 
            border-2 cursor-pointer ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
