// reducers/index.js
import { combineReducers } from "redux";
import userReducer from "./userReducer"; // You'll define your user reducer

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
