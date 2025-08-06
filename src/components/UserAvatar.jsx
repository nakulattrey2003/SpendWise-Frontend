import React, { useContext } from "react";
import { FaUserCircle, FaTimes } from "react-icons/fa";
import { AppContext } from "../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";

const UserAvatar = ({ onClose }) => {
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
    onClose(); // notify parent to close modal
  };

  return (
    <div
      className="fixed top-1/2 left-1/2 z-50 w-80 max-w-full -translate-x-1/2 -translate-y-1/2
                 rounded-3xl bg-purple-100 backdrop-blur-md border border-white/30 shadow-xl p-6 flex flex-col items-center"
    >
      <button
        onClick={onClose}
        className="self-end text-gray-600 hover:text-purple-600 mb-2"
        aria-label="Close user profile"
      >
        <FaTimes size={20} />
      </button>

      {user?.profileImageUrl ? (
        <img
          src={user.profileImageUrl}
          alt="User Profile"
          className="w-24 h-24 rounded-full border-4 border-purple-500 object-cover mb-4"
        />
      ) : (
        <FaUserCircle className="text-7xl text-gray-500 mb-4" />
      )}

      <h2 className="text-xl font-semibold text-gray-900 mb-1">
        {user?.fullName || "User"}
      </h2>

      <p className="text-sm text-gray-600 mb-6">{user?.email || "No email"}</p>

      <button
        onClick={handleLogout}
        className="w-full py-2 rounded-lg text-white bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 shadow-md transition duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default UserAvatar;
