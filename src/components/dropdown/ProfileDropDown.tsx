// ProfileDropdown.js
import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import AuthContext from "../../context/AuthProvider";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    dispatch({ type: "LOGOUT" });
  };
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const auth = useAuth();
  const userData = useSelector((state: any) => state.user.userData);
  let imagebygender, boyPhoto, girlPhoto;
  if (auth) {
    const isTeacher = userData.role === "teacher";

    boyPhoto = isTeacher
      ? "images/male_teacher.png"
      : "images/male_student.png";
    girlPhoto = isTeacher
      ? "images/female_teacher.png"
      : "images/female_student.png";
    imagebygender = userData.gender === "male" ? boyPhoto : girlPhoto;
  }

  return (
    <div className="profile-dropdown">
      <div className="profile-icon" onClick={toggleDropdown}>
        {/* Your profile icon component */}
        <img src={imagebygender} alt="Profile" />
      </div>
      {isOpen && (
        <ul className="dropdown-menu">
          <li onClick={handleLogout}>Logout</li>
        </ul>
      )}
    </div>
  );
};

export default ProfileDropdown;
