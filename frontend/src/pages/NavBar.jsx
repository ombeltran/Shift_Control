import React from 'react';
import { Link } from "react-router-dom";
import { listNavBar } from "./listNavBar";

const NavBar = () => {
    return (
        <nav className='fixed flex items-center justify-between text-white font-bold
        bg-slate-400/20 shadow-lg shadow-white/20 px-11 py-3 w-screen z-50' >
            <Link to='/'>
                <h1 className='text-2xl'>My Bussiness</h1>
            </Link>
            <ul className='flex gap-6 md:gap-16 text-lg'>

                {
                    listNavBar.map(({ name, path, icon }) => (
                        <li
                            key={name}
                        >
                            <Link
                                to={path}
                                className='flex items-center gap-2'
                            >
                                {icon}
                                <div className='hidden md:block'>
                                    {name}
                                </div>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}

export default NavBar;
