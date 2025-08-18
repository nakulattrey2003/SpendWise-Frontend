import React from "react";
import { Link } from "react-router-dom";
import { FaExchangeAlt } from "react-icons/fa";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { IoIosWallet } from "react-icons/io";
import { TbFiltersFilled } from "react-icons/tb";
import { MdCategory } from "react-icons/md";
import UserAvatar from "./UserAvatar";
import UserImage from "./UserImage";

const Sidebar = ({ activeMenu }) => {
  return (
    <aside className="h-screen w-52 bg-white text-gray-800 p-6 flex flex-col space-y-4 shadow-2xl">
      <div className="bg-purple-50 p-4 rounded-lg mb-6 h-11/12 shadow-lg">
        <SidebarButton
          icon={<TbLayoutDashboardFilled />}
          label="Dashboard"
          to="/dashboard"
          activeMenu={activeMenu}
        />
        <SidebarButton
          icon={<IoIosWallet />}
          label="Income"
          to="/income"
          activeMenu={activeMenu}
        />
        <SidebarButton
          icon={<FaExchangeAlt />}
          label="Expense"
          to="/expense"
          activeMenu={activeMenu}
        />
        <SidebarButton
          icon={<MdCategory />}
          label="Category"
          to="/category"
          activeMenu={activeMenu}
        />
        <SidebarButton
          icon={<TbFiltersFilled />}
          label="Filters"
          to="/filter"
          activeMenu={activeMenu}
        />
      </div>
    </aside>
  );
};

const SidebarButton = ({ icon, label, to, activeMenu }) => {
  const isActive = activeMenu === label;

  return (
    <>
      <Link
        to={to}
        className={`flex w-full items-center px-4 py-2 rounded-md transition-all duration-300 text-sm mb-3 ${
          isActive
            ? "bg-purple-900 text-white shadow-2xl"
            : "text-gray-500 hover:text-black hover:bg-white/40"
        }`}
      >
        <span className="text-lg mr-3">{icon}</span>
        {label}
      </Link>
    </>
  );
};

export default Sidebar;
