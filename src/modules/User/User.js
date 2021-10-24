// import { useReducer } from "react";

export const LOGIN = "user/LOGIN";
export const LOGOUT = "user/LOGOUT";
export const REGISTER = "user/REGISTER";

function userReducer(state = { user: {}, profile: {}, status: false }, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.user,
        status: action.status,
      };
    case REGISTER:
      return {
        ...state,
        user: action.user,
      };
    case LOGOUT:
      return {
        user: {},
        profile: {},
        status: false,
      };
    default:
      return state;
  }
}
export default userReducer;
