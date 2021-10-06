// import { useReducer } from "react";

export const LOGIN = "user/LOGIN";
export const LOGOUT = "user/LOGOUT";
export const REGISTER = "user/REGISTER";

function userReducer(state = { user: {}, profile: {} }, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.user,
      };
    case REGISTER:
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
}
export default userReducer;
