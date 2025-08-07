import React, { useContext, useState } from "react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { AppContext } from "../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";
import UserAvatar from "./UserAvatar.jsx";
import UserImage from "./UserImage.jsx";

const Navbar = ({ setIsSidebarOpen, isSidebarOpen }) => {
  const { user, setUser } = useContext(AppContext);
  const [showUserAvatar, setShowUserAvatar] = useState(false);
  const navigate = useNavigate();

  const profileImageUrl = user?.profileImageUrl ?? null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-white shadow-md fixed w-full z-40 top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div
              onClick={() => navigate("/dashboard")}
              className="flex items-center cursor-pointer"
            >
              <h1 className="text-2xl font-bold text-black">
                Spend<span className="text-purple-500">Wise</span>
              </h1>
            </div>

            {/* Desktop Section */}
            <div className="hidden md:flex items-center space-x-6">
              <p className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500">
                Namaste {user ? user.fullName : "Guest"}
              </p>

              {profileImageUrl ? (
                <UserImage
                  profileImageUrl={profileImageUrl}
                  onClick={() => setShowUserAvatar(true)}
                />
              ) : (
                <FaUserCircle
                  className="text-3xl text-gray-500 cursor-pointer"
                  onClick={() => setShowUserAvatar(true)}
                />
              )}

              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white rounded-lg"
              >
                Logout
              </button>
            </div>

            {/* Burger Menu - Mobile */}
            <div className="md:hidden flex items-center justify-center">
              <div className="mr-5">
              <UserImage
                onClick={() => setShowUserAvatar(true)}
                profileImageUrl={profileImageUrl}
              />
              </div>
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-2xl text-purple-600 focus:outline-none"
              >
                {isSidebarOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* User Avatar Modal */}
      {showUserAvatar && (
        <>
          <div
            className="fixed inset-0 backdrop-blur-sm z-40"
            onClick={() => setShowUserAvatar(false)}
          />
          <UserAvatar onClose={() => setShowUserAvatar(false)} />
        </>
      )}
    </>
  );
};

export default Navbar;
