import { useCallback } from "preact/hooks";
import React, { useState } from "react";
import styled from "styled-components";

const dummyList = [
  {
    image: "...",
    title: "Hello",
    location: "Seoul",
    date: "2021-03-21",
  },
  {
    image: "...",
    title: "Hello",
    location: "Seoul",
    date: "2021-03-21",
  },
  {
    image: "...",
    title: "Hello",
    location: "Seoul",
    date: "2021-03-21",
  },
  {
    image: "...",
    title: "Hello",
    location: "Seoul",
    date: "2021-03-21",
  },
  {
    image: "...",
    title: "Hello",
    location: "Seoul",
    date: "2021-03-21",
  },
];

const StyledItem = styled.div`
  height: 90px;

  background: #eff7f9;
  border-radius: 20px;
  display: flex;
  align-items: center;
  .item-image {
    width: 78px;
    height: 55px;
    left: 219px;
    top: 348px;
    margin-left: 2%;
    background: #c4c4c4;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .item-summary {
    margin-left: 1.8%;
    flex: 1;
    .item-title {
      font-family: Avenir Next;
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 20px;
      /* identical to box height, or 111% */

      letter-spacing: 0.9px;

      color: #363946;
    }
    .item-sub-title {
      font-family: Avenir Next;
      font-style: normal;
      font-weight: 500;
      font-size: 11px;
      line-height: 15px;
      /* identical to box height */

      letter-spacing: 1px;

      color: #4e5464;
    }
  }
  .item-btn {
    width: 52px;
    height: 52px;
    background: #ffffff;
    border-radius: 50%;
    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    transition: 0.3s;
    cursor: pointer;
    &.delete {
      transform: rotate(45deg);

      &::after,
      &::before {
        background: #ec2544;
      }
    }
    /* color: rgb(8, 155, 171); */
    &::before {
      position: absolute;
      content: "";
      z-index: 1;
      width: 24px;
      height: 2px;
      background: rgb(8, 155, 171);
    }
    &::after {
      position: absolute;
      content: "";
      z-index: 1;
      width: 2px;
      height: 24px;
      background: rgb(8, 155, 171);
    }
  }
  .item-date {
    font-family: Avenir Next;
    font-style: normal;
    font-weight: 500;
    font-size: 11px;
    line-height: 15px;
    /* identical to box height */

    letter-spacing: 1px;
    margin-left: 1.25rem;
    margin-right: 1.25rem;
    color: #869da5;
  }
`;

function PlanItem({ index, contents }) {
  const [select, setSelect] = useState(true);
  const onClick = () => {
    setSelect((prev) => !prev);
  };
  return (
    <StyledItem key={index} className="mb-3">
      <div className="item-image"> image</div>
      <div className="item-summary">
        <div className="item-title mb-1">{contents.title}</div>
        <div className="item-sub-title">{contents.location}</div>
      </div>
      <div
        onClick={onClick}
        className={select ? "item-btn add" : "item-btn delete"}
      />
      <div className="item-date">{contents.date}</div>
    </StyledItem>
  );
}

function PlanList() {
  return (
    <div>
      {dummyList.map((dummy, idx) => (
        <PlanItem index={idx} contents={dummy} />
      ))}
    </div>
  );
}

export default PlanList;