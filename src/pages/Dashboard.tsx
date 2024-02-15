import React from "react";
import NoticeBoard from "./NoticeBoard";

const Dashboard = () => {
  return (
    <>
      <div className="main">
        <div className="dashboard">
          <h1>Dashboard</h1>
          <p>Welcome to the dashboard</p>
        </div>
        {/* <div className="noticeboard"> */}
        <NoticeBoard />
        {/* </div> */}
      </div>
    </>
  );
};

export default Dashboard;
