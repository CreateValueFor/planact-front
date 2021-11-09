import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import getStockData from "../../dummy/stock";
import { getStocks } from "../../dummy/stocks";
import BASE_URL from "../host";
import { GET_PLANS, GET_UPLOADS, MAKE_FILTERS, REMOVE_PLANS } from "./Plans";

//axios

export const usePlans = () => {
  const dispatch = useDispatch();
  const { plans, filters, currentPlans, uploads } = useSelector(
    (state) => state.plan
  );
  const { email, nick } = useSelector((state) => state.user.user);

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

  const uploadDailyPlan = async (dailyplan, planId) => {
    try {
      const res = await axios.post(BASE_URL + "/plan/daily", {
        dailyplan,
        planId,
      });
      console.log(res);
      // dispatch({
      //   type: GET_PLANS,
      //   plans: res.data.plan,
      // });
    } catch (error) {
      console.log(error);
    }
  };

  const updateDailyPlan = async (dailyplan, planId) => {
    try {
      const res = await axios.patch(BASE_URL + "/plan/daily", {
        dailyplan,
        planId,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const uploadDailyPlanImg = async (imageForm) => {
    try {
      const res = await axios.post(BASE_URL + "/plan/daily/img", imageForm);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteDailyPlan = async (planID, dailyID) => {
    try {
      const res = await axios.delete(
        `${BASE_URL}/plan/daily?id=${planID}&dailyId=${dailyID}`,
        {
          id: dailyID,
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const getDailyPlanImg = async (img) => {
    try {
      const data = {
        img,
      };
      const res = await axios.post(BASE_URL + "/plan/daily/images", data);
      console.log(res.data.list);
      return res.data.list;
    } catch (err) {
      console.log(err);
    }
  };

  const getUploadedPlans = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/plan/summary?email=${email}`);
      console.log(res.data.plans);
      dispatch({
        type: GET_UPLOADS,
        uploads: res.data.plans,
      });
      return res.data.plans;
    } catch (error) {
      console.log(error);
    }
  };

  const getUplaodedPlansByID = async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/plan/summary?id=${id}`);
      return res.data.plans;
    } catch (error) {
      console.log(error);
    }
  };

  const uploadSummaryPlans = async (plans) => {
    try {
      const res = await axios.post(`${BASE_URL}/plan/summary`, plans);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const getUploadedPlansJson = async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/plan/daily?id=${id}`);

      return res.data.plans;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    plans,
    filters,
    currentPlans,
    uploads,
    getPlans,
    makefilters,
    getDailyPlanImg,
    removePlans,
    uploadDailyPlanImg,
    uploadDailyPlan,
    deleteDailyPlan,
    getUploadedPlans,
    updateDailyPlan,
    getUplaodedPlansByID,
    uploadSummaryPlans,
    getUploadedPlansJson,
  };
};
