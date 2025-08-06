import React from "react";
import Navbar from "./Navbar";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const {user, setUser} = useContext(AppContext);
  return (
    <div>
      <Navbar />

      {user && (
        <div>
          <div className=""><Sidebar /></div>
          <div className=""></div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
