import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import BASE_URL from "../host";
import { LOGIN, LOGOUT, REGISTER } from "./User";

function useAuth() {
  const dispatch = useDispatch();
  const {
    user: { email, nick },
  } = useSelector((state) => state.user);

  const register = async ({ email, nick, password }) => {
    try {
      const res = await axios.post(BASE_URL + "/auth/join", {
        email,
        nick,
        password,
      });
      const {
        data: { code },
      } = res;
      if (code === 400) {
        window.alert("이미 존재하는 유저입니다.");
      } else {
        window.alert("회원가입 되었습니다.");
      }
      dispatch({
        type: REGISTER,
        user: res.data.user,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  const login = async ({ email, password }) => {
    try {
      const res = await axios.post(BASE_URL + "/auth/login", {
        email,
        password,
      });
      dispatch({
        type: LOGIN,
        user: res.data.user,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return { register, login, email, nick };
}

export default useAuth;
