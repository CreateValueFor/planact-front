import { useCallback } from "preact/hooks";
import React, { useEffect, useState } from "react";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useCustomHooks from "../../modules/customHooks/Index";
import BASE_URL from "../../modules/host";
import { usePlans } from "../../modules/Plans/hook";
import Filter from "./Filter";
const StyledItem = styled.div`
  height: 90px;
  text-decoration: none;
  background: #eff7f9;
  border-radius: 20px;
  display: flex;
  align-items: center;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    background: #eff7f9;
    box-shadow: 0px 10px 33px rgba(54, 57, 70, 0.2);
    border-radius: 20px;
  }
  .item-image {
    width: 78px;
    height: 55px;
    /* left: 219px;
    top: 348px; */
    margin-left: 2%;
    /* background: #c4c4c4; */
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
      background: #ffb350;
    }
    &::after {
      position: absolute;
      content: "";
      z-index: 1;
      width: 2px;
      height: 24px;
      background: #ffb350;
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

// const categoryFormatter = (category) => {
//   switch (category) {
//     case "health":
//       return "운동";
//     case "diet":
//       return "식단";
//     default:
//       return "일반";
//   }
// };

function PlanItem({ index, contents, history }) {
  const [select, setSelect] = useState(true);
  const [open, setOpen] = useState(false);
  const { categoryFormatter } = useCustomHooks();
  const togglePlan = (e) => {
    e.stopPropagation();
    setSelect((prev) => !prev);
  };
  const toggleDetail = () => {
    setOpen((prev) => !prev);
    history.push({
      pathname: `/idea/list/${contents.id}`,
      state: { contents },
    });
  };
  const imagePath = BASE_URL + "/uploads/" + contents.imgID;

  return (
    <>
      <StyledItem
        to={`/idea/list?id=${contents.id}`}
        key={index}
        className="mb-3"
        onClick={toggleDetail}
      >
        <div className="item-image">
          {" "}
          <img
            src={imagePath}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "14px",
              objectFit: "cover",
            }}
          />
        </div>
        <div className="item-summary">
          <div className="item-title mb-1">{contents.title}</div>
          <div className="item-sub-title">
            {categoryFormatter(contents.category)} |{" "}
            {contents.sns === "instagram" && "@"}
            {contents.author}
          </div>
        </div>
        <div
          onClick={togglePlan}
          className={select ? "item-btn add" : "item-btn delete"}
        />
        <div className="item-date">등록수 {contents.downloads}</div>
      </StyledItem>
      {/* <Modal show={open} onHide={toggleDetail} centered>
        <Modal.Header closeButton>
          <Modal.Title>{contents.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Sample Sample Sample</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
}

function PlanList({ history }) {
  const { getAllPlanBySort, uploads, count, pagination } = usePlans();

  useEffect(() => {
    getAllPlanBySort();
  }, []);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Filter />
      {count === 0 ? (
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          검색 결과가 없습니다
        </div>
      ) : (
        uploads
          .slice((pagination - 1) * 6, (pagination - 1) * 6 + 6)
          .map((plan, idx) => (
            <PlanItem history={history} key={idx} index={idx} contents={plan} />
          ))
      )}
    </div>
  );
}

export default PlanList;
