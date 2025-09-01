import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";
import axiosConfig from "../utils/axiosConfig"; // Make sure this exists and is configured
import { toast } from "react-toastify";

const UpdateProfile = () => {
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    profileImage: null,
  });

  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        password: "",
        profileImage: user.profileImage || null,
      });
      setImagePreview(user.profileImageUrl || "");
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profileImage: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    if (formData.fullName) data.append("fullName", formData.fullName);
    if (formData.email) data.append("email", formData.email);
    if (formData.password) data.append("password", formData.password);
    if (formData.profileImage)
      data.append("profileImage", formData.profileImage);

    try {
      const response = await axiosConfig.put(
        `/updateProfile/${user.id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Optional: update user context
      if (response.data) {
        setUser(response.data); // Assuming backend returns updated profile
      }

      toast.success("Profile updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-100 to-indigo-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md relative">
        {/* Close Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-5 right-7 text-gray-400 hover:text-purple-600 text-3xl font-bold focus:outline-none"
          aria-label="Close"
          type="button"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Update Profile
        </h2>

        {/* Profile Image */}
        <div className="relative w-32 h-32 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full p-[3px] bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-gray-500">No Image</span>
              )}
            </div>
          </div>
          <label className="absolute bottom-0 right-0 bg-purple-600 p-2 rounded-full cursor-pointer hover:bg-purple-700 transition">
            <Pencil className="text-white text-md" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm">Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter new password"
              className="w-full p-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;

// import React, { useState, useEffect, useContext } from "react";
// import { AppContext } from "../context/AppContext";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const UpdateProfile = () => {
//   const { user } = useContext(AppContext);
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     profileImage: null,
//     profileImagePreview: "",
//   });

//   useEffect(() => {
//     // Pre-fill fields from context user
//     if (user) {
//       setFormData({
//         fullName: user.fullName || "",
//         email: user.email || "",
//         password: "",
//         profileImage: null,
//         profileImagePreview: user.profileImageUrl || "",
//       });
//     }
//   }, [user]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData((prev) => ({
//         ...prev,
//         profileImage: file,
//         profileImagePreview: URL.createObjectURL(file),
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = new FormData();
//     if (formData.fullName) data.append("fullName", formData.fullName);
//     if (formData.email) data.append("email", formData.email);
//     if (formData.password) data.append("password", formData.password);
//     if (formData.profileImage)
//       data.append("profileImage", formData.profileImage);

//     try {
//       const response = await axiosConfig.get(`/updateProfile/${user.id}/`);

//       alert("Profile updated successfully!");
//       // Optionally update user context with response
//       navigate("/dashboard"); // or wherever you want
//     } catch (err) {
//       console.error("Update failed:", err);
//       alert("Failed to update profile.");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
//       <h2 className="text-2xl font-bold mb-4 text-center">Update Profile</h2>

//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         {/* Profile Image Preview and Upload */}
//         <div className="flex justify-center mb-4 relative">
//           {formData.profileImagePreview ? (
//             <img
//               src={formData.profileImagePreview}
//               alt="Profile"
//               className="w-24 h-24 rounded-full object-cover border-2 border-purple-500"
//             />
//           ) : (
//             <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
//               No Image
//             </div>
//           )}
//           <label
//             className="absolute bottom-0 right-10 bg-purple-600 p-2 rounded-full cursor-pointer hover:bg-purple-700 transition"
//             title="Change Image"
//           >
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="hidden"
//             />
//             ✎
//           </label>
//         </div>

//         {/* Full Name */}
//         <div className="mb-4">
//           <label className="block text-gray-700 mb-1">Full Name</label>
//           <input
//             type="text"
//             name="fullName"
//             value={formData.fullName}
//             onChange={handleChange}
//             className="w-full border border-gray-300 p-2 rounded-md"
//           />
//         </div>

//         {/* Email */}
//         <div className="mb-4">
//           <label className="block text-gray-700 mb-1">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full border border-gray-300 p-2 rounded-md"
//           />
//         </div>

//         {/* Password (Optional) */}
//         <div className="mb-4">
//           <label className="block text-gray-700 mb-1">Password</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="Leave blank to keep existing"
//             className="w-full border border-gray-300 p-2 rounded-md"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
//         >
//           Update Profile
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateProfile;
