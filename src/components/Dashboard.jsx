import React, { useContext, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { AppContext } from "../context/AppContext";

const NAVBAR_HEIGHT = 64; // h-16
const SIDEBAR_WIDTH = 208; // w-52

const Dashboard = ({ children, activeMenu }) => {
  const { user } = useContext(AppContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        // backgroundImage: `url("/wallpaper/bg-purple.jpeg")`,
        // backgroundImage: `url("/wallpaper/bg-purple-waves.jpeg")`,
        backgroundImage: `url("/wallpaper/diff-purple.jpg")`,
        // backgroundImage: `url("/wallpaper/light-purple.jpg")`,
        // backgroundImage: `url("/wallpaper/smooth-purple-dark.jpg")`,
        // backgroundImage: `url("/wallpaper/smooth-purple-white.avif")`,
        // backgroundImage: `url("/wallpaper/blur-purple.avif")`,
        // backgroundImage: `url("/wallpaper/purple-valley.jpg")`,
      }}
    >
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-40 h-16 bg-white shadow-md">
        <Navbar
          activeMenu={activeMenu}
          setIsSidebarOpen={setIsSidebarOpen}
          isSidebarOpen={isSidebarOpen}
        />
      </div>

      {/* Sidebar - Fixed on Desktop */}
      <div>
        <div className="hidden md:block fixed top-16 left-0 h-[calc(100%-64px)] border-none w-52 bg-white z-30">
          <Sidebar activeMenu={activeMenu} />
        </div>

        {/* Mobile Sidebar - Slide-in */}
        {isSidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-opacity-40 z-40 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
            <div className="fixed top-12 inset-y-0 left-0 w-52 z-20 border-none shadow md:hidden">
              <Sidebar activeMenu={activeMenu} />
            </div>
          </>
        )}
      </div>

      {/* Main Content */}
      <div
        className="relative z-10 p-4"
        style={{
          paddingTop: `${NAVBAR_HEIGHT}px`,
          paddingLeft: user
            ? window.innerWidth >= 768
              ? `${SIDEBAR_WIDTH}px`
              : "0px"
            : "0px",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Dashboard;
