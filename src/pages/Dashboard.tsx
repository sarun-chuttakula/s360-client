import React from "react";
import Sidebar from "../components/sidebar/sidebar";
import Profile from "../components/profile/Profile";
import Dropdown from "../components/dropdown/Dropdown";

const Dashboard = () => {
  return (
    <>
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="absolute top-5 right-10 p-4">
        <Profile />
      </div>
      {/* <Dropdown /> */}
    </>
  );
};

export default Dashboard;
