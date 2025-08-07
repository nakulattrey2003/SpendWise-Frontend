import React from "react";

const UserImage = ({ profileImageUrl, onClick }) => {
  return (
    <div>
      <img
        src={profileImageUrl}
        alt="User"
        onClick={onClick}
        className="w-10 h-10 rounded-full border-2 border-purple-400 object-cover cursor-pointer hover:scale-110 transition-transform"
      />
    </div>
  );
};

export default UserImage;
