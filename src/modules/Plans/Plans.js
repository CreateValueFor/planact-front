export const GET_PLANS = "plans/GET_PLANS";
export const REMOVE_PLANS = "plans/REMOVE_PLANS";
export const MAKE_FILTERS = "plans/MAKE_FILTERS";
export const DISPLAY_CURRENT_PLANS = "plans/DISPLAY_CURRENT_PLANS";
const initialState = {
  plans: {
    events: [
      {
        title: "시몬느액세서리컬렉션(유가)",
        start: " 2021-10-25",
        end: "2021-10-26 ",
        color: "red",
        category: "sample",
      },
    ],
  },
  currentPlans: [],
  filters: [],
};

export default function planReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PLANS:
      return {
        ...state,
        plans: {
          events: [...state.plans.events, ...action.plans],
        },
        currentPlans: action.currentPlans,
      };
    case REMOVE_PLANS:
      return {
        ...state,
        plans: action.plans,
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
