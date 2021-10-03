import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import getStockData from "../../dummy/stock";
import { getStocks } from "../../dummy/stocks";
import BASE_URL from "../host";
import { GET_PLANS, MAKE_FILTERS } from "./Plans";

//axios

export const usePlans = () => {
  const dispatch = useDispatch();
  const { plans, filters, currentPlans } = useSelector((state) => state.plan);

  const getPlans = async () => {
    try {
      const res = await axios.get(BASE_URL + "/plan/plans");
      console.log("test", res.data.plans);

      dispatch({
        type: GET_PLANS,
        plans: { events: res.data.plans },
        currentPlans,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const makefilters = async (plans, type) => {
    let filters = [];

    plans.map((item) => {
      item[type].split(",").map((type) => filters.push(type));
    });
    let set = new Set(filters);
    filters = [...set];
    console.log(filters);
    filters.sort(function(a, b) {
      return a.length - b.length;
    });
    dispatch({
      type: MAKE_FILTERS,
      filters: filters,
    });
  };

  return { plans, filters, currentPlans, getPlans, makefilters };
};
