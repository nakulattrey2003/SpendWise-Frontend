import React from "react";
import { Link } from "react-router-dom";

const Batman = () => {
  return (
    <div
      className="relative w-screen h-screen   "
      style={{
        backgroundImage: `url('/assets/static/batmanWallpaper.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-xs" />

      {/* Centered content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6 space-y-6">
        <h1 className="text-6xl md:text-8xl font-bold tracking-wider text-red-600 drop-shadow-lg animate-pulse">
          404
        </h1>
        <p className="glitch text-5xl md:text-3xl font-semibold tracking-wide leading-tight text-white font-serif">
          Looks like you've wandered into Gotham's dark corners.
        </p>
        <p className="italic text-lg md:text-xl text-gray-300">
          "The city is broken... and so is this page."
        </p>

        <Link
          to="/login"
          className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-800 text-white text-lg font-medium rounded-md transition duration-300"
        >
          Return to Safety (Home)
        </Link>
      </div>
    </div>
  );
};

export default Batman;
