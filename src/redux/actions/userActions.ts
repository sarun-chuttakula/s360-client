// redux/actions/userActions.ts

import { Role } from "../../enums/user.enum";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export interface UserData {
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
export const login = (userData: UserData) => ({
  type: "LOGIN",
  payload: userData,
});

export const logout = () => ({
  type: "LOGOUT",
});
