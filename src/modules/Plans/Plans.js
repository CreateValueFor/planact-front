export const GET_PLANS = "plans/GET_PLANS";
export const REMOVE_PLANS = "plans/REMOVE_PLANS";
export const MAKE_FILTERS = "plans/MAKE_FILTERS";
export const DISPLAY_CURRENT_PLANS = "plans/DISPLAY_CURRENT_PLANS";
export const GET_UPLOADS = "plans/GET_UPLOADS";
export const SWITCH_PAGE = "plans/SWITCH_PAGE";
export const ADD_PAGE = "plans/ADD_PAGE";
export const SUBTRACT_PAGE = "plans/SUBTRACT_PAGE";
export const GET_RENDERS = "plans/GET_RENDERS";

const initialState = {
  plans: {
    events: [],
  },
  currentPlans: [],
  filters: [],
  uploads: [],
  count: 0,
  page: 1,
  pagination: 1,
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
    case GET_UPLOADS:
      return {
        ...state,
        uploads: action.uploads,
        count: action.count,
        page: action.page,
      };

    case SWITCH_PAGE:
      return {
        ...state,
        pagination: action.pagination,
      };
    case ADD_PAGE:
      return {
        ...state,
        pagination: state.pagination++,
      };
    case SUBTRACT_PAGE:
      return {
        ...state,
        pagination: state.pagination--,
      };

    case GET_RENDERS:
      return {
        ...state,
        plans: action.plans,
      };
    default:
      return state;
  }
}
