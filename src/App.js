import React, { useEffect, useState } from "react";
import { Link, Route,Switch } from "react-router-dom";

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
import useAuth from "./modules/User/hook";
import Avatar from "./assets/img/MobileUser.svg";
import LoginPage from "./components/login/LoginPage";
import RegisterPage from "./components/login/RegisterPage";

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

    font-family: "Caros Soft";
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
  width: calc(100%);
  margin-left: -0.75rem;
  padding: 1.75rem;
  background: #fff;
  position: fixed;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .login-btn {
    background: #089bab;
    width: 64.76px;
    height: 32px;
    border-radius: 35.4286px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-family: Noto Sans KR;
    font-style: normal;
    font-weight: 500;
    font-size: 10.6667px;
    line-height: 10px;

    color: #ffffff;
  }
  a{
    text-decoration:none
  }
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
  const { page, changeView } = useViews();
  const { exportPlans } = usePlans();
  const { status, logout, email,nick } = useAuth();

  const height = window.innerHeight;

  // * side bar Menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // * auth method
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  // * side bar tab
  // const []

  const onMenuToggle = (e) => {
    e.stopPropagation();
    const text = e.target.innerHTML;
    switch (text) {
      case "????????????":
        changeView("usage");
        break;
      case "????????????????????????":
        changeView("collect");
        break;
      case "??????":
        changeView("inquiry");
        break;
      case "?????? ??????":
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
          <Switch>
            <Route path="/uploads" component={Uploads} />
            <Route path="/" component={Idea} />
          </Switch>
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
          {/* <LoginPage /> */}
          {/* <LoginModal
            style={{
              position: "absolute",
              width: "100%",
            }}
            open={openLogin}
            setLogin={setOpenLogin}
          /> */}
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
              {/* <img
                src={Profile}
                style={{ width: 42, height: 42 }}
                alt="profile"
              /> */}
              <div style={{marginLeft:0,cursor:"pointer",width:42,display:"flex",alignItems:"center",justifyContent:"center", height:42, borderRadius:"50%",background:"#f7f7f7"}}>
                <img src={Avatar} alt="avatar"/>
              </div>
              <div>
                <h2 style={{marginBottom:"-.25rem"}}> {nick}</h2>
                <h3>{email}</h3>
              </div>
            </StyledProfileBox>
            <StledMobileListGroup>
              <h2>??? ??????</h2>
              <ListGroup variant="flush">
                <ListGroup.Item action>
                  <Link onClick={onMenuToggle} to="/inquiry/profile">
                    ?????? ??????
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item
                  action
                  onClick={(e) => {
                    e.stopPropagation();
                    logout();
                    setIsMenuOpen(false);
                  }}
                >
                  ????????????
                </ListGroup.Item>
              </ListGroup>
            </StledMobileListGroup>
            <StledMobileListGroup>
              <h2>PLANACT</h2>
              <ListGroup variant="flush">
                <ListGroup.Item action>
                  <Link onClick={onMenuToggle} to="/inquiry/">
                    ??????
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item action>
                  <Link onClick={onMenuToggle} to="/inquiry/collect">
                    ????????????????????????
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item action>
                  <Link onClick={onMenuToggle} to="/inquiry/usage">
                    ????????????
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </StledMobileListGroup>
          </StyledMobileSideBar>
          {/* )} */}

          {page !== "detail" && page !== "login" && page !== "register" && (
            <StyledMobileTopBar>
              {status ? (
                // <img
                //   src={Profile}
                //   style={{ width: "32px", height: "32px" }}
                //   alt="profile"
                //   onClick={onMenuToggle}
                // />
                <div onClick={onMenuToggle} style={{marginLeft:0,cursor:"pointer",width:32,display:"flex",alignItems:"center",justifyContent:"center", height:32, borderRadius:"50%",background:"#f7f7f7"}}>
                <img src={Avatar} alt="avatar"/>
              </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => {
                    setOpenLogin(true);
                  }}
                  className="login-btn"
                  style={{textDecoraton:"none"}}
                >
                  ?????????
                </Link>
              )}
              {page === "main" && (
                <img
                  src={ShareLogo}
                  alt="share"
                  style={{ width: 15, height: 18 }}
                  onClick={() => {
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
            <Route path="/login" exact component={LoginPage} />
            <Route path="/register" exact component={RegisterPage} />
            <Route path="/list" exact component={List} />
            <Route path="/inquiry" component={Inquiry} />
            <Route path="/list/:id" exact component={PlanDetail} />
          </StyledMobileBody>
          {page !== "detail" && page !== "login" && page !== "register" && (
            <StyledMobileTab style={isMobile && { marginLeft: "-.75rem" }}>
              <Link to="/">
                <img
                  src={ColoredCalendar}
                  style={{ width: "24px", height: "24px" }}
                  alt="calendar"
                />
                <p>??????</p>
              </Link>
              <Link to="/list">
                <img
                  src={ColoredSearch}
                  style={{ width: "24px", height: "24px" }}
                  alt="search"
                />
                <p>??????</p>
              </Link>
            </StyledMobileTab>
          )}
        </Container>
      )}
    </div>
  );
}

export default App;
