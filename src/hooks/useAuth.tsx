// useAuth.js
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
  const { authData } = useContext(AuthContext);
  return authData;
};

export default useAuth;
