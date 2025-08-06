import React, { useState, useEffect, useContext } from "react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { AppContext } from "../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";
import UserAvatar from "./UserAvatar.jsx";
import api from "../utils/axiosConfig.jsx";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserAvatar, setShowUserAvatar] = useState(false);
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const profileImageUrl = user?.profileImageUrl ? user.profileImageUrl : null;

  console.log("Context API user object:", user);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-white shadow-md fixed w-full z-50 top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side - Logo */}
            <div
              onClick={() => navigate("/dashboard")}
              className="flex items-center cursor-pointer"
            >
              <h1 className="text-2xl font-bold text-black">
                Spend<span className="text-purple-500">Wise</span>
              </h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <button
                className="px-1 py-2 text-sm font-medium text-gray-700 border-b-3 border-transparent
             hover:border-purple-600 hover:text-purple-600 transition-colors duration-300"
              >
                Dashboard
              </button>
              <button
                className="px-1 py-2 text-sm font-medium text-gray-700 border-b-3 border-transparent
             hover:border-purple-600 hover:text-purple-600 transition-colors duration-300"
              >
                Reports
              </button>
              <button
                className="px-1 py-2 text-sm font-medium text-gray-700 border-b-3 border-transparent
             hover:border-purple-600 hover:text-purple-600 transition-colors duration-300"
              >
                Settings
              </button>

              <div>
                <p className="text-sm font-medium hover:text-purple-600 -mr-4">
                  Ahoy... {user ? user.fullName : "Guest"}
                </p>
              </div>

              {/* User Image */}
              {profileImageUrl ? (
                <img
                  src={profileImageUrl}
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-purple-400 object-cover cursor-pointer hover:w-12 hover:h-12 transition-all duration-300"
                  onClick={() => setShowUserAvatar(true)}
                />
              ) : (
                <FaUserCircle
                  className="text-3xl text-gray-500"
                  onClick={() => setShowUserAvatar(true)}
                />
              )}

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white rounded-lg"
              >
                Logout
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 hover:text-purple-600 focus:outline-none"
              >
                {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-md px-4 pb-4 space-y-2">
            <button className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-purple-100">
              Dashboard
            </button>
            <button className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-purple-100">
              Reports
            </button>
            <button className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-purple-100">
              Settings
            </button>

            {/* User Icon + Name */}
            <div className="flex items-center mt-2">
              {profileImageUrl ? (
                <img
                  src={profileImageUrl}
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-purple-400 object-cover"
                  onClick={() => setShowUserAvatar(true)}
                />
              ) : (
                <FaUserCircle
                  className="text-3xl text-gray-500"
                  onClick={() => setShowUserAvatar(true)}
                />
              )}
              <span className="ml-2 text-gray-700">
                {user?.fullName || "User"}
              </span>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="mt-3 w-full px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
            >
              Logout
            </button>
          </div>
        )}
      </nav>
      {/* Backdrop + UserAvatar modal */}
      {showUserAvatar && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 backdrop-blur-sm shadow-lg z-40"
            onClick={() => setShowUserAvatar(false)}
          />

          {/* UserAvatar modal */}
          <UserAvatar onClose={() => setShowUserAvatar(false)} />
        </>
      )}
    </>
  );
};

export default Navbar;
