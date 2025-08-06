import React, { useState, useEffect, useContext } from "react";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import api from "../utils/axiosConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bgImage, setBgImage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { contextValue } = useContext(AppContext);
  const { setUser } = contextValue;

  const navigate = useNavigate();

  // Random background wallpaper
  useEffect(() => {
    const wallpapers = [
      "/wallpaper/light-purple.jpg",
      "/wallpaper/smooth-purple-dark.jpg",
      "/wallpaper/smooth-purple-white.avif",
      "/wallpaper/blur-purple.avif",
      "/wallpaper/dark-purple-rect.avif",
      "/wallpaper/purple-gradient.png",
      "/wallpaper/purple-valley.jpg",
    ];
    setBgImage(wallpapers[Math.floor(Math.random() * wallpapers.length)]);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post("/login", { email, password });

      const { token, user } = response.data;

      if (response.status === 200) {
        console.log("Login response:", response.data);
        toast.success("Login successful! 🎉");
        localStorage.setItem("token", token); // Save JWT token
        setUser(user); // Assuming setUser is defined in context
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      toast.error("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      <div className="rounded-2xl shadow-2xl w-full max-w-md p-8 bg-white">
        {/* Title */}
        <h1 className="text-4xl font-semibold text-black text-center mb-3">
          Login <span className="text-indigo-500">Page</span>
        </h1>
        <p className="text-gray-600 font-mono text-center mb-6">
          Welcome back! Please login to continue.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-black placeholder-gray-300 border-2 border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
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

          {/* Animated Loader Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 rounded-lg font-semibold relative overflow-hidden transition-all 
            ${
              isLoading
                ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white animate-border-move"
                : "bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600"
            }`}
          >
            {isLoading ? "Logging In..." : "Login"}
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center text-gray-500 mt-6 text-sm">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-purple-500 hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
