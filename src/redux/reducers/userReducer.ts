// reducers/userReducer.ts

export interface UserAction {
  type: string;
  payload?: any;
  [key: string]: any;
}

export interface UserState {
  userData: any;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  userData: null,
  isAuthenticated: false,
};

const userReducer = (state: UserState = initialState, action: UserAction) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        userData: action.payload,
        isAuthenticated: true,
      };
    case "LOGOUT":
      return {
        ...state,
        userData: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default userReducer;
