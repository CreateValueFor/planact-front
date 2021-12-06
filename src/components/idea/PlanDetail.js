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
import useResponsive from "../../Responsive";
import useViews from "../../modules/View/hooks";
import useAuth from "../../modules/User/hook";
import BASE_URL from "../../modules/host";

const StyledDownloadBtn = styled(StyledButton)`
  color: #fff;
  &.downloaded {
    background: #f27b68;
    color: #fff;
  }
`;

const StyledPlanDetail = styled.div`
  display: flex;
  align-items: center;
  .modal-backdrop {
    height: ${(props) => props.height};
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

function PlanDetailSummary({
  setShow,
  show,
  summary,
  handleShow,
  isDownloaded,
  setIsChanged,
  isChanged,
  setIsDownloaded,
}) {
  const { categoryFormatter, snsFormatter, formatDate } = useCustomHooks();
  const { email } = useAuth();

  const [startDate, setStartDate] = useState(new Date());
  const { downloadPlan, checkDownloaded } = usePlans();

  const { isMobile } = useResponsive();

  const handleClose = () => setShow(false);

  const modalClick = (e) => {
    e.stopPropagation();
  };

  const downloads = () => {
    if (!email) {
      window.alert("로그인 후 플랜을 다운받을 수 있습니다.");
      handleClose();
      return;
    }
    handleClose();
    downloadPlan(summary.id, formatDate(startDate)).then((data) => {
      setIsChanged((prev) => prev++);
      setIsDownloaded(true);
    });
  };

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

  useEffect(() => {
    checkDownloaded(summary.id).then((data) => {
      if (data.downloaded) {
        setIsDownloaded(true);
      } else {
        setIsDownloaded(false);
      }
    });
  }, [isChanged, summary.id, setIsDownloaded, checkDownloaded]);
  const height = window.innerHeight;
  useEffect(() => {
    window.addEventListener("click", handleClose);
    return () => {
      window.removeEventListener("click", handleClose);
    };
  }, []);
  return (
    <StyledPlanDetail height={height}>
      <div style={{ flex: 1 }}>
        <CustomText
          text={summary.title}
          fontSize={isMobile ? "16px" : "20px"}
        />
        <CustomLabelText
          text={`${categoryFormatter(summary.category)} | ${snsFormatter(
            summary.sns
          )} ${summary.author} 제공`}
        />
      </div>
      {!isMobile && (
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
      )}
      <Modal
        show={show}
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
    </StyledPlanDetail>
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
  const { isMobile } = useResponsive();
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
          active={selectedId === -1 && true}
          onClick={() => clickDay(-1)}
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
  const { isMobile } = useResponsive();
  return (
    <StyledDayDetailContainer
      style={
        isMobile ? { padding: 0, margin: 0, height: "auto" } : { width: "auto" }
      }
    >
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
              {
              theme.thumb.length > 100 ? (
                <img
                  src={theme.thumb}
                  style={{
                    objectFit: theme.title==="#하루"? "unset": "cover",
                    width: isMobile ? "100%" : "347px",
                    height: theme.title==="#하루" ? "auto":"188px",
                    borderRadius: "30px",
                    marginBottom:"30px"
                  }}
                  alt="thumbnail"
                />
              ) : 
              theme.thumb &&
              theme.thumb.split(".")[1] !== "undefined" &&
              theme.thumb != "" &&
              theme.thumb != "https://api3.planact.shop/uploads/daily/" &&
              (
                <img
                  src={`${BASE_URL}/uploads/daily/${theme.thumb}`}
                  style={{
                    objectFit: "cover",
                    width: isMobile ? "100%" : "347px",
                    height: "188px",
                    borderRadius: "30px",
                    marginBottom:"30px"
                  }}
                  alt="thumbnail"
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

function PlanDetailBody({ match, contents }) {
  const [curContents, setCurContents] = useState([]);
  const [selectedId, setSelectedId] = useState(0);

  const { isMobile } = useResponsive();

  //contents 업데이트 시 작동할 함수
  useEffect(() => {
    setCurContents(contents);
    console.log(contents);
  }, [contents]);

  const clickDay = (id) => {
    setSelectedId(id);
    if (id > -1) {
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
          {!isMobile && (
            <MemorizedDayContainer
              contents={contents}
              clickDay={clickDay}
              selectedId={selectedId}
            />
          )}
          <MemorizedDayDetailContainer curContents={curContents} />
        </>
      )}
    </div>
  );
}

const MemorizedPlanDetailBody = React.memo(PlanDetailBody);

const MemorizedPlanDetailSummary = React.memo(PlanDetailSummary);

function PlanDetail({ history, match }) {
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [isChanged, setIsChanged] = useState(0);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);

  const [contents, setContents] = useState([]);
  const { getUploadedPlansJson } = usePlans();

  const { id } = match.params;
  //페이지 진입 시 데이터 fetch
  useEffect(() => {
    getUploadedPlansJson(id).then((data) => {
      if (data) {
        data.sort(function(a, b) {
          return a.id - b.id;
        });
      }
      setContents(data);
      setLoading(false);
      console.log(data);
    });
  }, []);

  const location = useLocation();
  const summary = location.state.contents;
  const { viewDetail } = useViews();
  const { deletePlan } = usePlans();
  const { isMobile } = useResponsive();
  const height = window.innerHeight;

  const handleShow = (e) => {
    e.stopPropagation();
    if (isDownloaded) {
      deletePlan(summary.id);
      setIsDownloaded(false);
      setIsChanged((prev) => prev++);
    } else {
      setShow(true);
    }
  };
  useEffect(() => {
    viewDetail();
  }, []);
  return (
    <Row className={`w-100 ${isMobile && "m-0 p-0"}`}>
      <Col
        lg="12"
        style={{
          display: "flex",
          flexDirection: "column",
          paddingRight: "10%",
          paddingLeft: "10%",
          paddingTop: "3%",
          padding: isMobile ? "0px 1rem" : "auto",
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
        <MemorizedPlanDetailSummary
          show={show}
          setIsDownloaded={setIsDownloaded}
          setShow={setShow}
          isChanged={isChanged}
          setIsChanged={setIsChanged}
          handleShow={handleShow}
          isDownloaded={isDownloaded}
          summary={summary}
        />
        <hr />
        {loading ? (
          <div>loading... </div>
        ) : (
          <MemorizedPlanDetailBody
            contents={contents}
            setLoading={setLoading}
            match={match}
          />
        )}
        {isMobile && (
          <div
            style={{
              width: "100%",
              position: "fixed",
              display: "flex",
              alignItems: "center",
              height: 72,
              top: height - 72,
              paddingRight: "calc(50% - 75px)",
              paddingLeft: "calc(50% - 75px)",
              left: 0,
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 25.52%)",
            }}
          >
            <StyledDownloadBtn
              onClick={handleShow}
              id="downloadBtn"
              style={{ height: 44, fontSize: 15 }}
              className={isDownloaded ? "downloaded w-100" : "w-100"}
            >
              {isDownloaded ? "내 달력에서 제거" : "내 달력에 추가"}
            </StyledDownloadBtn>
          </div>
        )}
      </Col>
    </Row>
  );
}

export default PlanDetail;
