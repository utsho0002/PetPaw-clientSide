import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router"; // or react-router-dom
import { AuthContext } from "../Provider/AuthProvider";
import { IoLogIn } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { getAuth, signOut } from "firebase/auth";
import Swal from "sweetalert2";
import logo from '../images/Untitled design (4).png';

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [isChecked, setIschecked] = useState(true);

  const handleThemeChange = () => {
    setIschecked(!isChecked);
    const theme = isChecked ? "dark" : "light";
    document.querySelector("html").setAttribute("data-theme", theme);
  };

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Logged out successfully",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
      })
      .catch((error) => { console.error(error) });
  };

  // Modern NavLink Styling
  const navLinkStyles = ({ isActive }) => 
    `px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
      isActive 
        ? "bg-primary text-primary-content shadow-md" 
        : "hover:bg-base-200 text-base-content/80 hover:text-primary"
    }`;

  return (
    <div className="flex justify-center mb-20">
      {/* Containerized Navbar with Glassmorphism */}
      <div className="navbar bg-base-100/80 backdrop-blur-md border-b border-base-200 fixed top-0 left-0 w-full z-50 px-4 lg:px-12 py-3 transition-all">
        
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-4 z-[1] p-3 shadow-xl bg-base-100 rounded-2xl w-64 border border-base-200">
              <li className="mb-1"><NavLink to="/">Home</NavLink></li>
              <li className="mb-1"><NavLink to="/pet-supplies">Pets & Supplies</NavLink></li>
              {user && (
                <>
                  <div className="divider my-1"></div>
                  <li className="mb-1"><NavLink to="/add-services">Add Services</NavLink></li>
                  <li className="mb-1"><NavLink to="/my-services">My Services</NavLink></li>
                  <li className="mb-1"><NavLink to="/my-orders">My Orders</NavLink></li>
                  <li><NavLink to="/dashboard" className={navLinkStyles}>DashBoard</NavLink></li>
                </>
              )}
            </ul>
          </div>
          
          <Link to="/" className="flex items-center gap-2 hover:scale-105 transition-transform">
            <img src={logo} alt="Logo" className="lg:h-12 h-9 w-auto object-contain"/>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="flex flex-row gap-2 px-1">
            <li><NavLink to="/" className={navLinkStyles}>Home</NavLink></li>
            <li><NavLink to="/pet-supplies" className={navLinkStyles}>Pets & Supplies</NavLink></li>
            {user && (
              <>
                <li><NavLink to="/add-services" className={navLinkStyles}>Add Services</NavLink></li>
                <li><NavLink to="/my-services" className={navLinkStyles}>My Services</NavLink></li>
                <li><NavLink to="/my-orders" className={navLinkStyles}>My Orders</NavLink></li>
                <li><NavLink to="/dashboard" className={navLinkStyles}>DashBoard</NavLink></li>
              </>
            )}
          </ul>
        </div>

        <div className="navbar-end gap-2 lg:gap-4">
          {/* Theme Switcher with better spacing */}
          <label className="swap swap-rotate btn btn-ghost btn-circle btn-sm lg:btn-md">
            <input onClick={handleThemeChange} type="checkbox" className="theme-controller" />
            <svg className="swap-off h-6 w-6 fill-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
            <svg className="swap-on h-6 w-6 fill-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
          </label>

          {user && (
            <div className="avatar online">
              <div className="lg:w-11 w-9 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 hover:scale-110 transition-transform cursor-pointer">
                <img src={user.photoURL} alt="User" />
              </div>
            </div>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="btn btn-outline btn-error btn-sm lg:btn-md rounded-full px-6 flex items-center gap-2 border-2 hover:shadow-lg"
            >
              <IoIosLogOut className="text-xl" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          ) : (
            <Link 
              to="/auth/login" 
              className="btn btn-primary btn-sm lg:btn-md rounded-full px-6 flex items-center gap-2 shadow-lg hover:shadow-primary/40"
            >
              <IoLogIn className="text-xl" /> Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;