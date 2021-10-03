import { combineReducers } from "redux";
import plan from "./Plans/Plans";
import user from "./User/User";

const rootReducer = combineReducers({
  plan,
  user,
});

export default rootReducer;
