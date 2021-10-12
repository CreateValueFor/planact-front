import React from "react";
import { usePlans } from "../../modules/Plans/hook";
import Category from "./Category";
import FilterCalendar from "./filterCalendar";
import Search from "./search";
import "./filter.scss";
import Pallete from "./Pallete";
function Filter() {
  const { plans } = usePlans();
  // console.log(getStocks());
  return (
    <div>
      <h2 className="filter-title mb-5" style={{ textAlign: "center" }}>
        필터
      </h2>
      <Pallete />
      <FilterCalendar />
      <Category />
    </div>
  );
}

export default Filter;
