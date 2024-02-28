import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { listNavBar } from './listNavBar';

const NavBar = () => {
  const location = useLocation();
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    const currentOption = listNavBar.find((item) => item.path === location.pathname);
    if (currentOption) {
      setSelectedOption(currentOption.name);
    }
  }, [location.pathname]);

  return (
    <nav className='fixed flex items-center justify-between text-white font-bold bg-slate-400/20 shadow-lg shadow-white/20 px-11 py-3 w-full z-50'>
      <Link to='/'>
        <h1 className='text-2xl'>My Business</h1>
      </Link>
      <ul className='flex gap-6 md:gap-16 text-lg'>
        {listNavBar.map(({ name, path, icon }) => (
          <li key={name}>
            <Link
              to={path}
              className={`flex items-center gap-2 ${selectedOption === name ? 'border-b-4 border-blue-500 md:border-b-2 md:border-white' : ''}`}
            >
              {icon}
              <div className='hidden md:block'>{name}</div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
