import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { FaCamera } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../utils/axiosConfig"; // Adjust the import based on your project structure
import axios from "axios";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [bgImage, setBgImage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Check backend health on component mount
  useEffect(() => {
    api
      .get("/health")
      .then((res) => console.log("Backend health:", res.data))
      .catch((err) => console.error("Backend health error:", err));
  }, []);

  useEffect(() => {
    // List of available wallpapers
    const wallpapers = [
      "/wallpaper/light-purple.jpg",
      "/wallpaper/smooth-purple-dark.jpg",
      "/wallpaper/smooth-purple-white.avif",
      "/wallpaper/blur-purple.avif",
      "/wallpaper/dark-purple-rect.avif",
      "/wallpaper/purple-gradient.png",
      "/wallpaper/purple-valley.jpg",
    ];

    // Pick a random one
    const randomWallpaper =
      wallpapers[Math.floor(Math.random() * wallpapers.length)];

    setBgImage(randomWallpaper);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!fullName.trim()) {
      toast.error("Full Name is required");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    console.log({ fullName, email, password, profileImage });

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("profileImage", profileImage); // actual file

      // 🚀 Log all FormData values
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const response = await api.post("/register", formData);
      // .then((res) => console.log("Backend register:", res.data))
      // .catch((err) => console.error("Backend registor error:", err));

      if (response.status === 201 || response.status === 200) {
        console.log("Signup successful:", response.data);
        // localStorage.setItem("token", response.data.token);
        toast.success("Account created successfully! 🎉");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error during signup:", error.message);
      toast.error("An error occurred during signup. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-4"
      style={{
        backgroundImage: `url('${bgImage}')`,
      }}
    >
      {/* Glassy Form Container */}
      <div className="rounded-2xl shadow-2xl w-full max-w-md p-8 bg-white ">
        {/* Title */}
        <h1 className="text-4xl font-semibold text-black text-center mb-3 drop-shadow-lg animate-fadeIn">
          Signup <span className="text-indigo-500">Page</span>
        </h1>

        <h1 className="text-md font-mono font-semibold text-gray-700 -mb-1 text-center">
          Tired of Wondering "Where Did My{" "}
          <span className="text-purple-500 font-semibold">Money</span> Go
          <span className="text-purple-500">?</span>
        </h1>
        <p className="text-gray-600 font-mono text-center mb-6">
          Join Spend<span className="text-purple-500 font-semibold">Wise</span>{" "}
          and find out<span className="text-purple-500">.</span>
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-black placeholder-gray-300 border-2 border-purple-400  focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-black placeholder-gray-300 border-2 border-purple-400  focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="bruce@wayne.com"
              required
            />
          </div>

          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-black placeholder-gray-300 border-2 border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400 pr-10"
              placeholder="••••••••"
              required
            />

            {/* Eye toggle button */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-300 hover:text-gray-700"
            >
              {showPassword ? (
                <IoMdEyeOff className="w-5 h-5" />
              ) : (
                <IoEye className="w-5 h-5" />
              )}
            </button>
          </div>

          <div className="flex flex-col items-center">
            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              onChange={handleImageChange}
              className="hidden"
            />

            {/* Upload button as an icon */}
            <label
              htmlFor="fileInput"
              className="cursor-pointer w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center hover:bg-purple-200 transition"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-full border border-gray-300"
                />
              ) : (
                <FaCamera className="text-purple-600 text-3xl" />
              )}
            </label>
          </div>
          {/* <div>
           <label className="text-black text-sm mb-1 block ">
             Profile Picture
           </label>
           <input
             type="file"
             accept="image/*"
             onChange={handleImageChange}
             className="w-full text-black text-sm"
           />
           {preview && (
             <img
               src={preview}
               alt="Preview"
               className="mt-3 w-24 h-24 rounded-full object-cover border border-white/30 shadow-lg"
             />
           )}
         </div> */}

          {/* Submit Button */}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-lg font-semibold relative overflow-hidden transition-all 
            ${
              isLoading
                ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white animate-border-move"
                : "bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600"
            }`}
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>

          {/* <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg font-semibold 
             shadow-lg shadow-purple-500/40 
             hover:shadow-xl hover:shadow-purple-500/50 
             hover:from-purple-600 hover:to-indigo-600 
             focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
          >
            Sign Up
          </button> */}
        </form>

        {/* Login Link */}
        <p className="text-center text-gray-500 mt-6 text-sm">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-purple-500 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
