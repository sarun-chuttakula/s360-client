import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className="side-bar">
        <Link to="/">Dashboard</Link>
        {/* <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link> */}
        <Link to="/notice-board">NoticeBoard</Link>
        <Link to="/groups">Groups</Link>
        <Link to="/fee-board">FeeBoard</Link>
        <Link to="/result-board">ResultBoard</Link>
        <Link to="/attendance-board">AttendanceBoard</Link>
        <Link to="/library">library</Link>
        <Link to="/feedback">Feedback</Link>
      </div>
    </>
  );
};

export default Sidebar;
