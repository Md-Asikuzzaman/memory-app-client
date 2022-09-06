import { combineReducers } from "redux";
import post from "./post";
import auth from "./auth";

const combineAll = combineReducers({
  post,
  auth,
});

export default combineAll;
