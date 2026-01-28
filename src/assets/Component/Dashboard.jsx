import React, { useContext } from "react";
import { Outlet, Link, useNavigate, NavLink } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { 
  FaBars, 
  FaHome, 
  FaUser, 
  FaSignOutAlt, 
  FaChartPie, 
  FaShoppingBag, 
  FaList 
} from "react-icons/fa";

const DashboardLayout = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut()
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };

  // Helper function for active link styling
  const navLinkClasses = ({ isActive }) => 
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
      isActive ? "bg-primary text-white shadow-md" : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
    }`;

  const menuItems = (
    <>
      <li className="mb-2">
        <NavLink to="/dashboard" end className={navLinkClasses}>
          <FaChartPie /> Dashboard Overview
        </NavLink>
      </li>
      <li className="mb-2">
        <NavLink to="dashboard/profile" className={navLinkClasses}>
          <FaUser /> My Profile
        </NavLink>
      </li>
  
      
      <div className="divider my-4"></div>

      <li className="mb-2">
        <NavLink to="/" className={navLinkClasses}>
           <FaHome /> Back to Home
        </NavLink>
      </li>
      
    </>
  );

  return (
    <div className="drawer lg:drawer-open bg-base-200">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      
      {/* ------------------ MAIN CONTENT AREA ------------------ */}
      <div className="drawer-content flex flex-col min-h-screen">
        
        {/* Mobile Top Navbar */}
        <div className="w-full navbar bg-base-100 lg:hidden shadow-sm sticky top-0 z-50">
          <div className="flex-none">
            <label htmlFor="dashboard-drawer" className="btn btn-square btn-ghost">
              <FaBars className="text-xl"/>
            </label>
          </div>
          <div className="flex-1 px-2 mx-2 text-xl font-bold text-primary">#PawMart</div>
          <div className="flex-none">
            <div className="avatar">
              <div className="w-8 rounded-full">
                <img src={user?.photoURL || "https://placehold.co/100"} alt="profile" />
              </div>
            </div>
          </div>
        </div>

        {/* Page Content Rendered Here */}
        <div className="p-6 md:p-10">
            <Outlet />
        </div>
      </div>

    
      <div className="drawer-side z-50">
        <label htmlFor="dashboard-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="menu p-4 w-72 min-h-full bg-base-100 text-base-content border-r border-base-300 flex flex-col">
          
          {/* Logo */}
          <div className="mb-8 px-4 mt-2">
            <h2 className="text-3xl font-extrabold tracking-tight">
              #Paw<span className="text-primary">Mart</span>
            </h2>
            <p className="text-xs text-base-content/50 uppercase tracking-widest mt-1">Admin Panel</p>
          </div>
          
          {/* Navigation Links */}
          <ul className="flex-1">
            {menuItems}
          </ul>
          
          {/* User Profile Footer */}
          <div className="mt-auto border-t border-base-200 pt-4">
             <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-base-200 transition-colors cursor-pointer">
                 <div className="avatar">
                    <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={user?.photoURL || "https://placehold.co/100"} alt="User" />
                    </div>
                 </div>
                 <div className="overflow-hidden">
                     <p className="font-bold text-sm truncate">{user?.displayName}</p>
                     <p className="text-xs opacity-60 truncate">{user?.email}</p>
                 </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;