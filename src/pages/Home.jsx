import React from "react";
import Dashboard from "../components/Dashboard";
import useUser from "../hooks/useUser";

const Home = () => {
  useUser();
  return (
    <div>
      <Dashboard activeMenu="Dashboard" >This is the Home Page</Dashboard>
    </div>
  );
};

export default Home;
