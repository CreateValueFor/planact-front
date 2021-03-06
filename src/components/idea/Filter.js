import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { Dropdown, Form } from "react-bootstrap";
import { usePlans } from "../../modules/Plans/hook";
import useResponsive from "../../Responsive";

const StyledFilter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;

  div:last-child {
    button {
      background: transparent;
      border: none;
      color: #363946;
      outline: none;
    }
    button:first-child {
      margin-right: 1rem;
    }
  }
  .plan-count {
    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 20px;
    letter-spacing: 1px;

    color: #363946;
  }
  select{
    border:none;
    outline: none;
  }
`;

function Filter() {
  const [category, setCategory] = useState("all");
  const [order, setOrder] = useState("recent");

  const {isMobile} = useResponsive();

  const onChange = useCallback((e) => {
    const { name, value } = e.target;

    switch (name) {
      case "category":
        setCategory(value);
        break;
      case "order":
        setOrder(value);
        break;
      default:
        break;
    }
  }, []);

  const { count } = usePlans();
  return (
    <StyledFilter className={`${isMobile && "mb-3"}`}>
      <div className="plan-count">전체 {count}개의 플랜</div>
      {/* <div style={{ display: "flex" }}>
        <Form.Select
          aria-label="Default select example"
          name="category"
          onChange={onChange}
          value={category}
        >
          <option value="all">전체</option>
          <option value="health">운동</option>
          <option value="diet">식단</option>
        </Form.Select>
        <Form.Select
          aria-label="Default select example"
          name="order"
          onChange={onChange}
          value={order}
        >
          <option value="recent">최신순</option>
          <option value="downloads">인기순</option>
          <option value="recommend">추천순</option>
        </Form.Select>
      </div> */}
    </StyledFilter>
  );
}

export default Filter;
