import { combineReducers } from "redux";
import plan from "./Plans/Plans";
import user from "./User/User";
import view from "./View/View";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  plan,
  user,
  view,
});

export default persistReducer(persistConfig, rootReducer);
