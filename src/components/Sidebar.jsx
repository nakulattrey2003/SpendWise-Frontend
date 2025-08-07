import React from "react";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaWallet,
  FaTags,
  FaExchangeAlt,
  FaFilter,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="h-screen w-52 bg-white backdrop-blur-md shadow-md text-gray-800 p-6 flex flex-col space-y-4 border-r border-white/20">
      <SidebarButton
        icon={<FaTachometerAlt />}
        label="Dashboard"
        to="/dashboard"
      />
      <SidebarButton icon={<FaTags />} label="Category" to="/category" />
      <SidebarButton icon={<FaWallet />} label="Income" to="/income" />
      <SidebarButton icon={<FaExchangeAlt />} label="Expense" to="/expense" />
      <SidebarButton icon={<FaFilter />} label="Filters" to="/filter" />
    </aside>
  );
};

const SidebarButton = ({ icon, label, to }) => {
  return (
    <Link
      to={to}
      className="flex items-center px-4 py-2 rounded-md transition-all duration-300 hover:text-black text-gray-500 font-medium hover:bg-white/40"
    >
      <span className="text-lg mr-3">{icon}</span>
      {label}
    </Link>
  );
};

export default Sidebar;
