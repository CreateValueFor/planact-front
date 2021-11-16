import {
  faChevronDown,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { forwardRef, useEffect, useState } from "react";
import { Col, ListGroupItem, ListGroup, Row, Modal } from "react-bootstrap";
import { useLocation } from "react-router";
import styled from "styled-components";
import useCustomHooks from "../../modules/customHooks/Index";
import { usePlans } from "../../modules/Plans/hook";
import CustomButton, { StyledButton } from "../CustomButton";
import CustomText, { CustomLabelText } from "../CustomText";
import CalendarLogo from "../../assets/img/datepicker.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./PlanDetail.scss";

const StyledDownloadBtn = styled(StyledButton)`
  color: #fff;
  &.downloaded {
    background: #f27b68;
    color: #fff;
  }
`;

const StyledSummary = styled.div``;

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

function PlanDetailSummary({ summary }) {
  const { categoryFormatter, snsFormatter } = useCustomHooks();
  const [show, setShow] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const { downloadPlan, checkDownloaded } = usePlans();
  const [isDownloaded, setIsDownloaded] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const downloads = () => {
    downloadPlan(summary.id, startDate.toLocaleDateString()).then((data) => {
      console.log(data);
      handleClose();
    });
  };

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <StyledDatePickerInput ref={ref} onClick={onClick} style={{}}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={CalendarLogo}
          style={{ marginRight: "1rem", width: 20, height: 20 }}
        />
        <div>{value}</div>
      </div>
      <FontAwesomeIcon icon={faChevronDown} />
    </StyledDatePickerInput>
  ));

  useEffect(() => {
    checkDownloaded(summary.id).then((data) => {
      console.log(data);
      if (data.downloaded) {
        setIsDownloaded(true);
      }
    });
  }, []);

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <CustomText text={summary.title} />
          <CustomLabelText
            text={`${categoryFormatter(summary.category)} | ${snsFormatter(
              summary.sns
            )} ${summary.author} 제공`}
          />
        </div>
        <div style={{ width: 150 }}>
          <StyledDownloadBtn
            onClick={handleShow}
            id="downloadBtn"
            style={{ height: 44 }}
            className={isDownloaded ? "downloaded w-100" : "w-100"}
          >
            {isDownloaded ? "내 달력에서 제거" : "내 달력에 추가"}
          </StyledDownloadBtn>
        </div>
        <Modal show={show} onHide={handleClose} style={{}}>
          <Modal.Body
            style={{
              background: "#FFFFFF",
              boxShadow: "0px 10px 33px rgba(54, 57, 70, 0.2)",
              borderRadius: 30,
            }}
          >
            <CustomLabelText
              text={`${summary.title} 플랜을 언제부터 시작할까요?`}
              fontSize={18}
              style={{ color: "#363946", marginBottom: "5rem" }}
            />
            <DatePicker
              dateFormat="yyyy년 MM월 dd일"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              customInput={<CustomInput />}
              style={{ marginBottom: "5rem" }}
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
      </div>
    </>
  );
}

const StyledDayContainer = styled.div`
  margin-left: 1.5rem;
  border: 1px solid #cccccc;
  box-sizing: border-box;
  border-radius: 30px;
  padding: 1rem;
  height: 70vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 3px;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
  }
  &::-webkit-scrollbar-track {
    width: 3px;
  }
  .list-group-item {
    &.active {
      background-color: #f1f6f9;
    }
  }
`;

