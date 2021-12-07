import { forwardRef } from "preact/compat";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import useCustomHooks from "../../modules/customHooks/Index";
import usePlans from "../../modules/Plans/hook";
import useAuth from "../../modules/User/hook";
import useResponsive from "../../Responsive";
import { CustomLabelText } from "../CustomText";
import CalendarLogo from "../../assets/img/datepicker.png";
import styled from "styled-components";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomButton from "../CustomButton";

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

function DownloadModal({ show, setShow, setIsChanged, summary }) {
  const [startDate, setStartDate] = useState(new Date());

  const { email } = useAuth();
  const { downloadPlan } = usePlans();
  const { formatDate } = useCustomHooks();
  const { isMobile } = useResponsive();
  const height = window.innerHeight;

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

  const modalClick = (e) => {
    e.stopPropagation();
  };

  const handleClose = () => setShow(false);

  const downloads = () => {
    if (!email) {
      window.alert("로그인 후 플랜을 다운받을 수 있습니다.");
      handleClose();
      return;
    }
    downloadPlan(summary.id, formatDate(startDate)).then((data) => {
      setIsChanged((prev) => prev++);
    });
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      onClick={modalClick}
      backdrop={false}
      style={
        isMobile ? { height, width: "calc(100% - 56px)", margin: "0 28px" } : {}
      }
    >
      <Modal.Body
        style={{
          background: "#FFFFFF",
          boxShadow: "0px 10px 33px rgba(54, 57, 70, 0.2)",
          borderRadius: 30,
          display:'flex',
          flexDirection:"column",
          alignItems:"center"
        }}
      >
        <CustomLabelText
          text={`${summary.title} 을(를) 언제부터 시작할까요?`}
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
  );
}

export default DownloadModal;
