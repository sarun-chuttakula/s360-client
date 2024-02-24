import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { LuMessagesSquare } from "react-icons/lu";
import { GiCash } from "react-icons/gi";
import { GiRank3 } from "react-icons/gi";
import { AiFillCarryOut } from "react-icons/ai";
import { IoLibraryOutline } from "react-icons/io5";
import useAuth from "../../hooks/useAuth";

const Sidebar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(
    localStorage.getItem("activeItem") || ""
  );

  // Set the active item based on the current pathname
  useEffect(() => {
    setActiveItem(localStorage.getItem("activeItem") || "");
  }, []);

  // Update the active item when a link is clicked
  const handleItemClick = (path: any) => {
    setActiveItem(path);
    localStorage.setItem("activeItem", path);
  };

  const auth = useAuth();

  return (
    <div className="side-bar">
      <Link
        to="/"
        onClick={() => handleItemClick("/")}
        className={activeItem === "/" ? "active" : ""}
      >
        <RxDashboard className="sidebar-icon" />
        <span className="sidebar-text">Dashboard</span>
      </Link>
      <Link
        to="/groups"
        onClick={() => handleItemClick("/groups")}
        className={activeItem === "/groups" ? "active" : ""}
      >
        <LuMessagesSquare className="sidebar-icon" />
        <span className="sidebar-text">Groups</span>
      </Link>
      <Link
        to="/fee-details"
        onClick={() => handleItemClick("/fee-details")}
        className={activeItem === "/fee-details" ? "active" : ""}
      >
        <GiCash className="sidebar-icon" />
        <span className="sidebar-text">Financial Details</span>
      </Link>
      <Link
        to="/result-board"
        onClick={() => handleItemClick("/result-board")}
        className={activeItem === "/result-board" ? "active" : ""}
      >
        <GiRank3 className="sidebar-icon" />
        <span className="sidebar-text">ResultBoard</span>
      </Link>
      {auth?.role === "teacher" && (
        <Link
          to="/attendance-board"
          onClick={() => handleItemClick("/attendance-board")}
          className={activeItem === "/attendance-board" ? "active" : ""}
        >
          <AiFillCarryOut className="sidebar-icon" />
          <span className="sidebar-text">AttendanceBoard</span>
        </Link>
      )}
      <Link
        to="/library"
        onClick={() => handleItemClick("/library")}
        className={activeItem === "/library" ? "active" : ""}
      >
        <IoLibraryOutline className="sidebar-icon" />
        <span className="sidebar-text">library</span>
      </Link>
    </div>
  );
};

export default Sidebar;
