import React from "react";
import { BrowserRouter } from "react-router-dom";
import Batman from "./pages/Batman";
import Health from "./pages/Health";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Income from "./pages/Income";
import Category from "./pages/Category";
import Filter from "./pages/Filter";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./App.css"; // Assuming you have some global styles
import "./index.css"; // Tailwind CSS styles
import Expense from "./pages/Expense";
import UpdateProfile from "./pages/UpdateProfile";

const App = () => {
  const Root = () => {
    const isAuthenticated = !!localStorage.getItem("token");
    return isAuthenticated ? (
      <Navigate to="/dashboard" />
    ) : (
      <Navigate to="/login" />
    );
  };
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/health" element={<Health />} />
          <Route path="/batman" element={<Batman />} />
          <Route path="/error" element={<Batman />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/income" element={<Income />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/category" element={<Category />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
