import React from "react";
import { usePlans } from "../../modules/Plans/hook";
import Category from "./Category";
import FilterCalendar from "./filterCalendar";
import Search from "./search";

function Filter() {
  const { plans } = usePlans();
  // console.log(getStocks());
  return (
    <div>
      <h2>필터</h2>
      <Search />
      <FilterCalendar />
      <Category />
    </div>
  );
}

export default Filter;
