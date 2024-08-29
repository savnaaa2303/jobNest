// src/Components/Navbar.jsx

import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import AuthContext from '../context/AuthContext';
import { useState } from 'react';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const navItems = [
    { path: "/", title: "Start a Search" },
    { path: "/my-job", title: "My Jobs" },
    { path: "/salary", title: "Salary Estimate" },
    { path: "/post-job", title: "Post a Job" },
  ];

  const { user, logout } = useContext(AuthContext);

  return (
    <header className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <nav className="flex justify-between items-center py-6">
        <a href="/" className='flex items-center gap-2 text-2xl text-black'>
          <svg xmlns="http://www.w3.org/2000/svg" width="29" height="30" viewBox="0 0 29 30" fill="none">
            <circle cx="12.0143" cy="12.5143" r="12.0143" fill="#3575E2" fillOpacity="0.4" />
            <circle cx="16.9857" cy="17.4857" r="12.0143" fill="#3575E2" />
          </svg>
          <span>JobNest</span>
        </a>
        <ul className='hidden md:flex gap-12'>
          {
            navItems.map(({ path, title }) => (
              <li key={path} className="text-base text-primary">
                <NavLink to={path} className={({ isActive }) => isActive ? "active" : ""}>
                  {title}
                </NavLink>
              </li>
            ))
          }
        </ul>
        <div className='flex items-center space-x-5'>
          {user ? (
            <>
              <img
                src={user.photoURL}
                alt="Profile"
                className="profile-picture w-10 h-10 rounded-full cursor-pointer"
                onClick={logout}
              />
            </>
          ) : (
            <>
              <Link to="/login" className='py-2 px-5 border rounded'>Log In</Link>
              <Link to="/sign-up" className='py-2 px-5 border rounded bg-blue text-white'>Sign Up</Link>
            </>
          )}
        </div>
        <div className="md:hidden block">
          <button onClick={handleMenuToggler}>
            {isMenuOpen ? <FaXmark className='w-5 h-5 text-primary' /> : <FaBarsStaggered className='w-5 h-5 text-primary' />}
          </button>
        </div>
      </nav>
      <div className={`px-4 bg-black py-5 rounded-sm ${isMenuOpen ? "" : "hidden"}`}>
        <ul>
          {
            navItems.map(({ path, title }) => (
              <li key={path} className="text-base text-white first:text-white py-1">
                <NavLink to={path} className={({ isActive }) => isActive ? "active" : ""}>
                  {title}
                </NavLink>
              </li>
            ))
          }
          {!user && <li className='text-white py-1'><Link to="/login">Log In</Link></li>}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
