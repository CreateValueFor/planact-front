import { useCallback } from "preact/hooks";
import React, { useEffect, useState } from "react";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useCustomHooks from "../../modules/customHooks/Index";
import BASE_URL from "../../modules/host";
import { usePlans } from "../../modules/Plans/hook";
import Filter from "./Filter";
import useResponsive, { isMobile } from "../../Responsive";
import { CustomLabelText } from "../CustomText";
import CustomButton from "../CustomButton";
import DatePicker from "react-datepicker";
import { forwardRef } from "preact/compat";
import CalendarLogo from "../../assets/img/datepicker.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../modules/User/hook";

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
      font-size: ${(props) => (props.isMobile ? "13px" : "18px")};
      line-height: 20px;

      /* identical to box height, or 111% */
      width: ${(props) => (props.isMobile ? "150px" : "auto")};
      white-space: ${(props) => (props.isMobile ? "nowrap" : "auto")};
      overflow: hidden
      text-overflow: ${(props) => (props.isMobile ? "elipsis" : "auto")};
      letter-spacing: 0.9px;

      color: #363946;
    }
    .item-sub-title {
      font-family: Avenir Next;
      font-style: normal;
      font-weight: 500;
      font-size: ${(props) => (props.isMobile ? "9px" : "11px")};
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
    margin-right: ${(props) => (props.isMobile ? ".75rem" : "0px")};
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

const StyledDatePickerInput = styled.button`
  border: 1.42029px solid #d5d6d8;
  box-sizing: border-box;
  border-radius: 30px;
  background: #fff;
  width: 70%;
  margin: 0 auto;
  height: 42px;
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

function PlanItem({ index, contents, history }) {
  const [startDate, setStartDate] = useState(new Date());
  const [select, setSelect] = useState(true);
  const [open, setOpen] = useState(false);
  const [imgValid, setImgValid] = useState(true);

  const { isMobile } = useResponsive();
  const { categoryFormatter, formatDate } = useCustomHooks();
  const { downloadPlan } = usePlans();
  const { email } = useAuth();

  const togglePlan = (e) => {
    e.stopPropagation();
    setSelect((prev) => !prev);
  };
  const toggleDetail = () => {
    setOpen((prev) => !prev);
    history.push({
      pathname: `/list/${contents.id}`,
      state: { contents },
    });
  };
  const handleClose = () => {
    setOpen(false);
  };

  const modalClick = () => {};

  const downloads = () => {
    if (!email) {
      window.alert("로그인 후 플랜을 다운받을 수 있습니다.");
      handleClose();
      return;
    }
    downloadPlan(contents.id, formatDate(startDate));
  };

  // const handleShow = (e) => {
  //   e.stopPropagation();
  //   if (isDownloaded) {
  //     deletePlan(summary.id);
  //     setIsChanged((prev) => prev++);
  //   } else {
  //     setShow(true);
  //   }
  // };

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <StyledDatePickerInput
      style={isMobile ? { width: "100%" } : {}}
      ref={ref}
      onClick={onClick}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={CalendarLogo}
          style={{ marginRight: "1rem", width: 20, height: 20 }}
          alt="calendar"
        />
        <div>{value}</div>
      </div>
      <FontAwesomeIcon icon={faChevronDown} />
    </StyledDatePickerInput>
  ));

  const imagePath = BASE_URL + "/uploads/" + contents.imgID;
  const height = window.innerHeight;

  useEffect(() => {
    window.addEventListener("click", handleClose);
    return () => {
      window.removeEventListener("click", handleClose);
    };
  }, []);

  return (
    <>
      <StyledItem
        to={`/list?id=${contents.id}`}
        key={index}
        isMobile={isMobile}
        className="mb-3"
        onClick={toggleDetail}
      >
        <div
          className="item-image"
          style={{
            display: imgValid ? "auto" : "none",
          }}
        >
          <img
            src={imagePath}
            onError={(e) => {
              setImgValid(false);
            }}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "14px",
              objectFit: "cover",
            }}
            alt="summary-thumb"
          />
        </div>
        <div className="item-summary">
          <div className="item-title mb-1">{contents.title}</div>
          <div className="item-sub-title">
            {categoryFormatter(contents.category)} |{" "}
            {contents.sns === "instagram" && "@"}
            {contents.author}
            {isMobile && ` | 등록수 ${contents.downloads}`}
          </div>
        </div>
        <div
          onClick={togglePlan}
          className={select ? "item-btn add" : "item-btn delete"}
        />
        {!isMobile && (
          <div className="item-date">등록수 {contents.downloads}</div>
        )}
      </StyledItem>
      <Modal
        show={open}
        onHide={handleClose}
        centered
        onClick={modalClick}
        backdrop={false}
        style={
          isMobile
            ? { height, width: "calc(100% - 56px)", margin: "0 28px" }
            : {}
        }
      >
        <Modal.Body
          style={{
            background: "#FFFFFF",
            boxShadow: "0px 10px 33px rgba(54, 57, 70, 0.2)",
            borderRadius: 30,
          }}
        >
          <CustomLabelText
            text={`${contents.title} 을(를) 언제부터 시작할까요?`}
            fontSize={18}
            style={{
              color: "#363946",
              marginBottom: "5rem",
              lineHeight: "24px",
            }}
          />
          <DatePicker
            dateFormat="yyyy년 MM월 dd일"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            customInput={<CustomInput />}
            style={{ marginBottom: "5rem", width: isMobile ? "100%" : "70%" }}
          />

          <div style={{ width: 110, margin: "0 auto" }}>
            <CustomButton
              onClick={downloads}
              text={"확인"}
              style={{ marginTop: "5rem" }}
            />
          </div>
        </Modal.Body>
      </Modal>
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
