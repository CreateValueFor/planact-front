import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import useCustomHooks from "../customHooks/Index";
import BASE_URL from "../host";
import {
  ADD_PAGE,
  GET_PLANS,
  GET_RENDERS,
  GET_UPLOADS,
  MAKE_FILTERS,
  REMOVE_PLANS,
  SUBTRACT_PAGE,
  SWITCH_PAGE,
} from "./Plans";
import CONSTANTS from "../../constants";
const ics = require("ics");
//axios
Date.prototype.addDays = function(days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

export const usePlans = () => {
  const { formatDate } = useCustomHooks();
  const dispatch = useDispatch();
  const {
    plans,
    filters,
    currentPlans,
    uploads,
    count,
    page,
    pagination,
  } = useSelector((state) => state.plan);
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
      return res.data;
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

  const updateSummaryPlans = async (plans, id) => {
    try {
      const res = await axios.patch(`${BASE_URL}/plan/summary?id=${id}`, plans);
      console.log(res);
    } catch (err) {
      console.log(err);
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

  // * 사용자한테 플랜을 보여줄 때 쓸 api
  const getAllPlanBySort = async (standard) => {
    try {
      if (standard) {
        const res = await axios.post(
          `${BASE_URL}/plan/summary?email=${email}`,
          {
            standard,
          }
        );
        dispatch({
          type: GET_UPLOADS,
          uploads: res.data.plans,
          count: res.data.count,
          page: Math.ceil(res.data.count / 6),
        });

        console.log(res.data);
        return res.data;
      }
      const res = await axios.get(`${BASE_URL}/plan/summary?email=all`);
      console.log(res.data.plans);
      dispatch({
        type: GET_UPLOADS,
        uploads: res.data.plans,
        count: res.data.count,
        page: Math.ceil(res.data.count / 6),
      });
      return res.data.plans;
    } catch (error) {
      console.log(error);
    }
  };

  const searchPlanByKeyword = async (keyword, ...args) => {
    console.log(keyword);
    // let URL = `${BASE_URL}/plan/summary?search=${keyword}`;
    // if (args.order) {
    //   URL = `${BASE_URL}/plan/summary?search=${keyword}` + "&order";
    // }
    try {
      const res = await axios.get(`${BASE_URL}/plan/summary?search=${keyword}`);
      dispatch({
        type: GET_UPLOADS,
        uploads: res.data.plans,
        count: res.data.count,
        page: Math.ceil(res.data.count / 6),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const changePage = async (page) => {
    dispatch({
      type: SWITCH_PAGE,
      pagination: page,
    });
  };

  const addPage = async () => {
    dispatch({
      type: ADD_PAGE,
    });
  };

  const subtractPage = async () => {
    dispatch({
      type: SUBTRACT_PAGE,
    });
  };

  const downloadPlan = async (id, date) => {
    try {
      const res = await axios.post(BASE_URL + "/plan/download", {
        id,
        date,
        email,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const deletePlan = async (id) => {
    try {
      const res = await axios.delete(
        BASE_URL + `/plan/download?id=${id}&email=${email}`,
        {}
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const checkDownloaded = async (id) => {
    try {
      const res = await axios.get(
        BASE_URL + `/plan/download?email=${email}&id=${id}`
      );

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getCalendarRenderer = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/plan/render?email=${email}`);
      let start;
      let end;
      let date;
      let title;
      let color;
      let events = [];
      res.data.data.forEach((elem, idx) => {
        start = elem.start.replaceAll(". ", "-").replace(".", "");
        date = new Date(start);
        end = formatDate(date.addDays(elem.plan.length));
        title = elem.summary.title;
        color = CONSTANTS.pallete[idx % 20];

        events.push({
          title,
          start,
          end,
          color,
          summary: elem.summary,
          plan: elem.plan,
        });
      });
      // console.log(res.data.data.forEach(elem));
      console.log(events);
      dispatch({
        type: GET_RENDERS,
        plans: {
          events,
        },
      });
      return;
    } catch (err) {
      console.log(err);
    }
  };

  const exportPlans = async () => {
    let ics = [];

    let sdt;
    let edt;
    let crdt;
    let dateDiff;

    plans.events.map((daily) => {
      sdt = new Date(daily.start);
      edt = new Date(daily.end);
      crdt = new Date();
      dateDiff = Math.ceil(
        (edt.getTime() - sdt.getTime()) / (1000 * 3600 * 24)
      );
      for (let i = 1; i <= dateDiff; i++) {
        let planFormat = {};
        let description = "";
        // 날짜(일) 더하기
        crdt.setDate(sdt.getDate() + i);
        planFormat.title = daily.title;
        planFormat.start = [
          crdt.getFullYear(),
          crdt.getMonth() + 1,
          crdt.getDate(),
        ];
        console.log(daily);
        daily.plan.map((ev) => {
          description += ev.title + ev.contents;
        });
        planFormat.description = description;
        ics.push(planFormat);
      }
    });
    console.log(ics);
    return;

    const { error, value } = ics.createEvents([
      {
        title: "test",
        start: [2018, 1, 15],
        duration: { minutes: 45 },
        description: "TEst",
      },
      {
        title: "ttttt",
        start: [2018, 1, 15, 12, 15],
        duration: { hours: 1, minutes: 30 },
      },
    ]);

    const file = new Blob([value], { type: "text/calendar;charset=utf-8" });
    const path = window.URL.createObjectURL(file);

    window.open("data:text/calendar;charset=utf8," + escape(value));
    console.log(path);
  };

  return {
    plans,
    filters,
    pagination,
    currentPlans,
    uploads,
    count,
    page,
    getPlans,
    exportPlans,
    addPage,
    deletePlan,
    getCalendarRenderer,
    checkDownloaded,
    subtractPage,
    changePage,
    makefilters,
    getDailyPlanImg,
    removePlans,
    uploadDailyPlanImg,
    uploadDailyPlan,
    downloadPlan,
    getAllPlanBySort,
    deleteDailyPlan,
    updateSummaryPlans,
    getUploadedPlans,
    searchPlanByKeyword,
    updateDailyPlan,
    getUplaodedPlansByID,
    uploadSummaryPlans,
    getUploadedPlansJson,
  };
};
export default usePlans;
