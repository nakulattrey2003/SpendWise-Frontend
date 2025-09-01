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

  const handleUpdate = () => {
    // Navigate to the update profile page
    navigate("/update-profile");
    onClose(); // optionally close the avatar modal
  };

  return (
    <div
      className="fixed top-1/2 left-1/2 z-60 w-80 max-w-full -translate-x-1/2 -translate-y-1/2
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
        <div className="relative w-28 h-28 rounded-full overflow-hidden">
          {/* Gradient border layer */}
          <div className="absolute inset-0 rounded-full p-[3px] bg-gradient-to-tr from-purple-500 via-pink-400 to-transparent animate-spin"></div>

          {/* Inner solid background so gradient fades out */}
          <div className="absolute inset-[3px] rounded-full bg-purple-50"></div>

          {/* Profile image */}
          <img
            src={user.profileImageUrl}
            alt="User Profile"
            className="relative w-24 h-24 rounded-full object-cover mx-auto mt-2"
          />
        </div>
      ) : (
        <FaUserCircle className="text-7xl text-gray-500 mb-4" />
      )}

      <h2 className="text-xl font-semibold text-gray-900 mb-1">
        {user?.fullName || "User"}
      </h2>

      <p className="text-sm text-gray-600 mb-6">{user?.email || "No email"}</p>

      {/* ✅ Update Profile Button */}
      <button
        onClick={handleUpdate}
        className="w-full py-2 rounded-lg text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-600 hover:to-pink-600 shadow-md transition duration-300 mb-3"
      >
        Update Profile
      </button>

      {/* Logout Button */}
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
