// Sidebar.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { LuMessagesSquare } from "react-icons/lu";
import { BsCashCoin } from "react-icons/bs";
import { GiRank3 } from "react-icons/gi";
import { AiFillCarryOut } from "react-icons/ai";
import { IoLibraryOutline } from "react-icons/io5";
import useAuth from "../../hooks/useAuth";

const Sidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const auth = useAuth();

  return (
    <div className="side-bar">
      <Link to="/" className={pathname === "/" ? "active" : ""}>
        <RxDashboard className="sidebar-icon" />
        <span className="sidebar-text">Dashboard</span>
      </Link>
      <Link to="/groups" className={pathname === "/groups" ? "active" : ""}>
        <LuMessagesSquare className="sidebar-icon" />
        <span className="sidebar-text">Groups</span>
      </Link>
      <Link
        to="/fee-details"
        className={pathname === "/fee-details" ? "active" : ""}
      >
        <BsCashCoin className="sidebar-icon" />
        <span className="sidebar-text">Financial Details</span>
      </Link>
      <Link
        to="/result-board"
        className={pathname === "/result-board" ? "active" : ""}
      >
        <GiRank3 className="sidebar-icon" />
        <span className="sidebar-text">ResultBoard</span>
      </Link>
      {auth?.role === "teacher" && (
        <Link
          to="/attendance-board"
          className={pathname === "/attendance-board" ? "active" : ""}
        >
          <AiFillCarryOut className="sidebar-icon" />
          <span className="sidebar-text">AttendanceBoard</span>
        </Link>
      )}
      <Link to="/library" className={pathname === "/library" ? "active" : ""}>
        <IoLibraryOutline className="sidebar-icon" />
        <span className="sidebar-text">library</span>
      </Link>
    </div>
  );
};

export default Sidebar;
