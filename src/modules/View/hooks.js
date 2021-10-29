import { useDispatch, useSelector } from "react-redux";
import { CHANGE_INQUIRY, CHANGE_MAIN } from "./View";

function useViews() {
  const dispatch = useDispatch();
  const { page } = useSelector((state) => state.views);

  const changeInquiry = () => {
    try {
      dispatch({
        CHANGE_INQUIRY,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const changeMAin = () => {
    try {
      dispatch({ CHANGE_MAIN });
    } catch (error) {
      console.log(error);
    }
  };
  return {
    changeInquiry,
    changeMAin,
  };
}
