import React from "react";
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { LuMessagesSquare } from "react-icons/lu";
import { GiCash } from "react-icons/gi";
import { GiRank3 } from "react-icons/gi";
import { AiFillCarryOut } from "react-icons/ai";
import { IoLibraryOutline } from "react-icons/io5";

const Sidebar = () => {
  return (
    <div className="side-bar">
      <Link to="/">
        <RxDashboard />
        <span>Dashboard</span>
      </Link>
      <Link to="/groups">
        <LuMessagesSquare />
        <span>Groups</span>
      </Link>
      <Link to="/fee-board">
        <GiCash />
        <span>FeeBoard</span>
      </Link>
      <Link to="/result-board">
        <GiRank3 />
        <span>ResultBoard</span>
      </Link>
      <Link to="/attendance-board">
        <AiFillCarryOut />
        <span>AttendanceBoard</span>
      </Link>
      <Link to="/library">
        <IoLibraryOutline />
        <span>library</span>
      </Link>
    </div>
  );
};

export default Sidebar;
