import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import BASE_URL from "../host";
import { LOGIN, LOGOUT, PROFILE, REGISTER } from "./User";
import { LOGOUT as planLogout } from "../Plans/Plans";
function useAuth() {
  const dispatch = useDispatch();
  const {
    user: { email, nick,thumb },
  } = useSelector((state) => state.user);
  const { status } = useSelector((state) => state.user);
  const { plans } = useSelector((state) => state.plan);

  const register = async ({ email, nick, password }) => {
    try {
      const res = await axios.post(BASE_URL + "/auth/join", {
        email,
        nick,
        password,
      });
      if (res.status === 202) {
        window.alert("이미 존재하는 유저입니다.");
      }
      console.log(res);
      return;
      const {
        data: { code },
      } = res;
      if (code === 400) {
        window.alert("이미 존재하는 유저입니다.");
      } else {
        window.alert("회원가입 되었습니다.");
      }
      // dispatch({
      //   type: REGISTER,
      //   user: res.data.user,
      // });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  const login = async ({ email, password }) => {
    try {
      const res = await axios.post(
        BASE_URL + "/auth/login",
        {
          email,
          password,
        },
        {
          hedaers: {
            "Content-Type": "text/plain",
          },
        }
      );
      console.log(res);

      if (res.data.code !== 200) {
        window.alert("아이디 또는 비밀번호가 다릅니다.");
        return;
      }
      dispatch({
        type: LOGIN,
        user: res.data.user,
        status: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    try {
      const res = await axios.get(BASE_URL + "/auth/logout");
      console.log(res);
      dispatch({
        type: LOGOUT,
      });
      dispatch({
        type: planLogout,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: planLogout,
      });
    }
  };

  const updateProfile = async(profile)=>{
    try{
      const res = await axios.patch(BASE_URL+"/auth/profile",profile)
      const {nick, thumb} = res.data;
      console.log(res);
      dispatch({
        type:PROFILE,
        nick: nick,
        thumb: thumb
        
      })
    }catch(err){
      console.log(err)
    }
  }

  return { register,thumb, updateProfile,login, logout, email, nick, status };
}

export default useAuth;
