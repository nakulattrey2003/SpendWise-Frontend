import React from "react";

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex items-center p-4 rounded-xl shadow-md bg-white text-gray-800 w-full">
      {/* icon background color */}
      <div className={`p-3 rounded-full mr-4 shadow-lg text-white ${color}`}>{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <h2 className="text-xl font-bold">₹ {value}</h2>
      </div>
    </div>
  );
};

export default InfoCard;
