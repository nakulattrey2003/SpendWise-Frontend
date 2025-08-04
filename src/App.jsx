import React from "react";
import { BrowserRouter } from "react-router-dom";
import Batman from "./pages/Batman";
import Health from "./pages/Health";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Income from "./pages/Income";
import Category from "./pages/Category";
import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./App.css"; // Assuming you have some global styles
import "./index.css"; // Tailwind CSS styles

const App = () => {
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/health" element={<Health />} />
          <Route path="/batman" element={<Batman />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/income" element={<Income />} />
          <Route path="/category" element={<Category />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
