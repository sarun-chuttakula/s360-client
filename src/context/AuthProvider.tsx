// AuthProvider.js
import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { Role } from "../interfaces/Role";

interface AuthData {
  id: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
  is_active: boolean;
  email: string;
  phone: string | null;
  firstname: string;
  lastname: string | null;
  role: Role;
  dob: string | null;
  gender: string | null;
  username: string;
  password: string;
  lastlogin: string;
  profile_pic: string | null;
  accesstoken: string;
  refreshtoken: string;
}

interface ContextProps {
  authData: AuthData | null;
  setAuth: Dispatch<SetStateAction<AuthData | null>>;
  logout: () => void; // Include logout function in ContextProps
}

const AuthContext = createContext<ContextProps>({
  authData: null,
  setAuth: () => null,
  logout: () => null, // Provide a default implementation for logout
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authData, setAuthData] = useState<AuthData | null>(() => {
    const storedAuthData = localStorage.getItem("authData");
    return storedAuthData ? JSON.parse(storedAuthData) : null;
  });

  useEffect(() => {
    localStorage.setItem("authData", JSON.stringify(authData));
  }, [authData]);

  const logout = () => {
    localStorage.removeItem("authData");
    setAuthData(null);
  };

  const setAuth: ContextProps["setAuth"] = (data) => {
    setAuthData(data);
  };

  return (
    <AuthContext.Provider value={{ authData, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
