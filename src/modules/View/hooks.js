import { useDispatch, useSelector } from "react-redux";
import { CHANGE_INQUIRY, CHANGE_MAIN, CHANGE_VIEW, VIEW_DETAIL } from "./View";

function useViews() {
  const dispatch = useDispatch();
  const { page } = useSelector((state) => state.view);

  const viewDetail = () => {
    try {
      dispatch({
        type: VIEW_DETAIL,
      });
    } catch (err) {
      console.log(err);
    }
  };

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
      dispatch({ type: CHANGE_MAIN });
    } catch (error) {
      console.log(error);
    }
  };
  const changeView = (page) => {
    try {
      dispatch({
        type: CHANGE_VIEW,
        page: page,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return {
    changeInquiry,
    changeMAin,
    viewDetail,
    changeView,
    page,
  };
}
export default useViews;
