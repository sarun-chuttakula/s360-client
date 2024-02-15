import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  email: string;
  username: string;
  role: string;
  accessToken: string;
  refreshToken: string;
}
const initialState: UserState = {
  email: "",
  username: "",
  role: "",
  accessToken: "",
  refreshToken: "",
};

type UserAction = { type: "SET_USER"; payload: Partial<UserState> };

const userReducer = (
  state: UserState = initialState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default userReducer;
