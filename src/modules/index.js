import { combineReducers } from "redux";
import plan from "./Plans/Plans";
import user from "./User/User";
import view from "./View/View";

const rootReducer = combineReducers({
  plan,
  user,
  view,
});

export default rootReducer;
