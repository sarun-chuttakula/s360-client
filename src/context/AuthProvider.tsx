import React, {
  createContext,
  useState,
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
}

const AuthContext = createContext<ContextProps>({
  authData: null,
  setAuth: () => null,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authData, setAuthData] = useState<AuthData | null>(null);

  const setAuth: ContextProps["setAuth"] = (data) => {
    setAuthData(data);
  };

  return (
    <AuthContext.Provider value={{ authData, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
