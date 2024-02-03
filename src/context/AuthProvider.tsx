// AuthProvider.tsx

import React, { createContext, useState, ReactNode } from "react";
import { AuthContextType, User } from "../interfaces/Auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User, accessToken: string, refreshToken: string) => {
    setUser(userData);
    // You may want to store tokens in localStorage or cookies for persistence
    // and handle token refresh logic
    console.log("User logged in:", userData);
  };

  const logout = () => {
    setUser(null);
    // Clear tokens from localStorage or cookies
    console.log("User logged out");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
