import React from "react";

const Batman = () => {
  return (
    <div
      className="relative w-screen h-screen bg-black"
      style={{
        backgroundImage: `url('/assets/static/batmanWallpaper.jpg')`, // ensure this is inside public/static
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay for premium cinematic feel */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Centered dialogue */}
      <div className="absolute inset-0 flex items-center justify-center text-center px-6">
        <h1 className="text-5xl md:text-7xl font-bold tracking-wide leading-tight drop-shadow-lg animate-batmanFadeUp text-red-500 hover:text-orange-800 transition-colors duration-300 font-serif">
          "I am vengeance."
        </h1>
      </div>
    </div>
  );
};

export default Batman;
