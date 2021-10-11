import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import getStockData from "../../dummy/stock";
import { getStocks } from "../../dummy/stocks";
import BASE_URL from "../host";
import { GET_PLANS, MAKE_FILTERS, REMOVE_PLANS } from "./Plans";

//axios

export const usePlans = () => {
  const dispatch = useDispatch();
  const { plans, filters, currentPlans } = useSelector((state) => state.plan);
  const getPlans = async (category) => {
    try {
      const res = await axios.post(BASE_URL + "/plan/load", { category });
      console.log(res);
      dispatch({
        type: GET_PLANS,
        plans: res.data.plan,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const removePlans = async (category) => {
    try {
      const next_plans = plans.events.filter(
        (plan) => plan.category !== category
      );

      dispatch({
        type: REMOVE_PLANS,
        plans: { events: next_plans },
      });
    } catch (error) {
      console.log(error);
    }
  };
  // const getPlans = async () => {
  //   try {
  //     const res = await axios.get(BASE_URL + "/plan/plans");
  //     console.log("test", res.data.plans);

  //     dispatch({
  //       type: GET_PLANS,
  //       plans: { events: res.data.plans },
  //       currentPlans,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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

  return { plans, filters, currentPlans, getPlans, makefilters, removePlans };
};
