import React, { useContext, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { AppContext } from "../context/AppContext";

const Dashboard = () => {
  const { user } = useContext(AppContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // central state

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        setIsSidebarOpen={setIsSidebarOpen}
        isSidebarOpen={isSidebarOpen}
      />

      {user && (
        <div className="flex">
          {/* Mobile Sidebar */}
          {isSidebarOpen && (
            <div className="md:hidden fixed inset-y-0 left-0 w-64 z-30">
              <Sidebar />
            </div>
          )}

          {/* Desktop Sidebar */}
          <div className="hidden md:block w-52">
            <Sidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 mt-16 md:mt-0">
            <h1 className="text-2xl font-bold">Main content</h1>
            {/* Add your dashboard content here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
