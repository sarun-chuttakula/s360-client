import React from "react";
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { LuMessagesSquare } from "react-icons/lu";
import { GiCash } from "react-icons/gi";
import { GiRank3 } from "react-icons/gi";
import { AiFillCarryOut } from "react-icons/ai";
import { IoLibraryOutline } from "react-icons/io5";
import useAuth from "../../hooks/useAuth";

const Sidebar = () => {
  const auth = useAuth();
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
      {auth?.role === "teacher" ? (
        <Link to="/attendance-board">
          <AiFillCarryOut />
          <span>AttendanceBoard</span>
        </Link>
      ) : null}
      <Link to="/library">
        <IoLibraryOutline />
        <span>library</span>
      </Link>
    </div>
  );
};

export default Sidebar;
