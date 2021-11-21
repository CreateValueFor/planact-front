import React, { useEffect, useState } from "react";
import { Link, Route } from "react-router-dom";
import Home from "./views/home";
import Login from "./views/login";
import "./app.css";
import Idea from "./views/Idea";
import Uploads from "./views/Uploads";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import Calendar from "./components/home/Calendar";
import Profile from "./assets/img/Default Profile.png";
import CalenarLogo from "./assets/img/Calendar.svg";
import SearchLogo from "./assets/img/Search.svg";
import ColoredSearch from "./assets/img/coloredSearch.png";
import ColoredCalendar from "./assets/img/coloredCalendar.png";
import ShareLogo from "./assets/img/Mask.png";
import CloseLogo from "./assets/img/Union.png";
import List from "./components/idea/List";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import AuthTab, {
  StyledListGroup,
  StyledProfileBox,
} from "./components/login/AuthTab";
import PlanDetail from "./components/idea/PlanDetail";

import useViews from "./modules/View/hooks";
import usePlans from "./modules/Plans/hook";
import Inquiry from "./components/idea/Inquiry";

const StyledMobileTab = styled.div`
  background: #ffffff;
  box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.05);
  border-top: 1px solid #eee;
  justify-content: space-around;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  display: flex;
  padding: 0.75rem 0px;
  width: 100%;
  height: 70px;
  position: fixed;
  bottom: 0;
  z-index: 10;
  a {
    display: flex;
    flex-direction: column;
    align-items: center;

    font-family: Caros Soft;
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 0.75rem;
    text-decoration: none;
    letter-spacing: 0.02em;

    color: #363946;
    p {
      margin-top: 0.5rem;
    }
  }
`;

const StyledMobileTopBar = styled.div`
  height: 64px;
  width: calc(100% - 1.5rem);
  padding: 1rem;
  background: #fff;
  position: fixed;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledMobileBody = styled.div`
  margin-top: 64px;
  margin-bottom: 70px;
  height: calc(100vh - 134px);
  max-height: calc(100vh - 134px);
  .row {
    padding-right: 2rem;
    .col-lg-12 {
      /* padding-left: 0 !important; */
      padding-right: 1rem;
    }
  }
  .modal-backdrop {
    min-height: 800px;
  }
`;

const StyledMobileSideBar = styled.div`
  width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: -300px;
  z-index: 20;
  -webkit-transform: translateX(0);
  transform: translateX(0);
  -webkit-transition: 0.3s ease all;
  transition: 0.3s ease all;
  background: #fff;
  padding: 40px 30px;

  &.open {
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
    -webkit-transform: translateX(300px);
    transform: translateX(300px);
  }
  .menu {
    > li {
      > a {
        padding: 15px 20px;
        color: #fff;
      }
    }
  }
`;

const StledMobileListGroup = styled(StyledListGroup)`
  margin-bottom: 2rem;
  h2 {
    color: #089bab;
  }
