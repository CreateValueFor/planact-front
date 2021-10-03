export const GET_PLANS = "plans/GET_PLANS";
export const MAKE_FILTERS = "plans/MAKE_FILTERS";
export const DISPLAY_CURRENT_PLANS = "plans/DISPLAY_CURRENT_PLANS";
const initialState = {
  plans: {
    events: [],
  },
  currentPlans: [],
  filters: [],
};

export default function planReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PLANS:
      console.log("action", action);
      return {
        ...state,
        plans: action.plans,
        currentPlans: action.currentPlans,
      };
    case MAKE_FILTERS:
      return {
        ...state,
        filters: action.filters,
      };
    case DISPLAY_CURRENT_PLANS:
      return {
        ...state,
        currentPlans: action.plans,
      };
    default:
      return state;
  }
}
