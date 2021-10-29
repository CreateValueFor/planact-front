export const CHANGE_INQUIRY = "views/CHANGE_INQUIRY";
export const CHANGE_MAIN = "views/CHANGE_MAIN";

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
    default:
      return state;
  }
}