`;

function App() {
  const isPc = useMediaQuery({
    query: "(min-width:1024px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width:798px) and (max-width:1023px)",
  });
  const isMobile = useMediaQuery({
    query: "(max-width:797px)",
  });
  const { page } = useViews();
  const { exportPlans } = usePlans();
  const height = window.innerHeight;

  // * side bar Menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // * side bar tab
  // const []

  const { changeView } = useViews();

  const onMenuToggle = (e) => {
    e.stopPropagation();
    const text = e.target.innerHTML;
    switch (text) {
      case "이용약관":
        changeView("usage");
        break;
      case "개인정보처리방침":
        changeView("collect");
        break;
      case "문의":
        changeView("inquiry");
        break;
      case "계정 설정":
        changeView("profile");
        break;
      default:
        console.log(text);
        break;
    }
    setIsMenuOpen((prev) => !prev);
  };
  const onMenuClose = (e) => {
    e.stopPropagation();
    setIsMenuOpen((prev) => false);
  };

  const onSideBarClick = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    window.addEventListener("click", onMenuClose);
    return () => {
      window.removeEventListener("click", onMenuClose);
    };
  }, []);

  return (
    <div style={{ backgroundColor: "#fcfcfe", minHeight: "100vh" }}>
      {(isPc || isTablet) && (
        <div style={{ minHeight: "100vh" }}>
          <Route path="/trash" exact component={Home} />
          <Route path="/" component={Idea} />
          <Route path="/login" component={Login} />
          <Route path="/uploads" component={Uploads} />
        </div>
      )}
      {isMobile && (
        <Container
          style={{
            height,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#fff",
          }}
        >
          {/* !== "detail" && ( */}
          <StyledMobileSideBar
            onClick={onSideBarClick}
            className={`sidebar-menu${isMenuOpen === true ? " open" : ""}`}
            style={{ height }}
          >
            <img
              src={CloseLogo}
              style={{
                width: 14,
                height: 14,
                marginLeft: "auto",
                marginBottom: "2rem",
              }}
              onClick={onMenuToggle}
              alt="close"
            />
            <StyledProfileBox style={{ marginBottom: "40px" }}>
              <img
                src={Profile}
                style={{ width: 42, height: 42 }}
                alt="profile"
              />
              <div>
                <h2>닉네임</h2>
                <h3>example@example.com</h3>
              </div>
            </StyledProfileBox>
            <StledMobileListGroup>
              <h2>내 계정</h2>
              <ListGroup variant="flush">
                <ListGroup.Item action>
                  <Link onClick={onMenuToggle} to="/inquiry/profile">
                    계정 설정
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item action onClick={onMenuToggle}>
                  로그아웃
                </ListGroup.Item>
              </ListGroup>
            </StledMobileListGroup>
            <StledMobileListGroup>
              <h2>PLANACT</h2>
              <ListGroup variant="flush">
                <ListGroup.Item action>
                  <Link onClick={onMenuToggle} to="/inquiry/">
                    문의
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item action>
                  <Link onClick={onMenuToggle} to="/inquiry/collect">
                    개인정보처리방침
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item action>
                  <Link onClick={onMenuToggle} to="/inquiry/usage">
                    이용약관
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </StledMobileListGroup>
          </StyledMobileSideBar>
          {/* )} */}

          {page !== "detail" && (
            <StyledMobileTopBar>
              <img
                src={Profile}
                style={{ width: "32px", height: "32px" }}
                alt="profile"
                onClick={onMenuToggle}
              />
              {page === "main" && (
                <img
                  src={ShareLogo}
                  alt="share"
                  style={{ width: 15, height: 18 }}
                  onClick={() => {
                    window.alert("ddd");
                    exportPlans();
                  }}
                />
              )}
            </StyledMobileTopBar>
          )}
          <StyledMobileBody
            height={height}
            style={{
              height: page !== "detail" ? `calc(${height}px - 70px)` : "auto",
              paddingBottom: "72px",
              width: "100%",
              marginTop: page !== "detail" ? "64px" : "1rem",
            }}
          >
            <Route path="/" exact component={Calendar} />
            <Route path="/list" exact component={List} />
            <Route path="/inquiry" component={Inquiry} />
            <Route path="/list/:id" exact component={PlanDetail} />
          </StyledMobileBody>
          {page !== "detail" && (
            <StyledMobileTab style={isMobile && { marginLeft: "-.75rem" }}>
              <Link to="/">
                <img
                  src={ColoredCalendar}
                  style={{ width: "24px", height: "24px" }}
                  alt="calendar"
                />
                <p>달력</p>
              </Link>
              <Link to="/list">
                <img
                  src={ColoredSearch}
                  style={{ width: "24px", height: "24px" }}
                  alt="search"
                />
                <p>검색</p>
              </Link>
            </StyledMobileTab>
          )}
        </Container>
      )}
    </div>
  );
}

export default App;
