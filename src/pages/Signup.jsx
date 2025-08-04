import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [bgImage, setBgImage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // List of available wallpapers
    const wallpapers = [
      "/wallpaper/light-purple.jpg",
      "/wallpaper/smooth-purple-dark.jpg",
      "/wallpaper/smooth-purple-white.avif",
    ];

    // Pick a random one
    const randomWallpaper =
      wallpapers[Math.floor(Math.random() * wallpapers.length)];

    setBgImage(randomWallpaper);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ fullName, email, password, image });
    navigate("/dashboard");
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
          Spend<span className="text-indigo-500">Wise</span>
        </h1>

        <h1 className="text-md font-mono font-semibold text-gray-700 -mb-1 text-center">
          Tired of Wondering "Where Did My{" "}
          <span className="text-indigo-500 font-semibold">Money</span> Go
          <span className="text-indigo-500">?</span>
        </h1>
        <p className="text-gray-600 font-mono text-center mb-6">
          Join Spend<span className="text-indigo-500 font-semibold">Wise</span>{" "}
          and find out<span className="text-indigo-500">.</span>
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-black placeholder-gray-200 border-2 border-purple-400  focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-black placeholder-gray-200 border-2 border-purple-400  focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-black placeholder-gray-200 border-2 border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="••••••••"
              required
            />
          </div>

          <div>
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
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r text-white from-purple-500 to-indigo-500 rounded-lg font-semibold hover:from-purple-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
          >
            Sign Up
          </button>
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

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Signup = () => {
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(null);

//   const navigate = useNavigate();

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImage(file);

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => setPreview(reader.result);
//       reader.readAsDataURL(file);
//     } else {
//       setPreview(null);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log({ fullName, email, password, image });
//     navigate("/dashboard");
//   };

//   return (
//     <div>
//       <div>
//         {/* Logo / Title */}
//         <h1 className="text-3xl font-bold text-black mb-2 text-center">
//           Spendwise
//         </h1>
//       </div>
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-300 via-violet-500 to-fuchsia-300 p-4">
//         <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl w-full max-w-md p-8 border border-white/20">
//           <p className="text-gray-300 text-center mb-6">Create your account</p>

//           {/* Signup Form */}
//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div>
//               <label className="text-gray-300 text-sm mb-1 block">
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 value={fullName}
//                 onChange={(e) => setFullName(e.target.value)}
//                 className="w-full px-4 py-2 rounded-lg bg-white/20 text-black placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
//                 placeholder="John Doe"
//                 required
//               />
//             </div>

//             <div>
//               <label className="text-gray-300 text-sm mb-1 block">Email</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-2 rounded-lg bg-white/20 text-black placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
//                 placeholder="you@example.com"
//                 required
//               />
//             </div>

//             <div>
//               <label className="text-gray-300 text-sm mb-1 block">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-4 py-2 rounded-lg bg-white/20 text-black placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
//                 placeholder="••••••••"
//                 required
//               />
//             </div>

//             <div>
//               <label className="text-gray-300 text-sm mb-1 block">
//                 Profile Picture
//               </label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="w-full text-gray-300 text-sm"
//               />
//               {preview && (
//                 <img
//                   src={preview}
//                   alt="Preview"
//                   className="mt-3 w-24 h-24 rounded-full object-cover border border-white/20 shadow-lg"
//                 />
//               )}
//             </div>

//             <button
//               type="submit"
//               className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg font-semibold text-black hover:from-purple-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
//             >
//               Sign Up
//             </button>
//           </form>

//           {/* Already have an account */}
//           <p className="text-center text-gray-400 mt-6 text-sm">
//             Already have an account?{" "}
//             <button
//               onClick={() => navigate("/login")}
//               className="text-purple-400 hover:underline"
//             >
//               Login
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;
