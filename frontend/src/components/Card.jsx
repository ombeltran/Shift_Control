import React from 'react'

export function Card({ children, className }) {
    return (
        <div className={`flex justify-center items-center h-[30%] w-[30%] rounded-2xl
      text-white gap-4 bg-gradient-to-b from-transparent/50 to-black border-2 shadow-xl 
      shadow-slate-600 ${className}`}>
            {children}
        </div>
    )
}
