export const CHANGE_INQUIRY = "views/CHANGE_INQUIRY";
export const CHANGE_MAIN = "views/CHANGE_MAIN";
export const VIEW_DETAIL = "views/VIEW_DETAIL";
export const CHANGE_VIEW = "views/CHANGE_VIEW";
const initialState = {
  page: "main",
};

export default function viewReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_INQUIRY:
      return {
        ...state,
        page: "inquiry",
      };
    case CHANGE_MAIN:
      return {
        ...state,
        page: "main",
      };
    case VIEW_DETAIL:
      return {
        ...state,
        page: "detail",
      };
    case CHANGE_VIEW:
      return {
        ...state,
        page: action.page,
      };
    default:
      return state;
  }
}