function DayContainer({ contents, selectedId, clickDay }) {
  return (
    <StyledDayContainer style={{ width: "27%" }}>
      <CustomText
        fontSize={14}
        style={{
          lineHeight: "1.25rem",
          marginBottom: 0,
          padding: "0.5rem 1rem",
        }}
        text="개요"
      />
      <ListGroup variant="flush" style={{ paddingTop: "1rem" }}>
        <ListGroupItem
          id="0"
          action
          style={{ border: "1px solid transparent" }}
          active={selectedId === 0 && true}
          onClick={() => clickDay(0)}
        >
          <CustomText
            fontSize={14}
            style={{
              lineHeight: "1.25rem",
              marginBottom: 0,
              fontWeight: 400,
            }}
            text="전체보기"
          />
        </ListGroupItem>
        {contents.map((event) => (
          <ListGroupItem
            key={event.id}
            id={event.id}
            onClick={() => clickDay(event.id)}
            action
            active={selectedId === event.id && true}
            style={{ border: "1px solid transparent" }}
          >
            <CustomText
              fontSize={14}
              style={{
                lineHeight: "1.25rem",
                marginBottom: 0,
                fontWeight: 400,
              }}
              text={event.title}
            />
          </ListGroupItem>
        ))}
      </ListGroup>
    </StyledDayContainer>
  );
}

const StyledDayDetailContainer = styled.div`
  flex: 1;
  margin-left: 5rem;
  padding-left: 3rem;
  padding-top: 1rem;
  height: 70vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 3px;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
  }
  &::-webkit-scrollbar-track {
    width: 3px;
  }
`;

function DayDetailContainer({ curContents }) {
  return (
    <StyledDayDetailContainer>
      {curContents.map((event) => (
        <div key={event.id}>
          <CustomText
            fontSize={15}
            style={{ lineHeight: "1.25rem", marginBottom: "2rem" }}
            text={event.title}
          />
          {event.events.map((theme) => (
            <div key={theme.id}>
              <div style={{ marginBottom: "1rem" }}>{theme.title}</div>
              <div style={{ marginBottom: "1rem", fontSize: ".875rem" }}>
                {theme.contents}
              </div>
              {theme.thumb && (
                <img
                  src={theme.thumb}
                  style={{ width: "347px", height: "188px" }}
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </StyledDayDetailContainer>
  );
}

const MemorizedDayDetailContainer = React.memo(DayDetailContainer);
const MemorizedDayContainer = React.memo(DayContainer);

function PlanDetailBody({ match }) {
  const [contents, setContents] = useState([]);
  const [curContents, setCurContents] = useState([]);
  const [selectedId, setSelectedId] = useState(0);
  const { getUploadedPlansJson } = usePlans();
  const { id } = match.params;

  //페이지 진입 시 데이터 fetch
  useEffect(() => {
    getUploadedPlansJson(id).then((data) => {
      setContents(data);
      setCurContents(data);
    });
  }, []);

  //contents 업데이트 시 작동할 함수
  useEffect(
    () => {
      console.log(contents);
    },
    [contents]
  );

  const clickDay = (id) => {
    setSelectedId(id);
    if (id) {
      setCurContents(contents.filter((elem) => elem.id === id));
    } else {
      setCurContents(contents);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      {!contents ? (
        <div>세부 플랜이 존재하지 않습니다.</div>
      ) : (
        <>
          <MemorizedDayContainer
            contents={contents}
            clickDay={clickDay}
            selectedId={selectedId}
          />
          <MemorizedDayDetailContainer curContents={curContents} />
        </>
      )}
    </div>
  );
}

const MemorizedPlanDetailBody = React.memo(PlanDetailBody);

const MemorizedPlanDetailSummary = React.memo(PlanDetailSummary);

function PlanDetail({ history, match }) {
  const location = useLocation();
  const summary = location.state.contents;

  return (
    <Row className="w-100">
      <Col
        lg="12"
        style={{
          display: "flex",
          flexDirection: "column",
          paddingRight: "10%",
          paddingLeft: "10%",
          paddingTop: "3%",
        }}
      >
        <div
          style={{ marginBottom: "3%", cursor: "pointer" }}
          onClick={() => {
            history.goBack();
          }}
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            style={{ marginRight: "1rem" }}
          />
          돌아가기
        </div>
        <MemorizedPlanDetailSummary summary={summary} />
        <hr />
        <MemorizedPlanDetailBody match={match} />
      </Col>
    </Row>
  );
}

export default PlanDetail;
