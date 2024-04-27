import React, { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { useDispatch, useSelector } from "react-redux";

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    dispatch({ type: "LOGOUT" });
  };
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.user.userData);
  //console.log("User Data:", userData);

  // //console.log("User Data:", userData);

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
};

export default LogoutButton;
