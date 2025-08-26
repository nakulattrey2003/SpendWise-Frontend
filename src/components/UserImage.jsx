import React from "react";

const UserImage = ({ profileImageUrl, onClick, className="" }) => {
  return (
    <div>
      <img
        src={profileImageUrl}
        alt="User"
        onClick={onClick}
        className={`rounded-full border-2 border-purple-400 object-cover cursor-pointer hover:scale-110 transition-transform ${className}`}
      />
    </div>
  );
};

export default UserImage;
